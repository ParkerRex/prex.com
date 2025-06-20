import { type BlogCategory, categoryInfo } from "@/lib/blog";
import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

interface RelatedPostsProps {
	currentSlug: string;
	currentCategory: BlogCategory;
	tags?: string[];
	limit?: number;
}

export function RelatedPosts({
	currentSlug,
	currentCategory,
	tags = [],
	limit = 3,
}: RelatedPostsProps) {
	const allPosts = getAllPosts();

	// Calculate relevance score for each post
	const scoredPosts = allPosts
		.filter(
			(post) =>
				!(post.slug === currentSlug && post.category === currentCategory),
		)
		.map((post) => {
			let score = 0;

			// Same category gets points
			if (post.category === currentCategory) {
				score += 2;
			}

			// Shared tags get points
			if (post.tags && tags.length > 0) {
				const sharedTags = post.tags.filter((tag) =>
					tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
				);
				score += sharedTags.length * 3;
			}

			return { post, score };
		})
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);

	if (scoredPosts.length === 0) {
		return null;
	}

	return (
		<section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
			<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
				related posts
			</h2>
			<div className="space-y-4">
				{scoredPosts.map(({ post }) => (
					<Link
						key={`${post.category}-${post.slug}`}
						href={`/blog/${post.category}/${post.slug}`}
						className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer block"
					>
						<div className="flex items-start justify-between mb-2">
							<h3 className="font-semibold">
								{post.title}
							</h3>
							<span className="text-xs text-gray-600 dark:text-gray-400 ml-4 flex-shrink-0">
								{categoryInfo[post.category].title}
							</span>
						</div>
						<p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
							{post.description}
						</p>
						<div className="flex items-center gap-3 text-xs text-gray-500">
							<span>{new Date(post.date).toLocaleDateString()}</span>
							<span>{post.readingTime} min read</span>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}