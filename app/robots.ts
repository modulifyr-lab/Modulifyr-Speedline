import { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://modulifyr-speedline.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/library', '/auth', '/api/'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}