import { beforeEach, describe, expect, it, mock } from "bun:test";
import {
	getAllChannelVideos,
	getChannelVideos,
	getVideoById,
} from "@/lib/youtube";

// Mock the global fetch
const mockFetch = mock();
(global as { fetch: typeof mockFetch }).fetch = mockFetch;

describe("YouTube Integration", () => {
	beforeEach(() => {
		mockFetch.mockClear();
		process.env.GOOGLE_API_KEY = "test_api_key";
	});

	describe("getChannelVideos", () => {
		it("should fetch videos for a channel successfully", async () => {
			// Mock search response
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [
						{
							id: { videoId: "video1" },
							snippet: {
								title: "Test Video 1",
								description: "Test description",
								publishedAt: "2023-01-01T00:00:00Z",
								channelTitle: "Parker Rex",
								channelId: "UC123",
								thumbnails: {
									high: { url: "https://i.ytimg.com/vi/video1/hqdefault.jpg" },
								},
							},
						},
					],
				}),
			});

			// Mock video details response
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [
						{
							id: "video1",
							snippet: {
								title: "Test Video 1",
								description: "Test description",
								publishedAt: "2023-01-01T00:00:00Z",
								channelTitle: "Parker Rex",
								channelId: "UC123",
								thumbnails: {
									high: { url: "https://i.ytimg.com/vi/video1/hqdefault.jpg" },
								},
								tags: ["AI", "tutorial"],
							},
							statistics: {
								viewCount: "1000",
								likeCount: "50",
								favoriteCount: "0",
								commentCount: "10",
							},
							contentDetails: {
								duration: "PT10M30S",
							},
						},
					],
				}),
			});

			const result = await getChannelVideos("parkerrex", 1);

			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				id: "video1",
				title: "Test Video 1",
				description: "Test description",
				thumbnail: "https://i.ytimg.com/vi/video1/hqdefault.jpg",
				duration: "10:30",
				views: "1.0K",
				publishedAt: "2023-01-01T00:00:00Z",
				channelTitle: "Parker Rex",
				channelId: "UC123",
				tags: ["AI", "tutorial"],
				url: "https://www.youtube.com/watch?v=video1",
			});
		});

		it("should return empty array when API key is missing", async () => {
			process.env.GOOGLE_API_KEY = undefined;

			const result = await getChannelVideos("parkerrex");

			expect(result).toEqual([]);
			expect(mockFetch).not.toHaveBeenCalled();
		});

		it("should handle API errors gracefully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: false,
				statusText: "API Error",
			});

			const result = await getChannelVideos("parkerrex");

			expect(result).toEqual([]);
		});

		it("should handle network errors gracefully", async () => {
			mockFetch.mockRejectedValueOnce(new Error("Network error"));

			const result = await getChannelVideos("parkerrex");

			expect(result).toEqual([]);
		});
	});

	describe("getVideoById", () => {
		it("should fetch video details by ID successfully", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [
						{
							id: "video1",
							snippet: {
								title: "Test Video",
								description: "Test description",
								publishedAt: "2023-01-01T00:00:00Z",
								channelTitle: "Parker Rex",
								channelId: "UC123",
								thumbnails: {
									maxres: {
										url: "https://i.ytimg.com/vi/video1/maxresdefault.jpg",
									},
								},
							},
							statistics: {
								viewCount: "5000",
							},
							contentDetails: {
								duration: "PT5M45S",
							},
						},
					],
				}),
			});

			const result = await getVideoById("video1");

			expect(result).toEqual({
				id: "video1",
				title: "Test Video",
				description: "Test description",
				thumbnail: "https://i.ytimg.com/vi/video1/maxresdefault.jpg",
				duration: "5:45",
				views: "5.0K",
				publishedAt: "2023-01-01T00:00:00Z",
				channelTitle: "Parker Rex",
				channelId: "UC123",
				tags: undefined,
				url: "https://www.youtube.com/watch?v=video1",
			});
		});

		it("should return null when video not found", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [],
				}),
			});

			const result = await getVideoById("nonexistent");

			expect(result).toBeNull();
		});
	});

	describe("getAllChannelVideos", () => {
		it("should fetch videos from both channels", async () => {
			// Mock responses for both channels (4 API calls total)
			// parkerrex search
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ items: [{ id: { videoId: "video1" } }] }),
			});

			// parkerrexdaily search
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ items: [{ id: { videoId: "video2" } }] }),
			});

			// parkerrex video details
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [
						{
							id: "video1",
							snippet: {
								title: "Video 1",
								thumbnails: { high: { url: "thumb1.jpg" } },
							},
							statistics: { viewCount: "1000" },
							contentDetails: { duration: "PT5M" },
						},
					],
				}),
			});

			// parkerrexdaily video details
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [
						{
							id: "video2",
							snippet: {
								title: "Video 2",
								thumbnails: { high: { url: "thumb2.jpg" } },
							},
							statistics: { viewCount: "2000" },
							contentDetails: { duration: "PT10M" },
						},
					],
				}),
			});

			const result = await getAllChannelVideos();

			expect(result).toHaveProperty("parkerrex");
			expect(result).toHaveProperty("parkerrexdaily");
			expect(result.parkerrex).toHaveLength(1);
			expect(result.parkerrexdaily).toHaveLength(1);
		});
	});

	describe("utility functions", () => {
		it("should format duration correctly", async () => {
			// Test through the API since formatDuration is not exported
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ items: [{ id: { videoId: "test" } }] }),
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [
						{
							id: "test",
							snippet: {
								title: "Test",
								thumbnails: { high: { url: "test.jpg" } },
							},
							statistics: { viewCount: "1000" },
							contentDetails: { duration: "PT1H30M45S" }, // 1 hour 30 minutes 45 seconds
						},
					],
				}),
			});

			const result = await getChannelVideos("parkerrex", 1);
			expect(result[0]?.duration).toBe("1:30:45");
		});

		it("should format view count correctly", async () => {
			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ items: [{ id: { videoId: "test" } }] }),
			});

			mockFetch.mockResolvedValueOnce({
				ok: true,
				json: async () => ({
					items: [
						{
							id: "test",
							snippet: {
								title: "Test",
								thumbnails: { high: { url: "test.jpg" } },
							},
							statistics: { viewCount: "1500000" }, // 1.5 million
							contentDetails: { duration: "PT5M" },
						},
					],
				}),
			});

			const result = await getChannelVideos("parkerrex", 1);
			expect(result[0]?.views).toBe("1.5M");
		});
	});
});
