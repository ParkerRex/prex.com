import HomeContent from "@/components/home-content";
import { getRepoData } from "@/lib/github";

export default async function Home() {
	const githubRepos = await getRepoData();
	return <HomeContent githubRepos={githubRepos} />;
}