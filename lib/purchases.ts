import {
  doc,
  getDoc,
  collection,
  getDocs,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export interface LibraryEntry {
  gameId:      string
  title:       string
  purchasedAt: Timestamp
  downloadUrl: string | null
  stripeSessionId: string
  type:        'game' | 'dlc'
  parentGameId?: string  // set for DLC entries
}

/** Fetch all library entries for a user (client-side) */
export async function getUserLibrary(uid: string): Promise<LibraryEntry[]> {
  const libraryRef  = collection(db, 'users', uid, 'library')
  const snapshot    = await getDocs(libraryRef)
  return snapshot.docs.map(d => d.data() as LibraryEntry)
}

/** Check if a user owns a specific game or DLC (client-side) */
export async function userOwnsItem(uid: string, itemId: string): Promise<boolean> {
  const itemRef  = doc(db, 'users', uid, 'library', itemId)
  const snapshot = await getDoc(itemRef)
  return snapshot.exists()
}
