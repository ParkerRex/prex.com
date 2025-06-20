import Footer from "@/components/footer";
import { getAllChannelVideos } from "@/lib/youtube";
import type { Metadata } from "next";
import Link from "next/link";
import { VideoIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
	title: "Content & Videos",
	description:
		"AI tutorials, product builds, and behind-the-scenes content from Parker Rex. Premium content available for VAI Network members.",
	openGraph: {
		title: "Content & Videos - Parker Rex",
		description:
			"AI tutorials, product builds, and behind-the-scenes content. Premium content for VAI Network members.",
		url: "https://prex.com/content",
	},
	twitter: {
		title: "Content & Videos - Parker Rex",
		description: "AI tutorials, product builds, and behind-the-scenes content.",
	},
	alternates: {
		canonical: "https://prex.com/content",
	},
};

export default async function ContentPage() {
	const videos = await getAllChannelVideos();
	
	// Get the 3 most recent videos from both channels combined
	const allVideos = [...videos.parkerrex, ...videos.parkerrexdaily]
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
		.slice(0, 3);

	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
			<div className="container mx-auto px-4 py-16 max-w-6xl flex-1">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">content</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						ai tutorials, product builds, and behind-the-scenes content
					</p>
				</div>

				{/* Latest Videos Grid */}
				{allVideos.length > 0 && (
					<div className="mb-16">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-8 text-center">
							latest videos
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{allVideos.map((video) => (
								<Link
									key={video.id}
									href={`/content/${video.id}`}
									className="group block"
								>
									<div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer">
										{/* Thumbnail */}
										<div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
											<img
												src={video.thumbnail}
												alt={video.title}
												className="w-full h-full object-cover"
											/>
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20" />
											<div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1">
												{video.duration}
											</div>
										</div>
										
										{/* Video Info */}
										<div className="p-4">
											<h3 className="font-semibold text-sm mb-2 line-clamp-2">
												{video.title}
											</h3>
											<div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
												<span>{video.views} views</span>
												<span>•</span>
												<span>{new Date(video.publishedAt).toLocaleDateString()}</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}

				{/* All Videos Link */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						browse all content
					</h2>
					<div className="space-y-4">
						<Link
							href="/content/all"
							className="bg-gray-50 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-800"
						>
							<VideoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">view all videos</div>
								<div className="text-gray-600 dark:text-gray-400 text-sm">
									browse the complete collection of tutorials and builds
								</div>
							</div>
						</Link>
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}