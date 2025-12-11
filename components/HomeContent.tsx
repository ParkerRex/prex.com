"use client";

import {
	CodeIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
	StarIcon,
	TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Footer from "@/components/Footer";
import { TerminalIntro } from "@/components/TerminalIntro";
import type { RepoData } from "@/lib/github";

interface HomeContentProps {
	githubRepos: RepoData[];
}

export default function HomeContent({ githubRepos }: HomeContentProps) {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col font-mono text-sm">
			<div className="container mx-auto px-4 py-16 max-w-2xl flex-1 flex flex-col">
				{/* Terminal Intro */}
				<TerminalIntro />

				{/* Header */}
				<div className="text-left mb-12 border-b border-border pb-8">
					<h1 className="text-xl font-bold mb-6 uppercase tracking-widest border-l-4 border-signal pl-4">
						Parker Rex
					</h1>
					<div className="text-muted-foreground text-sm leading-relaxed space-y-4 max-w-none">
						<p>
							<strong className="text-foreground">
								Applied AI Architect & Product Executive.
							</strong>
						</p>
						<p>
							Previously: VP of Product at Delivery Dudes. Led tech strategy for
							$73M GMV. $23M acquisition.
						</p>
						<p>
							Implementation &gt; Theory. Builds production-grade infrastructure
							(TypeScript, Next.js, PostgreSQL). Bridges "Idea" to "Revenue".
							Specializes in autonomous AI workflows.
						</p>
					</div>
				</div>

				{/* Code */}
				<div className="mb-12">
					<h2 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 border-b border-border pb-1">
						// Code
					</h2>
					<div className="grid grid-cols-1 gap-0 border-t border-border">
						{githubRepos.map((repo) => (
							<a
								key={repo.name}
								href={repo.url}
								target="_blank"
								rel="noopener noreferrer"
								className="group block p-4 hover:bg-secondary transition-colors border-b border-border"
							>
								<div className="flex items-center justify-between mb-1">
									<div className="flex items-center gap-2">
										<CodeIcon className="w-4 h-4 text-muted-foreground group-hover:text-signal transition-colors" />
										<div className="font-bold text-sm group-hover:underline decoration-signal underline-offset-4">
											{repo.name}
										</div>
									</div>
									<div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
										{repo.language && <span>{repo.language}</span>}
										<span className="flex items-center gap-1">
											<StarIcon className="w-3 h-3" />
											{repo.stars}
										</span>
									</div>
								</div>
								<div className="text-muted-foreground text-xs pl-6 opacity-80 line-clamp-1">
									{repo.description}
								</div>
							</a>
						))}
					</div>
				</div>

				{/* Socials */}
				<div className="mb-12">
					<h2 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-4 border-b border-border pb-1">
						// Connect
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
						{[
							{
								href: "https://twitter.com/parkerrex",
								icon: TwitterLogoIcon,
								label: "@parkerrex",
							},
							{
								href: "https://linkedin.com/in/parkermrex",
								icon: LinkedInLogoIcon,
								label: "LinkedIn",
							},
							{
								href: "https://github.com/parkerrex",
								icon: GitHubLogoIcon,
								label: "GitHub",
							},
						].map((social) => (
							<a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="bg-background p-4 flex items-center justify-center gap-2 hover:bg-secondary hover:text-signal transition-colors group"
							>
								<social.icon className="w-4 h-4 text-muted-foreground group-hover:text-signal" />
								<span className="text-xs font-bold uppercase tracking-wider">
									{social.label}
								</span>
							</a>
						))}
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}
