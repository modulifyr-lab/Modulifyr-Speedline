import type { Metadata } from 'next'
import Link   from 'next/link'
import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title:       'Support — Modulifyr Speedline',
  description: 'Help, FAQ, and support for Modulifyr Speedline game purchases.',
}

const FAQS = [
  {
    category: 'Purchases & Ownership',
    items: [
      {
        q: 'What does "buy once, own forever" mean?',
        a: 'When you buy a game from Speedline, you own it permanently. There are no subscriptions, no expiry dates, and no fees. All future patches for the game are included at no extra cost. Your downloaded files are yours to keep and play whenever you want.',
      },
      {
        q: 'Can I play the game after Modulifyr Speedline closes?',
        a: 'Yes. Single-player games require no server connection — they run entirely from your local installation, so studio closure changes nothing. Multiplayer games are built with player-hosted server support from day one, so you can connect to community servers indefinitely.',
      },
      {
        q: 'Can I resell my game?',
        a: 'No. Purchases are tied to your account and are non-transferable. You cannot resell, gift, or transfer a game to another account.',
      },
      {
        q: 'Do you have DRM?',
        a: 'Direct purchases from this site have no DRM. Steam purchases are subject to Steam&apos;s own DRM policies.',
      },
      {
        q: 'Can I use a discount code?',
        a: 'Yes. Discount codes can be entered directly on the Paddle checkout page. If you have a valid code, it will be applied before payment.',
      },
    ],
  },
  {
    category: 'Downloads & Installation',
    items: [
      {
        q: 'Where do I download my games?',
        a: 'After purchase, your games appear in your Library. Each game has a Download button once the build is available. If a game is still in development, the download will appear when it ships.',
      },
      {
        q: 'How many times can I download a game?',
        a: 'Unlimited. Download it on any device you own, as many times as you need.',
      },
      {
        q: 'What operating systems are supported?',
        a: 'Each game lists its supported platforms on the game page. Most titles support Windows. Selected titles also support macOS and Linux.',
      },
      {
        q: 'I bought the game but it&apos;s not in my library.',
        a: 'Library updates are processed by Paddle webhook, which typically takes a few seconds. Wait one minute and refresh your library page. If it still hasn&apos;t appeared after 10 minutes, contact support with your purchase confirmation email.',
      },
    ],
  },
  {
    category: 'Refunds',
    items: [
      {
        q: 'What is your refund policy?',
        a: 'You can request a refund within 48 hours of purchase. After 48 hours, purchases are final. See the full Refund Policy for details.',
      },
      {
        q: 'How do I request a refund?',
        a: 'Email support@modulifyr.com with the subject "Refund Request" and include the email on your account and the game name. We will respond within 2 business days.',
      },
      {
        q: 'I initiated a chargeback instead of requesting a refund.',
        a: 'Chargebacks bypass our refund process and result in immediate account termination per our Terms of Service. If you need a refund, always contact us directly first.',
      },
    ],
  },
  {
    category: 'Account',
    items: [
      {
        q: 'Can I change my email or password?',
        a: 'Yes. Go to Account Settings from the navigation menu after signing in.',
      },
      {
        q: 'I forgot my password.',
        a: 'On the sign-in page, click "Forgot password?" and enter your email. You will receive a reset link.',
      },
      {
        q: 'Can I delete my account?',
        a: 'Yes. Go to Account Settings → Delete Account. Note that purchase records are retained for accounting purposes but your login access will be removed.',
      },
    ],
  },
]

export default function SupportPage() {
  return (
    <>
      <Nav />

      {/* Header */}
      <section className="relative z-10 pt-32 pb-12 border-b border-sl-border">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12">
          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-sl-orange mb-3">
            Support
          </span>
          <h1 className="font-syne font-extrabold text-[32px] sm:text-[40px] text-sl-white leading-tight mb-2">
            Help & FAQ
          </h1>
          <p className="text-sl-muted text-[14px] leading-relaxed max-w-[520px]">
            Answers to common questions about purchases, downloads, refunds, and accounts.
            Can&apos;t find what you need? Email us directly.
          </p>
          <a
            href="mailto:support@modulifyr.com"
            className="inline-flex items-center gap-2 mt-5 bg-sl-orange text-sl-white px-5 py-2.5 font-mono text-[10px] tracking-[0.12em] uppercase no-underline clip-btn hover:bg-[#c93a28] transition-colors"
          >
            Contact Support
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-[64px]">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col gap-12">
          {FAQS.map(section => (
            <div key={section.category}>
              <h2 className="font-syne font-bold text-[18px] text-sl-white mb-1">{section.category}</h2>
              <div className="w-7 h-0.5 bg-sl-orange mb-5" />
              <div className="flex flex-col gap-0.5">
                {section.items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}

          {/* Legal links */}
          <div className="border-t border-sl-border pt-8">
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-sl-muted mb-3">
              Legal documents
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: '/legal/terms',   label: 'Terms of Service' },
                { href: '/legal/privacy', label: 'Privacy Policy'   },
                { href: '/legal/refund',  label: 'Refund Policy'    },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="font-mono text-[9px] tracking-[0.1em] uppercase border border-sl-border text-sl-mid px-4 py-2 no-underline hover:border-sl-white hover:text-sl-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-sl-surface border border-sl-border px-6 py-4 cursor-pointer [&[open]]:border-[rgba(232,69,48,0.3)]">
      <summary className="flex items-center justify-between gap-4 list-none font-syne font-bold text-[14px] text-sl-white select-none">
        {q}
        <svg
          className="flex-shrink-0 text-sl-muted transition-transform duration-200 group-open:rotate-180"
          width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
        >
          <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <p className="mt-3 text-sl-light text-[13px] leading-[1.8]">{a}</p>
    </details>
  )
}