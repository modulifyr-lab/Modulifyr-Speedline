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
            <Link href="/" className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted no-underline hover:text-sl-white transition-colors">
              Home
            </Link>
            <span className="text-sl-border font-mono text-[9px]">/</span>
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-muted">Legal</span>
            <span className="text-sl-border font-mono text-[9px]">/</span>
            <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-sl-orange">{title}</span>
          </div>
          <h1 className="font-syne font-extrabold text-[32px] sm:text-[40px] text-sl-white leading-tight mb-2">
            {title}
          </h1>
          <p className="text-sl-muted text-[14px]">{subtitle}</p>
          <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-border mt-3">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Legal nav strip */}
      <div className="relative z-10 border-b border-sl-border bg-sl-surface">
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
                className="font-mono text-[9px] tracking-[0.12em] uppercase whitespace-nowrap
                           text-sl-muted no-underline hover:text-sl-white transition-colors"
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