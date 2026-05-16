'use client'

import { useState, useEffect } from 'react'
import { useRouter }           from 'next/navigation'
import { useAuth }             from '@/contexts/AuthContext'
import { addToWishlist, removeFromWishlist, isWishlisted } from '@/lib/wishlist'

interface WishlistButtonProps {
  gameId: string
  size?:  'sm' | 'md'
}

export default function WishlistButton({ gameId, size = 'md' }: WishlistButtonProps) {
  const { user }  = useAuth()
  const router    = useRouter()

  const [wishlisted, setWishlisted] = useState(false)
  const [loading,    setLoading]    = useState(true)
  const [busy,       setBusy]       = useState(false)

  useEffect(() => {
    if (!user) { setLoading(false); return }
    isWishlisted(user.uid, gameId)
      .then(result => setWishlisted(result))
      .finally(() => setLoading(false))
  }, [user, gameId])

  async function toggle() {
    if (!user) {
      router.push(`/auth?next=/games/${gameId}`)
      return
    }

    setBusy(true)
    try {
      if (wishlisted) {
        await removeFromWishlist(user.uid, gameId)
        setWishlisted(false)
      } else {
        await addToWishlist(user.uid, gameId)
        setWishlisted(true)
      }
    } finally {
      setBusy(false)
    }
  }

  const isSm = size === 'sm'

  return (
    <button
      onClick={toggle}
      disabled={loading || busy}
      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`
        inline-flex items-center gap-1.5 border transition-colors duration-200
        font-mono tracking-[0.1em] uppercase
        disabled:opacity-40 disabled:cursor-not-allowed
        ${isSm ? 'text-[8px] px-2.5 py-1.5' : 'text-[9px] px-3 py-2'}
        ${wishlisted
          ? 'border-sl-amber text-sl-amber hover:border-sl-orange hover:text-sl-orange'
          : 'border-sl-border text-sl-muted hover:border-sl-amber hover:text-sl-amber'}
      `}
    >
      <HeartIcon filled={wishlisted} size={isSm ? 9 : 11} />
      {wishlisted ? 'Wishlisted' : 'Wishlist'}
    </button>
  )
}

function HeartIcon({ filled, size = 11 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 12S1 8.5 1 4.5A3.5 3.5 0 0 1 7 3a3.5 3.5 0 0 1 6 1.5C13 8.5 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill={filled ? 'currentColor' : 'none'}
        strokeLinejoin="round"
      />
    </svg>
  )
}