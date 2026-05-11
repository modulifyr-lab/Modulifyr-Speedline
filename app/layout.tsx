import type { Metadata }   from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SpeedCanvas from '@/components/SpeedCanvas'
import { AuthProvider } from '@/contexts/AuthContext'

const syne = Syne({
  subsets:  ['latin'],
  variable: '--font-syne',
  weight:   ['400', '500', '600', '700', '800'],
  display:  'swap',
})

const dmSans = DM_Sans({
  subsets:  ['latin'],
  variable: '--font-dm-sans',
  weight:   ['300', '400', '500', '600'],
  display:  'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets:  ['latin'],
  variable: '--font-jetbrains-mono',
  weight:   ['400', '500'],
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'Modulifyr Speedline — Desktop Game Studio',
  description: 'Engineering-first desktop game development. Buy once, own forever. Available on Steam and direct purchase. A division of Modulifyr.',
  keywords:    ['game studio', 'desktop games', 'steam', 'unity', 'indie games', 'modulifyr', 'buy once own forever'],
  openGraph: {
    title:       'Modulifyr Speedline',
    description: 'Engineering-first desktop game development. Buy once, own forever.',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-sl-darker text-sl-white font-sans antialiased overflow-x-hidden">
        <AuthProvider>
          <SpeedCanvas />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}