interface YouTubeVideo {
	id: {
		kind: string;
		videoId: string;
	};
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			default: { url: string; width: number; height: number };
			medium: { url: string; width: number; height: number };
			high: { url: string; width: number; height: number };
		};
		channelTitle: string;
		liveBroadcastContent: string;
		publishTime: string;
	};
}

interface YouTubeVideoDetails {
	id: string;
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			default: { url: string; width: number; height: number };
			medium: { url: string; width: number; height: number };
			high: { url: string; width: number; height: number };
			standard?: { url: string; width: number; height: number };
			maxres?: { url: string; width: number; height: number };
		};
		channelTitle: string;
		tags?: string[];
		categoryId: string;
		liveBroadcastContent: string;
		defaultLanguage?: string;
		defaultAudioLanguage?: string;
	};
	statistics: {
		viewCount: string;
		likeCount: string;
		favoriteCount: string;
		commentCount: string;
	};
	contentDetails: {
		duration: string;
		dimension: string;
		definition: string;
		caption: string;
		licensedContent: boolean;
		regionRestriction?: {
			allowed?: string[];
			blocked?: string[];
		};
		contentRating: Record<string, unknown>;
		projection: string;
	};
}

export interface ProcessedVideo {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	duration: string;
	views: string;
	publishedAt: string;
	channelTitle: string;
	channelId: string;
	tags?: string[];
	url: string;
}

const CHANNEL_HANDLES = {
	parkerrex: "@parkerrex",
	parkerrexdaily: "@parkerrexdaily",
};

function formatDuration(duration: string): string {
	const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
	if (!match) return "0:00";

	const hours = (match[1] || "").replace("H", "");
	const minutes = (match[2] || "").replace("M", "");
	const seconds = (match[3] || "").replace("S", "");

	if (hours) {
		return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
	}
	return `${minutes || "0"}:${seconds.padStart(2, "0")}`;
}

function formatViewCount(viewCount: string): string {
	const count = Number.parseInt(viewCount);
	if (count >= 1000000) {
		return `${(count / 1000000).toFixed(1)}M`;
	}
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}K`;
	}
	return count.toString();
}

async function searchChannelVideos(
	channelHandle: string,
	maxResults = 10,
): Promise<YouTubeVideo[]> {
	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey) {
		console.error("YouTube API key not found");
		return [];
	}

	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${channelHandle}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`,
			{
				next: { revalidate: 3600 }, // Cache for 1 hour
			},
		);

		if (!response.ok) {
			console.error("YouTube search API error:", response.statusText);
			return [];
		}

		const data = (await response.json()) as { items?: YouTubeVideo[] };
		return data.items || [];
	} catch (error) {
		console.error("Error fetching YouTube videos:", error);
		return [];
	}
}

async function getVideoDetails(
	videoIds: string[],
): Promise<YouTubeVideoDetails[]> {
	const apiKey = process.env.GOOGLE_API_KEY;
	if (!apiKey || videoIds.length === 0) return [];

	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds.join(",")}&part=snippet,statistics,contentDetails`,
			{
				next: { revalidate: 3600 }, // Cache for 1 hour
			},
		);

		if (!response.ok) {
			console.error("YouTube videos API error:", response.statusText);
			return [];
		}

		const data = (await response.json()) as { items?: YouTubeVideoDetails[] };
		return data.items || [];
	} catch (error) {
		console.error("Error fetching video details:", error);
		return [];
	}
}

export async function getChannelVideos(
	channel: "parkerrex" | "parkerrexdaily",
	maxResults = 10,
): Promise<ProcessedVideo[]> {
	try {
		// First, search for videos from the channel using channel handle
		const channelHandle = CHANNEL_HANDLES[channel];
		const searchResults = await searchChannelVideos(channelHandle, maxResults);

		if (searchResults.length === 0) return [];

		// Get video IDs
		const videoIds = searchResults.map((video) => video.id.videoId);

		// Get detailed video information
		const videoDetails = await getVideoDetails(videoIds);

		// Process and combine the data
		const processedVideos: ProcessedVideo[] = videoDetails.map((video) => ({
			id: video.id,
			title: video.snippet.title,
			description: video.snippet.description,
			thumbnail:
				video.snippet.thumbnails.high?.url ||
				video.snippet.thumbnails.medium.url,
			duration: formatDuration(video.contentDetails.duration),
			views: formatViewCount(video.statistics.viewCount),
			publishedAt: video.snippet.publishedAt,
			channelTitle: video.snippet.channelTitle,
			channelId: video.snippet.channelId,
			tags: video.snippet.tags,
			url: `https://www.youtube.com/watch?v=${video.id}`,
		}));

		return processedVideos;
	} catch (error) {
		console.error(`Error fetching ${channel} videos:`, error);
		return [];
	}
}

export async function getVideoById(
	videoId: string,
): Promise<ProcessedVideo | null> {
	try {
		const videoDetails = await getVideoDetails([videoId]);
		if (videoDetails.length === 0) return null;

		const video = videoDetails[0];
		if (!video) return null;

		return {
			id: video.id,
			title: video.snippet.title,
			description: video.snippet.description,
			thumbnail:
				video.snippet.thumbnails.maxres?.url ||
				video.snippet.thumbnails.high?.url ||
				video.snippet.thumbnails.medium.url,
			duration: formatDuration(video.contentDetails.duration),
			views: formatViewCount(video.statistics.viewCount),
			publishedAt: video.snippet.publishedAt,
			channelTitle: video.snippet.channelTitle,
			channelId: video.snippet.channelId,
			tags: video.snippet.tags,
			url: `https://www.youtube.com/watch?v=${video.id}`,
		};
	} catch (error) {
		console.error("Error fetching video by ID:", error);
		return null;
	}
}

export async function getAllChannelVideos(): Promise<{
	parkerrex: ProcessedVideo[];
	parkerrexdaily: ProcessedVideo[];
}> {
	const [parkerrexVideos, parkerrexdailyVideos] = await Promise.all([
		getChannelVideos("parkerrex", 3),
		getChannelVideos("parkerrexdaily", 3),
	]);

	return {
		parkerrex: parkerrexVideos,
		parkerrexdaily: parkerrexdailyVideos,
	};
}
