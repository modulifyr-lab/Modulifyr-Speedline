import { NextRequest, NextResponse } from 'next/server'
import { stripe }          from '@/lib/stripe'
import { getServerDb }     from '@/lib/firebase-server'
import { games }           from '@/lib/games'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import Stripe              from 'stripe'

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const uid       = session.metadata?.uid       || session.client_reference_id
    const itemId    = session.metadata?.itemId
    const itemType  = session.metadata?.itemType  as 'game' | 'dlc'
    const itemTitle = session.metadata?.itemTitle || ''

    if (!uid || !itemId) {
      console.error('[webhook] Missing uid or itemId in session metadata.')
      return NextResponse.json({ error: 'Missing metadata.' }, { status: 400 })
    }

    let downloadUrl: string | null  = null
    let parentGameId: string | undefined

    if (itemType === 'game') {
      const game  = games.find(g => g.id === itemId)
      downloadUrl = game?.downloadUrl ?? null
    } else {
      for (const game of games) {
        const dlc = game.dlcs?.find(d => d.id === itemId)
        if (dlc) {
          downloadUrl  = dlc.downloadUrl ?? null
          parentGameId = game.id
          break
        }
      }
    }

    const libraryEntry = {
      gameId:          itemId,
      title:           itemTitle,
      purchasedAt:     Timestamp.now(),
      downloadUrl,
      stripeSessionId: session.id,
      type:            itemType,
      ...(parentGameId ? { parentGameId } : {}),
    }

    try {
      const db      = await getServerDb()
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