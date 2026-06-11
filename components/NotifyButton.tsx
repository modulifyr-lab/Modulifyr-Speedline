'use client'

import { useState, useEffect } from 'react'
import { useRouter }           from 'next/navigation'
import { useAuth }             from '@/contexts/AuthContext'
import { db }                  from '@/lib/firebase'
import { doc, getDoc }         from 'firebase/firestore'

interface NotifyButtonProps {
  gameId: string
  size?:  'sm' | 'md'
}

type State = 'idle' | 'loading' | 'subscribed' | 'error'

export default function NotifyButton({ gameId, size = 'md' }: NotifyButtonProps) {
  const { user }  = useAuth()
  const router    = useRouter()
  const [state,   setState]   = useState<State>('idle')
  const [checked, setChecked] = useState(false)

  // Check if already subscribed on mount
  useEffect(() => {
    if (!user) { setChecked(true); return }
    const ref = doc(db, 'gameNotifications', gameId, 'subscribers', user.uid)
    getDoc(ref).then(snap => {
      if (snap.exists()) setState('subscribed')
    }).finally(() => setChecked(true))
  }, [user, gameId])

  async function handleClick() {
    if (!user) {
      router.push(`/auth?next=/games/${gameId}`)
      return
    }
    if (state === 'subscribed' || state === 'loading') return

    setState('loading')
    try {
      const res = await fetch('/api/notify', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ gameId, uid: user.uid, email: user.email }),
      })
      if (!res.ok) {
        const data = await res.json()
        console.error('[notify]', data.error)
        setState('error')
        setTimeout(() => setState('idle'), 3000)
        return
      }
      setState('subscribed')
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }

  if (!checked) {
    // Don't flash the button state before we know subscription status
    return <div className={`h-8 w-24 border border-sl-border animate-pulse bg-sl-surface ${size === 'sm' ? 'h-7 w-20' : ''}`} />
  }

  const isSm = size === 'sm'

  return (
    <button
      onClick={handleClick}
      disabled={state === 'loading' || state === 'subscribed'}
      className={`
        inline-flex items-center gap-1.5 border transition-colors duration-200
        font-mono tracking-[0.1em] uppercase
        disabled:cursor-not-allowed
        ${isSm ? 'text-[8px] px-2.5 py-1.5' : 'text-[9px] px-3.5 py-2'}
        ${state === 'subscribed'
          ? 'border-sl-green text-sl-green opacity-80'
          : state === 'error'
          ? 'border-sl-orange text-sl-orange'
          : 'border-sl-border hover:border-sl-orange hover:text-sl-orange'}
      `}
      style={{ color: state === 'subscribed' || state === 'error' ? undefined : 'var(--color-text-muted)' }}
    >
      {state === 'subscribed' ? <CheckIcon size={isSm ? 9 : 10} /> : <BellIcon size={isSm ? 9 : 10} />}
      {state === 'loading'    ? 'Saving...'
       : state === 'subscribed' ? 'Notified'
       : state === 'error'      ? 'Try Again'
       : !user                  ? 'Sign In to Notify'
       :                         'Notify Me'}
    </button>
  )
}

function BellIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1a4 4 0 0 1 4 4v3l1.5 2H1.5L3 8V5a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5.5 11.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CheckIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
