import Link from "next/link"
import Footer from "@/components/footer"

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back
          </Link>
          <h1 className="text-3xl font-bold mb-4">my sponsors</h1>
          <p className="text-gray-400 text-sm mb-2">here's all the brands that have run ads on my content</p>
          <p className="text-gray-500 text-sm">
            psssst... if you're a brand and want to run an ad on my channel,{" "}
            <a href="mailto:me@parkerrex.com" className="text-blue-400 hover:text-blue-300 underline">
              click here
            </a>
          </p>
        </div>

        {/* Affiliates Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-8 text-white">affiliates</h2>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-300">Coming Soon</h3>
            <p className="text-gray-400 text-center max-w-md">
              Affiliate partnerships with brands I actually use and recommend. Stay tuned for authentic product
              recommendations.
            </p>
          </div>
        </div>

        {/* Video Sponsors Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-8 text-white">video sponsors</h2>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🎬</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-300">Coming Soon</h3>
            <p className="text-gray-400 text-center max-w-md">
              Video sponsorship opportunities for brands that align with AI, productivity, and developer tools. Quality
              over quantity.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
