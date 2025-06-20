import Footer from "@/components/footer";
import { getAllTags } from "@/lib/tags";
import { Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Tags - Blog - Parker Rex",
	description: "Browse all tags and topics from Parker Rex's blog",
	openGraph: {
		title: "Tags - Blog - Parker Rex",
		description: "Browse all tags and topics from Parker Rex's blog",
		type: "website",
		url: "https://prex.com/blog/tags",
	},
	twitter: {
		card: "summary_large_image",
		title: "Tags - Blog - Parker Rex",
		description: "Browse all tags and topics from Parker Rex's blog",
	},
};

export default function TagsPage() {
	const tags = getAllTags();
	const hasTags = tags.length > 0;

	// Group tags by first letter for better organization
	const groupedTags = tags.reduce(
		(acc, tag) => {
			const firstLetter = tag.name[0]?.toUpperCase() || '#';
			if (!acc[firstLetter]) {
				acc[firstLetter] = [];
			}
			acc[firstLetter].push(tag);
			return acc;
		},
		{} as Record<string, typeof tags>,
	);

	const sortedLetters = Object.keys(groupedTags).sort();

	return (
		<div className="min-h-screen bg-black text-white font-mono">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<header className="mb-12">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
					>
						← Back to blog
					</Link>
					<div className="flex items-center gap-3 mb-4">
						<Tag className="w-8 h-8 text-gray-500" />
						<h1 className="text-3xl font-bold">Tags</h1>
					</div>
					<p className="text-gray-400">
						Explore topics and themes across all blog posts
					</p>
				</header>

				<main>
					{hasTags ? (
						<>
							{/* Popular tags section */}
							<section className="mb-12">
								<h2 className="text-gray-500 text-xs uppercase tracking-wider mb-6">
									Popular Tags
								</h2>
								<div className="flex flex-wrap gap-3">
									{tags.slice(0, 10).map((tag) => (
										<Link
											key={tag.slug}
											href={`/blog/tags/${tag.slug}`}
											className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors group"
										>
											<span className="group-hover:text-blue-400 transition-colors">
												{tag.name}
											</span>
											<span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
												{tag.count}
											</span>
										</Link>
									))}
								</div>
							</section>

							{/* All tags alphabetically */}
							<section>
								<h2 className="text-gray-500 text-xs uppercase tracking-wider mb-6">
									All Tags
								</h2>
								<div className="space-y-8">
									{sortedLetters.map((letter) => (
										<div key={letter}>
											<h3 className="text-xl font-bold text-gray-600 mb-3">
												{letter}
											</h3>
											<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
												{groupedTags[letter]?.map((tag) => (
													<Link
														key={tag.slug}
														href={`/blog/tags/${tag.slug}`}
														className="flex items-center justify-between p-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors group"
													>
														<span className="group-hover:text-blue-400 transition-colors">
															{tag.name}
														</span>
														<span className="text-sm text-gray-500">
															{tag.count} {tag.count === 1 ? "post" : "posts"}
														</span>
													</Link>
												))}
											</div>
										</div>
									))}
								</div>
							</section>
						</>
					) : (
						<div className="flex flex-col items-center justify-center min-h-[300px] text-center">
							<div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
								<Tag className="w-8 h-8 text-gray-600" />
							</div>
							<h2 className="text-xl font-bold mb-2 text-gray-300">
								No tags yet
							</h2>
							<p className="text-gray-400 text-sm max-w-md">
								Tags will appear here once blog posts are published with tags.
							</p>
						</div>
					)}
				</main>

				<Footer />
			</div>
		</div>
	);
}