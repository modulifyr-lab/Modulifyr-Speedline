# Modulifyr Speedline

Desktop game studio website for Modulifyr Speedline — a division of Modulifyr.

Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS v4**. Deployable to Vercel.

---

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS via `@theme` in `globals.css`
- **Fonts**: Syne, DM Sans, JetBrains Mono (via `next/font/google`)
- **Auth**: Firebase Auth (email/password + Google)
- **Database**: Firebase Firestore
- **Payments**: Paddle Billing (chosen over LemonSqueezy — supports Nepal payouts via Wise/PayPal)
- **Deployment**: Vercel

---

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in all values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Console → Project Settings → Your apps |
| `FIREBASE_WEBHOOK_EMAIL` | A dedicated Firebase Auth user for server-side writes |
| `FIREBASE_WEBHOOK_PASSWORD` | Password for the above user |
| `PADDLE_API_KEY` | Paddle Dashboard → Developer Tools → Authentication |
| `PADDLE_WEBHOOK_SECRET` | Paddle Dashboard → Developer Tools → Notifications → your endpoint |
| `PADDLE_ENVIRONMENT` | `sandbox` for testing, `production` for live |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` locally, your domain in production |

---

## Project Structure

```
modulifyr-speedline/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Tailwind v4 @theme + custom CSS
│   ├── page.tsx                    # Homepage
│   ├── auth/page.tsx               # Sign in / sign up
│   ├── library/page.tsx            # User game library (protected)
│   ├── account/
│   │   ├── page.tsx                # Account settings (protected)
│   │   ├── orders/page.tsx         # Order history (protected)
│   │   └── wishlist/page.tsx       # Wishlist (protected)
│   ├── games/
│   │   ├── page.tsx                # Games shop + catalog
│   │   └── [id]/page.tsx           # Game detail page
│   ├── legal/
│   │   ├── LegalLayout.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── refund/page.tsx
│   ├── api/
│   │   ├── checkout/route.ts       # Paddle checkout API
│   │   ├── webhook/paddle/route.ts # Paddle webhook handler
│   │   └── notify/route.ts         # Game launch notification subscriptions
│   ├── support/page.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── SpeedCanvas.tsx             # Animated background
│   ├── Reveal.tsx                  # Scroll reveal wrapper
│   ├── Nav.tsx                     # Navigation
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── GameCard.tsx                # Game card — handles image/emoji icons
│   ├── GamesFilter.tsx
│   ├── BuyButton.tsx               # Purchase button (Paddle)
│   ├── NotifyButton.tsx            # Launch notification subscription
│   ├── WishlistButton.tsx
│   ├── CartDrawer.tsx
│   ├── SearchOverlay.tsx           # Cmd+K search (genre chips derived from catalog)
│   ├── About.tsx
│   ├── Capabilities.tsx
│   ├── Engines.tsx
│   ├── Process.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── ThemeProvider.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── CartContext.tsx             # Prunes owned items on auth state change
├── lib/
│   ├── games.ts                    # Game data + isIconFile() utility
│   ├── purchases.ts
│   ├── wishlist.ts
│   ├── firebase.ts
│   ├── firebase-server.ts          # Cached server-side Firestore auth
│   └── paddle.ts
├── middleware.ts
└── public/
    ├── logo.png
    └── banjhakri.png               # Game cover art
```

---

## Adding a New Game

Edit `lib/games.ts`. Key rules:

- `paddlePriceId`: **only set when the game is published and priced in Paddle Catalog** (format: `pri_...`). Leave `null` for `in-development` / `concept` games.
- `icon`: use a filename in `/public` (e.g. `"mygame.png"`) for real art, or an emoji character as a placeholder. Components use `isIconFile(icon)` to decide whether to render `<Image>` or text — do not mix formats.
- `price`: set to a number only when `status` is `'available'`. Keep `null` otherwise.

```ts
{
  id:            'my-game-id',
  title:         'My Game',
  genre:         'Action',
  description:   'Short description.',
  status:        'in-development',    // 'available' | 'in-development' | 'concept' | 'coming-soon'
  platforms:     ['windows'],
  price:         null,                // set when available
  paddlePriceId: null,                // set when available + priced in Paddle
  downloadUrl:   null,
  steamUrl:      null,
  directUrl:     null,
  featured:      false,
  icon:          'mygame.png',        // or '🎮' emoji placeholder
  artGradient:   'linear-gradient(135deg, #0a0a1a 0%, #1C1C1C 100%)',
  engine:        'Unity',
  tags:          ['action', 'roguelike'],
  dlcs:          [],
}
```

---

## Deploying to Vercel

1. Push repo to GitHub.
2. Vercel → **Add New Project** → import.
3. Add all environment variables from `.env.local` to **Project Settings → Environment Variables**.
4. Set custom domain: `speedline.modulifyr.com` (CNAME to Vercel).
5. In Paddle Dashboard → Notifications, add your webhook endpoint: `https://speedline.modulifyr.com/api/webhook/paddle`

---

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/library/{item} {
      allow read:  if request.auth.uid == uid;
      allow write: if request.auth.uid == 'WEBHOOK_USER_UID';
    }
    match /users/{uid}/wishlist/{gameId} {
      allow read, write: if request.auth.uid == uid;
    }
    match /gameNotifications/{gameId}/subscribers/{uid} {
      allow read:  if request.auth.uid == uid;
      allow write: if request.auth.uid == uid
                   || request.auth.uid == 'WEBHOOK_USER_UID';
    }
  }
}
```

Replace `WEBHOOK_USER_UID` with the UID of your `FIREBASE_WEBHOOK_EMAIL` user (visible in Firebase Console → Authentication).

---

## Brand

- **Colors**: Orange `#E84530`, Blue `#2B7FA8`, Amber `#F5B52E`, Cyan `#2FB8C8`
- **Fonts**: Syne (headings), DM Sans (body), JetBrains Mono (labels/mono)
- All brand tokens are defined in `globals.css` under `@theme`

---

## Future Pages

- `/press` — Press kit and media downloads
- `/blog` — Dev log / studio updates
