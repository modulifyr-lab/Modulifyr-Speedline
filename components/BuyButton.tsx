'use client'

import { useState, useEffect } from 'react'
import { useRouter }           from 'next/navigation'
import { useAuth }             from '@/contexts/AuthContext'
import { useCart }             from '@/contexts/CartContext'
import { userOwnsItem }        from '@/lib/purchases'
import type { Game, DLC }      from '@/lib/games'

interface BuyButtonProps {
  item:          Game | DLC
  itemType:      'game' | 'dlc'
  artGradient?:  string
  /** Show both "Add to Cart" and "Buy Now" (used on detail pages) */
  showBothActions?: boolean
  parentOwned?:  boolean
}

export default function BuyButton({
  item,
  itemType,
  artGradient  = '#141414',
  showBothActions = false,
  parentOwned  = true,
}: BuyButtonProps) {
  const { user }   = useAuth()
  const { addItem, hasItem } = useCart()
  const router     = useRouter()

  const [owned,    setOwned]    = useState(false)
  const [checking, setChecking] = useState(true)
  const [busy,     setBusy]     = useState(false)
  const [error,    setError]    = useState('')

  const inCart = hasItem(item.id)

  useEffect(() => {
    if (!user) { setChecking(false); return }
    userOwnsItem(user.uid, item.id)
      .then(r => setOwned(r))
      .finally(() => setChecking(false))
  }, [user, item.id])

  // ── Add to cart ──────────────────────────────────────────────────────────
  function handleAddToCart() {
    if (!user) {
      router.push(`/auth?next=/games/${item.id}`)
      return
    }
    if (!item.price || !('paddlePriceId' in item) || !item.paddlePriceId) return
    addItem({
      id:            item.id,
      type:          itemType,
      title:         item.title,
      price:         item.price,
      paddlePriceId: item.paddlePriceId,
      icon:          ('icon' in item && item.icon) ? item.icon : '🎮',
      artGradient,
    })
  }

  // ── Buy now (direct Paddle checkout, skips cart) ─────────────────────────
  async function handleBuyNow() {
    if (!user) {
      router.push(`/auth?next=/games/${item.id}`)
      return
    }
    if (!item.price || !('paddlePriceId' in item) || !item.paddlePriceId) return

    setError('')
    setBusy(true)
    try {
      const res  = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          items:     [{ id: item.id, type: itemType, paddlePriceId: item.paddlePriceId, title: item.title }],
          uid:       user.uid,
          userEmail: user.email,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) { setError(data.error || 'Checkout failed.'); return }
      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  // ── States ────────────────────────────────────────────────────────────────
  if (checking) {
    return <div className="h-9 w-28 border border-sl-border animate-pulse bg-sl-surface" />
  }

  // Owned — show download
  if (owned) {
    const dl = 'downloadUrl' in item ? item.downloadUrl : null
    return dl ? (
      <a href={dl} className="inline-flex items-center gap-2 bg-sl-cyan text-sl-darker px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase no-underline clip-btn-sm hover:bg-[#26a0ae] transition-colors">
        <DownloadIcon /> Download
      </a>
    ) : (
      <div className="inline-flex items-center gap-2 border border-sl-green text-sl-green px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase">
        <CheckIcon /> In Library
      </div>
    )
  }

  // Not for sale yet
  if (!item.price || !('paddlePriceId' in item) || !item.paddlePriceId) {
    return (
      <div className="inline-flex items-center px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase border border-sl-border text-sl-muted cursor-default">
        Not Yet Available
      </div>
    )
  }

  // DLC locked
  if (itemType === 'dlc' && !parentOwned) {
    return (
      <div className="inline-flex items-center px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase border border-sl-border text-sl-muted cursor-not-allowed">
        Requires Base Game
      </div>
    )
  }

  // Available — show add to cart (+ buy now on detail pages)
  return (
    <div className="flex flex-col gap-1.5">
      <div className={`flex ${showBothActions ? 'flex-col sm:flex-row' : 'flex-row'} gap-1.5`}>
        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={inCart || busy}
          className={`
            inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.1em] uppercase
            border transition-colors duration-200 px-4 py-2 clip-btn-sm
            ${inCart
              ? 'border-sl-cyan text-sl-cyan cursor-default'
              : 'border-sl-border text-sl-mid hover:border-sl-white hover:text-sl-white'}
          `}
        >
          <CartIcon />
          {inCart ? 'In Cart' : 'Add to Cart'}
        </button>

        {/* Buy now — only shown on detail pages */}
        {showBothActions && (
          <button
            onClick={handleBuyNow}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-sl-orange text-sl-white px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase clip-btn-sm hover:bg-[#c93a28] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {busy ? 'Redirecting...' : `Buy Now · $${item.price.toFixed(2)}`}
          </button>
        )}
      </div>
      {error && <p className="font-mono text-[9px] text-sl-orange">{error}</p>}
    </div>
  )
}

const DownloadIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CartIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 2h1.5L5 9h6l1.5-5H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="11.5" r="0.8" fill="currentColor" />
    <circle cx="10" cy="11.5" r="0.8" fill="currentColor" />
  </svg>
)