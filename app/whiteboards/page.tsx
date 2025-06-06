import Link from "next/link"
import Footer from "@/components/footer"

export default function WhiteboardsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back to home
          </Link>
          <h1 className="text-3xl font-bold mb-6">whiteboards</h1>
        </div>

        {/* Coming Soon Content */}
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <div className="text-4xl">📝</div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-300">Coming Soon</h2>
            <p className="text-gray-400 text-lg max-w-md">
              Interactive whiteboards and visual explanations of AI concepts, product strategies, and technical
              deep-dives.
            </p>
          </div>

          <div className="text-gray-500 text-sm">
            <p>Stay tuned for visual breakdowns of complex topics</p>
          </div>
        </div>

        <Footer currentPage="whiteboards" />
      </div>
    </div>
  )
}
