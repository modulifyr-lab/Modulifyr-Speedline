'use client'

import { useState }  from 'react'
import { Game, GameStatus } from '@/lib/games'
import GameCard       from './GameCard'

type Filter = 'all' | GameStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',            label: 'All'          },
  { value: 'available',      label: 'Available'    },
  { value: 'in-development', label: 'In Dev'       },
  { value: 'concept',        label: 'Concept'      },
  { value: 'coming-soon',    label: 'Coming Soon'  },
]

interface GamesFilterProps {
  games: Game[]
}

export default function GamesFilter({ games }: GamesFilterProps) {
  const [active, setActive] = useState<Filter>('all')

  const filtered = active === 'all' ? games : games.filter(g => g.status === active)

  const availableFilters = FILTERS.filter(f => {
    if (f.value === 'all') return true
    return games.some(g => g.status === f.value)
  })

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-1.5 flex-wrap mb-8 sm:mb-10">
        {availableFilters.map(f => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`
              font-mono text-[9px] tracking-[0.12em] uppercase px-3 sm:px-4 py-2
              border transition-colors duration-200 cursor-pointer
              ${active === f.value
                ? 'bg-sl-orange text-sl-white border-sl-orange'
                : 'bg-transparent border-sl-border hover:border-sl-mid'}
            `}
            style={{ color: active === f.value ? undefined : 'var(--color-text-muted)' }}
            onMouseEnter={(e) => { if (active !== f.value) e.currentTarget.style.color = 'var(--color-text-secondary)' }}
            onMouseLeave={(e) => { if (active !== f.value) e.currentTarget.style.color = 'var(--color-text-muted)' }}
          >
            {f.label}
            {f.value !== 'all' && (
              <span className="ml-1.5 opacity-60">({games.filter(g => g.status === f.value).length})</span>
            )}
          </button>
        ))}
        <span className="ml-auto font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'title' : 'titles'}
        </span>
      </div>

      {/* Games grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5">
          {filtered.map(game => (
            <GameCard
              key={game.id}
              game={game}
              featured={game.featured && active === 'all'}
            />
          ))}
        </div>
      ) : (
        <div className="border border-sl-border py-20 text-center" style={{ backgroundColor: 'var(--color-surface)' }}>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            No titles in this category yet.
          </p>
        </div>
      )}
    </div>
  )
}