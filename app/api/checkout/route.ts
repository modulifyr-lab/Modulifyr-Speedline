import { NextRequest, NextResponse }  from 'next/server'
import { createPaddleCheckout }       from '@/lib/paddle'

interface CheckoutItem {
  id:            string
  type:          'game' | 'dlc'
  paddlePriceId: string   // Paddle price ID (pri_...)
  title:         string
}

export async function POST(req: NextRequest) {
  try {
    const { items, uid, userEmail } = await req.json() as {
      items:     CheckoutItem[]
      uid:       string
      userEmail: string
    }

    if (!items?.length || !uid || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    for (const item of items) {
      if (!item.paddlePriceId) {
        return NextResponse.json(
          { error: `${item.title} is not yet available for purchase.` },
          { status: 400 }
        )
      }
    }

    const checkoutUrl = await createPaddleCheckout({
      items: items.map(i => ({ priceId: i.paddlePriceId, quantity: 1 })),
      customerEmail: userEmail,
      customData: {
        uid,
        itemIds:    items.map(i => i.id).join(','),
        itemTypes:  items.map(i => i.type).join(','),
        itemTitles: items.map(i => i.title).join('||'),
      },
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/library?success=1`,
    })

    return NextResponse.json({ url: checkoutUrl })
  } catch (err) {
    console.error('[checkout] Paddle error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}