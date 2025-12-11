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
		<div className="min-h-screen bg-background text-foreground flex flex-col font-mono text-sm">
			<div className="container mx-auto px-4 py-16 max-w-2xl flex-1 flex flex-col">
				{/* Header */}
				<div className="text-left mb-12 border-b border-border pb-8">
					<h1 className="text-xl font-bold mb-6 uppercase tracking-widest border-l-4 border-signal pl-4">
						About Parker Rex
					</h1>
					<p className="text-muted-foreground text-sm pl-5">
						Bridging the gap between the Boardroom and the IDE.
					</p>
				</div>

				{/* Main Content */}
				<div className="mb-12">
					<div className="space-y-12">
						<section className="pl-5 border-l border-border relative">
							<div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-signal rounded-full" />
							<h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">
								// The Executive Track
							</h3>
							<p className="leading-relaxed opacity-90">
								My roots are in high-growth operations. As the VP of Product for
								Delivery Dudes, I architected the product strategy that scaled
								the company to $73M in annual volume, leading to a strategic
								acquisition by Waitr (Nasdaq: WTRH). I understand P&Ls, investor
								updates, and the pressure of "must-ship" deadlines.
							</p>
						</section>

						<section className="pl-5 border-l border-border relative">
							<div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-muted-foreground/30 rounded-full" />
							<h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">
								// The Builder Track
							</h3>
							<p className="leading-relaxed opacity-90">
								I left the boardroom to return to the code. I realized the next
								decade of value wouldn't come from managing software, but from
								architecting Agentic AI. I spent the last 3 years re-tooling as
								a Full-Stack Engineer (TypeScript/Next.js/Supabase).
							</p>
						</section>

						<section className="pl-5 border-l border-border relative">
							<div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-muted-foreground/30 rounded-full" />
							<h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">
								// The Mission
							</h3>
							<p className="leading-relaxed opacity-90">
								I help companies escape "Demo Hell." Most businesses have cool
								AI ideas but lack the infrastructure to make them work. I build
								the unsexy, critical layers—Data Hygiene, Auth, and Logic—that
								allow you to deploy AI safely and profitably.
							</p>
						</section>

						<section className="pl-5 border-l border-border relative">
							<div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-muted-foreground/30 rounded-full" />
							<h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-muted-foreground">
								// Personal R&D
							</h3>
							<p className="leading-relaxed opacity-90">
								I am also the architect behind The Shorts Factory, an autonomous
								media pipeline producing 5 videos/day.
							</p>
						</section>
					</div>
				</div>

				<Footer currentPage="about" />
			</div>
		</div>
	);
}
