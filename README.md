# Modulifyr Speedline

Desktop game studio website for Modulifyr Speedline — a division of Modulifyr.

Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Deployable to Vercel.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS classes
- **Fonts**: Syne, DM Sans, JetBrains Mono (via `next/font/google`)
- **Auth**: Firebase Auth
- **Database**: Firebase Firestore
- **Payments**: Lemon Squeezy
- **Deployment**: Vercel

---

## Local Development

```bash
# Install dependencies
npm install

# Copy env example and fill in values
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
modulifyr-speedline/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, SpeedCanvas)
│   ├── globals.css             # Tailwind directives + custom CSS
│   ├── page.tsx                # Homepage
│   ├── auth/page.tsx           # Sign in / sign up page
│   ├── library/page.tsx        # User's game library (protected)
│   ├── games/
│   │   ├── page.tsx            # Games shop + catalog
│   │   └── [id]/page.tsx       # Individual game detail page
│   ├── legal/
│   │   ├── LegalLayout.tsx     # Layout for legal pages
│   │   ├── privacy/page.tsx    # Privacy policy
│   │   ├── terms/page.tsx      # Terms of service
│   │   └── refund/page.tsx     # Refund policy
│   ├── api/
│   │   ├── checkout/route.ts   # Stripe checkout API
│   │   └── webhook/route.ts    # Stripe webhook handler
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # Robots.txt
│   └── sitemap.ts              # Sitemap
├── components/
│   ├── SpeedCanvas.tsx         # Animated background (client)
│   ├── Reveal.tsx              # Scroll reveal wrapper (client)
│   ├── Nav.tsx                 # Fixed navigation (client)
│   ├── Hero.tsx                # Homepage hero
│   ├── Marquee.tsx             # Scrolling ticker
│   ├── GameCard.tsx            # Game card with buy/notify (client)
│   ├── GamesFilter.tsx         # Filter bar for shop page (client)
│   ├── BuyButton.tsx           # Purchase button with Stripe integration (client)
│   ├── About.tsx               # Studio about section
│   ├── Capabilities.tsx        # What we do
│   ├── Engines.tsx             # Engines + target platforms
│   ├── Process.tsx             # Dev process steps
│   ├── CTA.tsx                 # Call to action
│   └── Footer.tsx              # Site footer
├── contexts/
│   └── AuthContext.tsx         # Firebase auth context
├── lib/
│   ├── games.ts                # Game data types + seed data
│   ├── purchases.ts            # Purchase utilities
│   ├── firebase.ts             # Firebase client config
│   ├── firebase-server.ts      # Firebase admin config
│   └── lemonsqueezy.ts         # Lemon Squeezy config
├── middleware.ts               # Next.js middleware for route protection
└── public/
    └── logo.png                # Logo
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in all required values:

- Firebase (client and admin)
- Lemon Squeezy (API key, store ID, webhook secret)
- Base URL

---

## Deploying to Vercel

1. Push this repo to GitHub (new repo, separate from the main Modulifyr site).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel will auto-detect Next.js. No build config changes needed.
4. Add all environment variables from `.env.local` to **Project Settings → Environment Variables**.
5. Set your custom domain in **Project Settings → Domains**.
   - Recommended: `speedline.modulifyr.com` (add a CNAME to your DNS)
   - Or a standalone domain like `modulifyrspeedline.com`

---

## Adding a New Game

Edit `lib/games.ts` and add a new entry to the `games` array:

```ts
{
  id:                   'your-game-id',
  title:                'Your Game Title',
  genre:                'Genre',
  description:          'Short description shown on cards.',
  longDescription:      'Longer description for the game detail page (optional).',
  status:               'in-development',     // 'available' | 'in-development' | 'concept' | 'coming-soon'
  platforms:            ['windows'],          // 'windows' | 'mac' | 'linux'
  price:                null,                 // number (e.g. 14.99) or null for TBD, 0 for free
  lemonSqueezyVariantId: null,                // Lemon Squeezy variant ID (from Lemon Squeezy dashboard)
  downloadUrl:          null,                 // Direct download link once shipped
  steamUrl:             null,                 // string URL or null
  directUrl:            null,                 // Legacy
  featured:             false,
  icon:                 '🎮',                 // Emoji placeholder until real cover art
  artGradient:          'linear-gradient(135deg, #0a0a1a 0%, #1C1C1C 100%)',
  engine:               'Unity',              // 'Unity' | 'Unreal Engine' | 'Godot' | 'Custom'
  releaseYear:          '2025',               // Optional
  tags:                 ['tag1', 'tag2'],     // Optional
  dlcs:                 [],                   // Optional DLC array
}
```

When `status` is `'available'` and `lemonSqueezyVariantId` is set, the buy button will appear automatically.

### Adding DLCs

You can add DLCs to a game by adding entries to the `dlcs` array:

```ts
dlcs: [
  {
    id:                   'your-dlc-id',
    title:                'DLC Title',
    description:          'Short description of the DLC.',
    price:                9.99,
    lemonSqueezyVariantId: '...',              // From Lemon Squeezy dashboard
    downloadUrl:          'https://...',       // Optional
    releaseYear:          '2025',              // Optional
  }
]
```

---

## Adding Real Cover Art

Replace the emoji placeholder in `GameCard.tsx` and `app/games/[id]/page.tsx`:

1. Add your image to `/public/games/<game-id>.jpg`
2. Update the components to use `next/image`

---

## Brand

This site follows the Modulifyr brand guide:
- **Colors**: Orange `#E84530`, Blue `#2B7FA8`, Amber `#F5B52E`, Cyan `#2FB8C8`
- **Fonts**: Syne (headings), DM Sans (body), JetBrains Mono (labels)
- All brand tokens are prefixed `sl-` in `tailwind.config.ts`

---

## Future Pages to Add

- `/press` — Press kit and media downloads  
- `/blog` — Dev log / studio updates
