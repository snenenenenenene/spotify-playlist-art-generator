// app/page.tsx
import { Metadata } from 'next'
import SpotifyArtGenerator from '@/components/SpotifyArtGenerator'

export const metadata: Metadata = {
  title: 'Spotify Cover Art',
  description: 'Create Spotify playlist covers',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <SpotifyArtGenerator />
    </main>
  )
}