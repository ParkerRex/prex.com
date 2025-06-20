import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogCategory, BlogPost } from "./blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface TOCItem {
	id: string;
	title: string;
	level: number;
}

export function getAllPosts(): BlogPost[] {
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const categories = fs.readdirSync(postsDirectory);
	const allPosts: BlogPost[] = [];

	for (const category of categories) {
		const categoryPath = path.join(postsDirectory, category);
		if (!fs.statSync(categoryPath).isDirectory()) continue;

		const files = fs.readdirSync(categoryPath);
		for (const file of files) {
			if (file.endsWith(".mdx")) {
				const slug = file.replace(/\.mdx$/, "");
				const post = getPostBySlug(category as BlogCategory, slug);
				if (post) {
					allPosts.push(post);
				}
			}
		}
	}

	return allPosts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
	const categoryPath = path.join(postsDirectory, category);

	if (!fs.existsSync(categoryPath)) {
		return [];
	}

	const files = fs.readdirSync(categoryPath);
	const posts: BlogPost[] = [];

	for (const file of files) {
		if (file.endsWith(".mdx")) {
			const slug = file.replace(/\.mdx$/, "");
			const post = getPostBySlug(category, slug);
			if (post) {
				posts.push(post);
			}
		}
	}

	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
}

export function getPostBySlug(
	category: BlogCategory,
	slug: string,
): BlogPost | null {
	try {
		const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);

		if (!fs.existsSync(fullPath)) {
			return null;
		}

		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);
		const { minutes } = readingTime(content);

		return {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
			category,
			readingTime: Math.ceil(minutes),
			tags: data.tags || [],
		};
	} catch {
		return null;
	}
}

export function getPostContent(
	category: BlogCategory,
	slug: string,
): string | null {
	try {
		const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);

		if (!fs.existsSync(fullPath)) {
			return null;
		}

		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { content } = matter(fileContents);
		return content;
	} catch {
		return null;
	}
}

export function generateTOC(content: string): TOCItem[] {
	const headingRegex = /^(#{1,6})\s+(.+)$/gm;
	const toc: TOCItem[] = [];
	let match: RegExpExecArray | null = headingRegex.exec(content);

	while (match !== null) {
		const level = match[1].length;
		const title = match[2].trim();
		const id = title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, "");

		toc.push({
			id,
			title,
			level,
		});

		match = headingRegex.exec(content);
	}

	return toc;
}
