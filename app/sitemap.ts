import type { MetadataRoute } from 'next'
import { games }              from '@/lib/games'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://speedline.modulifyr.com'
  const now  = new Date()

  const gamePages: MetadataRoute.Sitemap = games.map(game => ({
    url:             `${base}/games/${game.id}`,
    lastModified:    now,
    changeFrequency: 'weekly' as const,
    priority:        game.status === 'available' ? 0.9 : 0.7,
  }))

  return [
    // Core public pages
    { url: `${base}/`,            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/games`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/support`,     lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // Game detail pages
    ...gamePages,

    // Legal pages
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/terms`,   lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/refund`,  lastModified: now, changeFrequency: 'yearly', priority: 0.3 },

    // NOTE: /auth, /library, /account, /account/orders, /account/wishlist
    // are intentionally excluded — they are authenticated routes and should
    // not be crawled or indexed.
  ]
}
