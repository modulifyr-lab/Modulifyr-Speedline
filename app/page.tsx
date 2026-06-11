'use client'
import Nav          from '@/components/Nav'
import Hero         from '@/components/Hero'
import Marquee      from '@/components/Marquee'
import About        from '@/components/About'
import Capabilities from '@/components/Capabilities'
import Engines      from '@/components/Engines'
import Process      from '@/components/Process'
import CTA          from '@/components/CTA'
import Footer       from '@/components/Footer'
import GameCard     from '@/components/GameCard'
import Reveal       from '@/components/Reveal'
import Link         from 'next/link'
import { games }    from '@/lib/games'

export default function Home() {
  const featured   = games.find(g => g.featured) ?? games[0]
  const secondary  = games.filter(g => !g.featured).slice(0, 2)
  const total      = games.length

  // Grid cols: 1 game = full width, 2 games = 2 col, 3+ games = 3 col with featured spanning 2
  const gridClass =
    total === 1 ? 'grid-cols-1' :
    total === 2 ? 'grid-cols-1 sm:grid-cols-2' :
    'grid-cols-3'

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />

      {/* Games preview */}
      <section id="games" className="relative z-10 py-[104px] border-b border-sl-border">
        <div className="max-w-[1120px] mx-auto px-12">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3.5">
                  01 — Games & Shop
                </span>
                <h2
                  className="font-syne font-extrabold leading-[1.05] tracking-tight"
                  style={{ fontSize: 'clamp(34px, 4vw, 52px)', color: 'var(--color-text)' }}
                >
                  Our Games.
                </h2>
              </div>
              <div className="text-right font-mono text-[10px] tracking-[0.1em] uppercase leading-[1.9]" style={{ color: 'var(--color-text-muted)' }}>
                Steam + Direct Purchase<br />
                Windows · Mac · Linux
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className={`grid ${gridClass} gap-0.5`}>
              <GameCard game={featured} featured={total >= 3} />
              {secondary.map(g => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex justify-center">
              <Link
                href="/games"
                className="inline-flex items-center gap-2.5 border border-sl-border px-7 py-3 font-mono text-[10px] tracking-[0.12em] uppercase no-underline transition-colors duration-200"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-sl-orange)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
                }}
              >
                View Full Catalog →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <About />
      <Capabilities />
      <Engines />
      <Process />
      <CTA />
      <Footer />
    </>
  )
}
