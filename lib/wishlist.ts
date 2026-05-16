import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'

export interface WishlistEntry {
  gameId:    string
  addedAt:   Timestamp
}

export async function addToWishlist(uid: string, gameId: string): Promise<void> {
  const ref = doc(db, 'users', uid, 'wishlist', gameId)
  await setDoc(ref, { gameId, addedAt: Timestamp.now() })
}

export async function removeFromWishlist(uid: string, gameId: string): Promise<void> {
  const ref = doc(db, 'users', uid, 'wishlist', gameId)
  await deleteDoc(ref)
}

export async function isWishlisted(uid: string, gameId: string): Promise<boolean> {
  const ref  = doc(db, 'users', uid, 'wishlist', gameId)
  const snap = await getDoc(ref)
  return snap.exists()
}

export async function getWishlist(uid: string): Promise<WishlistEntry[]> {
  const ref  = collection(db, 'users', uid, 'wishlist')
  const snap = await getDocs(ref)
  return snap.docs.map(d => d.data() as WishlistEntry)
}