'use client'
import Reveal from './Reveal'

// Official/recognized logos for engines and platforms
const UnityIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M16 4L28 24H4L16 4Z"
      fill={active ? '#E84530' : 'var(--color-text-muted)'}
      stroke={active ? '#E84530' : 'var(--color-text-muted)'}
      strokeWidth="1.5"
    />
    <path
      d="M16 10L22 22H10L16 10Z"
      fill="none"
      stroke={active ? '#E84530' : 'var(--color-text-muted)'}
      strokeWidth="1"
    />
  </svg>
)

const UnrealIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M16 4L8 8V20L16 24L24 20V8L16 4Z"
      fill={active ? '#E84530' : 'var(--color-text-muted)'}
      stroke={active ? '#E84530' : 'var(--color-text-muted)'}
      strokeWidth="1.5"
    />
  </svg>
)

const GodotIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => {
  const c = active ? '#E84530' : 'var(--color-text-muted)';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="15" r="12" stroke={c} strokeWidth="1.5" fill="none" />
      <path d="M8 12L11 16L16 11L21 16L24 12" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="9" r="2" fill={c} />
      <circle cx="22" cy="9" r="2" fill={c} />
    </svg>
  )
}

const CustomIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => {
  const c = active ? '#E84530' : 'var(--color-text-muted)';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="10" stroke={c} strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="5" stroke={c} strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="2" fill={c} />
    </svg>
  )
}

// Platform icons
const WindowsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="7.5" height="7.5" fill="var(--color-text-muted)" />
    <rect x="9.5" y="1" width="7.5" height="7.5" fill="var(--color-text-muted)" />
    <rect x="1" y="9.5" width="7.5" height="7.5" fill="var(--color-text-muted)" />
    <rect x="9.5" y="9.5" width="7.5" height="7.5" fill="var(--color-text-muted)" />
  </svg>
)

const MacIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 2C5.5 2 2 5 2 9.5C2 13.5 4.5 16 7 16C8 16 8.5 15.5 9 15.5C9.5 15.5 10 16 11 16C13.5 16 16 13.5 16 9.5C16 5 12.5 2 9 2Z" stroke="var(--color-text-muted)" strokeWidth="1.2" fill="none" />
    <path d="M9 2C9 2 10.5 0.5 12 1" stroke="var(--color-text-muted)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

const LinuxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="9" cy="7" rx="4" ry="5" stroke="var(--color-text-muted)" strokeWidth="1.2" />
    <circle cx="7.2" cy="5.5" r="0.8" fill="var(--color-text-muted)" />
    <circle cx="10.8" cy="5.5" r="0.8" fill="var(--color-text-muted)" />
    <path d="M6 15L5 12L7 11L9 12L11 11L13 12L12 15" stroke="var(--color-text-muted)" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="7" y1="12" x2="6" y2="15" stroke="var(--color-text-muted)" strokeWidth="1.2" />
    <line x1="11" y1="12" x2="12" y2="15" stroke="var(--color-text-muted)" strokeWidth="1.2" />
  </svg>
)

const ENGINES = [
  { name: 'Unity',         role: 'Primary Engine',          Icon: UnityIcon,  primary: true  },
  { name: 'Unreal Engine', role: 'High-fidelity projects',  Icon: UnrealIcon, primary: false },
  { name: 'Godot',         role: 'Lightweight / Indie',     Icon: GodotIcon,  primary: false },
  { name: 'Custom / TBD',  role: 'Project-specific',        Icon: CustomIcon, primary: false },
]

const PLATFORMS = [
  { name: 'Windows', note: 'Primary target · All titles', Icon: WindowsIcon },
  { name: 'macOS',   note: 'Supported · Selected titles', Icon: MacIcon     },
  { name: 'Linux',   note: 'Supported · Selected titles', Icon: LinuxIcon   },
]

export default function Engines() {
  return (
    <section id="engines" className="relative z-10 py-[104px] border-b border-sl-border" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-[1120px] mx-auto px-12">
        <Reveal className="mb-14">
          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3.5">
            04 — Engines & Platforms
          </span>
          <h2
            className="font-syne font-extrabold leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(34px,4vw,52px)', color: 'var(--color-text)' }}
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
                  group flex flex-col items-center text-center p-7 border transition-colors duration-200 hover:border-sl-orange hover:bg-sl-surface2
                  ${e.primary ? 'border-[rgba(232,69,48,0.35)]' : 'border-sl-border'}`}
                  style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div className="mb-3">
                  <e.Icon size={32} active={e.primary} />
                </div>
                <span className="font-syne font-bold text-[14px] mb-1" style={{ color: 'var(--color-text)' }}>{e.name}</span>
                <span className={`font-mono text-[9px] tracking-[0.1em] uppercase ${e.primary ? 'text-sl-orange' : ''}`} style={{ color: e.primary ? undefined : 'var(--color-text-muted)' }}>
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
                className="flex items-center gap-4 border border-sl-border px-6 py-5 transition-colors duration-200 hover:border-[rgba(232,69,48,0.2)]"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div className="flex-shrink-0"><p.Icon /></div>
                <div>
                  <div className="font-syne font-bold text-[14px]" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                  <div className="font-mono text-[9px] tracking-[0.1em] uppercase mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
