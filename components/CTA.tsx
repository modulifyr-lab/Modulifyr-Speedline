'use client'

import Link   from 'next/link'
import Reveal  from './Reveal'

export default function CTA() {
  return (
    <section id="cta" className="relative z-10 py-[80px] sm:py-[112px] border-b border-sl-border overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(232,69,48,0.09) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="relative z-10 max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12">
        <Reveal>
          <div className="text-center">
            <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-6">Stay In The Loop</span>
            <h2 className="font-syne font-extrabold leading-none tracking-tight mb-5" style={{ fontSize: 'clamp(32px, 6vw, 80px)', color: 'var(--color-text)' }}>
              More Games<br />Are{' '}<span className="text-sl-orange">Coming.</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] max-w-[460px] mx-auto leading-[1.7] mb-9" style={{ color: 'var(--color-text-secondary)' }}>
              Speedline is actively building. Follow the studio for development updates, early access announcements, and release news.
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap">
              <Link href="/games"
                className="inline-flex items-center gap-2.5 bg-sl-orange text-sl-white px-5 sm:px-7 py-3 sm:py-3.5 font-mono text-[10px] tracking-[0.12em] uppercase no-underline clip-btn transition-all duration-200 hover:bg-[#c93a28]">
                Browse the Catalog
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <a
                href="https://discord.gg/modulifyr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase no-underline pb-2.5 border-b border-sl-border transition-colors duration-200 hover:border-sl-mid"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-text)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                Join Discord →
              </a>
            </div>
            <p className="mt-7 font-mono text-[9px] tracking-[0.12em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
              Modulifyr Speedline · A Division of Modulifyr · Birtamode, Jhapa, Nepal
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
