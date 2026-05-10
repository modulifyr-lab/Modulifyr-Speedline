'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '/#games',        label: 'Games'       },
  { href: '/#about',        label: 'Studio'      },
  { href: '/#capabilities', label: 'What We Do'  },
  { href: '/#engines',      label: 'Engines'     },
  { href: '/games',         label: 'Shop'        },
]

export default function Nav() {
  const pathname    = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <div className="relative w-[30px] h-[30px] bg-sl-orange clip-nav-mark nav-mark-notch flex-shrink-0" />
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
      </ul>
    </nav>
  )
}
