import { NextRequest, NextResponse } from 'next/server'
import { stripe }      from '@/lib/stripe'
import { getAdminDb }  from '@/lib/firebase-admin'
import { games }       from '@/lib/games'
import { Timestamp }   from 'firebase-admin/firestore'
import Stripe          from 'stripe'

// Required for Stripe signature verification — do NOT parse body as JSON
export const config = { api: { bodyParser: false } }

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

    const db = getAdminDb()

    // Resolve download URL from game data (if available)
    let downloadUrl: string | null = null
    let parentGameId: string | undefined

    if (itemType === 'game') {
      const game = games.find(g => g.id === itemId)
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

    // Write to Firestore: users/{uid}/library/{itemId}
    await db
      .collection('users')
      .doc(uid)
      .collection('library')
      .doc(itemId)
      .set(libraryEntry)

    console.log(`[webhook] Purchase recorded: ${uid} → ${itemId}`)
  }

  return NextResponse.json({ received: true })
}
