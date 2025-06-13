interface StravaStats {
	recent_run_totals: {
		count: number;
		distance: number;
		moving_time: number;
		elapsed_time: number;
		elevation_gain: number;
	};
	ytd_run_totals: {
		count: number;
		distance: number;
		moving_time: number;
		elapsed_time: number;
		elevation_gain: number;
	};
}

interface StravaAthlete {
	id: number;
	username: string;
	firstname: string;
	lastname: string;
}

export async function getAthleteStats(): Promise<{
	weeklyMiles: number;
	weeklyGoal: number;
	weeklyProgress: number;
} | null> {
	try {
		const accessToken = process.env.STRAVA_ACCESS_TOKEN;
		if (!accessToken) {
			console.error("No Strava access token found");
			return null;
		}

		// First get the authenticated athlete to get their ID
		const athleteResponse = await fetch("https://www.strava.com/api/v3/athlete", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!athleteResponse.ok) {
			console.error("Failed to fetch athlete:", athleteResponse.statusText);
			return null;
		}

		const athlete = await athleteResponse.json() as StravaAthlete;

		// Then get their stats
		const statsResponse = await fetch(
			`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		if (!statsResponse.ok) {
			console.error("Failed to fetch stats:", statsResponse.statusText);
			return null;
		}

		const stats = await statsResponse.json() as StravaStats;

		// Convert meters to miles (1 meter = 0.000621371 miles)
		const recentRunMiles = (stats.recent_run_totals.distance * 0.000621371);
		
		// For now, use recent totals as weekly approximation
		// You might want to implement a more precise weekly calculation
		const weeklyMiles = Math.round(recentRunMiles * 10) / 10; // Round to 1 decimal
		const weeklyGoal = 20; // Your goal from the hardcoded value
		const weeklyProgress = Math.min((weeklyMiles / weeklyGoal) * 100, 100);

		return {
			weeklyMiles,
			weeklyGoal,
			weeklyProgress,
		};
	} catch (error) {
		console.error("Error fetching Strava data:", error);
		return null;
	}
}
