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
      { label: 'Press Kit',       href: 'mailto:press@modulifyr.com' },
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
      { label: 'Modulifyr HQ',  href: 'https://modulifyr.com',       external: true },
      { label: 'Contact',       href: 'mailto:hello@modulifyr.com'              },
      { label: 'Support',       href: 'mailto:support@modulifyr.com'            },
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
            <p className="text-[13px] leading-relaxed max-w-[270px] mb-5" style={{ color: 'var(--color-text-muted)' }}>
              Engineering-first desktop game development. Buy once, own forever. Available on Steam and direct purchase.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/modulifyr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Modulifyr Speedline on X (Twitter)"
                className="transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <XIcon />
              </a>
              <a
                href="https://linkdin/modulifyr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Modulifyr Speedline Discord"
                className="transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <DiscordIcon />
              </a>
              <a
                href="https://youtube.com/@modulifyr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Modulifyr Speedline on YouTube"
                className="transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <YouTubeIcon />
              </a>
            </div>
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
                      className="text-[13px] no-underline transition-colors duration-200"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
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

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.128 18.113a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
