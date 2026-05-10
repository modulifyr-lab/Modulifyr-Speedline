'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const NAV_LINKS = [
  { href: '/#games',        label: 'Games'       },
  { href: '/#about',        label: 'Studio'      },
  { href: '/#capabilities', label: 'What We Do'  },
  { href: '/#engines',      label: 'Engines'     },
  { href: '/games',         label: 'Shop'        },
]

export default function Nav() {
  const pathname    = usePathname()
  const router      = useRouter()
  const { user, loading, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)

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
      {/* Logo — actual company PNG; place file at /public/logo.png */}
      <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Modulifyr"
          width={28}
          height={28}
          className="flex-shrink-0"
          priority
        />
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
            ? pathname.startsWith('/games')
            : pathname === '/'
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  font-mono text-[10px] tracking-[0.1em] uppercase no-underline
                  transition-colors duration-200
                  ${isActive && link.href === pathname
                    ? 'text-sl-white'
                    : 'text-sl-mid hover:text-sl-white'}
                `}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
        
        {user ? (
          <>
            <li>
              <Link
                href="/library"
                className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline
                           text-sl-cyan hover:text-sl-white transition-colors"
              >
                Library
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline
                           border border-sl-border text-sl-light px-4 py-2
                           transition-colors duration-200 hover:border-sl-mid hover:text-sl-white"
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              href="/auth"
              className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline
                       bg-sl-orange text-sl-white px-4 py-2 clip-nav-cta
                       transition-colors duration-200 hover:bg-[#c93a28]"
            >
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}