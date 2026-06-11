/**
 * Firebase server-side helper using the client SDK + a dedicated service user.
 *
 * IMPORTANT: signInWithEmailAndPassword is rate-limited by Firebase.
 * Calling it on every webhook will fail under real load.
 * This module caches the Firestore instance after first successful sign-in.
 * The cache survives multiple calls within the same serverless function instance.
 *
 * For high-throughput production use, migrate to the Firebase Admin SDK
 * with a service account JSON (environment variable) instead of this pattern.
 *
 * Setup (one-time):
 *   1. Firebase Console → Authentication → Add user
 *   2. Email:    webhook@speedline.internal
 *   3. Password: strong random value (openssl rand -base64 32)
 *   4. Add FIREBASE_WEBHOOK_EMAIL and FIREBASE_WEBHOOK_PASSWORD to .env.local
 *   5. Get this user's UID from Firebase Auth console, paste it into
 *      your Firestore security rules (see below).
 *
 * Firestore security rules:
 *   rules_version = '2';
 *   service cloud.firestore {
 *     match /databases/{database}/documents {
 *       match /users/{uid}/library/{item} {
 *         allow read:  if request.auth.uid == uid;
 *         allow write: if request.auth.uid == 'WEBHOOK_USER_UID';
 *       }
 *       match /gameNotifications/{gameId}/subscribers/{uid} {
 *         allow read:  if request.auth.uid == uid;
 *         allow write: if request.auth.uid == uid
 *                      || request.auth.uid == 'WEBHOOK_USER_UID';
 *       }
 *     }
 *   }
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword }  from 'firebase/auth'
import { getFirestore, Firestore }              from 'firebase/firestore'

const serverFirebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

function getServerApp(): FirebaseApp {
  const existing = getApps().find(a => a.name === 'server')
  if (existing) return existing
  return initializeApp(serverFirebaseConfig, 'server')
}

// Module-level cache. Survives multiple calls within the same
// serverless function instance (warm starts). Resets on cold start.
let cachedDb: Firestore | null = null
let authPromise: Promise<Firestore> | null = null

/**
 * Returns an authenticated Firestore instance signed in as the webhook service user.
 * Caches the result — subsequent calls within the same instance return immediately.
 */
export async function getServerDb(): Promise<Firestore> {
  // Return cached instance if already authenticated
  if (cachedDb) return cachedDb

  // Deduplicate concurrent calls — don't sign in twice if called simultaneously
  if (authPromise) return authPromise

  authPromise = (async () => {
    const app  = getServerApp()
    const auth = getAuth(app)
    const db   = getFirestore(app)

    // Only sign in if not already authenticated
    if (!auth.currentUser) {
      await signInWithEmailAndPassword(
        auth,
        process.env.FIREBASE_WEBHOOK_EMAIL!,
        process.env.FIREBASE_WEBHOOK_PASSWORD!,
      )
    }

    cachedDb = db
    return db
  })()

  try {
    return await authPromise
  } finally {
    // Clear the in-flight promise once resolved (success or failure)
    authPromise = null
  }
}
