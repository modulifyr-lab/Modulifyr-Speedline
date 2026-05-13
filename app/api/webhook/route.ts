import { NextRequest, NextResponse } from 'next/server'
import { getServerDb } from '@/lib/firebase-server'
import { games } from '@/lib/games'
import { LEMON_SQUEEZY_WEBHOOK_SECRET } from '@/lib/lemonsqueezy'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature.' }, { status: 400 })
  }

  const hmac = crypto.createHmac('sha256', LEMON_SQUEEZY_WEBHOOK_SECRET)
  const digest = hmac.update(body).digest('hex')

  if (digest !== signature) {
    console.error('[webhook] Signature verification failed.')
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  const payload = JSON.parse(body)

  if (payload.meta.event_name === 'order_created' || payload.meta.event_name === 'order_paid') {
    const customData = payload.data.attributes.custom_data

    if (!customData) {
      console.error('[webhook] Missing custom_data in order.')
      return NextResponse.json({ error: 'Missing custom_data.' }, { status: 400 })
    }

    const uid = customData.uid
    const itemId = customData.itemId
    const itemType = customData.itemType as 'game' | 'dlc'
    const itemTitle = customData.itemTitle || ''

    if (!uid || !itemId) {
      console.error('[webhook] Missing uid or itemId in custom_data.')
      return NextResponse.json({ error: 'Missing uid or itemId.' }, { status: 400 })
    }

    let downloadUrl: string | null = null
    let parentGameId: string | undefined

    if (itemType === 'game') {
      const game = games.find(g => g.id === itemId)
      downloadUrl = game?.downloadUrl ?? null
    } else {
      for (const game of games) {
        const dlc = game.dlcs?.find(d => d.id === itemId)
        if (dlc) {
          downloadUrl = dlc.downloadUrl ?? null
          parentGameId = game.id
          break
        }
      }
    }

    const libraryEntry = {
      id: itemId,
      gameId: itemId,
      title: itemTitle,
      purchasedAt: Timestamp.now(),
      downloadUrl,
      lemonSqueezyOrderId: payload.data.id,
      type: itemType,
      ...(parentGameId ? { parentGameId } : {}),
    }

    try {
      const db = await getServerDb()
      const itemRef = doc(db, 'users', uid, 'library', itemId)
      await setDoc(itemRef, libraryEntry)
      console.log(`[webhook] Purchase recorded: ${uid} -> ${itemId}`)
    } catch (err) {
      console.error('[webhook] Firestore write failed:', err)
      return NextResponse.json({ error: 'Database write failed.' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
