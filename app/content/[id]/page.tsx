import Link from "next/link"
import { Calendar, Eye, ThumbsUp, Share2 } from "lucide-react"
import { notFound } from "next/navigation"
import Footer from "@/components/footer"

// Sample video data - in a real app, this would come from a database or API
const videoData: Record<
  string,
  {
    id: string
    title: string
    description: string
    publishDate: string
    views: string
    likes: string
    category: string
    embedId: string
    duration: string
  }
> = {
  "1": {
    id: "1",
    title: "I Built an AI Agent That Codes Better Than Me",
    description: `In this video, I walk through building an AI coding agent from scratch using the latest LLMs and automation tools. This agent can write, debug, and deploy code faster than most developers.

We'll cover:
- Setting up the AI agent architecture
- Training it on your specific codebase
- Integrating with GitHub and deployment pipelines
- Real-world performance comparisons
- Cost analysis and ROI calculations

This is the future of software development, and I'm showing you exactly how to build it yourself.`,
    publishDate: "January 15, 2025",
    views: "45,234",
    likes: "2,341",
    category: "AI Development",
    embedId: "dQw4w9WgXcQ", // Placeholder YouTube ID
    duration: "12:34",
  },
  "2": {
    id: "2",
    title: "Why Every Startup Needs AI-First Architecture",
    description: `Most startups are building AI features as an afterthought. This is a massive mistake that will cost them their competitive advantage.

In this deep dive, I explain:
- The difference between AI-enabled vs AI-first products
- How to design your architecture from day one
- Common pitfalls and how to avoid them
- Case studies from successful AI-first companies
- The technical stack you actually need

If you're building a startup in 2025, this video could save you months of technical debt.`,
    publishDate: "January 8, 2025",
    views: "23,567",
    likes: "1,892",
    category: "Startup Strategy",
    embedId: "dQw4w9WgXcQ",
    duration: "8:42",
  },
  "3": {
    id: "3",
    title: "Building a $1M SaaS with No-Code + AI",
    description: `I documented the entire process of building and scaling a SaaS product to $1M ARR using only no-code tools and AI automation.

This isn't theory - this is the exact playbook:
- Market research and validation (AI-powered)
- Building the MVP with no-code tools
- AI-driven customer acquisition
- Automated customer success workflows
- Scaling operations without hiring

Everything is documented with real numbers, tools, and strategies you can copy.`,
    publishDate: "December 28, 2024",
    views: "67,891",
    likes: "4,523",
    category: "Business Building",
    embedId: "dQw4w9WgXcQ",
    duration: "15:21",
  },
}

interface VideoPageProps {
  params: {
    id: string
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  const video = videoData[params.id]

  if (!video) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/content" className="text-gray-400 hover:text-white transition-colors inline-block">
            ← back to content
          </Link>
        </div>

        {/* Video Player */}
        <div className="mb-8">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${video.embedId}?rel=0&modestbranding=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Video Metadata */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{video.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-6">
            <span className="text-green-500 font-semibold">{video.category}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{video.publishDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{video.views} views</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>{video.likes}</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Description */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">About this video</h3>
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">{video.description}</div>
          </div>
        </div>

        {/* Related Content */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6">More from Parker Rex</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(videoData)
              .filter((v) => v.id !== video.id)
              .slice(0, 3)
              .map((relatedVideo) => (
                <Link key={relatedVideo.id} href={`/content/${relatedVideo.id}`} className="group">
                  <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src="/placeholder.svg?height=150&width=250"
                      alt={relatedVideo.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">
                    {relatedVideo.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{relatedVideo.views} views</p>
                </Link>
              ))}
          </div>
        </div>

        <Footer currentPage="content" />
      </div>
    </div>
  )
}
