const ITEMS = [
  { text: 'Modulifyr Speedline', accent: true  },
  { text: 'Desktop Games',       accent: false },
  { text: 'Windows · Mac · Linux', accent: false },
  { text: 'Available on Steam',  accent: false },
  { text: 'Direct Purchase',     accent: true  },
  { text: 'Unity Engine',        accent: false },
  { text: 'Engineering Discipline', accent: false },
  { text: 'Modular Architecture', accent: false },
  { text: 'Built to Last',       accent: false },
]

function MarqueeItem({ text, accent }: { text: string; accent: boolean }) {
  return (
    <span
      className={`
        inline-flex items-center gap-4 px-9
        font-mono text-[10px] tracking-[0.1em] uppercase whitespace-nowrap
        ${accent ? 'text-sl-orange' : 'text-sl-muted'}
      `}
    >
      <span className="w-[3px] h-[3px] rounded-full bg-sl-orange flex-shrink-0" />
      {text}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="border-t border-b border-sl-border py-4 overflow-hidden bg-sl-surface relative z-10">
      <div className="flex w-max animate-marquee">
        {/* Render twice for seamless loop */}
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <MarqueeItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}
