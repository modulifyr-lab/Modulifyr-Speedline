'use client'

import Link              from 'next/link'
import Image             from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useAuth }        from '@/contexts/AuthContext'
import { useCart }        from '@/contexts/CartContext'
import CartDrawer         from './CartDrawer'
import SearchOverlay      from './SearchOverlay'

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
  const { user, signOut }          = useAuth()
  const { itemCount, openCart }    = useCart()
  const { setTheme, resolvedTheme } = useTheme()

  const [scrolled,      setScrolled]      = useState(false)
  const [accountOpen,   setAccountOpen]   = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [searchOpen,    setSearchOpen]    = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cmd/Ctrl+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const closeSearch = useCallback(() => setSearchOpen(false), [])

  async function handleSignOut() {
    await signOut()
    router.push('/')
    setAccountOpen(false)
  }

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-30
          flex items-center justify-between
          px-5 sm:px-8 md:px-12 h-16
          border-b transition-all duration-200
        `}
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: scrolled ? "rgba(var(--color-bg-rgb), 0.95)" : "rgba(var(--color-bg-rgb), 0.8)",
          backdropFilter: "blur(12px)"
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <Image src="/logo.png" alt="Modulifyr" width={28} height={28} className="flex-shrink-0" priority />
          <div className="font-syne font-bold text-[13px] leading-tight" style={{ color: 'var(--color-text)' }}>
            <span className="hidden sm:block">Modulifyr Speedline</span>
            <span className="sm:hidden">Speedline</span>
            <em className="block not-italic font-mono font-normal text-[9px] text-sl-orange tracking-[0.15em] uppercase">
              Desktop Game Studio
            </em>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 list-none">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href}
                className="font-mono text-[10px] tracking-[0.1em] uppercase no-underline transition-colors duration-200"
                style={{ color: link.href === pathname ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = link.href === pathname ? 'var(--color-text)' : 'var(--color-text-muted)')}
                >
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href="/library"
                className="font-mono text-[10px] tracking-[0.1em] uppercase no-underline transition-colors duration-200"
                style={{ color: pathname === '/library' ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = pathname === '/library' ? 'var(--color-text)' : 'var(--color-text-muted)')}
                >
                Library
              </Link>
            </li>
          )}
        </ul>

        {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center p-2 rounded-full transition-colors"
            aria-label="Toggle theme"
            style={{ color: "var(--color-text)" }}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        )}
        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-1.5 transition-colors p-1"
          aria-label="Search games (Ctrl+K)"
          style={{ color: "var(--color-text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:block font-mono text-[9px] tracking-[0.1em]" style={{ color: "var(--color-border)" }}>⌘K</span>
        </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex items-center transition-colors p-1"
            aria-label={`Cart (${itemCount} items)`}
            style={{ color: "var(--color-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 3h2l2.4 9.6A2 2 0 0 0 9.3 14H16a2 2 0 0 0 1.9-1.4L19 7H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="17" r="1" fill="currentColor" />
              <circle cx="16" cy="17" r="1" fill="currentColor" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 font-mono text-[8px] flex items-center justify-center px-0.5 leading-none" style={{ backgroundColor: "#E84530", color: "#F5F5F5" }}>
                {itemCount}
              </span>
            )}
          </button>

          {/* Auth — desktop */}
          {user ? (
            <div className="relative hidden md:block">
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
                  <Link href="/library" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-sl-mid no-underline hover:text-sl-white hover:bg-sl-surface2 transition-colors">My Library</Link>
                  <Link href="/account" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-sl-mid no-underline hover:text-sl-white hover:bg-sl-surface2 transition-colors">Account Settings</Link>
                  <Link href="/account/orders" onClick={() => setAccountOpen(false)} className="block px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-sl-mid no-underline hover:text-sl-white hover:bg-sl-surface2 transition-colors">Order History</Link>
                  <button onClick={handleSignOut} className="w-full text-left px-4 py-2.5 font-mono text-[10px] tracking-[0.1em] uppercase text-sl-muted hover:text-sl-white hover:bg-sl-surface2 transition-colors border-t border-sl-border">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="hidden md:block font-mono text-[10px] tracking-[0.12em] uppercase no-underline bg-sl-orange text-sl-white px-3.5 py-2 clip-nav-cta transition-colors hover:bg-[#c93a28]">
              Sign In
            </Link>
          )}

          {/* Hamburger — mobile */}
          <button onClick={() => setMobileOpen(v => !v)} className="flex md:hidden flex-col gap-1.5 p-1" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            <span className={`block w-5 h-px transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} style={{ backgroundColor: 'var(--color-text)' }} />
            <span className={`block w-5 h-px transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--color-text)' }} />
            <span className={`block w-5 h-px transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} style={{ backgroundColor: 'var(--color-text)' }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-20 pt-16 md:hidden">
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(var(--color-bg-rgb), 0.97)' }} onClick={() => setMobileOpen(false)} />
          <nav className="relative z-10 border-b border-sl-border" style={{ backgroundColor: 'var(--color-bg)' }}>
            <ul className="list-none px-5 py-4 flex flex-col gap-0.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 font-mono text-[11px] tracking-[0.12em] uppercase no-underline border-b border-sl-border transition-colors" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {user ? (
                <>
                  <li><Link href="/library" onClick={() => setMobileOpen(false)} className="block py-3 font-mono text-[11px] tracking-[0.12em] uppercase no-underline border-b border-sl-border transition-colors" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>Library</Link></li>
                  <li><Link href="/account" onClick={() => setMobileOpen(false)} className="block py-3 font-mono text-[11px] tracking-[0.12em] uppercase no-underline border-b border-sl-border transition-colors" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>Account Settings</Link></li>
                  <li><Link href="/account/orders" onClick={() => setMobileOpen(false)} className="block py-3 font-mono text-[11px] tracking-[0.12em] uppercase no-underline border-b border-sl-border transition-colors" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>Order History</Link></li>
                  <li><button onClick={handleSignOut} className="w-full text-left py-3 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}>Sign Out</button></li>
                </>
              ) : (
                <li><Link href="/auth" onClick={() => setMobileOpen(false)} className="block mt-3 text-center bg-sl-orange text-sl-white px-4 py-3 font-mono text-[10px] tracking-[0.12em] uppercase no-underline">Sign In</Link></li>
              )}
            </ul>
          </nav>
        </div>
      )}

      {/* Global overlays */}
      <CartDrawer />
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
    </>
  )
}