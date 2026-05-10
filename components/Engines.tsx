import Reveal from './Reveal'

const ENGINES = [
  { name: 'Unity',         role: 'Primary Engine',        icon: '🎮', primary: true  },
  { name: 'Unreal Engine', role: 'High-fidelity projects', icon: '🔷', primary: false },
  { name: 'Godot',         role: 'Lightweight / Indie',    icon: '🤖', primary: false },
  { name: 'Custom / TBD',  role: 'Project-specific',       icon: '🔧', primary: false },
]

const PLATFORMS = [
  { name: 'Windows', note: 'Primary target · All titles', icon: '🪟' },
  { name: 'macOS',   note: 'Supported · Selected titles', icon: '🍎' },
  { name: 'Linux',   note: 'Supported · Selected titles', icon: '🐧' },
]

export default function Engines() {
  return (
    <section id="engines" className="relative z-10 py-[104px] border-b border-sl-border bg-sl-surface">
      <div className="max-w-[1120px] mx-auto px-12">
        <Reveal className="mb-14">
          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3.5">
            04 — Engines & Platforms
          </span>
          <h2
            className="font-syne font-extrabold text-sl-white leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}
          >
            How We Build.
          </h2>
        </Reveal>

        {/* Engines grid */}
        <Reveal delay={60}>
          <div className="grid grid-cols-4 gap-0.5 mb-0.5">
            {ENGINES.map(e => (
              <div
                key={e.name}
                className={`
                  flex flex-col items-center text-center p-7 bg-sl-darker
                  border transition-colors duration-200
                  hover:border-sl-orange hover:bg-sl-surface2
                  ${e.primary ? 'border-[rgba(232,69,48,0.35)]' : 'border-sl-border'}
                `}
              >
                <span className="text-[30px] mb-2.5" aria-hidden="true">{e.icon}</span>
                <span className="font-syne font-bold text-[14px] text-sl-white mb-1">{e.name}</span>
                <span
                  className={`font-mono text-[9px] tracking-[0.1em] uppercase ${e.primary ? 'text-sl-orange' : 'text-sl-muted'}`}
                >
                  {e.role}
                </span>
                {e.primary && (
                  <span className="mt-2 font-mono text-[8px] tracking-[0.12em] uppercase text-sl-orange border border-[rgba(232,69,48,0.3)] px-2 py-0.5">
                    Current Default
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Platforms row */}
        <Reveal delay={120}>
          <div className="grid grid-cols-3 gap-0.5">
            {PLATFORMS.map(p => (
              <div
                key={p.name}
                className="flex items-center gap-4 bg-sl-darker border border-sl-border px-6 py-5
                           transition-colors duration-200 hover:border-[rgba(232,69,48,0.2)]"
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{p.icon}</span>
                <div>
                  <div className="font-syne font-bold text-[14px] text-sl-white">{p.name}</div>
                  <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mt-0.5">
                    {p.note}
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
