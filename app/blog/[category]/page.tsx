import Footer from "@/components/footer";
import { type BlogCategory, blogCategories, categoryInfo } from "@/lib/blog";
import { getPostsByCategory } from "@/lib/mdx";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
	params: Promise<{
		category: string;
	}>;
}

export async function generateStaticParams() {
	return blogCategories.map((category) => ({
		category,
	}));
}

export async function generateMetadata({
	params,
}: CategoryPageProps): Promise<Metadata> {
	const { category } = await params;

	if (!blogCategories.includes(category as BlogCategory)) {
		return {
			title: "Category Not Found",
		};
	}

	const categoryData = categoryInfo[category as BlogCategory];

	return {
		title: `${categoryData.title} - Blog - Parker Rex`,
		description: categoryData.description,
		openGraph: {
			title: `${categoryData.title} - Blog - Parker Rex`,
			description: categoryData.description,
			type: "website",
			url: `https://prex.com/blog/${category}`,
		},
		twitter: {
			card: "summary_large_image",
			title: `${categoryData.title} - Blog - Parker Rex`,
			description: categoryData.description,
		},
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = await params;

	if (!blogCategories.includes(category as BlogCategory)) {
		notFound();
	}

	const posts = getPostsByCategory(category as BlogCategory);
	const categoryData = categoryInfo[category as BlogCategory];

	return (
		<>
			<div className="mb-12">
				<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
					{categoryData.title}
				</h2>
				<p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-8">
					{categoryData.description}
				</p>

				{posts.length > 0 ? (
					<div className="space-y-4">
						{posts.map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${category}/${post.slug}`}
								className="bg-gray-100 dark:bg-gray-900 p-4 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer block"
							>
								<h3 className="font-semibold mb-2">
									{post.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
									{post.description}
								</p>
								<div className="flex items-center gap-4 text-xs text-gray-500">
									<time dateTime={post.date}>
										{new Date(post.date).toLocaleDateString()}
									</time>
									<span>{post.readingTime} min read</span>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center min-h-[300px] text-center">
						<div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 flex items-center justify-center mb-4">
							<div className="text-2xl">📝</div>
						</div>
						<h2 className="text-xl font-bold mb-2">
							No posts yet
						</h2>
						<p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
							No posts in the {categoryData.title.toLowerCase()} category yet.
							Check back soon for new content!
						</p>
					</div>
				)}
			</div>

			<Footer />
		</>
	);
}
