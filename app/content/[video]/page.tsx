import Link from "next/link"
import { ArrowLeft, Calendar, Eye, ExternalLink, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'
import { getVideoById } from "@/lib/youtube"
import Footer from "@/components/footer"

interface VideoPageProps {
  params: Promise<{
    video: string
  }>
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { video: videoId } = await params;
  const video = await getVideoById(videoId);
  
  if (!video) {
    return {
      title: 'Video Not Found',
      description: 'The requested video could not be found.',
    };
  }

  const description = video.description.length > 160 
    ? video.description.substring(0, 157) + '...'
    : video.description;

  return {
    title: video.title,
    description,
    openGraph: {
      title: video.title,
      description,
      url: `https://prex.com/content/${video.id}`,
      type: 'video.other',
      images: [
        {
          url: video.thumbnail,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
      videos: [
        {
          url: video.url,
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      card: 'player',
      title: video.title,
      description,
      images: [video.thumbnail],
      players: [
        {
          playerUrl: `https://www.youtube.com/embed/${video.id}`,
          streamUrl: video.url,
          width: 1280,
          height: 720,
        },
      ],
    },
    alternates: {
      canonical: `https://prex.com/content/${video.id}`,
    },
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { video: videoId } = await params;
  const video = await getVideoById(videoId);

  if (!video) {
    notFound();
  }

  const publishedDate = new Date(video.publishedAt);
  const formattedDate = publishedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Generate structured data for the video
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": video.thumbnail,
    "uploadDate": video.publishedAt,
    "duration": `PT${video.duration.replace(':', 'M')}S`,
    "embedUrl": `https://www.youtube.com/embed/${video.id}`,
    "contentUrl": video.url,
    "author": {
      "@type": "Person",
      "name": video.channelTitle,
      "url": "https://prex.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": video.channelTitle,
      "logo": {
        "@type": "ImageObject",
        "url": "https://prex.com/og-image.png"
      }
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": video.views.replace(/[^\d]/g, '')
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/content" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to content
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-gray-900">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=0&rel=0&modestbranding=1`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Title */}
              <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                {video.title}
              </h1>

              {/* Video Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{video.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Duration: {video.duration}</span>
                </div>
              </div>

              {/* Channel Info */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-gray-900 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {video.channelTitle.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{video.channelTitle}</h3>
                  <p className="text-gray-400 text-sm">Content creator and AI developer</p>
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Watch on YouTube
                </a>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">About this video</h2>
                <div className="bg-gray-900 p-6 rounded-lg">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.slice(0, 10).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Stats */}
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Video Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views</span>
                    <span className="font-medium">{video.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-medium">{video.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Published</span>
                    <span className="font-medium">{formattedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Channel</span>
                    <span className="font-medium">{video.channelTitle}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}