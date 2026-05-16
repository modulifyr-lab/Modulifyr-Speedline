import { NextRequest, NextResponse } from 'next/server'
import { getServerDb }               from '@/lib/firebase-server'
import { doc, setDoc, Timestamp }    from 'firebase/firestore'

export async function POST(req: NextRequest) {
  try {
    const { gameId, uid, email } = await req.json() as {
      gameId: string
      uid:    string
      email:  string
    }

    if (!gameId || !uid || !email) {
      return NextResponse.json({ error: 'Missing fields.' }, { status: 400 })
    }

    const db  = await getServerDb()
    const ref = doc(db, 'gameNotifications', gameId, 'subscribers', uid)

    await setDoc(ref, {
      uid,
      email,
      subscribedAt: Timestamp.now(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[notify] Error:', err)
    return NextResponse.json({ error: 'Failed to save notification preference.' }, { status: 500 })
  }
}