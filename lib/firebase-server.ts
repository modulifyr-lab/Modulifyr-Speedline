/**
 * Firebase server-side helper using the client SDK + a dedicated service user.
 * This replaces the Admin SDK approach — no private key or service account JSON required.
 *
 * Setup (one-time):
 *   1. Firebase Console → Authentication → Add user
 *   2. Email:    webhook@speedline.internal  (or any email you won't use publicly)
 *   3. Password: generate a strong random one (e.g. openssl rand -base64 32)
 *   4. Add both to .env.local as FIREBASE_WEBHOOK_EMAIL / FIREBASE_WEBHOOK_PASSWORD
 *   5. After first deploy, check Firebase Auth for this user's UID and add it to
 *      your Firestore security rules (see below).
 *
 * Firestore security rules:
 *   rules_version = '2';
 *   service cloud.firestore {
 *     match /databases/{database}/documents {
 *       match /users/{uid}/library/{item} {
 *         allow read:  if request.auth.uid == uid;
 *         allow write: if request.auth.uid == 'PASTE_WEBHOOK_USER_UID_HERE';
 *       }
 *     }
 *   }
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword }          from 'firebase/auth'
import { getFirestore }                                  from 'firebase/firestore'

const serverFirebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

// Use a separate named app instance to avoid conflicts with the client-side app
function getServerApp(): FirebaseApp {
  const existing = getApps().find(a => a.name === 'server')
  if (existing) return existing
  return initializeApp(serverFirebaseConfig, 'server')
}

/**
 * Returns an authenticated Firestore instance signed in as the webhook service user.
 * Call this inside your API route — do not call at module level.
 */
export async function getServerDb() {
  const app  = getServerApp()
  const auth = getAuth(app)
  const db   = getFirestore(app)

  // Sign in as the dedicated webhook user
  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_WEBHOOK_EMAIL!,
    process.env.FIREBASE_WEBHOOK_PASSWORD!,
  )

  return db
}