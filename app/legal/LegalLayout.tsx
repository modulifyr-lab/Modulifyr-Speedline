'use client'

import Link            from 'next/link'
import Nav             from '@/components/Nav'
import Footer          from '@/components/Footer'
import { ReactNode }   from 'react'

interface LegalLayoutProps {
  title:       string
  subtitle:    string
  lastUpdated: string
  children:    ReactNode
}

export default function LegalLayout({ title, subtitle, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <Nav />

      {/* Header */}
      <section className="relative z-10 pt-32 pb-12 border-b border-sl-border">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link href="/" className="font-mono text-[9px] tracking-[0.12em] uppercase no-underline transition-colors" style={{ color: 'var(--color-text-muted)' }} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'}>
              Home
            </Link>
            <span className="font-mono text-[9px]" style={{ color: 'var(--color-border)' }}>/</span>
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase" style={{ color: 'var(--color-text-muted)' }}>Legal</span>
            <span className="font-mono text-[9px]" style={{ color: 'var(--color-border)' }}>/</span>
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-orange">{title}</span>
          </div>
          <h1 className="font-syne font-extrabold text-[32px] sm:text-[40px] leading-tight mb-2" style={{ color: 'var(--color-text)' }}>
            {title}
          </h1>
          <p className="text-[14px]" style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>
          <p className="font-mono text-[9px] tracking-[0.1em] uppercase mt-3" style={{ color: 'var(--color-border)' }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Legal nav strip */}
      <div className="relative z-10 border-b border-sl-border" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="flex gap-6 py-3 overflow-x-auto">
            {[
              { href: '/legal/terms',   label: 'Terms of Service' },
              { href: '/legal/privacy', label: 'Privacy Policy'   },
              { href: '/legal/refund',  label: 'Refund Policy'    },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[9px] tracking-[0.12em] uppercase whitespace-nowrap no-underline transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)'}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="relative z-10 py-[64px]">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="legal-content">
            {children}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}