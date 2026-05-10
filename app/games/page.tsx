import type { Metadata } from 'next'
import Nav          from '@/components/Nav'
import GamesFilter  from '@/components/GamesFilter'
import Footer       from '@/components/Footer'
import { games }    from '@/lib/games'

export const metadata: Metadata = {
  title:       'Games — Modulifyr Speedline',
  description: 'Browse and buy Modulifyr Speedline games. Available on Steam and direct purchase.',
}

export default function GamesPage() {
  return (
    <>
      <Nav />

      {/* Page header */}
      <section className="relative z-10 pt-32 pb-14 border-b border-sl-border">
        {/* Subtle radial */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width:      '600px',
            height:     '400px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(232,69,48,0.07) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1120px] mx-auto px-12">
          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-4">
            Modulifyr Speedline — Shop
          </span>
          <h1
            className="font-syne font-extrabold text-sl-white leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
          >
            All Games.
          </h1>
          <p className="text-sl-light text-[15px] max-w-[520px] leading-[1.7]">
            Our full catalog — available on Steam and direct purchase.
            Use the filter to find games by status.
          </p>
        </div>
      </section>

      {/* Shop */}
      <section className="relative z-10 py-[80px]">
        <div className="max-w-[1120px] mx-auto px-12">
          <GamesFilter games={games} />
        </div>
      </section>

      {/* Press & info strip */}
      <section className="relative z-10 border-t border-sl-border bg-sl-surface py-12">
        <div className="max-w-[1120px] mx-auto px-12">
          <div className="grid grid-cols-3 gap-0.5">
            {[
              {
                heading: 'Press & Media',
                body:    'For review copies, press assets, and media enquiries, email us directly.',
                action:  { label: 'press@modulifyr.com', href: 'mailto:press@modulifyr.com' },
              },
              {
                heading: 'Steam Publisher',
                body:    'All available titles are published on Steam under the Modulifyr Speedline publisher page.',
                action:  { label: 'View on Steam →', href: '#' },
              },
              {
                heading: 'Refunds',
                body:    'Direct purchases are eligible for refunds within 14 days of purchase, no questions asked.',
                action:  { label: 'Contact Support', href: 'mailto:support@modulifyr.com' },
              },
            ].map(item => (
              <div key={item.heading} className="bg-sl-darker border border-sl-border p-7">
                <h3 className="font-syne font-bold text-[15px] text-sl-white mb-2">{item.heading}</h3>
                <p className="text-[13px] text-sl-muted leading-relaxed mb-4">{item.body}</p>
                <a
                  href={item.action.href}
                  className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-orange no-underline hover:underline"
                >
                  {item.action.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
