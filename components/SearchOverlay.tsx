'use client'

import { useState, useEffect, useRef } from 'react'
import Link                             from 'next/link'
import Image                            from 'next/image'
import { searchGames, getGenres }       from '@/lib/games'
import { STATUS_LABELS, PLATFORM_LABELS, isIconFile } from '@/lib/games'
import type { Game }                    from '@/lib/games'

interface SearchOverlayProps {
  isOpen:  boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState<Game[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Derive genres dynamically from catalog
  const genres = getGenres()

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

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
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--color-bg-rgb), 0.97)' }} onClick={onClose} />

      <div className="relative z-10 w-full max-w-[720px] mx-auto px-5 sm:px-8 pt-24 sm:pt-32">
        {/* Search input */}
        <div className="relative flex items-center border border-sl-border focus-within:border-sl-orange transition-colors duration-200" style={{ backgroundColor: 'var(--color-surface)' }}>
          <svg className="absolute left-4 flex-shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: 'var(--color-text-muted)' }}>
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleQuery(e.target.value)}
            placeholder="Search games, genres, tags..."
            className="w-full pl-10 pr-12 py-4 bg-transparent font-mono text-[13px] outline-none"
            style={{ color: 'var(--color-text)' }}
          />
          <button
            onClick={onClose}
            className="absolute right-4 font-mono text-[9px] tracking-[0.1em] uppercase transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="mt-2 max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && (
            <div className="border border-sl-border px-6 py-8 text-center" style={{ backgroundColor: 'var(--color-surface)' }}>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                No games found for &ldquo;{query}&rdquo;
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="border border-sl-border divide-y divide-sl-border" style={{ backgroundColor: 'var(--color-surface)' }}>
              {results.map(game => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-4 no-underline transition-colors group"
                  style={{ backgroundColor: 'var(--color-surface)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface2)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface)'}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative w-12 h-12 flex-shrink-0 border border-sl-border overflow-hidden"
                    style={{ background: game.artGradient }}
                    aria-hidden="true"
                  >
                    {isIconFile(game.icon) ? (
                      <Image
                        src={`/${game.icon}`}
                        alt={game.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">{game.icon}</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-syne font-bold text-[14px] group-hover:text-sl-orange transition-colors truncate" style={{ color: 'var(--color-text)' }}>
                      {game.title}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                        {game.genre}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-orange">
                        {STATUS_LABELS[game.status]}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                        {game.platforms.map(p => PLATFORM_LABELS[p]).join(' · ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    {game.price ? (
                      <span className="font-syne font-bold text-[15px]" style={{ color: 'var(--color-text)' }}>
                        ${game.price.toFixed(2)}
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                        TBD
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Quick links when no query — derived from live catalog */}
          {!query.trim() && genres.length > 0 && (
            <div className="border border-sl-border px-5 py-4" style={{ backgroundColor: 'var(--color-surface)' }}>
              <p className="font-mono text-[9px] tracking-[0.12em] uppercase mb-3" style={{ color: 'var(--color-text-muted)' }}>
                Browse by genre
              </p>
              <div className="flex flex-wrap gap-1.5">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => handleQuery(genre)}
                    className="font-mono text-[9px] tracking-[0.1em] uppercase border border-sl-border px-3 py-1.5 hover:border-sl-orange hover:text-sl-orange transition-colors"
                    style={{ color: 'var(--color-text-muted)' }}
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
