import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { games }  from '@/lib/games'

export async function POST(req: NextRequest) {
  try {
    const { itemId, itemType, uid, userEmail } = await req.json() as {
      itemId:    string
      itemType:  'game' | 'dlc'
      uid:       string
      userEmail: string
    }

    if (!itemId || !uid || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Resolve the Stripe price ID from game data
    let stripePriceId: string | null = null
    let itemTitle = ''

    if (itemType === 'game') {
      const game = games.find(g => g.id === itemId)
      if (!game) return NextResponse.json({ error: 'Game not found.' }, { status: 404 })
      if (!game.stripePriceId) return NextResponse.json({ error: 'Game not available for purchase yet.' }, { status: 400 })
      stripePriceId = game.stripePriceId
      itemTitle     = game.title
    } else {
      // DLC — find the parent game, then the DLC within it
      for (const game of games) {
        const dlc = game.dlcs?.find(d => d.id === itemId)
        if (dlc) {
          stripePriceId = dlc.stripePriceId
          itemTitle     = dlc.title
          break
        }
      }
      if (!stripePriceId) return NextResponse.json({ error: 'DLC not found.' }, { status: 404 })
    }

    const session = await stripe.checkout.sessions.create({
      mode:                'payment',
      payment_method_types: ['card'],
      customer_email:      userEmail,
      line_items: [
        {
          price:    stripePriceId,
          quantity: 1,
        },
      ],
      // Pass context so the webhook knows who bought what
      metadata: {
        uid,
        itemId,
        itemType,
        itemTitle,
      },
      // client_reference_id is the Firebase UID — used as fallback in webhook
      client_reference_id: uid,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/library?success=1&item=${itemId}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/games/${itemType === 'game' ? itemId : ''}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[checkout] Error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
