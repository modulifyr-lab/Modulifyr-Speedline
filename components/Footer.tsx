import Link from 'next/link'

const FOOTER_COLS = [
  {
    heading: 'Studio',
    links: [
      { label: 'About',        href: '/#about'        },
      { label: 'Our Games',    href: '/#games'        },
      { label: 'Capabilities', href: '/#capabilities' },
      { label: 'Engines',      href: '/#engines'      },
      { label: 'Process',      href: '/#process'      },
    ],
  },
  {
    heading: 'Buy',
    links: [
      { label: 'Steam Store',      href: '#'      },
      { label: 'Direct Purchase',  href: '/games' },
      { label: 'Press Kit',        href: '#'      },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Modulifyr HQ',      href: 'https://modulifyr.vercel.app', external: true },
      { label: 'Modulifyr Virtual', href: '#' },
      { label: 'Contact',           href: 'mailto:hello@modulifyr.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 bg-sl-surface border-t border-sl-border px-12 pt-14 pb-9">
      <div className="max-w-[1120px] mx-auto">

        {/* Top grid */}
        <div
          className="grid gap-12 pb-11 mb-7 border-b border-sl-border"
          style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}
        >
          {/* Brand */}
          <div>
            <div className="font-syne font-extrabold text-[17px] text-sl-white mb-1">
              Modulifyr Speedline
            </div>
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-orange mb-3.5">
              Desktop Game Studio Division
            </div>
            <p className="text-[13px] text-sl-muted leading-relaxed max-w-[270px]">
              Engineering-first desktop game development. Modular, maintainable,
              built to last. Available on Steam and direct purchase.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading}>
              <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-sl-muted mb-3.5">
                {col.heading}
              </div>
              <ul className="list-none space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[13px] text-sl-mid no-underline transition-colors duration-200 hover:text-sl-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between flex-wrap gap-2.5">
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">
            © {new Date().getFullYear()} Modulifyr Speedline. All rights reserved.
          </span>
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">
            A division of{' '}
            <Link
              href="https://modulifyr.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sl-orange no-underline hover:underline"
            >
              Modulifyr
            </Link>
            {' '}· Sole Proprietor: Rijan
          </span>
        </div>

      </div>
    </footer>
  )
}
