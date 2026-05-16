/**
 * Paddle Billing API client (replaces Stripe)
 *
 * Setup:
 *   1. Create account at paddle.com
 *   2. Complete KYC — Paddle supports Nepal payouts via Wise or PayPal
 *   3. Dashboard → Developer Tools → Authentication → Generate API key
 *   4. Add to .env.local:
 *        PADDLE_API_KEY=your_api_key
 *        PADDLE_WEBHOOK_SECRET=your_webhook_secret
 *        PADDLE_ENVIRONMENT=sandbox   (use 'production' when ready to go live)
 *   5. For each game: Catalog → Products → New Product → add a one-time price
 *      Copy the price ID (starts with pri_) into lib/games.ts as stripePriceId
 *      (the field name stays the same to avoid wider refactor)
 */

const PADDLE_API_BASE = process.env.PADDLE_ENVIRONMENT === 'production'
  ? 'https://api.paddle.com'
  : 'https://sandbox-api.paddle.com'

export const paddleApiKey = process.env.PADDLE_API_KEY!

export interface PaddleCheckoutItem {
  priceId:  string
  quantity: number
}

/**
 * Create a Paddle checkout transaction and return the checkout URL.
 * The user is redirected to Paddle's hosted checkout (same UX as Stripe Checkout).
 */
export async function createPaddleCheckout({
  items,
  customerEmail,
  customData,
  successUrl,
  cancelUrl,
}: {
  items:         PaddleCheckoutItem[]
  customerEmail: string
  customData:    Record<string, string>
  successUrl:    string
  cancelUrl:     string
}): Promise<string> {
  const res = await fetch(`${PADDLE_API_BASE}/transactions`, {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${paddleApiKey}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      items,
      customer: { email: customerEmail },
      custom_data: customData,
      checkout: {
        url: successUrl,  // Paddle appends ?_ptxn=... to this URL on success
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Paddle API error: ${JSON.stringify(err)}`)
  }

  const data = await res.json()
  // data.data.checkout.url is the hosted checkout page URL
  return data.data.checkout.url as string
}

/**
 * Verify a Paddle webhook signature.
 * Paddle uses HMAC-SHA256 with the raw request body.
 */
export async function verifyPaddleWebhook(
  rawBody:   string,
  signature: string,
  secret:    string
): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  )

  // Paddle sends: ts=timestamp;h1=hash
  const parts    = Object.fromEntries(signature.split(';').map(p => p.split('=')))
  const ts       = parts['ts']
  const hash     = parts['h1']
  const signedPayload = `${ts}:${rawBody}`

  const hashBytes = Uint8Array.from(Buffer.from(hash, 'hex'))
  return crypto.subtle.verify('HMAC', key, hashBytes, encoder.encode(signedPayload))
}