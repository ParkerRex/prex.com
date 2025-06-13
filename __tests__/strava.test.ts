import { describe, it, expect, beforeEach, mock } from "bun:test";
import { getAthleteStats } from "@/lib/strava";

// Mock the global fetch
const mockFetch = mock();
(global as any).fetch = mockFetch;

describe("Strava Integration", () => {
	beforeEach(() => {
		mockFetch.mockClear();
		// Set up environment variable
		process.env.STRAVA_ACCESS_TOKEN = "test_token";
	});

	it("should fetch athlete stats successfully", async () => {
		// Mock athlete response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				id: 12345,
				username: "testuser",
				firstname: "Test",
				lastname: "User",
			}),
		});

		// Mock stats response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				recent_run_totals: {
					count: 5,
					distance: 17703.04, // ~11 miles in meters
					moving_time: 3600,
					elapsed_time: 3600,
					elevation_gain: 100,
				},
				ytd_run_totals: {
					count: 50,
					distance: 160934.4, // ~100 miles in meters
					moving_time: 36000,
					elapsed_time: 36000,
					elevation_gain: 1000,
				},
			}),
		});

		const result = await getAthleteStats();

		expect(result).toEqual({
			weeklyMiles: 11.0,
			weeklyGoal: 20,
			weeklyProgress: expect.closeTo(55.0, 0.1),
		});

		expect(mockFetch).toHaveBeenCalledTimes(2);
		expect(mockFetch).toHaveBeenCalledWith("https://www.strava.com/api/v3/athlete", {
			headers: {
				Authorization: "Bearer test_token",
			},
		});
		expect(mockFetch).toHaveBeenCalledWith(
			"https://www.strava.com/api/v3/athletes/12345/stats",
			{
				headers: {
					Authorization: "Bearer test_token",
				},
			}
		);
	});

	it("should return null when access token is missing", async () => {
		delete process.env.STRAVA_ACCESS_TOKEN;

		const result = await getAthleteStats();

		expect(result).toBeNull();
		expect(mockFetch).not.toHaveBeenCalled();
	});

	it("should return null when athlete fetch fails", async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Unauthorized",
		});

		const result = await getAthleteStats();

		expect(result).toBeNull();
		expect(mockFetch).toHaveBeenCalledTimes(1);
	});

	it("should return null when stats fetch fails", async () => {
		// Mock successful athlete response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				id: 12345,
				username: "testuser",
				firstname: "Test",
				lastname: "User",
			}),
		});

		// Mock failed stats response
		mockFetch.mockResolvedValueOnce({
			ok: false,
			statusText: "Not Found",
		});

		const result = await getAthleteStats();

		expect(result).toBeNull();
		expect(mockFetch).toHaveBeenCalledTimes(2);
	});

	it("should handle network errors gracefully", async () => {
		mockFetch.mockRejectedValueOnce(new Error("Network error"));

		const result = await getAthleteStats();

		expect(result).toBeNull();
		expect(mockFetch).toHaveBeenCalledTimes(1);
	});

	it("should convert meters to miles correctly", async () => {
		// Mock athlete response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				id: 12345,
				username: "testuser",
				firstname: "Test",
				lastname: "User",
			}),
		});

		// Mock stats response with 32,187 meters (20 miles)
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				recent_run_totals: {
					count: 5,
					distance: 32187, // 20 miles in meters
					moving_time: 7200,
					elapsed_time: 7200,
					elevation_gain: 200,
				},
				ytd_run_totals: {
					count: 50,
					distance: 160934.4,
					moving_time: 36000,
					elapsed_time: 36000,
					elevation_gain: 1000,
				},
			}),
		});

		const result = await getAthleteStats();

		expect(result).toEqual({
			weeklyMiles: 20.0,
			weeklyGoal: 20,
			weeklyProgress: 100.0,
		});
	});

	it("should cap progress at 100%", async () => {
		// Mock athlete response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				id: 12345,
				username: "testuser",  
				firstname: "Test",
				lastname: "User",
			}),
		});

		// Mock stats response with 40,233 meters (25 miles - exceeds 20 mile goal)
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				recent_run_totals: {
					count: 8,
					distance: 40233, // 25 miles in meters
					moving_time: 9000,
					elapsed_time: 9000,
					elevation_gain: 300,
				},
				ytd_run_totals: {
					count: 50,
					distance: 160934.4,
					moving_time: 36000,
					elapsed_time: 36000,
					elevation_gain: 1000,
				},
			}),
		});

		const result = await getAthleteStats();

		expect(result).toEqual({
			weeklyMiles: 25.0,
			weeklyGoal: 20,
			weeklyProgress: 100.0, // Capped at 100%
		});
	});
});