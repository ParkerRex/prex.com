import Footer from "@/components/footer";
import { categoryInfo } from "@/lib/blog";
import {
	getAllTags,
	getPostsByTag,
	getRelatedTags,
	slugToTag,
} from "@/lib/tags";
import { Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
	params: Promise<{
		tag: string;
	}>;
}

export async function generateStaticParams() {
	const tags = getAllTags();
	return tags.map((tag) => ({
		tag: tag.slug,
	}));
}

export async function generateMetadata({
	params,
}: TagPageProps): Promise<Metadata> {
	const { tag } = await params;
	const tagName = slugToTag(tag);
	const posts = getPostsByTag(tag);

	if (posts.length === 0) {
		return {
			title: "Tag Not Found",
		};
	}

	return {
		title: `${tagName} - Tags - Blog - Parker Rex`,
		description: `Browse ${posts.length} blog posts tagged with "${tagName}"`,
		openGraph: {
			title: `${tagName} - Tags - Blog - Parker Rex`,
			description: `Browse ${posts.length} blog posts tagged with "${tagName}"`,
			type: "website",
			url: `https://prex.com/blog/tags/${tag}`,
		},
		twitter: {
			card: "summary_large_image",
			title: `${tagName} - Tags - Blog - Parker Rex`,
			description: `Browse ${posts.length} blog posts tagged with "${tagName}"`,
		},
	};
}

export default async function TagPage({ params }: TagPageProps) {
	const { tag } = await params;
	const tagName = slugToTag(tag);
	const posts = getPostsByTag(tag);
	const relatedTags = getRelatedTags(tag);

	// If no posts found with this tag, show 404
	if (posts.length === 0) {
		// Check if it's a completely invalid tag
		const allTags = getAllTags();
		const tagExists = allTags.some((t) => t.slug === tag);
		if (!tagExists) {
			notFound();
		}
	}

	return (
		<div className="min-h-screen bg-black text-white font-mono">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<header className="mb-8">
					<Link
						href="/blog/tags"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
					>
						← Back to all tags
					</Link>
					<div className="flex items-center gap-3 mb-4">
						<Tag className="w-6 h-6 text-gray-500" />
						<h1 className="text-3xl font-bold">{tagName}</h1>
					</div>
					<p className="text-gray-400">
						{posts.length} {posts.length === 1 ? "post" : "posts"} tagged with
						"{tagName}"
					</p>
				</header>

				{/* Related tags */}
				{relatedTags.length > 0 && (
					<section className="mb-8">
						<h2 className="text-gray-500 text-xs uppercase tracking-wider mb-4">
							Related Tags
						</h2>
						<div className="flex flex-wrap gap-2">
							{relatedTags.map((relatedTag) => (
								<Link
									key={relatedTag.slug}
									href={`/blog/tags/${relatedTag.slug}`}
									className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors text-sm group"
								>
									<span className="group-hover:text-blue-400 transition-colors">
										{relatedTag.name}
									</span>
									<span className="text-xs text-gray-500">
										{relatedTag.count}
									</span>
								</Link>
							))}
						</div>
					</section>
				)}

				<main>
					{posts.length > 0 ? (
						<div className="space-y-6">
							{posts.map((post) => (
								<article
									key={`${post.category}-${post.slug}`}
									className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
								>
									<Link href={`/blog/${post.category}/${post.slug}`}>
										<div className="flex items-start justify-between mb-2">
											<h2 className="text-xl font-semibold hover:text-blue-400 transition-colors">
												{post.title}
											</h2>
											<span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded ml-4 flex-shrink-0">
												{categoryInfo[post.category].title}
											</span>
										</div>
										<p className="text-gray-400 mb-4 leading-relaxed">
											{post.description}
										</p>
										<div className="flex items-center gap-4 text-sm text-gray-500">
											<time dateTime={post.date}>
												{new Date(post.date).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</time>
											<span>{post.readingTime} min read</span>
											{post.tags && post.tags.length > 0 && (
												<div className="flex flex-wrap gap-2">
													{post.tags.map((t) => (
														<span
															key={t}
															className={`px-2 py-1 rounded text-xs ${
																t.toLowerCase() === tagName.toLowerCase()
																	? "bg-blue-900 text-blue-300"
																	: "bg-gray-800"
															}`}
														>
															{t}
														</span>
													))}
												</div>
											)}
										</div>
									</Link>
								</article>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center min-h-[300px] text-center">
							<div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
								<Tag className="w-8 h-8 text-gray-600" />
							</div>
							<h2 className="text-xl font-bold mb-2 text-gray-300">
								No posts with this tag
							</h2>
							<p className="text-gray-400 text-sm max-w-md mb-4">
								No posts have been tagged with "{tagName}" yet.
							</p>
							<Link
								href="/blog/tags"
								className="text-blue-400 hover:text-blue-300 transition-colors"
							>
								Browse all tags →
							</Link>
						</div>
					)}
				</main>

				<Footer />
			</div>
		</div>
	);
}