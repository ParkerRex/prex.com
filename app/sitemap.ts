import type { MetadataRoute } from "next";
import { blogCategories } from "@/lib/blog";
import { getAllPosts } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://prex.com";
	const posts = getAllPosts();
	const tags = getAllTags();

	// Static pages
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/bio`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/content`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/sponsors`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/whiteboards`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${baseUrl}/blog/tags`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];

	// Blog category pages
	const categoryPages: MetadataRoute.Sitemap = blogCategories.map(
		(category) => ({
			url: `${baseUrl}/blog/${category}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		}),
	);

	// Blog posts
	const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `${baseUrl}/blog/${post.category}/${post.slug}`,
		lastModified: new Date(post.date),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	// Tag pages
	const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
		url: `${baseUrl}/blog/tags/${tag.slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.6,
	}));

	return [...staticPages, ...categoryPages, ...postPages, ...tagPages];
}
