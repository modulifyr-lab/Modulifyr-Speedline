'use client'

import Link          from 'next/link'
import Image         from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState }    from 'react'
import { useAuth }   from '@/contexts/AuthContext'

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

  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  async function handleSignOut() {
    await signOut()
    router.push('/')
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-12 h-16
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

      {/* Links */}
      <ul className="hidden md:flex items-center gap-7 list-none">
        {NAV_LINKS.map(link => {
          const isActive = link.href === '/games'
            ? pathname === '/games'
            : pathname === '/'
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  font-mono text-[10px] tracking-[0.1em] uppercase no-underline
                  transition-colors duration-200
                  ${isActive && link.href === pathname ? 'text-sl-white' : 'text-sl-mid hover:text-sl-white'}
                `}
              >
                {link.label}
              </Link>
            </li>
          )
        })}

        {/* Auth section */}
        {user ? (
          <>
            <li>
              <Link
                href="/library"
                className={`
                  font-mono text-[10px] tracking-[0.1em] uppercase no-underline
                  transition-colors duration-200
                  ${pathname === '/library' ? 'text-sl-white' : 'text-sl-mid hover:text-sl-white'}
                `}
              >
                Library
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] uppercase
                           text-sl-mid hover:text-sl-white transition-colors duration-200"
                aria-label="Account menu"
              >
                <div className="w-6 h-6 bg-sl-orange flex items-center justify-center text-[10px] font-syne font-bold text-sl-white">
                  {(user.displayName?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-[200px] bg-sl-surface border border-sl-border shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-sl-border">
                    <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/library"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase
                               text-sl-mid no-underline hover:text-sl-white hover:bg-sl-surface2 transition-colors"
                  >
                    My Library
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMenuOpen(false) }}
                    className="w-full text-left px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase
                               text-sl-mid hover:text-sl-white hover:bg-sl-surface2 transition-colors border-t border-sl-border"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/auth"
                className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline
                           text-sl-mid hover:text-sl-white transition-colors duration-200"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/#cta"
                className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline
                           bg-sl-orange text-sl-white px-4 py-2 clip-nav-cta
                           transition-colors duration-200 hover:bg-[#c93a28]"
              >
                Contact
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}