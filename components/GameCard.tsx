'use client'

import { useState } from 'react'
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

interface GameCardProps {
  game:     Game
  featured?: boolean
}

export default function GameCard({ game, featured = false }: GameCardProps) {
  const [notified, setNotified] = useState(false)

  const canBuy    = game.status === 'available' && game.directUrl
  const canSteam  = game.steamUrl !== null
  const showPrice = game.status === 'available' && game.price !== null

  return (
    <article
      className={`
        group relative flex flex-col overflow-hidden
        bg-sl-surface border border-sl-border
        transition-colors duration-250
        hover:border-[rgba(232,69,48,0.5)]
        ${featured ? 'col-span-2' : ''}
      `}
    >
      {/* Art area */}
      <div
        className={`relative w-full flex-shrink-0 overflow-hidden ${featured ? 'aspect-[16/7]' : 'aspect-video'}`}
        style={{ background: game.artGradient }}
      >
        {/* Placeholder art */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-sl-border"
            style={{ fontSize: featured ? '72px' : '52px' }}
            aria-hidden="true"
          >
            {game.icon}
          </span>
          <span className="absolute bottom-3 right-3.5 font-mono text-[9px] tracking-[0.15em] uppercase text-sl-border select-none">
            Cover Art
          </span>
        </div>

        {/* Status badge */}
        <span
          className={`absolute top-3 left-3 font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 ${STATUS_BADGE[game.status]}`}
        >
          {STATUS_LABELS[game.status]}
        </span>

        {/* Platform badges */}
        <div className="absolute top-3 right-3 flex gap-1">
          {game.platforms.map(p => (
            <span
              key={p}
              className="font-mono text-[9px] tracking-[0.08em] uppercase
                         text-sl-mid border border-sl-border px-2 py-0.5
                         bg-[rgba(8,8,8,0.7)] backdrop-blur-sm"
            >
              {PLATFORM_LABELS[p]}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-1 ${featured ? 'p-7' : 'p-6'}`}>
        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-orange mb-1.5">
          {game.genre} · {game.engine}
        </p>
        <h3
          className={`font-syne font-bold text-sl-white leading-tight mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}
        >
          {game.title}
        </h3>
        <p className="text-[13px] text-sl-muted leading-relaxed flex-1 mb-5">
          {game.description}
        </p>

        {/* Footer: price + actions */}
        <div className="flex items-center justify-between flex-wrap gap-2.5 pt-4 border-t border-sl-border">

          {/* Price */}
          {showPrice ? (
            <span className="font-syne font-bold text-[18px] text-sl-white">
              ${game.price?.toFixed(2)}
            </span>
          ) : (
            <span className="font-mono text-[10px] tracking-[0.1em] text-sl-muted">
              Price TBD
            </span>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Buy direct */}
            {canBuy && (
              <a
                href={game.directUrl!}
                className="inline-flex items-center gap-1.5 bg-sl-orange text-sl-white
                           px-3.5 py-2 font-mono text-[9px] tracking-[0.1em] uppercase
                           no-underline clip-btn-sm transition-colors duration-200
                           hover:bg-[#c93a28]"
              >
                Buy Direct
              </a>
            )}

            {/* Steam */}
            {canSteam ? (
              <a
                href={game.steamUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-sl-surface2 border border-sl-border
                           text-sl-light px-3 py-2 font-mono text-[9px] tracking-[0.1em] uppercase
                           no-underline transition-colors duration-200 hover:border-sl-mid hover:text-sl-white"
              >
                {STEAM_ICON}
                {game.status === 'available' ? 'Buy on Steam' : 'Wishlist'}
              </a>
            ) : null}

            {/* Notify Me */}
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
                    : 'border-sl-border text-sl-muted hover:border-sl-orange hover:text-sl-orange'}
                `}
              >
                {notified ? '✓ On the list' : '🔔 Notify Me'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
