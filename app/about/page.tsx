import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "About Parker Rex",
	description:
		"Learn about Parker Rex, a tech entrepreneur and AI-first builder with a decade of product management experience. From growing a startup to $73M in revenue to building AI tools and communities.",
	openGraph: {
		title: "About Parker Rex - AI-First Builder & Tech Entrepreneur",
		description:
			"Tech entrepreneur and AI-first builder with a decade of product management experience. Growing startups and building AI tools.",
		url: "https://prex.com/about",
	},
	twitter: {
		title: "About Parker Rex - AI-First Builder & Tech Entrepreneur",
		description:
			"Tech entrepreneur and AI-first builder with a decade of product management experience.",
	},
	alternates: {
		canonical: "https://prex.com/about",
	},
};

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
			<div className="container mx-auto px-4 py-16 max-w-2xl flex-1 flex flex-col">
				{/* Header */}
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">About Parker Rex</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						I bridge the gap between the Boardroom and the IDE.
					</p>
				</div>

				{/* Main Content */}
				<div className="mb-12">
					<div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg space-y-6">
						<div>
							<h3 className="font-bold text-lg mb-2">The Executive Track</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								My roots are in high-growth operations. As the VP of Product for
								Delivery Dudes, I architected the product strategy that scaled
								the company to $73M in annual volume, leading to a strategic
								acquisition by Waitr (Nasdaq: WTRH). I understand P&Ls, investor
								updates, and the pressure of &quot;must-ship&quot; deadlines.
							</p>
						</div>

						<div>
							<h3 className="font-bold text-lg mb-2">The Builder Track</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								I left the boardroom to return to the code. I realized the next
								decade of value wouldn't come from managing software, but from
								architecting Agentic AI. I spent the last 3 years re-tooling as
								a Full-Stack Engineer (TypeScript/Next.js/Supabase).
							</p>
						</div>

						<div>
							<h3 className="font-bold text-lg mb-2">The Mission</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								I help companies escape &quot;Demo Hell.&quot; Most businesses
								have cool AI ideas but lack the infrastructure to make them
								work. I build the unsexy, critical layers—Data Hygiene, Auth,
								and Logic—that allow you to deploy AI safely and profitably.
							</p>
						</div>

						<div>
							<h3 className="font-bold text-lg mb-2">Personal R&D</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								I am also the architect behind The Shorts Factory, an autonomous
								media pipeline producing 5 videos/day.
							</p>
						</div>
					</div>
				</div>

				<Footer currentPage="about" />
			</div>
		</div>
	);
}
