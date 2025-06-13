import Link from "next/link"
import { Play } from "lucide-react"
import type { ProcessedVideo } from "@/lib/youtube"

interface ContentDisplayProps {
  videos: {
    parkerrex: ProcessedVideo[];
    parkerrexdaily: ProcessedVideo[];
  }
}

export function ContentDisplay({ videos }: ContentDisplayProps) {
  const hasParkerrexVideos = videos.parkerrex.length > 0;
  const hasParkerrexdailyVideos = videos.parkerrexdaily.length > 0;

  if (!hasParkerrexVideos && !hasParkerrexdailyVideos) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
          <div className="text-2xl">🎬</div>
        </div>
        <h2 className="text-xl font-bold mb-2 text-gray-300">No videos available</h2>
        <p className="text-gray-400 text-sm max-w-md">
          Unable to load videos at the moment. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Parker Rex Main Channel */}
      {hasParkerrexVideos && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white" fill="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Parker Rex</h2>
              <p className="text-gray-400 text-sm">AI tools, tutorials, and tech insights</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.parkerrex.map((video) => (
              <Link 
                key={video.id} 
                href={`/content/${video.id}`} 
                className="group cursor-pointer"
              >
                <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-tight line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">{video.views} views</p>
                  <span className="text-gray-600">•</span>
                  <p className="text-xs text-gray-500">
                    {new Date(video.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Parker Rex Daily Channel */}
      {hasParkerrexdailyVideos && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white" fill="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Parker Rex Daily</h2>
              <p className="text-gray-400 text-sm">Daily builds and behind-the-scenes content</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.parkerrexdaily.map((video) => (
              <Link 
                key={video.id} 
                href={`/content/${video.id}`} 
                className="group cursor-pointer"
              >
                <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-tight line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">{video.views} views</p>
                  <span className="text-gray-600">•</span>
                  <p className="text-xs text-gray-500">
                    {new Date(video.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}