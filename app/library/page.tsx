'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'
import { useAuth }         from '@/contexts/AuthContext'
import { getUserLibrary, LibraryEntry } from '@/lib/purchases'
import { getGameById }     from '@/lib/games'

function LibraryContent() {
  const { user, loading, signOut } = useAuth()
  const router       = useRouter()
  const searchParams = useSearchParams()
  const justPurchased = searchParams.get('success') === '1'
  const newItemId     = searchParams.get('item')

  const [library,    setLibrary]    = useState<LibraryEntry[]>([])
  const [fetching,   setFetching]   = useState(true)

  // Redirect if not signed in
  useEffect(() => {
    if (!loading && !user) router.replace('/auth?next=/library')
  }, [user, loading, router])

  // Fetch library
  useEffect(() => {
    if (!user) return
    getUserLibrary(user.uid)
      .then(entries => setLibrary(entries))
      .finally(() => setFetching(false))
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-sl-darker flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">Loading...</span>
      </div>
    )
  }

  const games = library.filter(e => e.type === 'game')
  const dlcs  = library.filter(e => e.type === 'dlc')

  return (
    <>
      <Nav />

      {/* Header */}
      <section className="relative z-10 pt-32 pb-12 border-b border-sl-border">
        <div className="max-w-[1120px] mx-auto px-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3">
                My Library
              </span>
              <h1 className="font-syne font-extrabold text-[40px] text-sl-white leading-tight">
                Your Games.
              </h1>
              <p className="text-sl-muted text-[13px] mt-1">
                Signed in as <span className="text-sl-light">{user.email}</span>
              </p>
            </div>
            <button
              onClick={signOut}
              className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted
                         border border-sl-border px-4 py-2 hover:border-sl-mid hover:text-sl-white
                         transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>

          {/* Ownership guarantee strip */}
          <div className="mt-8 flex items-center gap-3 border border-[rgba(47,184,200,0.25)] bg-[rgba(47,184,200,0.05)] px-5 py-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <polyline points="2,7 5.5,10.5 12,3.5" stroke="#2FB8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-cyan">
              Every game in your library is yours permanently. No expiry. No subscription. All future patches included.
            </p>
          </div>
        </div>
      </section>

      {/* Success banner */}
      {justPurchased && (
        <div className="relative z-10 bg-[rgba(47,184,200,0.08)] border-b border-[rgba(47,184,200,0.2)] px-12 py-4">
          <div className="max-w-[1120px] mx-auto font-mono text-[10px] tracking-[0.12em] uppercase text-sl-cyan">
            Purchase confirmed. {newItemId ? 'Your new title has been added to your library.' : 'Your library has been updated.'}
          </div>
        </div>
      )}

      {/* Library content */}
      <section className="relative z-10 py-[64px]">
        <div className="max-w-[1120px] mx-auto px-12">

          {fetching ? (
            <div className="py-20 text-center">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">
                Loading your library...
              </span>
            </div>
          ) : library.length === 0 ? (
            <EmptyLibrary />
          ) : (
            <>
              {/* Games */}
              {games.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-syne font-bold text-[20px] text-sl-white mb-1">
                    Games
                  </h2>
                  <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mb-6">
                    {games.length} {games.length === 1 ? 'title' : 'titles'} owned
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {games.map(entry => (
                      <LibraryCard key={entry.gameId} entry={entry} />
                    ))}
                  </div>
                </div>
              )}

              {/* DLCs */}
              {dlcs.length > 0 && (
                <div>
                  <h2 className="font-syne font-bold text-[20px] text-sl-white mb-1">
                    DLC
                  </h2>
                  <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mb-6">
                    {dlcs.length} {dlcs.length === 1 ? 'item' : 'items'} owned
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {dlcs.map(entry => (
                      <LibraryCard key={entry.gameId} entry={entry} isDLC />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default function LibraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-sl-darker flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">Loading...</span>
      </div>
    }>
      <LibraryContent />
    </Suspense>
  )
}

import { isWishlisted } from '@/lib/wishlist'

function LibraryCard({ entry, isDLC = false }: { entry: LibraryEntry; isDLC?: boolean }) {
  const game         = getGameById(isDLC ? (entry.parentGameId ?? '') : entry.gameId)
  const purchaseDate = entry.purchasedAt.toDate().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="flex items-center justify-between gap-6 bg-sl-surface border border-sl-border px-6 py-5
                    transition-colors duration-200 hover:border-[rgba(232,69,48,0.3)]">
      <div className="flex items-center gap-5">
        {/* Art thumbnail */}
        <div
          className="w-16 h-16 flex-shrink-0 flex items-center justify-center text-2xl border border-sl-border"
          style={{ background: game?.artGradient ?? '#141414' }}
          aria-hidden="true"
        >
          {game?.icon ?? '🎮'}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-syne font-bold text-[15px] text-sl-white">{entry.title}</p>
            {isDLC && (
              <span className="font-mono text-[8px] tracking-[0.1em] uppercase border border-sl-border text-sl-muted px-1.5 py-0.5">
                DLC
              </span>
            )}
          </div>
          {isDLC && game && (
            <p className="font-mono text-[9px] tracking-[0.08em] uppercase text-sl-muted mb-0.5">
              For: {game.title}
            </p>
          )}
          <p className="font-mono text-[9px] tracking-[0.08em] uppercase text-sl-muted">
            Purchased {purchaseDate}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {entry.downloadUrl ? (
          <a
            href={entry.downloadUrl}
            className="inline-flex items-center gap-1.5 bg-sl-cyan text-sl-darker
                       px-4 py-2 font-mono text-[9px] tracking-[0.1em] uppercase
                       no-underline clip-btn-sm transition-colors duration-200 hover:bg-[#26a0ae]"
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Download
          </a>
        ) : (
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted border border-sl-border px-4 py-2">
            Download pending
          </span>
        )}

        {!isDLC && game && (
          <Link
            href={`/games/${game.id}`}
            className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted
                       border border-sl-border px-3 py-2 no-underline
                       hover:border-sl-mid hover:text-sl-white transition-colors duration-200"
          >
            Details
          </Link>
        )}
      </div>
    </div>
  )
}

function EmptyLibrary() {
  return (
    <div className="py-20 text-center border border-sl-border bg-sl-surface">
      <p className="font-syne font-bold text-[18px] text-sl-white mb-2">
        Your library is empty.
      </p>
      <p className="text-[13px] text-sl-muted mb-7 max-w-[320px] mx-auto leading-relaxed">
        Purchase a game and it will appear here permanently. No subscription required.
      </p>
      <Link
        href="/games"
        className="inline-flex items-center gap-2 bg-sl-orange text-sl-white
                   px-6 py-3 font-mono text-[10px] tracking-[0.12em] uppercase
                   no-underline clip-btn transition-colors duration-200 hover:bg-[#c93a28]"
      >
        Browse Games →
      </Link>
    </div>
  )
}