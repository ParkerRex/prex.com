import Footer from "@/components/footer";
import { blogCategories, categoryInfo } from "@/lib/blog";
import { getAllPosts } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import Link from "next/link";

export default function BlogPage() {
	const allPosts = getAllPosts();
	const hasAnyPosts = allPosts.length > 0;
	const tags = getAllTags();
	const hasTags = tags.length > 0;

	return (
		<>
			{/* Categories */}
			<div className="mb-12">
				<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
					categories
				</h2>
				<div className="space-y-4">
					{blogCategories.map((category) => {
						const categoryPosts = allPosts.filter(
							(post) => post.category === category,
						);
						return (
							<Link
								key={category}
								href={`/blog/${category}`}
								className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer block"
							>
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-semibold">
											{categoryInfo[category].title}
										</h3>
										<p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
											{categoryInfo[category].description}
										</p>
									</div>
									<div className="text-gray-600 dark:text-gray-400 text-sm">
										{categoryPosts.length}{" "}
										{categoryPosts.length === 1 ? "post" : "posts"}
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>

			{/* Popular Tags */}
			{hasTags && (
				<div className="mb-12">
					<div className="mb-6">
						<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider text-center">
							popular tags
						</h2>
					</div>
					<div className="flex flex-wrap gap-2 justify-center">
						{tags.slice(0, 12).map((tag) => (
							<Link
								key={tag.slug}
								href={`/blog/tags/${tag.slug}`}
								className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm"
							>
								<span>
									{tag.name}
								</span>
								<span className="text-xs text-gray-600 dark:text-gray-400">
									{tag.count}
								</span>
							</Link>
						))}
					</div>
				</div>
			)}

			{/* Recent Posts */}
			{hasAnyPosts ? (
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						recent posts
					</h2>
					<div className="space-y-4">
						{allPosts.slice(0, 5).map((post) => (
							<Link
								key={`${post.category}-${post.slug}`}
								href={`/blog/${post.category}/${post.slug}`}
								className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer block"
							>
								<div className="flex items-start justify-between mb-2">
									<h3 className="font-semibold">
										{post.title}
									</h3>
									<span className="text-xs text-gray-600 dark:text-gray-400">
										{post.category}
									</span>
								</div>
								<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{post.description}</p>
								<div className="flex items-center gap-4 text-xs text-gray-500">
									<span>{new Date(post.date).toLocaleDateString()}</span>
									<span>{post.readingTime} min read</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[300px] text-center mb-12">
					<div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
						<div className="text-2xl">📝</div>
					</div>
					<h2 className="text-xl font-bold mb-2">No posts yet</h2>
					<p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
						I'm working on thoughtful articles about AI, development, and
						building in public. Check back soon for insights and practical
						guides.
					</p>
				</div>
			)}

			<Footer />
		</>
	);
}
