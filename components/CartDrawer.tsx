'use client'

import { useState }  from 'react'
import { useRouter } from 'next/navigation'
import { useCart }   from '@/contexts/CartContext'
import { useAuth }   from '@/contexts/AuthContext'

export default function CartDrawer() {
  const { items, itemCount, total, removeItem, clearCart, isOpen, closeCart } = useCart()
  const { user }  = useAuth()
  const router    = useRouter()
  const [busy,    setBusy]  = useState(false)
  const [error,   setError] = useState('')

  async function handleCheckout() {
    if (!user) {
      router.push('/auth?next=/games')
      closeCart()
      return
    }

    if (items.length === 0) return

    setError('')
    setBusy(true)

    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          items:     items.map(i => ({ id: i.id, type: i.type, stripePriceId: i.stripePriceId, title: i.title })),
          uid:       user.uid,
          userEmail: user.email,
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error || 'Checkout failed. Please try again.')
        return
      }

      clearCart()
      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.6)]"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-50 h-full w-full max-w-[420px]
          bg-sl-darker border-l border-sl-border
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sl-border flex-shrink-0">
          <div>
            <h2 className="font-syne font-bold text-[18px] text-sl-white">Cart</h2>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted mt-0.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="text-sl-muted hover:text-sl-white transition-colors p-1"
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-6">
              <div className="w-12 h-12 border border-sl-border flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 3h2l2.4 9.6A2 2 0 0 0 9.3 14H16a2 2 0 0 0 1.9-1.4L19 7H5" stroke="#5A5A5A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="17" r="1" fill="#5A5A5A" />
                  <circle cx="16" cy="17" r="1" fill="#5A5A5A" />
                </svg>
              </div>
              <p className="font-syne font-bold text-[15px] text-sl-white">Your cart is empty</p>
              <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-sl-muted text-center">
                Browse the shop and add games to get started.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 font-mono text-[10px] tracking-[0.12em] uppercase text-sl-orange hover:underline"
              >
                Continue Browsing →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-sl-border">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-4 px-6 py-4">
                  {/* Art thumbnail */}
                  <div
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center text-xl border border-sl-border"
                    style={{ background: item.artGradient }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-syne font-bold text-[13px] text-sl-white truncate">{item.title}</p>
                    <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mt-0.5">
                      {item.type === 'dlc' ? 'DLC' : 'Game'} · Buy Once, Own Forever
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-syne font-bold text-[15px] text-sl-white">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sl-muted hover:text-sl-orange transition-colors"
                      aria-label={`Remove ${item.title}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — total + checkout */}
        {items.length > 0 && (
          <div className="border-t border-sl-border px-6 py-5 flex-shrink-0">
            {/* Ownership reminder */}
            <div className="flex items-center gap-2 mb-4 border border-[rgba(47,184,200,0.25)] bg-[rgba(47,184,200,0.05)] px-3 py-2">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <polyline points="2,7 5.5,10.5 12,3.5" stroke="#2FB8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-sl-cyan">
                All purchases are permanent. No subscriptions.
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-sl-muted">Total</span>
              <span className="font-syne font-extrabold text-[22px] text-sl-white">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Promo code note */}
            <p className="font-mono text-[8px] tracking-[0.1em] uppercase text-sl-muted mb-3">
              Promo codes can be applied at checkout.
            </p>

            {error && (
              <p className="font-mono text-[9px] text-sl-orange mb-3">{error}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={busy}
              className="w-full bg-sl-orange text-sl-white px-4 py-3.5 font-mono text-[10px] tracking-[0.12em] uppercase clip-btn transition-colors hover:bg-[#c93a28] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? 'Redirecting to checkout...' : `Checkout · $${total.toFixed(2)}`}
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-2 font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white transition-colors py-2"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}