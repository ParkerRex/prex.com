"use client";

import type { ProcessedVideo } from "@/lib/youtube";
import { VideoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ContentDisplayProps {
	videos: {
		parkerrex: ProcessedVideo[];
		parkerrexdaily: ProcessedVideo[];
	};
}

export function ContentDisplay({ videos }: ContentDisplayProps) {
	const hasParkerrexVideos = videos.parkerrex.length > 0;
	const hasParkerrexdailyVideos = videos.parkerrexdaily.length > 0;

	if (!hasParkerrexVideos && !hasParkerrexdailyVideos) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-600 dark:text-gray-400 text-sm">
					No videos available at the moment.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-12">
			{/* Parker Rex Main Channel */}
			{hasParkerrexVideos && (
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						parker rex channel
					</h2>
					<div className="space-y-4">
						{videos.parkerrex.map((video) => (
							<Link
								key={video.id}
								href={`/content/${video.id}`}
								className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer block"
							>
								<div className="flex items-start gap-3">
									<VideoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
									<div className="flex-1">
										<div className="font-semibold mb-1">{video.title}</div>
										<div className="text-gray-600 dark:text-gray-400 text-sm">
											{video.views} views • {new Date(video.publishedAt).toLocaleDateString()} • {video.duration}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}

			{/* Parker Rex Daily Channel */}
			{hasParkerrexdailyVideos && (
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						parker rex daily
					</h2>
					<div className="space-y-4">
						{videos.parkerrexdaily.map((video) => (
							<Link
								key={video.id}
								href={`/content/${video.id}`}
								className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer block"
							>
								<div className="flex items-start gap-3">
									<VideoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
									<div className="flex-1">
										<div className="font-semibold mb-1">{video.title}</div>
										<div className="text-gray-600 dark:text-gray-400 text-sm">
											{video.views} views • {new Date(video.publishedAt).toLocaleDateString()} • {video.duration}
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}