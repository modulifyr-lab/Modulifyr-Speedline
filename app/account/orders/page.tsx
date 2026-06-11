'use client'

import { useEffect, useState } from 'react'
import { useRouter }           from 'next/navigation'
import Link                    from 'next/link'
import Image                   from 'next/image'
import Nav                     from '@/components/Nav'
import Footer                  from '@/components/Footer'
import { useAuth }             from '@/contexts/AuthContext'
import { getUserLibrary }      from '@/lib/purchases'
import { getGameById, isIconFile } from '@/lib/games'
import type { LibraryEntry }   from '@/lib/purchases'

export default function OrderHistoryPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const [orders,   setOrders]   = useState<LibraryEntry[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.replace('/auth?next=/account/orders')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    getUserLibrary(user.uid)
      .then(entries => {
        const sorted = [...entries].sort((a, b) => b.purchasedAt.seconds - a.purchasedAt.seconds)
        setOrders(sorted)
      })
      .finally(() => setFetching(false))
  }, [user])

  if (loading || !user) return (
    <div className="min-h-screen bg-sl-darker flex items-center justify-center">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">Loading...</span>
    </div>
  )

  const grouped = groupBySession(orders)

  return (
    <>
      <Nav />
      <section className="relative z-10 pt-32 pb-12 border-b border-sl-border">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex flex-wrap items-center gap-2 mb-4 text-sl-muted font-mono text-[9px] tracking-[0.12em] uppercase">
            <Link href="/library" className="no-underline hover:text-sl-white transition-colors">Library</Link>
            <span className="text-sl-border">/</span>
            <span className="text-sl-orange">Order History</span>
          </div>
          <h1 className="font-syne font-extrabold text-[32px] sm:text-[40px] text-sl-white leading-tight">
            Order History
          </h1>
          <p className="text-sl-muted text-[14px] mt-1">{grouped.length} {grouped.length === 1 ? 'order' : 'orders'}</p>
        </div>
      </section>

      <section className="relative z-10 py-[56px]">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          {fetching ? (
            <div className="py-20 text-center">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">Loading orders...</span>
            </div>
          ) : grouped.length === 0 ? (
            <div className="border border-sl-border bg-sl-surface py-16 text-center">
              <p className="font-syne font-bold text-[16px] text-sl-white mb-2">No purchases yet.</p>
              <Link href="/games" className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-orange hover:underline">Browse the shop →</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {grouped.map((order, i) => {
                const date = order.items[0].purchasedAt.toDate().toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })
                const orderTotal = order.items.reduce((sum, item) => {
                  const game = getGameById(item.type === 'dlc' ? (item.parentGameId ?? '') : item.gameId)
                  return sum + (game?.price ?? 0)
                }, 0)

                return (
                  <div key={i} className="bg-sl-surface border border-sl-border">
                    {/* Order header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-sl-border">
                      <div>
                        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted">Order date</p>
                        <p className="font-syne font-bold text-[14px] text-sl-white mt-0.5">{date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted">Total paid</p>
                        <p className="font-syne font-bold text-[18px] text-sl-white mt-0.5">
                          {orderTotal > 0 ? `$${orderTotal.toFixed(2)}` : '—'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted">Transaction ID</p>
                        <p className="font-mono text-[9px] text-sl-border mt-0.5 truncate max-w-[180px]">
                          {order.sessionId}
                        </p>
                      </div>
                    </div>

                    {/* Order items */}
                    {order.items.map(entry => {
                      const game = getGameById(entry.type === 'dlc' ? (entry.parentGameId ?? '') : entry.gameId)
                      return (
                        <div key={entry.gameId} className="flex items-center gap-4 px-6 py-4 border-b border-sl-border last:border-b-0">
                          {/* Art thumbnail */}
                          <div
                            className="relative w-10 h-10 flex-shrink-0 border border-sl-border overflow-hidden"
                            style={{ background: game?.artGradient ?? '#141414' }}
                            aria-hidden="true"
                          >
                            {game && isIconFile(game.icon) ? (
                              <Image
                                src={`/${game.icon}`}
                                alt={game.title}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg">
                                {game?.icon ?? '🎮'}
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-syne font-bold text-[13px] text-sl-white truncate">{entry.title}</p>
                            <p className="font-mono text-[9px] tracking-[0.08em] uppercase text-sl-muted">
                              {entry.type === 'dlc' ? 'DLC' : 'Game'} · Permanent license
                            </p>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {entry.downloadUrl && (
                              <a
                                href={entry.downloadUrl}
                                className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-cyan border border-[rgba(47,184,200,0.3)] px-3 py-1.5 no-underline hover:border-sl-cyan transition-colors"
                              >
                                Download
                              </a>
                            )}
                            {game && (
                              <Link
                                href={`/games/${game.id}`}
                                className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted border border-sl-border px-3 py-1.5 no-underline hover:text-sl-white hover:border-sl-mid transition-colors"
                              >
                                Details
                              </Link>
                            )}
                          </div>
                        </div>
                      )
                    })}
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

interface OrderGroup {
  sessionId: string
  items:     LibraryEntry[]
}

function groupBySession(entries: LibraryEntry[]): OrderGroup[] {
  const map = new Map<string, LibraryEntry[]>()
  for (const entry of entries) {
    const key = entry.paddleTransactionId ?? entry.gameId
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(entry)
  }
  return Array.from(map.entries()).map(([sessionId, items]) => ({ sessionId, items }))
}
