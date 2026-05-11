import type { Metadata }    from 'next'
import { notFound }          from 'next/navigation'
import Nav                   from '@/components/Nav'
import Footer                from '@/components/Footer'
import BuyButton             from '@/components/BuyButton'
import { getGameById, PLATFORM_LABELS, STATUS_LABELS } from '@/lib/games'

interface Props {
  params: { id: string }
}

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

  const isForSale = game.status === 'available' && game.price !== null

  return (
    <>
      <Nav />

      {/* Hero band */}
      <section className="relative z-10 pt-32 pb-0 border-b border-sl-border">
        <div
          className="w-full relative overflow-hidden"
          style={{ background: game.artGradient, minHeight: '260px' }}
        >
          {/* Placeholder art */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[100px] select-none" aria-hidden="true">{game.icon}</span>
            <span className="absolute bottom-4 right-6 font-mono text-[9px] tracking-[0.15em] uppercase text-sl-border">
              Cover Art Placeholder
            </span>
          </div>

          {/* Status + platforms row */}
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-1 bg-[rgba(8,8,8,0.7)] border border-sl-border text-sl-orange">
              {STATUS_LABELS[game.status]}
            </span>
            {game.platforms.map(p => (
              <span key={p} className="font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-1 bg-[rgba(8,8,8,0.7)] border border-sl-border text-sl-mid">
                {PLATFORM_LABELS[p]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="relative z-10 py-[72px]">
        <div className="max-w-[1120px] mx-auto px-12">
          <div className="grid gap-16" style={{ gridTemplateColumns: '1fr 340px' }}>

            {/* Left — game info */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-orange mb-2">
                {game.genre} · {game.engine}
              </p>
              <h1 className="font-syne font-extrabold text-[42px] text-sl-white leading-tight mb-4">
                {game.title}
              </h1>

              {/* Buy once badge */}
              <div className="inline-flex items-center gap-2 border border-[rgba(47,184,200,0.3)] bg-[rgba(47,184,200,0.06)] px-3 py-1.5 mb-6">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <polyline points="2,7 5.5,10.5 12,3.5" stroke="#2FB8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-cyan">
                  Buy once. Own forever. No subscriptions.
                </span>
              </div>

              <div className="w-9 h-0.5 bg-sl-orange mb-6" />

              <p className="text-sl-light text-[15px] leading-[1.7] mb-5">
                {game.longDescription || game.description}
              </p>

              {/* Tags */}
              {game.tags && game.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {game.tags.map(t => (
                    <span key={t} className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted border border-sl-border px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* DLCs */}
              {game.dlcs && game.dlcs.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-syne font-bold text-[20px] text-sl-white mb-1">
                    Downloadable Content
                  </h2>
                  <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mb-5">
                    Requires base game
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {game.dlcs.map(dlc => (
                      <div
                        key={dlc.id}
                        className="flex items-center justify-between gap-4 bg-sl-surface border border-sl-border px-6 py-4"
                      >
                        <div>
                          <p className="font-syne font-bold text-[14px] text-sl-white mb-0.5">{dlc.title}</p>
                          <p className="text-[12px] text-sl-muted leading-relaxed">{dlc.description}</p>
                        </div>
                        {/* BuyButton handles owned state client-side */}
                        <BuyButton
                          itemId={dlc.id}
                          itemType="dlc"
                          price={dlc.price}
                          title={dlc.title}
                          downloadUrl={dlc.downloadUrl}
                          requiresGameId={game.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — purchase panel */}
            <div>
              <div className="sticky top-24 bg-sl-surface border border-sl-border p-6">
                {/* Price */}
                <div className="mb-5 pb-5 border-b border-sl-border">
                  {isForSale ? (
                    <div className="font-syne font-extrabold text-[32px] text-sl-white">
                      ${game.price!.toFixed(2)}
                    </div>
                  ) : (
                    <div className="font-syne font-bold text-[18px] text-sl-mid">
                      {game.status === 'in-development' ? 'Pricing not set yet' : 'Not available yet'}
                    </div>
                  )}
                  <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mt-1">
                    One-time purchase · No subscription
                  </p>
                </div>

                {/* Buy button — client component handles ownership check */}
                <div className="mb-5">
                  <BuyButton
                    itemId={game.id}
                    itemType="game"
                    price={game.price}
                    title={game.title}
                    downloadUrl={game.downloadUrl}
                    featured={true}
                  />
                </div>

                {/* What you get */}
                <div className="flex flex-col gap-2.5">
                  {[
                    'Permanent access — no expiry',
                    'All future patches included',
                    'Windows, Mac, and/or Linux build',
                    'No DRM on direct purchases',
                    'Download available immediately after purchase',
                  ].map(line => (
                    <div key={line} className="flex items-start gap-2">
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0" aria-hidden="true">
                        <polyline points="2,7 5.5,10.5 12,3.5" stroke="#2FB8C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-mono text-[10px] text-sl-muted leading-relaxed">{line}</span>
                    </div>
                  ))}
                </div>

                {/* Steam */}
                {game.steamUrl && (
                  <a
                    href={game.steamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full flex items-center justify-center gap-2 border border-sl-border text-sl-mid
                               px-4 py-2.5 font-mono text-[9px] tracking-[0.1em] uppercase no-underline
                               transition-colors hover:border-sl-mid hover:text-sl-white"
                  >
                    Also available on Steam
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
