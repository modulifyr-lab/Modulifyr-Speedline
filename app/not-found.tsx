import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-sl-darker flex items-center justify-center px-12">
      <div className="text-center">
        {/* Large 404 display */}
        <div
          className="font-syne font-extrabold leading-none tracking-tight mb-6 select-none"
          style={{
            fontSize: 'clamp(96px, 18vw, 200px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(245,245,245,0.08)',
          }}
          aria-hidden="true"
        >
          404
        </div>

        {/* Label */}
        <span className="block font-mono text-[10px] tracking-[0.25em] uppercase text-sl-orange mb-4">
          Page Not Found
        </span>

        {/* Message */}
        <p className="text-sl-mid text-[15px] leading-[1.7] max-w-[360px] mx-auto mb-9">
          This route does not exist. The requested page was not found on this server.
        </p>

        {/* Accent rule */}
        <div className="w-9 h-0.5 bg-sl-orange mx-auto mb-9" />

        {/* Actions */}
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 bg-sl-orange text-sl-white
                       px-6 py-3 font-mono text-[10px] tracking-[0.12em] uppercase
                       no-underline clip-btn transition-all duration-200
                       hover:bg-[#c93a28]"
          >
            Return to Studio
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-sl-mid font-mono text-[10px]
                       tracking-[0.12em] uppercase no-underline pb-2.5
                       border-b border-sl-border transition-colors duration-200
                       hover:text-sl-white hover:border-sl-mid"
          >
            Browse Games →
          </Link>
        </div>
      </div>
    </main>
  )
}
