import Reveal from './Reveal'

const STEPS = [
  { num: '01', title: 'Concept',       desc: 'Core loop defined. Platform targets locked. Architecture mapped before any code exists.' },
  { num: '02', title: 'Architecture',  desc: 'Modular system design. Engine chosen to match scope. No retrofitting later.' },
  { num: '03', title: 'Build',         desc: 'Iterative development. Each system independently testable and shippable.' },
  { num: '04', title: 'QA & Polish',   desc: 'Structured playtesting, performance profiling, and platform certification.' },
  { num: '05', title: 'Ship & Support',desc: 'Dual launch on Steam + direct. Post-launch patches planned ahead of release.' },
]

export default function Process() {
  return (
    <section id="process" className="relative z-10 py-[72px] sm:py-[104px] border-b border-sl-border">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12">
        <Reveal className="mb-10 sm:mb-14">
          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3.5">05 — Our Process</span>
          <h2 className="font-syne font-extrabold text-sl-white leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            How a Game Gets Built.
          </h2>
        </Reveal>
        <Reveal delay={60}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0.5">
            {STEPS.map(step => (
              <div key={step.num}
                className="group bg-sl-darker border border-sl-border px-4 sm:px-[18px] py-6 sm:py-7 text-center transition-colors duration-200 hover:border-sl-orange">
                <div className="w-[34px] h-[34px] rounded-full border border-sl-border flex items-center justify-center mx-auto mb-4 font-mono text-[10px] text-sl-orange bg-sl-surface transition-all duration-200 group-hover:bg-sl-orange group-hover:text-sl-white group-hover:border-sl-orange">
                  {step.num}
                </div>
                <h3 className="font-syne font-bold text-[13px] text-sl-white mb-2">{step.title}</h3>
                <p className="text-[11px] text-sl-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}