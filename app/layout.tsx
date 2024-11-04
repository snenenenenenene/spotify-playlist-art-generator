// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Spotify Cover Generator',
    default: 'Spotify Cover Generator - Create Custom Playlist Artwork',
  },
  description: 'Create beautiful Spotify playlist covers with custom text, fonts, and effects. Free online tool with drag-and-drop interface, image layers, and real-time preview.',
  keywords: [
    'Spotify',
    'playlist',
    'cover',
    'generator',
    'art',
    'design',
    'cover art',
    'artwork generator',
    'playlist artwork',
    'music cover',
    'custom cover',
    'image editor'
  ],
  authors: [
    {
      name: "Senne Bels",
      url: "https://sennebels.xyz",
    }
  ],
  creator: "Senne Bels",
  publisher: "Senne Bels",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spotify-playlist-art-generator.vercel.app',
    title: 'Spotify Cover Generator - Create Custom Playlist Artwork',
    description: 'Create beautiful Spotify playlist covers with custom text, fonts, and effects. Free online tool with drag-and-drop interface.',
    siteName: 'Spotify Cover Generator',
    images: [
      {
        url: '/spotify-playlist-art-generator.png',
        width: 1200,
        height: 630,
        alt: 'Spotify Playlist Art Generator Interface'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spotify Cover Generator - Create Custom Playlist Artwork',
    description: 'Create beautiful Spotify playlist covers with custom text, fonts, and effects. Free online tool with drag-and-drop interface.',
    images: ['/spotify-playlist-art-generator.png'],
    creator: '@snenenenene'
  },
  category: 'Technology',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Additional meta tags */}
        <meta name="application-name" content="Spotify Cover Generator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Spotify Cover Generator" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}