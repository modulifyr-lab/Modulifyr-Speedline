import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://speedline.modulifyr.com'

  return [
    // Core pages
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/games`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/account`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/account/orders`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/auth`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },

    // Legal pages
    { url: `${base}/legal/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/legal/refund`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
