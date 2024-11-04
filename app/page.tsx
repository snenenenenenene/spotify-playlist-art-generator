// app/page.tsx
import { Metadata } from 'next'
import SpotifyArtGenerator from '@/components/SpotifyArtGenerator'
import { Analytics } from '@vercel/analytics/next'
import Footer from './components/footer'

export const metadata: Metadata = {
  title: 'Spotify Cover Art',
  description: 'Create Spotify playlist covers',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Analytics />
      <SpotifyArtGenerator />
      <Footer />
    </main>
  )
}