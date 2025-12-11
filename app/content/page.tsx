import { ArrowRightIcon, VideoIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
	title: "Content & Videos",
	description:
		"AI tutorials, product builds, and behind-the-scenes content from Parker Rex. Check out the YouTube channel for the latest updates.",
	openGraph: {
		title: "Content & Videos - Parker Rex",
		description:
			"AI tutorials, product builds, and behind-the-scenes content. Check out the YouTube channel for the latest updates.",
		url: "https://prex.com/content",
	},
	twitter: {
		title: "Content & Videos - Parker Rex",
		description: "AI tutorials, product builds, and behind-the-scenes content.",
	},
	alternates: {
		canonical: "https://prex.com/content",
	},
};

export default function ContentPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
			<div className="container mx-auto px-4 py-16 max-w-6xl flex-1 flex flex-col items-center justify-center">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">content</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
						ai tutorials, product builds, and behind-the-scenes content
					</p>
				</div>

				{/* Channel Link */}
				<div className="mb-16 text-center">
					<a
						href="https://youtube.com/@parkerrex"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-semibold hover:opacity-80 transition-opacity"
					>
						<VideoIcon className="w-5 h-5" />
						<span>Watch on YouTube</span>
						<ArrowRightIcon className="w-5 h-5" />
					</a>
					<p className="mt-4 text-xs text-gray-500 dark:text-gray-500 uppercase tracking-widest">
						@parkerrex
					</p>
				</div>

				<Footer />
			</div>
		</div>
	);
}
