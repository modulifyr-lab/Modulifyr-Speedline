import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-end
                 px-12 pb-20 pt-32 overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid-bg" aria-hidden="true" />

      {/* Radial glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '5%', right: '-5%',
          width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(232,69,48,0.1) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20%', left: '0%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(43,127,168,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Speed streaks */}
      <div className="streak streak-orange w-[220px] animate-streakFly1" style={{ top: '22%' }} aria-hidden="true" />
      <div className="streak streak-cyan   w-[140px] animate-streakFly2" style={{ top: '38%' }} aria-hidden="true" />
      <div className="streak streak-orange w-[180px] animate-streakFly3" style={{ top: '55%' }} aria-hidden="true" />
      <div className="streak streak-amber  w-[100px] animate-streakFly4" style={{ top: '68%' }} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-[1120px] mx-auto w-full">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5 animate-fadeUp1">
          <div className="w-9 h-px bg-sl-orange flex-shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange">
            Modulifyr Speedline
          </span>
          <span className="ml-auto font-mono text-[9px] tracking-[0.14em] uppercase text-sl-muted border border-sl-border px-2.5 py-1">
            Desktop Game Studio · Division
          </span>
        </div>

        {/* H1 */}
        <h1
          className="font-syne font-extrabold leading-[0.93] tracking-[-0.03em] animate-fadeUp2"
          style={{ fontSize: 'clamp(54px, 9.5vw, 116px)' }}
        >
          <span className="block text-sl-white">Desktop Games.</span>
          <span
            className="block"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(245,245,245,0.2)',
            }}
          >
            Built{' '}
            <span style={{ color: '#E84530', WebkitTextStroke: '0' }}>
              Right.
            </span>
          </span>
        </h1>

        {/* Bottom row */}
        <div
          className="grid gap-12 mt-14 pt-9 border-t border-sl-border animate-fadeUp3"
          style={{ gridTemplateColumns: '1fr auto' }}
        >
          <p className="max-w-[460px] text-sl-light text-[15px] leading-[1.7]">
            Speedline is the game development division of Modulifyr. We build
            desktop games for Windows, Mac, and Linux — shipped on Steam and
            sold directly from this site. Same engineering discipline. Different product.
          </p>
          <div className="flex flex-col items-end gap-3.5">
            <Link
              href="/games"
              className="inline-flex items-center gap-2.5 bg-sl-orange text-sl-white
                         px-6 py-3.5 font-mono text-[10px] tracking-[0.12em] uppercase
                         no-underline clip-btn transition-all duration-200
                         hover:bg-[#c93a28] hover:translate-x-0.5"
            >
              Browse Games
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/#about"
              className="inline-flex items-center gap-2 text-sl-mid font-mono text-[10px]
                         tracking-[0.12em] uppercase no-underline pb-2.5
                         border-b border-sl-border transition-colors duration-200
                         hover:text-sl-white hover:border-sl-mid"
            >
              About the Studio →
            </Link>
          </div>
        </div>

        {/* KPIs */}
        <div className="flex gap-12 mt-14 animate-fadeUp4">
          {[
            { val: 'PC',    sup: '+',  label: 'Desktop First'  },
            { val: 'Steam', sup: ' &', label: 'Direct Sales'   },
            { val: '0',     sup: '×',  label: 'Crunch Culture' },
          ].map(k => (
            <div key={k.label}>
              <div className="font-syne font-extrabold text-[26px] text-sl-white leading-none">
                {k.val}<span className="text-sl-orange">{k.sup}</span>
              </div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-muted mt-1">
                {k.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
