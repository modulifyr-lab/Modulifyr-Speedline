import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Firebase Admin uses a service account — never expose these values client-side.
// Get the service account JSON from: Firebase Console → Project Settings → Service Accounts → Generate new private key
// Then add each field as an env variable in .env.local and Vercel project settings.

let adminApp: App

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0]

  adminApp = initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
      // Replace \n escape sequences — Vercel stores multiline env vars as escaped strings
      privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })

  return adminApp
}

export function getAdminDb() {
  return getFirestore(getAdminApp())
}
