import Footer from "@/components/footer";
import {
	Activity,
	Briefcase,
	Building,
	ExternalLink,
	Github,
	Linkedin,
	Star,
	Twitter,
	Users,
	Youtube,
	Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-black text-white font-mono">
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">parker rex</h1>
					<p className="text-gray-400 text-sm leading-relaxed">
						tldr: ai-first builder & content creator. building tools, teaching
						workflows, scaling businesses. usually shipping something new.
					</p>
				</div>

				{/* Stats */}
				<div className="mb-12">
					<h2 className="text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						stats
					</h2>
					<div className="space-y-4">
						{/* Strava Stats */}
						<div className="bg-gray-900 p-4 rounded-lg">
							<div className="flex items-center gap-3 mb-3">
								<Activity className="w-5 h-5 text-orange-500" />
								<div>
									<div className="font-semibold">weekly running goal</div>
									<div className="text-gray-400 text-sm">
										11 / 20 miles completed
									</div>
								</div>
							</div>
							<div className="w-full bg-gray-700 rounded-full h-2">
								<div
									className="bg-orange-500 h-2 rounded-full transition-all duration-300"
									style={{ width: "55%" }}
								></div>
							</div>
						</div>

						{/* GitHub Repositories */}
						<div className="bg-gray-900 p-4 rounded-lg flex items-center gap-3">
							<div className="relative">
								<Github className="w-5 h-5" />
								<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
							</div>
							<div className="flex-1">
								<div className="font-semibold">MAP</div>
								<div className="text-gray-400 text-sm">
									last commit 15 minutes ago
								</div>
							</div>
							<div className="flex items-center gap-1 text-gray-400 text-sm">
								<Star className="w-3 h-3" />
								<span>127</span>
							</div>
						</div>

						<div className="bg-gray-900 p-4 rounded-lg flex items-center gap-3">
							<div className="relative">
								<Github className="w-5 h-5" />
								<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
							</div>
							<div className="flex-1">
								<div className="font-semibold">ai-sdlc</div>
								<div className="text-gray-400 text-sm">
									last commit 2 hours ago
								</div>
							</div>
							<div className="flex items-center gap-1 text-gray-400 text-sm">
								<Star className="w-3 h-3" />
								<span>89</span>
							</div>
						</div>

						<div className="bg-gray-900 p-4 rounded-lg flex items-center gap-3">
							<div className="relative">
								<Github className="w-5 h-5" />
								<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
							</div>
							<div className="flex-1">
								<div className="font-semibold">vai-v2</div>
								<div className="text-gray-400 text-sm">
									last commit 1 day ago
								</div>
							</div>
							<div className="flex items-center gap-1 text-gray-400 text-sm">
								<Star className="w-3 h-3" />
								<span>234</span>
							</div>
						</div>
					</div>
				</div>

				{/* Socials */}
				<div className="mb-12">
					<h2 className="text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						socials
					</h2>
					<div className="space-y-4">
						<a
							href="https://twitter.com/parkerrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Twitter className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">follow @parkerrex</div>
								<div className="text-gray-400 text-sm">
									this is where i'm most active
								</div>
							</div>
						</a>

						<a
							href="https://youtube.com/@parkerrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Youtube className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">ai tools channel</div>
								<div className="text-gray-400 text-sm">
									monday, wednesday, friday - ai tools that actually work
								</div>
							</div>
						</a>

						<a
							href="https://youtube.com/@parkerrexdaily"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Youtube className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">daily builds</div>
								<div className="text-gray-400 text-sm">
									building in public every single day
								</div>
							</div>
						</a>

						<a
							href="https://linkedin.com/in/parkermrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Linkedin className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">connect on linkedin</div>
								<div className="text-gray-400 text-sm">
									i'm really not professional enough to be on here
								</div>
							</div>
						</a>

						<a
							href="https://github.com/parkerrex"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Github className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">github.com/parkerrex</div>
								<div className="text-gray-400 text-sm">
									where i build in public and share code
								</div>
							</div>
						</a>
					</div>
				</div>

				{/* Projects */}
				<div>
					<h2 className="text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						projects
					</h2>
					<div className="space-y-4">
						<a
							href="https://www.skool.com/troublefreeai"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Users className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">vibe with ai (vai)</div>
								<div className="text-gray-400 text-sm">
									private builder network with custom dev tools, active discord,
									and weekly drops
								</div>
							</div>
						</a>

						<a
							href="https://rexorg.com"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Zap className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">rex labs</div>
								<div className="text-gray-400 text-sm">
									ai-first agency helping businesses onboard to the ai world
								</div>
							</div>
						</a>

						<Link
							href="/sponsors"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Briefcase className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">rex media</div>
								<div className="text-gray-400 text-sm">
									content & sponsorship partnerships with brands
								</div>
							</div>
						</Link>

						<a
							href="https://rexorg.com"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<Building className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">rex builds</div>
								<div className="text-gray-400 text-sm">
									done-for-you automation & ai mvp development
								</div>
							</div>
						</a>

						<a
							href="https://rexorg.com"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-gray-900 p-4 rounded-lg flex items-start gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
						>
							<ExternalLink className="w-5 h-5 mt-1 flex-shrink-0" />
							<div>
								<div className="font-semibold">rex advisory</div>
								<div className="text-gray-400 text-sm">
									ai roadmaps & fractional cpo services
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
