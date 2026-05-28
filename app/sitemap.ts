import { MetadataRoute } from 'next'
import { games }         from '@/lib/games'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://speedline.modulifyr.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const gamePages = games.map(game => ({
    url:             `${BASE}/games/${game.id}`,
    lastModified:    new Date(),
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }))

  return [
    { url: BASE,                          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/games`,               lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/legal/terms`,         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/legal/privacy`,       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/legal/refund`,        lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    ...gamePages,
  ]
}
