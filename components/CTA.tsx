import Link from 'next/link'
import Reveal from './Reveal'

export default function CTA() {
  return (
    <section id="cta" className="relative z-10 py-[112px] border-b border-sl-border overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width:      '700px',
          height:     '700px',
          background: 'radial-gradient(circle, rgba(232,69,48,0.09) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1120px] mx-auto px-12">
        <Reveal>
          <div className="text-center">
            <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-6">
              Get In Touch
            </span>
            <h2
              className="font-syne font-extrabold text-sl-white leading-none tracking-tight mb-5"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
            >
              Have a Game<br />
              Worth{' '}
              <span className="text-sl-orange">Building?</span>
            </h2>
            <p className="text-[16px] text-sl-light max-w-[460px] mx-auto leading-[1.7] mb-9">
              Speedline is in active development. If you have a licensing inquiry
              or want to discuss a game concept that requires serious engineering,
              send a direct message.
            </p>
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <a
                href="mailto:hello@modulifyr.com"
                className="inline-flex items-center gap-2.5 bg-sl-orange text-sl-white
                           px-7 py-3.5 font-mono text-[10px] tracking-[0.12em] uppercase
                           no-underline clip-btn transition-all duration-200
                           hover:bg-[#c93a28] hover:translate-x-0.5"
              >
                Contact Speedline
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link
                href="https://modulifyr.vercel.app"
                target="_blank"
                className="inline-flex items-center gap-2 text-sl-mid font-mono text-[10px]
                           tracking-[0.12em] uppercase no-underline pb-2.5
                           border-b border-sl-border transition-colors duration-200
                           hover:text-sl-white hover:border-sl-mid"
              >
                Visit Modulifyr HQ →
              </Link>
            </div>
            <p className="mt-7 font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted">
              Modulifyr Speedline · A Division of Modulifyr · Birtamode, Jhapa, Nepal
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}