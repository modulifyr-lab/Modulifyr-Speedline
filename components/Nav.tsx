'use client'

import Link            from 'next/link'
import Image           from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState }    from 'react'
import { useAuth }      from '@/contexts/AuthContext'

const NAV_LINKS = [
  { href: '/#games',        label: 'Games'      },
  { href: '/#about',        label: 'Studio'     },
  { href: '/#capabilities', label: 'What We Do' },
  { href: '/#engines',      label: 'Engines'    },
  { href: '/games',         label: 'Shop'       },
]

export default function Nav() {
  const pathname = usePathname()
  const router   = useRouter()
  const { user, signOut } = useAuth()

  const [scrolled,    setScrolled]    = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  async function handleSignOut() {
    await signOut()
    router.push('/')
    setAccountOpen(false)
  }

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-5 sm:px-8 md:px-12 h-16
          border-b border-sl-border
          transition-all duration-200
          ${scrolled
            ? 'bg-[rgba(8,8,8,0.95)] backdrop-blur-xl'
            : 'bg-[rgba(8,8,8,0.8)]  backdrop-blur-md'}
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <Image src="/logo.png" alt="Modulifyr" width={28} height={28} className="flex-shrink-0" priority />
          <div className="font-syne font-bold text-[13px] text-sl-white leading-tight">
            Modulifyr Speedline
            <em className="block not-italic font-mono font-normal text-[9px] text-sl-orange tracking-[0.15em] uppercase">
              Desktop Game Studio
            </em>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-mono text-[10px] tracking-[0.1em] uppercase no-underline transition-colors duration-200
                  ${link.href === pathname ? 'text-sl-white' : 'text-sl-mid hover:text-sl-white'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <li>
                <Link href="/library"
                  className={`font-mono text-[10px] tracking-[0.1em] uppercase no-underline transition-colors duration-200
                    ${pathname === '/library' ? 'text-sl-white' : 'text-sl-mid hover:text-sl-white'}`}
                >
                  Library
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setAccountOpen(v => !v)}
                  className="w-7 h-7 bg-sl-orange flex items-center justify-center font-syne font-bold text-[11px] text-sl-white"
                  aria-label="Account menu"
                >
                  {(user.displayName?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()}
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[200px] bg-sl-surface border border-sl-border z-50">
                    <div className="px-4 py-3 border-b border-sl-border">
                      <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted truncate">{user.email}</p>
                    </div>
                    <Link href="/library" onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-sl-mid no-underline hover:text-sl-white hover:bg-sl-surface2 transition-colors">
                      My Library
                    </Link>
                    <button onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-sl-mid hover:text-sl-white hover:bg-sl-surface2 transition-colors border-t border-sl-border">
                      Sign Out
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth" className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline text-sl-mid hover:text-sl-white transition-colors duration-200">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/#cta"
                  className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline bg-sl-orange text-sl-white px-4 py-2 clip-nav-cta transition-colors duration-200 hover:bg-[#c93a28]">
                  Contact
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile right — account + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Link href="/library" className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-mid no-underline hover:text-sl-white">
              Library
            </Link>
          )}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="flex flex-col gap-1.5 p-1"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-5 h-px bg-sl-white transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-sl-white transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-sl-white transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-16 md:hidden">
          <div className="absolute inset-0 bg-[rgba(8,8,8,0.97)]" onClick={() => setMobileOpen(false)} />
          <nav className="relative z-10 border-b border-sl-border bg-sl-darker">
            <ul className="list-none px-5 py-4 flex flex-col gap-0.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 font-mono text-[11px] tracking-[0.12em] uppercase text-sl-mid no-underline hover:text-sl-white border-b border-sl-border transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user ? (
                <>
                  <li>
                    <Link href="/library" onClick={() => setMobileOpen(false)}
                      className="block py-3 font-mono text-[11px] tracking-[0.12em] uppercase text-sl-mid no-underline hover:text-sl-white border-b border-sl-border transition-colors">
                      Library
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut}
                      className="w-full text-left py-3 font-mono text-[11px] tracking-[0.12em] uppercase text-sl-muted hover:text-sl-white transition-colors">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/auth" onClick={() => setMobileOpen(false)}
                    className="block mt-3 text-center bg-sl-orange text-sl-white px-4 py-3 font-mono text-[10px] tracking-[0.12em] uppercase no-underline">
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}