import type { Metadata }    from 'next'
import { notFound }          from 'next/navigation'
import Nav                   from '@/components/Nav'
import Footer                from '@/components/Footer'
import BuyButton             from '@/components/BuyButton'
import WishlistButton        from '@/components/WishlistButton'
import { getGameById, PLATFORM_LABELS, STATUS_LABELS } from '@/lib/games'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGameById(params.id)
  if (!game) return { title: 'Game Not Found — Modulifyr Speedline' }
  return {
    title:       `${game.title} — Modulifyr Speedline`,
    description: game.description,
  }
}

export default function GameDetailPage({ params }: Props) {
  const game = getGameById(params.id)
  if (!game) notFound()

  const isAvailable  = game.status === 'available' && game.price !== null
  const hasDLC       = (game.dlcs?.length ?? 0) > 0
  const hasScreens   = (game.screenshots?.length ?? 0) > 0
  const hasSysReqs   = !!game.systemRequirements

  return (
    <>
      <Nav />

      {/* Art hero */}
      <div
        className="relative w-full overflow-hidden border-b border-sl-border"
        style={{ background: game.artGradient, minHeight: '280px', marginTop: '64px' }}
      >
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/${game.icon}`}
            alt={`${game.title} cover art`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Status + platforms */}
        <div className="absolute top-4 left-5 sm:left-6 flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 bg-[rgba(8,8,8,0.75)] border border-sl-border text-sl-orange">
            {STATUS_LABELS[game.status]}
          </span>
          {game.platforms.map(p => (
            <span key={p} className="font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-1 bg-[rgba(8,8,8,0.75)] border border-sl-border text-sl-mid">
              {PLATFORM_LABELS[p]}
            </span>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <section className="relative z-10 py-[56px] sm:py-[72px]">
        <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-10 md:gap-14 items-start">

            {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
            <div>
              {/* Genre + engine */}
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-orange mb-2">
                {game.genre} · {game.engine}
              </p>

              {/* Title + wishlist */}
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <h1 className="font-syne font-extrabold text-[32px] sm:text-[42px] text-sl-white leading-tight">
                  {game.title}
                </h1>
                <WishlistButton gameId={game.id} size="md" />
              </div>

              {/* Buy once badge */}
              <div className="inline-flex items-center gap-2 border border-[rgba(47,184,200,0.3)] bg-[rgba(47,184,200,0.06)] px-3 py-1.5 mb-6">
                <CheckCyan />
                <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-cyan">
                  Buy once. Own forever. All patches included. No subscription.
                </span>
              </div>

              <div className="w-9 h-0.5 bg-sl-orange mb-6" />

              {/* Description */}
              <p className="text-sl-light text-[15px] leading-[1.8] mb-4">
                {game.longDescription ?? game.description}
              </p>

              {/* Tags */}
              {game.tags && game.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-5 mb-8">
                  {game.tags.map(t => (
                    <span key={t} className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted border border-sl-border px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Trailer */}
              {game.trailerUrl && (
                <div className="mb-10">
                  <SectionLabel>Trailer</SectionLabel>
                  <div className="relative aspect-video border border-sl-border overflow-hidden">
                    <iframe
                      src={game.trailerUrl}
                      title={`${game.title} trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Screenshots */}
              {hasScreens && (
                <div className="mb-10">
                  <SectionLabel>Screenshots</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                    {game.screenshots!.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={src}
                        alt={`${game.title} screenshot ${i + 1}`}
                        className="w-full aspect-video object-cover border border-sl-border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* System requirements */}
              {hasSysReqs && (
                <div className="mb-10">
                  <SectionLabel>System Requirements</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                    <SysReqColumn label="Minimum" spec={game.systemRequirements!.minimum} />
                    <SysReqColumn label="Recommended" spec={game.systemRequirements!.recommended} />
                  </div>
                </div>
              )}

              {/* DLC */}
              {hasDLC && (
                <div className="mb-10">
                  <SectionLabel>Downloadable Content</SectionLabel>
                  <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mb-4">
                    Requires base game
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {game.dlcs!.map(dlc => (
                      <div key={dlc.id} className="flex flex-wrap items-center justify-between gap-4 bg-sl-surface border border-sl-border px-5 sm:px-6 py-4">
                        <div>
                          <p className="font-syne font-bold text-[14px] text-sl-white mb-0.5">{dlc.title}</p>
                          <p className="text-[12px] text-sl-muted leading-relaxed">{dlc.description}</p>
                          <p className="font-syne font-bold text-[16px] text-sl-white mt-1.5">
                            ${dlc.price.toFixed(2)}
                          </p>
                        </div>
                        <BuyButton
                          item={dlc}
                          itemType="dlc"
                          artGradient={game.artGradient}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN — purchase panel ───────────────────────── */}
            <div>
              <div className="md:sticky md:top-24 bg-sl-surface border border-sl-border p-5 sm:p-6">
                {/* Price */}
                <div className="mb-5 pb-5 border-b border-sl-border">
                  {isAvailable ? (
                    <>
                      <div className="font-syne font-extrabold text-[32px] text-sl-white leading-none">
                        ${game.price!.toFixed(2)}
                      </div>
                      <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mt-1">
                        One-time purchase
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="font-syne font-bold text-[18px] text-sl-mid">
                        {game.status === 'in-development' ? 'Price not set yet' : 'Not available yet'}
                      </div>
                      <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mt-1">
                        {game.status === 'in-development' ? 'In active development' : STATUS_LABELS[game.status]}
                      </p>
                    </>
                  )}
                </div>

                {/* Buy button — Add to Cart + Buy Now */}
                <div className="mb-5">
                  <BuyButton
                    item={game}
                    itemType="game"
                    artGradient={game.artGradient}
                    showBothActions
                  />
                </div>

                {/* Wishlist */}
                <div className="mb-5">
                  <WishlistButton gameId={game.id} size="md" />
                </div>

                {/* What's included */}
                <div className="flex flex-col gap-2 pt-4 border-t border-sl-border">
                  {[
                    'Permanent access — no expiry',
                    'All future patches included',
                    'No DRM on direct purchase',
                    'Download immediately after purchase',
                    'Playable after studio closure',
                  ].map(line => (
                    <div key={line} className="flex items-start gap-2">
                      <CheckCyan />
                      <span className="font-mono text-[9px] text-sl-muted leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>

                {/* Steam link */}
                {game.steamUrl && (
                  <a href={game.steamUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-5 w-full flex items-center justify-center gap-2 border border-sl-border text-sl-mid px-4 py-2.5 font-mono text-[9px] tracking-[0.1em] uppercase no-underline transition-colors hover:border-sl-mid hover:text-sl-white">
                    Also on Steam
                  </a>
                )}

                {/* Support link */}
                <div className="mt-4 pt-4 border-t border-sl-border flex justify-between">
                  <a href="/support" className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white transition-colors no-underline">
                    Support
                  </a>
                  <a href="/legal/refund" className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white transition-colors no-underline">
                    Refund Policy
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="font-syne font-bold text-[18px] text-sl-white">{children}</h2>
      <div className="w-7 h-0.5 bg-sl-orange mt-1" />
    </div>
  )
}

function SysReqColumn({ label, spec }: { label: string; spec: { os: string; cpu: string; ram: string; gpu: string; storage: string } }) {
  const rows = [
    { key: 'OS',      val: spec.os      },
    { key: 'CPU',     val: spec.cpu     },
    { key: 'RAM',     val: spec.ram     },
    { key: 'GPU',     val: spec.gpu     },
    { key: 'Storage', val: spec.storage },
  ]
  return (
    <div className="border border-sl-border bg-sl-darker">
      <div className="px-5 py-3 border-b border-sl-border">
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-orange">{label}</span>
      </div>
      <div className="divide-y divide-sl-border">
        {rows.map(r => (
          <div key={r.key} className="flex gap-3 px-5 py-3">
            <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted w-14 flex-shrink-0 pt-0.5">
              {r.key}
            </span>
            <span className="text-[12px] text-sl-light leading-relaxed">{r.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CheckCyan() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
      <polyline points="2,7 5.5,10.5 12,3.5" stroke="#2FB8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}