'use client'

// ─── Hero.tsx ────────────────────────────────────────────────────────────────
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end px-5 sm:px-8 md:px-12 pb-16 sm:pb-20 pt-24 sm:pt-32 overflow-hidden">
      <div className="absolute inset-0 hero-grid-bg" aria-hidden="true" />
      <div className="absolute pointer-events-none" style={{ top: '5%', right: '-5%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(232,69,48,0.1) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="absolute pointer-events-none" style={{ bottom: '-20%', left: '0%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(43,127,168,0.07) 0%, transparent 65%)' }} aria-hidden="true" />

      <div className="streak streak-orange w-[220px] animate-streakFly1" style={{ top: '22%' }} aria-hidden="true" />
      <div className="streak streak-cyan   w-[140px] animate-streakFly2" style={{ top: '38%' }} aria-hidden="true" />
      <div className="streak streak-orange w-[180px] animate-streakFly3" style={{ top: '55%' }} aria-hidden="true" />
      <div className="streak streak-amber  w-[100px] animate-streakFly4" style={{ top: '68%' }} aria-hidden="true" />

      <div className="relative z-10 max-w-[1120px] mx-auto w-full">
        <div className="flex items-center gap-3 mb-5 animate-fadeUp1">
          <div className="w-9 h-px bg-sl-orange flex-shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange">Modulifyr Speedline</span>
          <span className="hidden sm:block ml-auto font-mono text-[9px] tracking-[0.14em] uppercase text-sl-muted border border-sl-border px-2.5 py-1">
            Desktop Game Studio · Division
          </span>
        </div>

        <h1 className="font-syne font-extrabold leading-[0.93] tracking-[-0.03em] animate-fadeUp2" style={{ fontSize: 'clamp(44px, 9.5vw, 116px)' }}>
          <span className="block" style={{ color: 'var(--color-text)' }}>Desktop Games.</span>
          <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1px var(--color-text-stroke)' }}>
            Built{' '}<span style={{ color: '#E84530', WebkitTextStroke: '0' }}>Right.</span>
          </span>
        </h1>

        <div className="grid gap-8 md:gap-12 mt-10 sm:mt-14 pt-7 sm:pt-9 border-t border-sl-border animate-fadeUp3" style={{ gridTemplateColumns: '1fr' }}>
          <p className="max-w-[460px]" style={{ color: 'var(--color-text-secondary)' }} className="text-[14px] sm:text-[15px] leading-[1.7]">
            Speedline is the game development division of Modulifyr. Desktop games for Windows, Mac, and Linux — shipped on Steam and sold directly. Same engineering discipline. Different product.
          </p>
          <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3">
            <Link href="/games"
              className="inline-flex items-center gap-2.5 bg-sl-orange text-sl-white px-5 sm:px-6 py-3 sm:py-3.5 font-mono text-[10px] tracking-[0.12em] uppercase no-underline clip-btn transition-all duration-200 hover:bg-[#c93a28]">
              Browse Games
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href="/#about"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] uppercase no-underline pb-2.5 border-b border-sl-border transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'}>
              About the Studio →
            </Link>
          </div>
        </div>

        <div className="flex gap-8 sm:gap-12 mt-10 sm:mt-14 animate-fadeUp4 flex-wrap">
          {[
            { val: 'PC', sup: '+', label: 'Desktop First' },
            { val: 'Steam', sup: ' &', label: 'Direct Sales' },
            { val: '0', sup: '×', label: 'Crunch Culture' },
          ].map(k => (
            <div key={k.label}>
              <div className="font-syne font-extrabold text-[22px] sm:text-[26px] leading-none" style={{ color: 'var(--color-text)' }}>
                {k.val}<span className="text-sl-orange">{k.sup}</span>
              </div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase mt-1" style={{ color: 'var(--color-text-muted)' }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero