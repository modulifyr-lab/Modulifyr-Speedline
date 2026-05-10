import type { Config } from 'tailwindcss'

/**
 * Tailwind v4 note:
 * All design tokens (colors, fonts, animations, keyframes) are defined in
 * globals.css via the @theme block — that is the v4 source of truth.
 * This file only needs to declare content paths for class scanning.
 * Duplicating tokens here alongside @theme causes conflicts; keep tokens in CSS only.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
}

export default config