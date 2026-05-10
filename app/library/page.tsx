'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getUserLibrary, LibraryEntry } from '@/lib/purchases'
import Nav from '@/components/Nav'

export default function LibraryPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [library, setLibrary] = useState<LibraryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth')
      return
    }

    async function loadLibrary() {
      if (!user) return
      try {
        const data = await getUserLibrary(user.uid)
        setLibrary(data)
      } catch (err) {
        console.error('[library] Failed to load library:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) loadLibrary()
  }, [user, authLoading, router])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-sl-darker flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-sl-muted">
          Loading...
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sl-darker">
      <Nav />
      
      <main className="pt-24 pb-16 px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href="/" className="font-mono text-[9px] tracking-[0.15em] uppercase text-sl-muted hover:text-sl-white transition-colors mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="font-syne font-extrabold text-[36px] text-sl-white mb-2">
              Your Library
            </h1>
            <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-sl-muted">
              {library.length} {library.length === 1 ? 'item' : 'items'} purchased
            </p>
          </div>

          {library.length === 0 ? (
            <div className="text-center py-20 border border-sl-border bg-sl-surface/30">
              <div className="font-syne font-bold text-[20px] text-sl-white mb-3">
                Your library is empty
              </div>
              <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-sl-muted mb-6">
                Browse the shop to get started
              </p>
              <Link
                href="/games"
                className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline
                           bg-sl-orange text-sl-white px-6 py-3 clip-btn
                           transition-colors duration-200 hover:bg-[#c93a28]"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {library.map((item) => (
                <div
                  key={item.gameId}
                  className="border border-sl-border bg-sl-surface/20 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-sl-orange mb-1 block">
                        {item.type === 'game' ? 'Game' : 'DLC'}
                      </span>
                      <h3 className="font-syne font-bold text-[18px] text-sl-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">
                      Purchased: {item.purchasedAt.toDate().toLocaleDateString()}
                    </div>
                    
                    {item.downloadUrl ? (
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] tracking-[0.12em] uppercase no-underline
                                   bg-sl-cyan text-sl-darker px-4 py-2 inline-block
                                   transition-colors duration-200 hover:bg-[#00d4ff]"
                      >
                        Download
                      </a>
                    ) : (
                      <div className="font-mono text-[9px] tracking-[0.1em] uppercase text-sl-muted">
                        Download coming soon
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
