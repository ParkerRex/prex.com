import Footer from "@/components/footer";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Whiteboards & Visual Explanations",
	description:
		"Interactive whiteboards and visual explanations of AI concepts, product strategies, and technical deep-dives from Parker Rex. Coming soon.",
	openGraph: {
		title: "Whiteboards & Visual Explanations - Parker Rex",
		description:
			"Interactive whiteboards and visual explanations of AI concepts, product strategies, and technical deep-dives.",
		url: "https://prex.com/whiteboards",
	},
	twitter: {
		title: "Whiteboards & Visual Explanations - Parker Rex",
		description:
			"Interactive whiteboards and visual explanations of AI concepts and product strategies.",
	},
	alternates: {
		canonical: "https://prex.com/whiteboards",
	},
};

export default function WhiteboardsPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">whiteboards</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
						interactive whiteboards and visual explanations of ai concepts, product strategies, and technical deep-dives
					</p>
				</div>

				{/* Coming Soon Content */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						content
					</h2>
					<div className="bg-gray-100 dark:bg-gray-900 p-4">
						<div className="text-center py-8">
							<div className="font-semibold mb-2">coming soon</div>
							<p className="text-gray-600 dark:text-gray-400 text-sm">
								stay tuned for visual breakdowns of complex topics
							</p>
						</div>
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}
