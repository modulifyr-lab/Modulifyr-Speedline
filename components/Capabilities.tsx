import Reveal from './Reveal'

const CAPS = [
  {
    num:   '01',
    title: 'Desktop Game Development',
    desc:  'Full-cycle development for Windows, Mac, and Linux. From concept to shippable build. Performance-first, modular, production-ready.',
    tags:  ['Unity', 'C#', 'Unreal Engine', 'Godot'],
  },
  {
    num:   '02',
    title: 'Game Systems Architecture',
    desc:  'Custom engine systems, ECS patterns, reusable component frameworks. We design the internal structure of a game the way you\'d architect enterprise software.',
    tags:  ['ECS', 'Systems Design', 'ScriptableObjects', 'SOLID'],
  },
  {
    num:   '03',
    title: 'Steam Publishing Pipeline',
    desc:  'Steamworks SDK integration, achievements, cloud saves, leaderboards, store page management, DRM, and full release execution.',
    tags:  ['Steamworks SDK', 'Steam Store', 'Achievements', 'Cloud Saves'],
  },
  {
    num:   '04',
    title: 'Direct Sales Infrastructure',
    desc:  'Storefront setup, license key delivery, payment integration, and download infrastructure for selling directly — no third-party platform cut.',
    tags:  ['Direct Sales', 'License Keys', 'Payments', 'Delivery'],
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative z-10 py-[104px] border-b border-sl-border">
      <div className="max-w-[1120px] mx-auto px-12">
        <Reveal className="mb-14">
          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3.5">
            03 — What We Do
          </span>
          <h2
            className="font-syne font-extrabold text-sl-white leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}
          >
            Capabilities.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-2 gap-0.5">
            {CAPS.map(cap => (
              <div
                key={cap.num}
                className="flex gap-5 bg-sl-darker border border-sl-border p-8
                           transition-colors duration-200 hover:border-[rgba(232,69,48,0.3)]"
              >
                <span className="font-mono text-[10px] text-sl-border flex-shrink-0 pt-0.5 tracking-[0.05em]">
                  {cap.num}
                </span>
                <div>
                  <h3 className="font-syne font-bold text-[17px] text-sl-white mb-2">{cap.title}</h3>
                  <p className="text-[13px] text-sl-muted leading-relaxed">{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {cap.tags.map(t => (
                      <span
                        key={t}
                        className="font-mono text-[9px] tracking-[0.1em] uppercase
                                   text-sl-muted border border-sl-border px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
