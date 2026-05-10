import Stripe from 'stripe'

// STRIPE_SECRET_KEY lives only on the server — never prefix with NEXT_PUBLIC_
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})
