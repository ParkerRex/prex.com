import Link from "next/link"
import Footer from "@/components/footer"
import type { Metadata } from 'next'
import { getAllChannelVideos } from "@/lib/youtube"
import { ContentDisplay } from './content-display'

export const metadata: Metadata = {
  title: 'Content & Videos',
  description: 'AI tutorials, product builds, and behind-the-scenes content from Parker Rex. Premium content available for VAI Network members.',
  openGraph: {
    title: 'Content & Videos - Parker Rex',
    description: 'AI tutorials, product builds, and behind-the-scenes content. Premium content for VAI Network members.',
    url: 'https://prex.com/content',
  },
  twitter: {
    title: 'Content & Videos - Parker Rex',
    description: 'AI tutorials, product builds, and behind-the-scenes content.',
  },
  alternates: {
    canonical: 'https://prex.com/content',
  },
}

export default async function ContentPage() {
  const videos = await getAllChannelVideos();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back to home
          </Link>
          <h1 className="text-3xl font-bold mb-6">content</h1>
          <p className="text-gray-400 text-sm">ai tutorials, product builds, and behind-the-scenes content</p>
        </div>

        <ContentDisplay videos={videos} />

        <Footer />
      </div>
    </div>
  )
}
