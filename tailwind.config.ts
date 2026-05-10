import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent colors
        'sl-orange':  '#E84530',
        'sl-blue':    '#2B7FA8',
        'sl-amber':   '#F5B52E',
        'sl-cyan':    '#2FB8C8',
        'sl-green':   '#22C55E',
        // Background / surface hierarchy
        'sl-darker':  '#080808',
        'sl-dark':    '#0D0D0D',
        'sl-surface': '#141414',
        'sl-surface2':'#1C1C1C',
        'sl-border':  '#242424',
        // Text scale
        'sl-muted':   '#5A5A5A',
        'sl-mid':     '#8A8A8A',
        'sl-light':   '#D4D4D4',
        'sl-white':   '#F5F5F5',
      },
      fontFamily: {
        syne:  ['var(--font-syne)',           'sans-serif'],
        sans:  ['var(--font-dm-sans)',         'sans-serif'],
        mono:  ['var(--font-jetbrains-mono)', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        streakFly: {
          '0%':   { left: '-5%',  opacity: '0' },
          '8%':   { opacity: '0.7' },
          '92%':  { opacity: '0.7' },
          '100%': { left: '105%', opacity: '0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee:    'marquee 32s linear infinite',
        streakFly1: 'streakFly 5s linear 0s infinite',
        streakFly2: 'streakFly 5s linear 1.6s infinite',
        streakFly3: 'streakFly 5s linear 3.1s infinite',
        streakFly4: 'streakFly 5s linear 0.9s infinite',
        fadeUp1:    'fadeUp 0.7s ease 0.1s both',
        fadeUp2:    'fadeUp 0.7s ease 0.2s both',
        fadeUp3:    'fadeUp 0.7s ease 0.3s both',
        fadeUp4:    'fadeUp 0.7s ease 0.45s both',
      },
    },
  },
  plugins: [],
}

export default config
