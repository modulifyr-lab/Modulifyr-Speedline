'use client'

import { useState }  from 'react'
import Link          from 'next/link'
import { Game, GameStatus, PLATFORM_LABELS, STATUS_LABELS } from '@/lib/games'

const STATUS_BADGE: Record<GameStatus, string> = {
  'available':      'badge-avail',
  'in-development': 'badge-dev',
  'concept':        'badge-concept',
  'coming-soon':    'badge-soon',
}

const STEAM_ICON = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.03 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.607 0 11.979 0z" />
  </svg>
)

const BellIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1a4 4 0 0 1 4 4v3l1.5 2H1.5L3 8V5a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M5.5 11.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <polyline points="2,7 5.5,10.5 12,3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

interface GameCardProps {
  game:      Game
  featured?: boolean
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const [notified, setNotified] = useState(false)

  const canBuy   = game.status === 'available' && game.directUrl
  const canSteam = game.steamUrl !== null
  const showPrice = game.status === 'available' && game.price !== null

  return (
    <article
      className={`
        group relative flex flex-col overflow-hidden
        border border-sl-border
        transition-colors duration-250
        hover:border-[rgba(232,69,48,0.5)]
        ${featured ? 'col-span-1 sm:col-span-2' : ''}
      `}
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Art area — clicking this navigates to the detail page */}
      <Link
        href={`/games/${game.id}`}
        className="block no-underline"
        aria-label={`View details for ${game.title}`}
      >
        <div
          className={`relative w-full flex-shrink-0 overflow-hidden ${featured ? 'aspect-[16/7]' : 'aspect-video'}`}
          style={{ background: game.artGradient }}
        >
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/${game.icon}`}
              alt={`${game.title} cover art`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Status badge */}
          <span className={`absolute top-3 left-3 font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 ${STATUS_BADGE[game.status]}`}>
            {STATUS_LABELS[game.status]}
          </span>

          {/* Platform badges */}
          <div className="absolute top-3 right-3 flex gap-1 flex-wrap justify-end">
            {game.platforms.map(p => (
              <span
                key={p}
                className="font-mono text-[9px] tracking-[0.08em] uppercase
                           border border-sl-border px-2 py-0.5
                           backdrop-blur-sm"
                style={{ color: 'var(--color-text-secondary)', backgroundColor: 'rgba(var(--color-bg-rgb), 0.7)' }}
              >
                {PLATFORM_LABELS[p]}
              </span>
            ))}
          </div>

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-[rgba(232,69,48,0.04)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </Link>

      {/* Body */}
      <div className={`flex flex-col flex-1 ${featured ? 'p-5 sm:p-7' : 'p-4 sm:p-6'}`}>
        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-orange mb-1.5">
          {game.genre} · {game.engine}
        </p>

        {/* Title links to detail page */}
        <Link href={`/games/${game.id}`} className="no-underline group/title">
          <h3 className={`font-syne font-bold leading-tight mb-2 group-hover/title:text-sl-orange transition-colors duration-200 ${featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`} style={{ color: 'var(--color-text)' }}>
            {game.title}
          </h3>
        </Link>

        <p className="text-[13px] leading-relaxed flex-1 mb-5" style={{ color: 'var(--color-text-muted)' }}>
          {game.description}
        </p>

        {/* Footer: price + actions */}
        <div className="flex items-center justify-between flex-wrap gap-2.5 pt-4 border-t border-sl-border">
          {showPrice ? (
            <span className="font-syne font-bold text-[18px]" style={{ color: 'var(--color-text)' }}>
              ${game.price?.toFixed(2)}
            </span>
          ) : (
            <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: 'var(--color-text-muted)' }}>
              Price TBD
            </span>
          )}

          <div className="flex items-center gap-1.5 flex-wrap">
            {canBuy && (
              <a
                href={game.directUrl!}
                className="inline-flex items-center gap-1.5 bg-sl-orange text-sl-white
                           px-3.5 py-2 font-mono text-[9px] tracking-[0.1em] uppercase
                           no-underline clip-btn-sm transition-colors duration-200 hover:bg-[#c93a28]"
              >
                Buy Direct
              </a>
            )}

            {canSteam && (
              <a
                href={game.steamUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-sl-border
                           px-3 py-2 font-mono text-[9px] tracking-[0.1em] uppercase
                           no-underline transition-colors duration-200 hover:border-sl-mid"
                style={{ backgroundColor: 'var(--color-surface2)', color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                {STEAM_ICON}
                {game.status === 'available' ? 'Buy on Steam' : 'Wishlist'}
              </a>
            )}

            {!canBuy && (
              <button
                onClick={() => setNotified(true)}
                disabled={notified}
                className={`
                  inline-flex items-center gap-1.5 px-3.5 py-2
                  font-mono text-[9px] tracking-[0.1em] uppercase
                  border transition-colors duration-200 cursor-pointer
                  ${notified
                    ? 'border-sl-green text-sl-green cursor-default'
                    : 'border-sl-border hover:border-sl-orange hover:text-sl-orange'}
                `}
                style={{ color: notified ? undefined : 'var(--color-text-muted)' }}
              >
                {notified ? <CheckIcon /> : <BellIcon />}
                {notified ? 'On the List' : 'Notify Me'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
