# Modulifyr Speedline

Desktop game studio website for Modulifyr Speedline — a division of Modulifyr.

Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Deployable to Vercel.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS classes
- **Fonts**: Syne, DM Sans, JetBrains Mono (via `next/font/google`)
- **Deployment**: Vercel

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
modulifyr-speedline/
├── app/
│   ├── layout.tsx        # Root layout (fonts, metadata, SpeedCanvas)
│   ├── globals.css       # Tailwind directives + custom CSS
│   ├── page.tsx          # Homepage
│   └── games/
│       └── page.tsx      # Games shop + catalog
├── components/
│   ├── SpeedCanvas.tsx   # Animated background (client)
│   ├── Reveal.tsx        # Scroll reveal wrapper (client)
│   ├── Nav.tsx           # Fixed navigation (client)
│   ├── Hero.tsx          # Homepage hero
│   ├── Marquee.tsx       # Scrolling ticker
│   ├── GameCard.tsx      # Game card with buy/notify (client)
│   ├── GamesFilter.tsx   # Filter bar for shop page (client)
│   ├── About.tsx         # Studio about section
│   ├── Capabilities.tsx  # What we do
│   ├── Engines.tsx       # Engines + target platforms
│   ├── Process.tsx       # Dev process steps
│   ├── CTA.tsx           # Call to action
│   └── Footer.tsx        # Site footer
└── lib/
    └── games.ts          # Game data types + seed data
```

---

## Deploying to Vercel

1. Push this repo to GitHub (new repo, separate from the main Modulifyr site).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel will auto-detect Next.js. No build config changes needed.
4. Set your custom domain in **Project Settings → Domains**.
   - Recommended: `speedline.modulifyr.com` (add a CNAME to your DNS)
   - Or a standalone domain like `modulifyrspeedline.com`

No environment variables are required for the base site.

---

## Adding a New Game

Edit `lib/games.ts` and add a new entry to the `games` array:

```ts
{
  id:          'your-game-id',
  title:       'Your Game Title',
  genre:       'Genre',
  description: 'Short description shown on cards.',
  status:      'in-development',     // 'available' | 'in-development' | 'concept' | 'coming-soon'
  platforms:   ['windows'],          // 'windows' | 'mac' | 'linux'
  price:       null,                 // number (e.g. 14.99) or null for TBD
  steamUrl:    null,                 // string URL or null
  directUrl:   null,                 // string URL or null
  featured:    false,
  icon:        '🎮',                 // Emoji placeholder until real cover art
  artGradient: 'linear-gradient(135deg, #0a0a1a 0%, #1C1C1C 100%)',
  engine:      'Unity',
}
```

When `status` is `'available'` and `directUrl` is set, the Buy Direct button appears automatically.

---

## Adding Real Cover Art

Replace the emoji placeholder in `GameCard.tsx`:

1. Add your image to `/public/games/<game-id>.jpg`
2. In `GameCard.tsx`, replace the emoji `<span>` in `.gc-art-ph` with:
   ```tsx
   import Image from 'next/image'
   // ...
   <Image src={`/games/${game.id}.jpg`} alt={game.title} fill className="object-cover" />
   ```

---

## Brand

This site follows the Modulifyr brand guide:
- **Colors**: Orange `#E84530`, Blue `#2B7FA8`, Amber `#F5B52E`, Cyan `#2FB8C8`
- **Fonts**: Syne (headings), DM Sans (body), JetBrains Mono (labels)
- All brand tokens are prefixed `sl-` in `tailwind.config.ts`

---

## Future Pages to Add

- `/games/[id]` — Individual game detail page
- `/press` — Press kit and media downloads  
- `/blog` — Dev log / studio updates
