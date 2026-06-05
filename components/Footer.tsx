'use client'

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
      { label: 'Steam Store',     href: '#'      },
      { label: 'Direct Purchase', href: '/games' },
      { label: 'Press Kit',       href: '#'      },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/legal/terms'   },
      { label: 'Privacy Policy',   href: '/legal/privacy' },
      { label: 'Refund Policy',    href: '/legal/refund'  },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Modulifyr HQ',      href: 'https://modulifyr.com', external: true },
      { label: 'Contact',           href: 'modulifyr.com'   },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-sl-border px-5 sm:px-8 md:px-12 pt-12 sm:pt-14 pb-8 sm:pb-9" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-[1120px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 sm:gap-10 md:gap-12 pb-10 sm:pb-11 mb-7 border-b border-sl-border">
          {/* Brand — full width on smallest screens */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="font-syne font-extrabold text-[17px] mb-1" style={{ color: 'var(--color-text)' }}>
              Modulifyr Speedline
            </div>
            <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-orange mb-3.5">
              Desktop Game Studio Division
            </div>
            <p className="text-[13px] leading-relaxed max-w-[270px]" style={{ color: 'var(--color-text-muted)' }}>
              Engineering-first desktop game development. Buy once, own forever. Available on Steam and direct purchase.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.heading}>
              <div className="font-mono text-[9px] tracking-[0.18em] uppercase mb-3.5" style={{ color: 'var(--color-text-muted)' }}>
                {col.heading}
              </div>
              <ul className="list-none space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[13px] no-underline transition-colors duration-200" style={{ color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Modulifyr Speedline. All rights reserved.
          </span>
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
            A division of{' '}
            <Link href="https://modulifyr.com" target="_blank" rel="noopener noreferrer" className="text-sl-orange no-underline hover:underline">
              Modulifyr
            </Link>
            {' '}· Sole Proprietor: Rijan
          </span>
        </div>

      </div>
    </footer>
  )
}