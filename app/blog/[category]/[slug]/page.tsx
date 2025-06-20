import { RelatedPosts } from "@/components/blog/related-posts";
import Footer from "@/components/footer";
import { mdxComponents } from "@/components/mdx";
import { type BlogCategory, blogCategories, categoryInfo } from "@/lib/blog";
import {
	getAllPosts,
	getPostBySlug,
	getPostContent,
} from "@/lib/mdx";
import { tagToSlug } from "@/lib/tags";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
	params: Promise<{
		category: string;
		slug: string;
	}>;
}

export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({
		category: post.category,
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const { category, slug } = await params;

	if (!blogCategories.includes(category as BlogCategory)) {
		return {
			title: "Post Not Found",
		};
	}

	const post = getPostBySlug(category as BlogCategory, slug);

	if (!post) {
		return {
			title: "Post Not Found",
		};
	}

	return {
		title: `${post.title} - Parker Rex`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			url: `https://prex.com/blog/${category}/${slug}`,
			publishedTime: post.date,
			authors: ["Parker Rex"],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { category, slug } = await params;

	if (!blogCategories.includes(category as BlogCategory)) {
		notFound();
	}

	const post = getPostBySlug(category as BlogCategory, slug);
	const content = getPostContent(category as BlogCategory, slug);

	if (!post || !content) {
		notFound();
	}


	return (
		<>
			<div className="min-h-screen bg-white dark:bg-gray-950">
				<div className="max-w-4xl mx-auto px-6 py-16">
					<article>
						<header className="mb-16 text-center">
							<div className="mb-6">
								<span className="inline-block px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full uppercase tracking-wider">
									{categoryInfo[category as BlogCategory].title}
								</span>
							</div>

							<h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
								{post.title}
							</h1>
							
							<p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
								{post.description}
							</p>

							<div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
								<time dateTime={post.date} className="font-medium">
									{new Date(post.date).toLocaleDateString('en-US', { 
										year: 'numeric', 
										month: 'long', 
										day: 'numeric' 
									})}
								</time>
								<span className="w-1 h-1 bg-gray-400 rounded-full"></span>
								<span className="font-medium">{post.readingTime} min read</span>
							</div>
						</header>

						<main className="prose prose-lg dark:prose-invert prose-gray max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300">
							<MDXRemote source={content} components={mdxComponents} />
						</main>

						{post.tags && post.tags.length > 0 && (
							<footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
								<div className="text-center">
									<h3 className="text-sm font-medium text-gray-900 dark:text-white mb-6 uppercase tracking-wider">
										Tagged in
									</h3>
									<div className="flex flex-wrap gap-3 justify-center">
										{post.tags.map((tag) => (
											<Link
												key={tag}
												href={`/blog/tags/${tagToSlug(tag)}`}
												className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200"
											>
												{tag}
											</Link>
										))}
									</div>
								</div>
							</footer>
						)}

						<div className="mt-20">
							<RelatedPosts
								currentSlug={slug}
								currentCategory={category as BlogCategory}
								tags={post.tags}
							/>
						</div>
					</article>
				</div>
			</div>

			<Footer />
		</>
	);
}
