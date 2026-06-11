import { NextRequest, NextResponse } from 'next/server'
import { getServerDb }               from '@/lib/firebase-server'
import { doc, setDoc, Timestamp }    from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>
    const { gameId, uid, email } = body

    if (
      typeof gameId !== 'string' || !gameId.trim() ||
      typeof uid    !== 'string' || !uid.trim()    ||
      typeof email  !== 'string' || !email.includes('@')
    ) {
      return NextResponse.json({ error: 'Missing or invalid fields.' }, { status: 400 })
    }

    const db  = await getServerDb()
    const ref = doc(db, 'gameNotifications', gameId, 'subscribers', uid)

    await setDoc(ref, {
      uid,
      email:        email.toLowerCase().trim(),
      gameId,
      subscribedAt: Timestamp.now(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[notify] Error:', err)
    return NextResponse.json({ error: 'Failed to save notification preference.' }, { status: 500 })
  }
}
