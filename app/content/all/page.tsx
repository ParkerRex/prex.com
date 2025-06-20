import Footer from "@/components/footer";
import { getAllChannelVideos } from "@/lib/youtube";
import type { Metadata } from "next";
import { ContentDisplay } from "../content-display";

export const metadata: Metadata = {
	title: "All Videos",
	description:
		"Complete collection of AI tutorials, product builds, and behind-the-scenes content from Parker Rex.",
	openGraph: {
		title: "All Videos - Parker Rex",
		description:
			"Complete collection of AI tutorials, product builds, and behind-the-scenes content.",
		url: "https://prex.com/content/all",
	},
	twitter: {
		title: "All Videos - Parker Rex",
		description: "Complete collection of AI tutorials and product builds.",
	},
	alternates: {
		canonical: "https://prex.com/content/all",
	},
};

export default async function AllContentPage() {
	const videos = await getAllChannelVideos();

	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">all content</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						complete collection of tutorials, builds, and behind-the-scenes content
					</p>
				</div>

				<ContentDisplay videos={videos} />

				<Footer />
			</div>
		</div>
	);
}