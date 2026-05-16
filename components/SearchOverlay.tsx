'use client'

import { useState, useEffect, useRef } from 'react'
import Link                             from 'next/link'
import { searchGames }                  from '@/lib/games'
import { STATUS_LABELS, PLATFORM_LABELS } from '@/lib/games'
import type { Game }                    from '@/lib/games'

import { addToWishlist, removeFromWishlist, isWishlisted } from '@/lib/wishlist'

interface SearchOverlayProps {
  isOpen:  boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState<Game[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function handleQuery(q: string) {
    setQuery(q)
    setResults(q.trim().length > 0 ? searchGames(q) : [])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col" role="dialog" aria-label="Search games">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(8,8,8,0.97)]" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[720px] mx-auto px-5 sm:px-8 pt-24 sm:pt-32">
        {/* Search input */}
        <div className="relative flex items-center border border-sl-border bg-sl-surface focus-within:border-sl-orange transition-colors duration-200">
          <svg className="absolute left-4 text-sl-muted flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleQuery(e.target.value)}
            placeholder="Search games, genres, tags..."
            className="w-full pl-10 pr-12 py-4 bg-transparent font-mono text-[13px] text-sl-white placeholder:text-sl-muted outline-none"
          />
          <button
            onClick={onClose}
            className="absolute right-4 font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white transition-colors"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="mt-2 max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="border border-sl-border bg-sl-surface px-6 py-8 text-center">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-sl-muted">
                No games found for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="border border-sl-border bg-sl-surface divide-y divide-sl-border">
              {results.map(game => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-4 no-underline hover:bg-sl-surface2 transition-colors group"
                >
                  {/* Thumbnail */}
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl border border-sl-border"
                    style={{ background: game.artGradient }}
                    aria-hidden="true"
                  >
                    {game.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-syne font-bold text-[14px] text-sl-white group-hover:text-sl-orange transition-colors truncate">
                      {game.title}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">
                        {game.genre}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-orange">
                        {STATUS_LABELS[game.status]}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">
                        {game.platforms.map(p => PLATFORM_LABELS[p]).join(' · ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    {game.price ? (
                      <span className="font-syne font-bold text-[15px] text-sl-white">
                        ${game.price.toFixed(2)}
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">
                        TBD
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Quick links when no query */}
          {!query.trim() && (
            <div className="border border-sl-border bg-sl-surface px-5 py-4">
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted mb-3">
                Browse by genre
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Arcade Racing', 'Puzzle / Strategy', 'Action Roguelike'].map(genre => (
                  <button
                    key={genre}
                    onClick={() => handleQuery(genre)}
                    className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted border border-sl-border px-3 py-1.5 hover:border-sl-orange hover:text-sl-orange transition-colors"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}