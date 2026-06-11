# Speedline — Fix Batch Delivery

All files below are drop-in replacements. Copy each into your repo at the matching path.
No new dependencies. No schema changes. No breaking changes to existing data.

---

## Files Changed (20 total)

### Legal

| File | Change |
|---|---|
| `app/legal/terms/page.tsx` | Replaced "Stripe" with "Paddle" throughout Section 6. Updated `lastUpdated` to June 2026. |
| `app/legal/refund/page.tsx` | Replaced "Stripe" with "Paddle" in refund processing section. Updated `lastUpdated`. |

### Components

| File | Change |
|---|---|
| `components/Footer.tsx` | Fixed broken Contact link (`modulifyr.com` → `mailto:hello@modulifyr.com`). Added X, Discord, YouTube social icons with correct hrefs. Press Kit now links to `mailto:press@modulifyr.com`. |
| `components/CTA.tsx` | Rewrote copy from work-for-hire framing ("Have a Game Worth Building?") to product-studio framing ("More Games Are Coming."). CTAs now point to `/games` and Discord instead of `mailto:hello@modulifyr.com`. |
| `components/GameCard.tsx` | Fixed icon rendering — uses `isIconFile()` to detect filename vs emoji and renders `<Image>` vs text accordingly. Replaced fake `setNotified(true)` with redirect to game detail `#notify` anchor (where real `NotifyButton` lives). Uses `next/image` for cover art. |
| `components/CartDrawer.tsx` | Fixed icon rendering — filename icons now render as `<Image>` with correct fill sizing. |
| `components/SearchOverlay.tsx` | Genre chips now derived from `getGenres()` — no more hardcoded genres that don't match the actual catalog. Fixed icon rendering in result thumbnails. |
| `components/NotifyButton.tsx` | **New file.** Auth-aware notify button that calls `POST /api/notify`. Checks Firestore on mount to show correct subscribed state. Handles loading, success, error, and unauthenticated states. Replaces the fake button pattern in `GameCard`. |

### App Pages

| File | Change |
|---|---|
| `app/page.tsx` | Homepage grid is now adaptive: 1 game = full width, 2 games = 2-col, 3+ games = 3-col with featured spanning 2. No more empty grid slots. |
| `app/library/page.tsx` | Fixed icon rendering in `LibraryCard` — filename icons render as `<Image>`. |
| `app/account/orders/page.tsx` | Fixed icon rendering in order line items. Renamed "Session ID" label to "Transaction ID" (more accurate for Paddle). |
| `app/account/wishlist/page.tsx` | **New file.** Fully implemented wishlist page — reads from Firestore, displays all wishlisted games with status badges and remove buttons. Fixes the dead link in Account Settings. |
| `app/games/[id]/page.tsx` | Hero now uses `next/image` with `fill` + `priority`. Screenshots use `next/image`. Added OG image metadata from game icon. Non-available games show `NotifyButton` in the purchase panel instead of nothing. |
| `app/api/notify/route.ts` | Fixed validation (was missing type checks). Added `gameId` to stored document. Normalises email to lowercase. |
| `app/sitemap.ts` | Removed `/account`, `/account/orders`, `/auth` — authenticated routes must not be indexed. Added dynamic game detail pages derived from `lib/games.ts`. |

### Lib / Config

| File | Change |
|---|---|
| `lib/games.ts` | Removed Paddle price ID from BANJHAKRI (must be null while `in-development`). Added `isIconFile()` utility — all components use this instead of inline checks. Added `getGenres()` utility for dynamic search chips. Clarified comments on `icon` and `paddlePriceId` fields. |
| `lib/firebase-server.ts` | Added module-level cache for the Firestore instance. `getServerDb()` no longer calls `signInWithEmailAndPassword` on every webhook hit — only on cold start or if auth has lapsed. Concurrent calls are deduplicated with a single shared promise. |
| `contexts/CartContext.tsx` | After auth state settles, runs a Firestore ownership check against all items in the cart and removes any the user already owns. Prevents stale post-purchase cart entries. |
| `next.config.mjs` | Added `images` config block with comment explaining local public file handling. Required for `next/image` with local `/public` sources. |
| `README.md` | Updated: Paddle (not LemonSqueezy/Stripe), Tailwind v4, correct project structure, `isIconFile()` usage rules, Firestore security rules, Paddle webhook setup instructions. |

---

## What Is NOT in This Batch

These were flagged in the audit but require decisions or infra you need to set up first:

- **Dynamic OG images** — needs `next/og` setup and design decisions on layout. Deferred.
- **Hero stat copy ("0×")** — purely copy, change it in `Hero.tsx` directly.
- **Admin SDK migration** — `firebase-server.ts` caching is a short-term fix. For production scale, migrate to `firebase-admin` with a service account JSON in an env variable. Left as a noted TODO in the file.
- **Social URLs** — placeholders in `Footer.tsx` use `twitter.com/modulifyr`, `discord.gg/modulifyr`, `youtube.com/@modulifyr`. Update these to your actual handles before going live.

---

## Deployment Steps After Merge

1. Deploy normally — no migration scripts, no env var changes needed.
2. Verify `speedline.modulifyr.com/legal/terms` — confirm "Paddle" appears in Section 6.
3. Verify `speedline.modulifyr.com/legal/refund` — confirm "Paddle" appears in refund processing section.
4. Test the `/account/wishlist` route while logged in.
5. Update social URLs in `Footer.tsx` with real handles before launch.
