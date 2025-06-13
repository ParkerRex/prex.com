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
const REPOS = [
	'parkerrex/vai',
	'parkerrex/xgpt', 
	'parkerrex/ai-sdlc',
];

async function fetchWithAuth(url: string) {
	const headers: Record<string, string> = {
		'Accept': 'application/vnd.github.v3+json',
		'User-Agent': 'prex.com-website'
	};

	if (GITHUB_TOKEN) {
		headers['Authorization'] = `token ${GITHUB_TOKEN}`;
	}

	const response = await fetch(url, { 
		headers,
		next: { revalidate: 300 } // Cache for 5 minutes
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

	if (diffInSeconds < 60) return 'just now';
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
	if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
	return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}

export async function getRepoData(): Promise<RepoData[]> {
	try {
		const repoDataPromises = REPOS.map(async (repo) => {
			// Fetch repo info
			const repoInfo = await fetchWithAuth(`https://api.github.com/repos/${repo}`);
			if (!repoInfo) return null;
			
			// Fetch latest commit
			const commits = await fetchWithAuth(`https://api.github.com/repos/${repo}/commits?per_page=1`);
			const lastCommit = commits?.[0]?.commit.committer.date || repoInfo.pushed_at;

			return {
				name: repoInfo.name,
				description: repoInfo.description || 'No description available',
				stars: repoInfo.stargazers_count,
				lastCommit: formatTimeAgo(lastCommit),
				url: repoInfo.html_url,
				language: repoInfo.language
			};
		});

		const results = await Promise.all(repoDataPromises);
		return results.filter(Boolean) as RepoData[];
	} catch (error) {
		console.error('Error fetching GitHub data:', error);
		// Return fallback data
		return [
			{
				name: 'vai',
				description: 'vibe with ai - ai-first development tools and workflows',
				stars: 234,
				lastCommit: '2 hours ago',
				url: 'https://github.com/joinvai/vai',
				language: 'TypeScript'
			},
			{
				name: 'xgpt',
				description: 'extended gpt capabilities and advanced ai interactions',
				stars: 127,
				lastCommit: '1 day ago',
				url: 'https://github.com/joinvai/xgpt',
				language: 'Python'
			},
			{
				name: 'ai-sdlc',
				description: 'ai-powered software development lifecycle automation',
				stars: 89,
				lastCommit: '4 hours ago',
				url: 'https://github.com/joinvai/ai-sdlc',
				language: 'TypeScript'
			},
			{
				name: 'n8n-turbo-next',
				description: 'turbocharged n8n workflows with next.js integration',
				stars: 45,
				lastCommit: '3 days ago',
				url: 'https://github.com/joinvai/n8n-turbo-next',
				language: 'JavaScript'
			}
		];
	}
}