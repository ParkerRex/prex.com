import Footer from "@/components/footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Sponsors & Partnerships",
	description:
		"Partnership opportunities with Parker Rex for affiliate marketing and video sponsorships. Work with an AI-first content creator and entrepreneur.",
	openGraph: {
		title: "Sponsors & Partnerships - Parker Rex",
		description:
			"Partnership opportunities for affiliate marketing and video sponsorships with an AI-first content creator.",
		url: "https://prex.com/sponsors",
	},
	twitter: {
		title: "Sponsors & Partnerships - Parker Rex",
		description:
			"Partnership opportunities for affiliate marketing and video sponsorships.",
	},
	alternates: {
		canonical: "https://prex.com/sponsors",
	},
};

export default function SponsorsPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">my sponsors</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
						here's all the brands that have run ads on my content.
						if you're a brand and want to partner,{" "}
						<a
							href="mailto:me@parkerrex.com"
							className="underline hover:text-gray-800 dark:hover:text-gray-200"
						>
							reach out
						</a>
					</p>
				</div>

				{/* Affiliates Section */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						affiliates
					</h2>
					<div className="bg-gray-100 dark:bg-gray-900 p-4">
						<div className="text-center py-8">
							<div className="font-semibold mb-2">coming soon</div>
							<p className="text-gray-600 dark:text-gray-400 text-sm">
								affiliate partnerships with brands i actually use and recommend.
								stay tuned for authentic product recommendations.
							</p>
						</div>
					</div>
				</div>

				{/* Video Sponsors Section */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						video sponsors
					</h2>
					<div className="bg-gray-100 dark:bg-gray-900 p-4">
						<div className="text-center py-8">
							<div className="font-semibold mb-2">coming soon</div>
							<p className="text-gray-600 dark:text-gray-400 text-sm">
								video sponsorship opportunities for brands that align with ai,
								productivity, and developer tools. quality over quantity.
							</p>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}
