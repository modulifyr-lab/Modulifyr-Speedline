import Reveal from './Reveal'

// SVG platform/engine marks — brand rule: no emojis in professional content
const WindowsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="7.5" height="7.5" fill="#8A8A8A" />
    <rect x="9.5" y="1" width="7.5" height="7.5" fill="#8A8A8A" />
    <rect x="1" y="9.5" width="7.5" height="7.5" fill="#8A8A8A" />
    <rect x="9.5" y="9.5" width="7.5" height="7.5" fill="#8A8A8A" />
  </svg>
)

const MacIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 2 C5.5 2 2 5 2 9.5 C2 13.5 4.5 16 7 16 C8 16 8.5 15.5 9 15.5 C9.5 15.5 10 16 11 16 C13.5 16 16 13.5 16 9.5 C16 5 12.5 2 9 2Z" stroke="#8A8A8A" strokeWidth="1.2" fill="none" />
    <path d="M9 2 C9 2 10.5 0.5 12 1" stroke="#8A8A8A" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const LinuxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="9" cy="7" rx="4" ry="5" stroke="#8A8A8A" strokeWidth="1.2" />
    <circle cx="7.2" cy="5.5" r="0.8" fill="#8A8A8A" />
    <circle cx="10.8" cy="5.5" r="0.8" fill="#8A8A8A" />
    <path d="M6 15 L5 12 L7 11 L9 12 L11 11 L13 12 L12 15" stroke="#8A8A8A" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="7" y1="12" x2="6" y2="15" stroke="#8A8A8A" strokeWidth="1.2" />
    <line x1="11" y1="12" x2="12" y2="15" stroke="#8A8A8A" strokeWidth="1.2" />
  </svg>
)

// Engine label mark — a simple geometric identifier consistent with the brand grid/block language
const EngineMark = ({ primary, color }: { primary: boolean; color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="9" height="9" stroke={color} strokeWidth={primary ? 1.5 : 1} />
    <rect x="13" y="2" width="9" height="9" stroke={color} strokeWidth={primary ? 1.5 : 1} />
    <rect x="2" y="13" width="9" height="9" stroke={color} strokeWidth={primary ? 1.5 : 1} />
    <rect x="13" y="13" width="9" height="9" stroke={color} strokeWidth={primary ? 1.5 : 1} opacity={primary ? 1 : 0.4} />
  </svg>
)

const ENGINES = [
  { name: 'Unity',         role: 'Primary Engine',         primary: true,  color: '#E84530' },
  { name: 'Unreal Engine', role: 'High-fidelity projects', primary: false, color: '#5A5A5A' },
  { name: 'Godot',         role: 'Lightweight / Indie',    primary: false, color: '#5A5A5A' },
  { name: 'Custom / TBD',  role: 'Project-specific',       primary: false, color: '#5A5A5A' },
]

const PLATFORMS = [
  { name: 'Windows', note: 'Primary target · All titles', Icon: WindowsIcon },
  { name: 'macOS',   note: 'Supported · Selected titles', Icon: MacIcon     },
  { name: 'Linux',   note: 'Supported · Selected titles', Icon: LinuxIcon   },
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
                <div className="mb-2.5">
                  <EngineMark primary={e.primary} color={e.color} />
                </div>
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
                <div className="flex-shrink-0">
                  <p.Icon />
                </div>
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