import { NextRequest, NextResponse } from 'next/server'
import { games } from '@/lib/games'
import { LEMON_SQUEEZY_API_KEY, LEMON_SQUEEZY_STORE_ID, LEMON_SQUEEZY_BASE_URL } from '@/lib/lemonsqueezy'

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

    let lemonSqueezyVariantId: string | null = null
    let itemTitle = ''

    if (itemType === 'game') {
      const game = games.find(g => g.id === itemId)
      if (!game) return NextResponse.json({ error: 'Game not found.' }, { status: 404 })
      if (!game.lemonSqueezyVariantId) return NextResponse.json({ error: 'Game not available for purchase yet.' }, { status: 400 })
      lemonSqueezyVariantId = game.lemonSqueezyVariantId
      itemTitle = game.title
    } else {
      for (const game of games) {
        const dlc = game.dlcs?.find(d => d.id === itemId)
        if (dlc) {
          lemonSqueezyVariantId = dlc.lemonSqueezyVariantId
          itemTitle = dlc.title
          break
        }
      }
      if (!lemonSqueezyVariantId) return NextResponse.json({ error: 'DLC not found.' }, { status: 404 })
    }

    const checkoutUrl = `${LEMON_SQUEEZY_BASE_URL}/checkouts`
    const response = await fetch(checkoutUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            store_id: parseInt(LEMON_SQUEEZY_STORE_ID),
            custom_price: null,
            product_options: {
              enabled_variants: [parseInt(lemonSqueezyVariantId)],
              redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/library?success=1&item=${itemId}`,
              receipt_button_text: 'Return to Modulifyr Speedline',
              receipt_link_url: `${process.env.NEXT_PUBLIC_BASE_URL}/library?success=1&item=${itemId}`,
            },
            checkout_options: {
              embed: false,
              media: true,
              logo: true,
            },
            checkout_data: {
              email: userEmail,
              custom: {
                uid,
                itemId,
                itemType,
                itemTitle,
              }
            }
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: LEMON_SQUEEZY_STORE_ID
              }
            },
            variant: {
              data: {
                type: 'variants',
                id: lemonSqueezyVariantId
              }
            }
          }
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[checkout] Lemon Squeezy error:', response.status, errorText)
      return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
    }

    const data = await response.json()
    const checkoutUrlRedirect = data.data.attributes.url

    return NextResponse.json({ url: checkoutUrlRedirect })
  } catch (err) {
    console.error('[checkout] Error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
