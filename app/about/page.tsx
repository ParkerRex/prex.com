import Link from "next/link"
import Footer from "@/components/footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Parker Rex',
  description: 'Learn about Parker Rex, a tech entrepreneur and AI-first builder with a decade of product management experience. From growing a startup to $73M in revenue to building AI tools and communities.',
  openGraph: {
    title: 'About Parker Rex - AI-First Builder & Tech Entrepreneur',
    description: 'Tech entrepreneur and AI-first builder with a decade of product management experience. Growing startups and building AI tools.',
    url: 'https://prex.com/about',
  },
  twitter: {
    title: 'About Parker Rex - AI-First Builder & Tech Entrepreneur',
    description: 'Tech entrepreneur and AI-first builder with a decade of product management experience.',
  },
  alternates: {
    canonical: 'https://prex.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back to home
          </Link>
          <h1 className="text-3xl font-bold mb-6">about parker rex</h1>
          <p className="text-gray-400 text-sm mb-8">
            This page is for my Google Knowledge Graph panel. For a more comprehensive (and grounded) biography,
            <Link href="/bio" className="text-green-500 hover:text-green-400 transition-colors ml-1">
              go here
            </Link>
            .
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-500">Who is Parker Rex?</h2>
            <p className="text-gray-300 leading-relaxed">
              Parker Rex is a tech entrepreneur, software engineer, and media creator focused on AI, productivity, and
              software development. With a decade of product management experience, he played a pivotal role in growing
              a restaurant delivery startup from $0 to $73M in annual revenue before its acquisition by a publicly
              traded company.
            </p>
          </div>
        </div>

        <Footer currentPage="about" />
      </div>
    </div>
  )
}
