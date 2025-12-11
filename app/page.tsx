import HomeContent from "@/components/HomeContent";
import { getRepoData } from "@/lib/github";

export default async function Home() {
	const githubRepos = await getRepoData();
	return <HomeContent githubRepos={githubRepos} />;
}
