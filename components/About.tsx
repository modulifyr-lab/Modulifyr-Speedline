import Reveal from './Reveal'

// Brand-consistent SVG icons — no emojis in client-facing content (brand rule)
const ArchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="6" height="6" stroke="#E84530" strokeWidth="1.2" />
    <rect x="9" y="1" width="6" height="6" stroke="#E84530" strokeWidth="1.2" />
    <rect x="1" y="9" width="6" height="6" stroke="#E84530" strokeWidth="1.2" />
    <rect x="9" y="9" width="6" height="6" stroke="#E84530" strokeWidth="1.2" />
  </svg>
)

const ModularIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="5" height="5" stroke="#2B7FA8" strokeWidth="1.2" />
    <rect x="10" y="1" width="5" height="5" stroke="#2B7FA8" strokeWidth="1.2" />
    <rect x="1" y="10" width="5" height="5" stroke="#2B7FA8" strokeWidth="1.2" />
    <line x1="6" y1="3.5" x2="10" y2="3.5" stroke="#2B7FA8" strokeWidth="1.2" />
    <line x1="3.5" y1="6" x2="3.5" y2="10" stroke="#2B7FA8" strokeWidth="1.2" />
  </svg>
)

const DistribIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="5" width="6" height="8" stroke="#F5B52E" strokeWidth="1.2" />
    <rect x="9" y="5" width="6" height="8" stroke="#F5B52E" strokeWidth="1.2" />
    <line x1="4" y1="5" x2="4" y2="2" stroke="#F5B52E" strokeWidth="1.2" />
    <line x1="12" y1="5" x2="12" y2="2" stroke="#F5B52E" strokeWidth="1.2" />
    <line x1="4" y1="2" x2="12" y2="2" stroke="#F5B52E" strokeWidth="1.2" />
    <circle cx="8" cy="2" r="1" fill="#F5B52E" />
  </svg>
)

const PostLaunchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="#2FB8C8" strokeWidth="1.2" />
    <polyline points="5,8 7.5,10.5 11,5.5" stroke="#2FB8C8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PILLARS = [
  {
    title:  'Architecture Before Gameplay',
    Icon:   ArchIcon,
    body:   'System design happens before a single mechanic is coded. Foundation first, always.',
    accent: '',
  },
  {
    title:  'Modular by Default',
    Icon:   ModularIcon,
    body:   'Every game system is independently testable, swappable, and reusable across projects.',
    accent: 'blue',
  },
  {
    title:  'Dual Distribution',
    Icon:   DistribIcon,
    body:   'Steam for reach. Direct sales for margin. Both channels owned from day one.',
    accent: 'amber',
  },
  {
    title:  'Post-Launch Is Planned',
    Icon:   PostLaunchIcon,
    body:   'We build games we intend to ship patches for, update, and grow. Not abandoned builds.',
    accent: 'cyan',
  },
]

export default function About() {
  return (
    <section id="about" className="relative z-10 py-[104px] border-b border-sl-border" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-[1120px] mx-auto px-12">
        <div className="grid gap-[72px]" style={{ gridTemplateColumns: '1fr 1fr' }}>

          {/* Copy */}
          <Reveal>
            <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3.5">
              02 — About the Studio
            </span>
            <h2
              className="font-syne font-extrabold leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(34px, 4vw, 52px)', color: 'var(--color-text)' }}
            >
              Gaming, the<br />Modulifyr Way.
            </h2>
            <div className="w-9 h-0.5 bg-sl-orange my-7" />
            <p className="text-[15px] leading-[1.7] mb-3.5" style={{ color: 'var(--color-text-secondary)' }}>
              Speedline is the game development arm of Modulifyr. We apply the
              same engineering discipline from our software practice directly to
              desktop game development.
            </p>
            <p className="text-[15px] leading-[1.7] mb-3.5" style={{ color: 'var(--color-text-secondary)' }}>
              Most studios prototype fast and refactor never. We design
              architecture before we write gameplay — cleaner code, faster
              iteration post-launch, and games that can be maintained and
              updated long-term.
            </p>
            <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--color-text-secondary)' }}>
              We ship on Steam and sell directly. Two channels. We own both.
            </p>
          </Reveal>

          {/* Pillars */}
          <Reveal delay={100}>
            <div className="flex flex-col gap-0.5">
              {PILLARS.map(p => (
                <div
                  key={p.title}
                  className={`pillar-bar ${p.accent} relative border border-sl-border px-6 py-5 transition-colors duration-200`}
                  style={{ backgroundColor: 'var(--color-bg)' }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-syne font-bold text-[14px]" style={{ color: 'var(--color-text)' }}>{p.title}</span>
                    <p.Icon />
                  </div>
                  <p className="text-[12px] leading-relaxed m-0" style={{ color: 'var(--color-text-muted)' }}>{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}