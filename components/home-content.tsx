"use client";

import {
	CodeIcon,
	CommitIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
	StarIcon,
	TwitterLogoIcon,
	VideoIcon,
} from "@radix-ui/react-icons";
import Footer from "@/components/footer";
import { TerminalIntro } from "@/components/terminal-intro";
import type { RepoData } from "@/lib/github";

interface HomeContentProps {
	githubRepos: RepoData[];
}

export default function HomeContent({ githubRepos }: HomeContentProps) {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
			<div className="container mx-auto px-4 py-16 max-w-2xl flex-1">
				{/* Terminal Intro */}
				<TerminalIntro />

				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">parker rex</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
						tldr: ai-first builder & content creator. building tools, teaching
						workflows, scaling businesses. usually shipping something new.
					</p>
				</div>

				{/* Code */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						code
					</h2>
					<div className="space-y-4">
						{githubRepos.map((repo) => (
							<a
								key={repo.name}
								href={repo.url}
								target="_blank"
								rel="noopener noreferrer"
								className="block bg-gray-50 dark:bg-gray-900 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-800"
							>
								<div className="flex items-start justify-between mb-2">
									<div className="flex items-center gap-2">
										<CodeIcon className="w-5 h-5 flex-shrink-0" />
										<div className="font-semibold">{repo.name}</div>
									</div>
									<div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
										{repo.language && (
											<span className="flex items-center gap-1">
												<span className="w-3 h-3 bg-gray-600 dark:bg-gray-400" />
												{repo.language}
											</span>
										)}
										<span className="flex items-center gap-1">
											<StarIcon className="w-4 h-4" />
											{repo.stars}
										</span>
									</div>
								</div>
								<div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
									{repo.description}
								</div>
								<div className="flex items-center gap-1 text-xs text-gray-500">
									<CommitIcon className="w-3 h-3" />
									Updated {repo.lastCommit}
								</div>
							</a>
						))}
					</div>
				</div>

				{/* Socials */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						socials
					</h2>
					<div className="space-y-4">
						<a
							href="https://twitter.com/parkerrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-50 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-800"
						>
							<TwitterLogoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">follow @parkerrex</div>
								<div className="text-gray-600 dark:text-gray-400 text-sm">
									this is where i'm most active
								</div>
							</div>
						</a>

						<a
							href="https://youtube.com/@parkerrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-50 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-800"
						>
							<VideoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">ai tools channel</div>
								<div className="text-gray-600 dark:text-gray-400 text-sm">
									monday, wednesday, friday - ai tools that actually work
								</div>
							</div>
						</a>

						<a
							href="https://youtube.com/@parkerrexdaily"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-50 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-800"
						>
							<VideoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">daily builds</div>
								<div className="text-gray-600 dark:text-gray-400 text-sm">
									building in public every single day
								</div>
							</div>
						</a>

						<a
							href="https://linkedin.com/in/parkermrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-50 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-800"
						>
							<LinkedInLogoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">connect on linkedin</div>
								<div className="text-gray-600 dark:text-gray-400 text-sm">
									i'm really not professional enough to be on here
								</div>
							</div>
						</a>

						<a
							href="https://github.com/parkerrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-50 dark:bg-gray-900 p-4 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 dark:border-gray-800"
						>
							<GitHubLogoIcon className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">github.com/parkerrex</div>
								<div className="text-gray-600 dark:text-gray-400 text-sm">
									where i build in public and share code
								</div>
							</div>
						</a>
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}
