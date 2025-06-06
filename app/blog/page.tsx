import Link from "next/link"
import Footer from "@/components/footer"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back to home
          </Link>
          <h1 className="text-3xl font-bold mb-6">blog</h1>
          <p className="text-gray-400 text-sm">thoughts on ai, product development, and building things that matter</p>
        </div>

        {/* Coming Soon Content */}
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <div className="text-4xl">✍️</div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-300">Coming Soon</h2>
            <p className="text-gray-400 text-lg max-w-md">
              I'm working on thoughtful articles about AI, product development, and building in public. Check back soon
              for insights and practical guides.
            </p>
          </div>

          <div className="text-gray-500 text-sm">
            <p>Subscribe to my newsletter to get notified when new posts drop</p>
          </div>
        </div>

        <Footer currentPage="blog" />
      </div>
    </div>
  )
}
