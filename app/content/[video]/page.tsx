import Footer from "@/components/footer";
import { getVideoById } from "@/lib/youtube";
import { ArrowLeftIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface VideoPageProps {
	params: Promise<{
		video: string;
	}>;
}

export async function generateMetadata({
	params,
}: VideoPageProps): Promise<Metadata> {
	const { video: videoId } = await params;
	const video = await getVideoById(videoId);

	if (!video) {
		return {
			title: "Video Not Found",
			description: "The requested video could not be found.",
		};
	}

	const description =
		video.description.length > 160
			? `${video.description.substring(0, 157)}...`
			: video.description;

	return {
		title: video.title,
		description,
		openGraph: {
			title: video.title,
			description,
			url: `https://prex.com/content/${video.id}`,
			type: "video.other",
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
			card: "player",
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
	const formattedDate = publishedDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	// Generate structured data for the video
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "VideoObject",
		name: video.title,
		description: video.description,
		thumbnailUrl: video.thumbnail,
		uploadDate: video.publishedAt,
		duration: `PT${video.duration.replace(":", "M")}S`,
		embedUrl: `https://www.youtube.com/embed/${video.id}`,
		contentUrl: video.url,
		author: {
			"@type": "Person",
			name: video.channelTitle,
			url: "https://prex.com",
		},
		publisher: {
			"@type": "Organization",
			name: video.channelTitle,
			logo: {
				"@type": "ImageObject",
				url: "https://prex.com/og-image.png",
			},
		},
		interactionStatistic: {
			"@type": "InteractionCounter",
			interactionType: { "@type": "WatchAction" },
			userInteractionCount: video.views.replace(/[^\d]/g, ""),
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
				<div className="container mx-auto px-4 py-16 max-w-2xl">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-4xl font-bold mb-4">{video.title}</h1>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							{video.views} views • {formattedDate} • {video.duration}
						</p>
					</div>

					{/* Video Player */}
					<div className="mb-12">
						<div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
							<iframe
								src={`https://www.youtube.com/embed/${video.id}?autoplay=0&rel=0&modestbranding=1`}
								title={video.title}
								className="w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</div>

					{/* Video Info */}
					<div className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							about this video
						</h2>
						<div className="bg-gray-100 dark:bg-gray-900 p-4">
							<p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">
								{video.description}
							</p>
						</div>
					</div>

					{/* Actions */}
					<div className="mb-12">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
							actions
						</h2>
						<div className="space-y-4">
							<a
								href={video.url}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-gray-100 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
							>
								<ExternalLinkIcon className="w-5 h-5 mt-1 flex-shrink-0" />
								<div>
									<div className="font-semibold">watch on youtube</div>
									<div className="text-gray-600 dark:text-gray-400 text-sm">
										view on the original platform
									</div>
								</div>
							</a>
							
							<Link
								href="/content"
								className="bg-gray-100 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
							>
								<ArrowLeftIcon className="w-5 h-5 mt-1 flex-shrink-0" />
								<div>
									<div className="font-semibold">back to content</div>
									<div className="text-gray-600 dark:text-gray-400 text-sm">
										browse more videos
									</div>
								</div>
							</Link>
						</div>
					</div>

					{/* Tags */}
					{video.tags && video.tags.length > 0 && (
						<div className="mb-12">
							<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
								tags
							</h2>
							<div className="flex flex-wrap gap-2 justify-center">
								{video.tags.slice(0, 10).map((tag) => (
									<span
										key={tag}
										className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm"
									>
										#{tag}
									</span>
								))}
							</div>
						</div>
					)}

					<Footer />
				</div>
			</div>
		</>
	);
}