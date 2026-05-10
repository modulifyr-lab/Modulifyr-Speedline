import Reveal from './Reveal'

const PILLARS = [
  {
    title:  'Architecture Before Gameplay',
    icon:   '⚙️',
    body:   'System design happens before a single mechanic is coded. Foundation first, always.',
    accent: '',
  },
  {
    title:  'Modular by Default',
    icon:   '🧩',
    body:   'Every game system is independently testable, swappable, and reusable across projects.',
    accent: 'blue',
  },
  {
    title:  'Dual Distribution',
    icon:   '📦',
    body:   'Steam for reach. Direct sales for margin. Both channels owned from day one.',
    accent: 'amber',
  },
  {
    title:  'Post-Launch Is Planned',
    icon:   '📐',
    body:   'We build games we intend to ship patches for, update, and grow. Not abandoned builds.',
    accent: 'cyan',
  },
]

export default function About() {
  return (
    <section id="about" className="relative z-10 py-[104px] border-b border-sl-border bg-sl-surface">
      <div className="max-w-[1120px] mx-auto px-12">
        <div className="grid gap-[72px]" style={{ gridTemplateColumns: '1fr 1fr' }}>

          {/* Copy */}
          <Reveal>
            <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3.5">
              02 — About the Studio
            </span>
            <h2
              className="font-syne font-extrabold text-sl-white leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}
            >
              Gaming, the<br />Modulifyr Way.
            </h2>
            <div className="w-9 h-0.5 bg-sl-orange my-7" />
            <p className="text-sl-light text-[15px] leading-[1.7] mb-3.5">
              Speedline is the game development arm of Modulifyr. We apply the
              same engineering discipline from our software practice directly to
              desktop game development.
            </p>
            <p className="text-sl-light text-[15px] leading-[1.7] mb-3.5">
              Most studios prototype fast and refactor never. We design
              architecture before we write gameplay — cleaner code, faster
              iteration post-launch, and games that can be maintained and
              updated long-term.
            </p>
            <p className="text-sl-light text-[15px] leading-[1.7]">
              We ship on Steam and sell directly. Two channels. We own both.
            </p>
          </Reveal>

          {/* Pillars */}
          <Reveal delay={100}>
            <div className="flex flex-col gap-0.5">
              {PILLARS.map(p => (
                <div
                  key={p.title}
                  className={`pillar-bar ${p.accent} relative bg-sl-darker border border-sl-border px-6 py-5 transition-colors duration-200`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-syne font-bold text-[14px] text-sl-white">{p.title}</span>
                    <span aria-hidden="true">{p.icon}</span>
                  </div>
                  <p className="text-[12px] text-sl-muted leading-relaxed m-0">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}
