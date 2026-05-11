'use client'

import { useState, useEffect } from 'react'
import { useRouter }   from 'next/navigation'
import { useAuth }     from '@/contexts/AuthContext'
import { userOwnsItem } from '@/lib/purchases'

interface BuyButtonProps {
  itemId:       string
  itemType:     'game' | 'dlc'
  price:        number | null
  title:        string
  downloadUrl?: string | null
  /** For DLC — the parent game must be owned first */
  requiresGameId?: string
  parentOwned?:    boolean
  featured?:       boolean
}

export default function BuyButton({
  itemId,
  itemType,
  price,
  title,
  downloadUrl,
  requiresGameId,
  parentOwned = true,
  featured = false,
}: BuyButtonProps) {
  const { user } = useAuth()
  const router   = useRouter()

  const [owned,    setOwned]    = useState(false)
  const [checking, setChecking] = useState(true)
  const [busy,     setBusy]     = useState(false)
  const [error,    setError]    = useState('')

  useEffect(() => {
    if (!user) { setChecking(false); return }
    userOwnsItem(user.uid, itemId)
      .then(result => setOwned(result))
      .finally(() => setChecking(false))
  }, [user, itemId])

  async function handleBuy() {
    if (!user) {
      router.push(`/auth?next=/games/${itemId}`)
      return
    }

    if (!parentOwned) {
      setError(`You must own the base game before purchasing this DLC.`)
      return
    }

    if (!price) {
      setError('This item is not yet available for purchase.')
      return
    }

    setError('')
    setBusy(true)

    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          itemId,
          itemType,
          uid:       user.uid,
          userEmail: user.email,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        setError(data.error || 'Failed to start checkout.')
        return
      }

      window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const btnBase = `inline-flex items-center gap-2 font-mono tracking-[0.1em] uppercase
                   transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed`
  const btnSizes = featured
    ? 'px-7 py-3.5 text-[10px]'
    : 'px-3.5 py-2 text-[9px]'
  const clipClass = featured ? 'clip-btn' : 'clip-btn-sm'

  if (checking) {
    return (
      <div className={`${btnBase} ${btnSizes} border border-sl-border text-sl-muted`}>
        Checking...
      </div>
    )
  }

  // Already owned — show download button
  if (owned) {
    if (downloadUrl) {
      return (
        <a
          href={downloadUrl}
          className={`${btnBase} ${btnSizes} ${clipClass} bg-sl-cyan text-sl-darker`}
        >
          <DownloadIcon />
          Download
        </a>
      )
    }
    return (
      <div className={`${btnBase} ${btnSizes} border border-sl-green text-sl-green cursor-default`}>
        <CheckIcon />
        In Library
      </div>
    )
  }

  // Not available for sale yet
  if (!price) {
    return (
      <div className={`${btnBase} ${btnSizes} border border-sl-border text-sl-muted cursor-default`}>
        Price TBD
      </div>
    )
  }

  // DLC requires parent game
  if (requiresGameId && !parentOwned) {
    return (
      <div className="flex flex-col gap-1">
        <div className={`${btnBase} ${btnSizes} border border-sl-border text-sl-muted cursor-not-allowed`}>
          Requires Base Game
        </div>
        {error && <p className="font-mono text-[9px] text-sl-orange">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleBuy}
        disabled={busy}
        className={`${btnBase} ${btnSizes} ${clipClass} bg-sl-orange text-sl-white hover:bg-[#c93a28]`}
      >
        {busy ? 'Redirecting...' : `Buy — $${price.toFixed(2)}`}
      </button>
      {error && <p className="font-mono text-[9px] text-sl-orange">{error}</p>}
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
