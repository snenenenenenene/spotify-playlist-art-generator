// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Spotify Cover Generator',
    default: 'Spotify Cover Generator',
  },
  description: 'Create beautiful Spotify playlist covers with custom text, fonts, and effects',
  keywords: ['Spotify', 'playlist', 'cover', 'generator', 'art', 'design'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}