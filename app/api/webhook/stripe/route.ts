import { NextRequest, NextResponse }   from 'next/server'
import { stripe }                       from '@/lib/stripe'
import { getServerDb }                  from '@/lib/firebase-server'
import { games }                        from '@/lib/games'
import { doc, setDoc, Timestamp }       from 'firebase/firestore'
import Stripe                           from 'stripe'

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const uid     = session.metadata?.uid || session.client_reference_id

    if (!uid) {
      console.error('[webhook] No uid in session metadata.')
      return NextResponse.json({ error: 'Missing uid.' }, { status: 400 })
    }

    // Parse comma-separated item lists
    const itemIds    = (session.metadata?.itemIds   ?? '').split(',').filter(Boolean)
    const itemTypes  = (session.metadata?.itemTypes ?? '').split(',').filter(Boolean)
    const itemTitles = (session.metadata?.itemTitles ?? '').split('||').filter(Boolean)

    if (itemIds.length === 0) {
      console.error('[webhook] No itemIds in metadata.')
      return NextResponse.json({ error: 'Missing itemIds.' }, { status: 400 })
    }

    try {
      const db = await getServerDb()

      // Write all purchased items to Firestore in parallel
      await Promise.all(
        itemIds.map(async (itemId, idx) => {
          const itemType  = (itemTypes[idx]  ?? 'game') as 'game' | 'dlc'
          const itemTitle = itemTitles[idx] ?? itemId

          let downloadUrl:  string | null   = null
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

          const entry = {
            gameId:          itemId,
            title:           itemTitle,
            purchasedAt:     Timestamp.now(),
            downloadUrl,
            stripeSessionId: session.id,
            type:            itemType,
            ...(parentGameId ? { parentGameId } : {}),
          }

          const ref = doc(db, 'users', uid, 'library', itemId)
          await setDoc(ref, entry)
          console.log(`[webhook] Recorded: ${uid} → ${itemId}`)
        })
      )
    } catch (err) {
      console.error('[webhook] Firestore write failed:', err)
      return NextResponse.json({ error: 'Database write failed.' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}