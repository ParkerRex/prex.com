interface GitHubRepo {
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
	pushed_at: string;
	language: string | null;
}

interface GitHubCommit {
	commit: {
		committer: {
			date: string;
		};
	};
}

export interface RepoData {
	name: string;
	description: string;
	stars: number;
	lastCommit: string;
	url: string;
	language: string | null;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPOS = ["joinvai/ai-sdlc", "joinvai/xgpt", "ParkerRex/10-essential-docs", "ParkerRex/flappybench"];

const REPO_DESCRIPTIONS: Record<string, string> = {
	"joinvai/ai-sdlc": "AI-assisted CLI tool that transforms software development into a structured 8-step workflow from idea to production-ready code",
	"joinvai/xgpt": "Powerful CLI tool for AI-powered Twitter/X scraping and question-answering with lightning-fast performance",
	"ParkerRex/10-essential-docs": "Automated AI system that generates comprehensive technical documentation and architectural guides from codebases",
	"ParkerRex/flappybench": "Simple Flappy Bird clone built with Pygame for benchmarking AI model code generation performance",
};

async function fetchWithAuth(url: string) {
	const headers: Record<string, string> = {
		Accept: "application/vnd.github.v3+json",
		"User-Agent": "prex.com-website",
	};

	if (GITHUB_TOKEN) {
		headers.Authorization = `token ${GITHUB_TOKEN}`;
	}

	const response = await fetch(url, {
		headers,
		next: { revalidate: 300 }, // Cache for 5 minutes
	});

	if (!response.ok) {
		console.error(`GitHub API error: ${response.status} for URL: ${url}`);
		return null;
	}

	return response.json();
}

function formatTimeAgo(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return "just now";
	if (diffInSeconds < 3600)
		return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	if (diffInSeconds < 86400)
		return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	if (diffInSeconds < 2592000)
		return `${Math.floor(diffInSeconds / 86400)} days ago`;
	return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}

export async function getRepoData(): Promise<RepoData[]> {
	try {
		const repoDataPromises = REPOS.map(async (repo) => {
			// Fetch repo info
			const repoInfo = await fetchWithAuth(
				`https://api.github.com/repos/${repo}`,
			);
			if (!repoInfo) return null;

			// Fetch latest commit
			const commits = await fetchWithAuth(
				`https://api.github.com/repos/${repo}/commits?per_page=1`,
			);
			const lastCommit =
				commits?.[0]?.commit.committer.date || repoInfo.pushed_at;

			return {
				name: repoInfo.name,
				description: REPO_DESCRIPTIONS[repo] || repoInfo.description || "No description available",
				stars: repoInfo.stargazers_count,
				lastCommit: formatTimeAgo(lastCommit),
				url: repoInfo.html_url,
				language: repoInfo.language,
			};
		});

		const results = await Promise.all(repoDataPromises);
		return results.filter(Boolean) as RepoData[];
	} catch (error) {
		console.error("Error fetching GitHub data:", error);
		// Return fallback data
		return [
			{
				name: "ai-sdlc",
				description: "AI-assisted CLI tool that transforms software development into a structured 8-step workflow from idea to production-ready code",
				stars: 0,
				lastCommit: "recently",
				url: "https://github.com/joinvai/ai-sdlc",
				language: "TypeScript",
			},
			{
				name: "xgpt",
				description: "Powerful CLI tool for AI-powered Twitter/X scraping and question-answering with lightning-fast performance",
				stars: 0,
				lastCommit: "recently",
				url: "https://github.com/joinvai/xgpt",
				language: "Python",
			},
			{
				name: "10-essential-docs",
				description: "Automated AI system that generates comprehensive technical documentation and architectural guides from codebases",
				stars: 0,
				lastCommit: "recently",
				url: "https://github.com/ParkerRex/10-essential-docs",
				language: "Markdown",
			},
			{
				name: "flappybench",
				description: "Simple Flappy Bird clone built with Pygame for benchmarking AI model code generation performance",
				stars: 0,
				lastCommit: "recently",
				url: "https://github.com/ParkerRex/flappybench",
				language: "JavaScript",
			},
		];
	}
}
