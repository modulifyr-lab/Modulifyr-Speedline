'use client'

import { useEffect, useState } from 'react'
import { useRouter }           from 'next/navigation'
import Link                    from 'next/link'
import Nav                     from '@/components/Nav'
import Footer                  from '@/components/Footer'
import { useAuth }             from '@/contexts/AuthContext'
import { getWishlist }         from '@/lib/wishlist'
import { removeFromWishlist }  from '@/lib/wishlist'
import { getGameById }         from '@/lib/games'
import type { WishlistEntry }  from '@/lib/wishlist'
import { STATUS_LABELS }       from '@/lib/games'

export default function WishlistPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [entries,  setEntries]  = useState<WishlistEntry[]>([])
  const [fetching, setFetching] = useState(true)
  const [removing, setRemoving] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) router.replace('/auth?next=/account/wishlist')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    getWishlist(user.uid)
      .then(data => setEntries(data))
      .finally(() => setFetching(false))
  }, [user])

  async function handleRemove(gameId: string) {
    if (!user) return
    setRemoving(gameId)
    try {
      await removeFromWishlist(user.uid, gameId)
      setEntries(prev => prev.filter(e => e.gameId !== gameId))
    } finally {
      setRemoving(null)
    }
  }

  if (loading || !user) return (
    <div className="min-h-screen bg-sl-darker flex items-center justify-center">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">Loading...</span>
    </div>
  )

  return (
    <>
      <Nav />
      <section className="relative z-10 pt-32 pb-12 border-b border-sl-border">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sl-muted font-mono text-[9px] tracking-[0.12em] uppercase">
            <Link href="/library" className="no-underline hover:text-sl-white transition-colors">Library</Link>
            <span className="text-sl-border">/</span>
            <span className="text-sl-orange">My Wishlist</span>
          </div>
          <h1 className="font-syne font-extrabold text-[32px] sm:text-[40px] text-sl-white leading-tight">
            My Wishlist
          </h1>
          <p className="text-sl-muted text-[14px] mt-1">
            {fetching ? '—' : `${entries.length} ${entries.length === 1 ? 'game' : 'games'}`}
          </p>
        </div>
      </section>

      <section className="relative z-10 py-[56px]">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          {fetching ? (
            <div className="py-20 text-center">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">Loading wishlist...</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="border border-sl-border bg-sl-surface py-16 text-center">
              <p className="font-syne font-bold text-[16px] text-sl-white mb-2">Your wishlist is empty.</p>
              <p className="text-sl-muted text-[13px] mb-6 max-w-[280px] mx-auto leading-relaxed">
                Browse the catalog and wishlist games you want to keep an eye on.
              </p>
              <Link href="/games" className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-orange hover:underline">
                Browse Games →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {entries.map(entry => {
                const game = getGameById(entry.gameId)
                if (!game) return null
                const addedDate = entry.addedAt.toDate().toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })

                return (
                  <div
                    key={entry.gameId}
                    className="flex items-center gap-5 bg-sl-surface border border-sl-border px-6 py-5 transition-colors hover:border-[rgba(232,69,48,0.3)]"
                  >
                    {/* Art thumbnail */}
                    <div
                      className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-2xl border border-sl-border"
                      style={{ background: game.artGradient }}
                      aria-hidden="true"
                    >
                      {/* Use img tag here since icon is a filename */}
                      {game.icon.endsWith('.png') || game.icon.endsWith('.jpg') || game.icon.endsWith('.webp') ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/${game.icon}`} alt={game.title} className="w-full h-full object-cover" />
                      ) : (
                        game.icon
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-syne font-bold text-[15px] text-sl-white truncate mb-0.5">{game.title}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-orange">
                          {STATUS_LABELS[game.status]}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.08em] uppercase text-sl-muted">
                          Added {addedDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href={`/games/${game.id}`}
                        className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-mid border border-sl-border px-3 py-2 no-underline hover:text-sl-white hover:border-sl-mid transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleRemove(entry.gameId)}
                        disabled={removing === entry.gameId}
                        className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted border border-sl-border px-3 py-2 hover:text-sl-orange hover:border-[rgba(232,69,48,0.4)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {removing === entry.gameId ? '...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
