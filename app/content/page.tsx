"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, Lock, Play } from "lucide-react"
import { useState } from "react"
import Footer from "@/components/footer"

// Sample video data
const featuredVideos = [
  {
    id: 1,
    title: "I Built an AI Agent That Codes Better Than Me",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "12:34",
    views: "45K",
  },
  {
    id: 2,
    title: "Why Every Startup Needs AI-First Architecture",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "8:42",
    views: "23K",
  },
  {
    id: 3,
    title: "Building a $1M SaaS with No-Code + AI",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "15:21",
    views: "67K",
  },
  {
    id: 4,
    title: "The AI Tool That Replaced My Entire Team",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "10:15",
    views: "89K",
  },
  {
    id: 5,
    title: "I Automated My Entire Business in 30 Days",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "18:33",
    views: "34K",
  },
  {
    id: 6,
    title: "ChatGPT vs Claude vs Gemini: The REAL Winner",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "14:27",
    views: "156K",
  },
]

const premiumVideos = [
  {
    id: 7,
    title: "My Secret AI Workflow That Makes $10K/Month",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "22:15",
    isPremium: true,
  },
  {
    id: 8,
    title: "The AI Automation Blueprint (Complete System)",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "45:30",
    isPremium: true,
  },
  {
    id: 9,
    title: "Building AI Products: From Idea to $1M ARR",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "38:12",
    isPremium: true,
  },
]

const carouselVideos = [
  {
    id: 10,
    title: "AI Will Replace Developers (Here's How to Adapt)",
    thumbnail: "/placeholder.svg?height=150&width=250",
    duration: "9:45",
    views: "78K",
  },
  {
    id: 11,
    title: "I Tried Every AI Coding Assistant (Shocking Results)",
    thumbnail: "/placeholder.svg?height=150&width=250",
    duration: "16:22",
    views: "92K",
  },
  {
    id: 12,
    title: "Building REX Studios: Behind the Scenes",
    thumbnail: "/placeholder.svg?height=150&width=250",
    duration: "11:33",
    views: "45K",
  },
  {
    id: 13,
    title: "The Future of AI Agencies (What's Coming)",
    thumbnail: "/placeholder.svg?height=150&width=250",
    duration: "13:18",
    views: "67K",
  },
  {
    id: 14,
    title: "My Daily AI Workflow (Complete Breakdown)",
    thumbnail: "/placeholder.svg?height=150&width=250",
    duration: "20:45",
    views: "123K",
  },
]

export default function ContentPage() {
  const [carouselIndex, setCarouselIndex] = useState(0)

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.max(1, carouselVideos.length - 2))
  }

  const prevSlide = () => {
    setCarouselIndex(
      (prev) => (prev - 1 + Math.max(1, carouselVideos.length - 2)) % Math.max(1, carouselVideos.length - 2),
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back to home
          </Link>
          <h1 className="text-3xl font-bold mb-6">content</h1>
          <p className="text-gray-400 text-sm">ai tutorials, product builds, and behind-the-scenes content</p>
        </div>

        {/* Featured Videos Grid */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-8 text-gray-300">Latest Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <Link key={video.id} href={`/content/${video.id}`} className="group cursor-pointer">
                <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{video.views} views</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Premium Content Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-8 text-gray-300">Premium Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer relative">
                <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover blur-sm"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
                    <Lock className="w-8 h-8 text-green-500 mb-2" />
                    <span className="text-green-500 font-semibold text-sm mb-2">Premium Content</span>
                    <button className="bg-green-500 text-black px-4 py-2 rounded font-semibold text-sm hover:bg-green-400 transition-colors">
                      Join VAI Network
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-300 leading-tight">{video.title}</h3>
                <p className="text-xs text-gray-500 mt-1">Premium Members Only</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-300">More Videos</h2>
            <div className="flex gap-2">
              <button onClick={prevSlide} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{ transform: `translateX(-${carouselIndex * 33.333}%)` }}
            >
              {carouselVideos.map((video) => (
                <Link key={video.id} href={`/content/${video.id}`} className="flex-shrink-0 w-1/3 group cursor-pointer">
                  <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-800">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>
                  <h3 className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{video.views} views</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Footer currentPage="content" />
      </div>
    </div>
  )
}
