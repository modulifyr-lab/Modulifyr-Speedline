import Reveal from './Reveal'

// Recognizable geometric SVG marks for each engine
// Styled to match the brand's grid/block visual language

/** Unity — the iconic diamond/cube shape */
const UnityIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon
      points="16,2 30,24 2,24"
      stroke={active ? '#E84530' : '#5A5A5A'}
      strokeWidth="1.5"
      fill="none"
    />
    <polygon
      points="16,8 25,22 7,22"
      stroke={active ? '#E84530' : '#5A5A5A'}
      strokeWidth="1"
      fill={active ? 'rgba(232,69,48,0.08)' : 'rgba(90,90,90,0.06)'}
    />
    <line x1="16" y1="2" x2="16" y2="8"  stroke={active ? '#E84530' : '#5A5A5A'} strokeWidth="1.5" />
    <line x1="30" y1="24" x2="25" y2="22" stroke={active ? '#E84530' : '#5A5A5A'} strokeWidth="1.5" />
    <line x1="2"  y1="24" x2="7"  y2="22" stroke={active ? '#E84530' : '#5A5A5A'} strokeWidth="1.5" />
  </svg>
)

/** Unreal Engine — bold arch/horseshoe "U" form */
const UnrealIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M6 4 L6 20 A10 10 0 0 0 26 20 L26 4"
      stroke={active ? '#E84530' : '#5A5A5A'}
      strokeWidth="2"
      fill="none"
      strokeLinecap="square"
    />
    <rect x="3" y="2" width="6" height="4" fill={active ? '#E84530' : '#5A5A5A'} />
    <rect x="23" y="2" width="6" height="4" fill={active ? '#E84530' : '#5A5A5A'} />
    <line x1="9" y1="28" x2="23" y2="28" stroke={active ? '#E84530' : '#5A5A5A'} strokeWidth="2" />
  </svg>
)

/** Godot — the robot mascot face simplified to a circle with grid eyes */
const GodotIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => {
  const c = active ? '#E84530' : '#5A5A5A'
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="15" r="12" stroke={c} strokeWidth="1.5" fill="none" />
      {/* Left eye */}
      <rect x="8"  y="11" width="5" height="5" stroke={c} strokeWidth="1.2" fill="none" />
      <rect x="9"  y="12" width="3" height="3" fill={c} opacity="0.4" />
      {/* Right eye */}
      <rect x="19" y="11" width="5" height="5" stroke={c} strokeWidth="1.2" fill="none" />
      <rect x="20" y="12" width="3" height="3" fill={c} opacity="0.4" />
      {/* Mouth line */}
      <line x1="11" y1="20" x2="21" y2="20" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
      {/* Ears */}
      <line x1="4"  y1="15" x2="8"  y2="15" stroke={c} strokeWidth="1.5" />
      <line x1="24" y1="15" x2="28" y2="15" stroke={c} strokeWidth="1.5" />
    </svg>
  )
}

/** Custom — wrench + gear composite */
const CustomIcon = ({ size = 32, active = false }: { size?: number; active?: boolean }) => {
  const c = active ? '#E84530' : '#5A5A5A'
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Gear */}
      <circle cx="20" cy="12" r="5" stroke={c} strokeWidth="1.2" fill="none" />
      <circle cx="20" cy="12" r="2" fill={c} opacity="0.35" />
      {[0, 60, 120, 180, 240, 300].map(deg => {
        const rad = (deg * Math.PI) / 180
        const x1  = 20 + 5  * Math.cos(rad)
        const y1  = 12 + 5  * Math.sin(rad)
        const x2  = 20 + 7.5 * Math.cos(rad)
        const y2  = 12 + 7.5 * Math.sin(rad)
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="1.5" />
      })}
      {/* Wrench handle */}
      <line x1="4" y1="28" x2="16" y2="16" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="3" y="24" width="4" height="6" rx="1" transform="rotate(-45 5 27)" fill={c} opacity="0.5" />
    </svg>
  )
}

// Platform icons — same as before
const WindowsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1"   y="1"   width="7.5" height="7.5" fill="#8A8A8A" />
    <rect x="9.5" y="1"   width="7.5" height="7.5" fill="#8A8A8A" />
    <rect x="1"   y="9.5" width="7.5" height="7.5" fill="#8A8A8A" />
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
                  group flex flex-col items-center text-center p-7 bg-sl-darker
                  border transition-colors duration-200
                  hover:border-sl-orange hover:bg-sl-surface2
                  ${e.primary ? 'border-[rgba(232,69,48,0.35)]' : 'border-sl-border'}
                `}
              >
                <div className="mb-3">
                  <e.Icon size={32} active={e.primary} />
                </div>
                <span className="font-syne font-bold text-[14px] text-sl-white mb-1">{e.name}</span>
                <span className={`font-mono text-[9px] tracking-[0.1em] uppercase ${e.primary ? 'text-sl-orange' : 'text-sl-muted'}`}>
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
                <div className="flex-shrink-0"><p.Icon /></div>
                <div>
                  <div className="font-syne font-bold text-[14px] text-sl-white">{p.name}</div>
                  <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted mt-0.5">{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}