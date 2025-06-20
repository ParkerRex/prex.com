import { getAllPosts } from "./mdx";
import type { BlogPost } from "./blog";

export interface TagMetadata {
	name: string;
	count: number;
	slug: string;
}

/**
 * Get all unique tags from all blog posts
 */
export function getAllTags(): TagMetadata[] {
	const posts = getAllPosts();
	const tagMap = new Map<string, number>();

	// Count occurrences of each tag
	for (const post of posts) {
		if (post.tags && Array.isArray(post.tags)) {
			for (const tag of post.tags) {
				const currentCount = tagMap.get(tag) || 0;
				tagMap.set(tag, currentCount + 1);
			}
		}
	}

	// Convert to array and sort by count (descending) then name (ascending)
	const tags: TagMetadata[] = Array.from(tagMap.entries())
		.map(([name, count]) => ({
			name,
			count,
			slug: tagToSlug(name),
		}))
		.sort((a, b) => {
			if (b.count !== a.count) {
				return b.count - a.count;
			}
			return a.name.localeCompare(b.name);
		});

	return tags;
}

/**
 * Get all posts that have a specific tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
	const posts = getAllPosts();
	const normalizedTag = tag.toLowerCase();

	return posts
		.filter((post) => {
			if (!post.tags || !Array.isArray(post.tags)) return false;
			return post.tags.some((t) => t.toLowerCase() === normalizedTag);
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Convert a tag name to a URL-friendly slug
 */
export function tagToSlug(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

/**
 * Convert a slug back to the original tag name
 * This is a best-effort conversion and may not be perfect
 */
export function slugToTag(slug: string): string {
	// First, try to find an exact match from all existing tags
	const allTags = getAllTags();
	const exactMatch = allTags.find((tag) => tag.slug === slug);
	if (exactMatch) {
		return exactMatch.name;
	}

	// Fallback: convert slug to title case
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

/**
 * Get related tags based on co-occurrence with a given tag
 */
export function getRelatedTags(tag: string, limit = 5): TagMetadata[] {
	const posts = getPostsByTag(tag);
	const relatedTagMap = new Map<string, number>();

	// Count co-occurrences
	for (const post of posts) {
		if (post.tags && Array.isArray(post.tags)) {
			for (const t of post.tags) {
				if (t.toLowerCase() !== tag.toLowerCase()) {
					const current = relatedTagMap.get(t) || 0;
					relatedTagMap.set(t, current + 1);
				}
			}
		}
	}

	// Convert to array and sort by count
	return Array.from(relatedTagMap.entries())
		.map(([name, count]) => ({
			name,
			count,
			slug: tagToSlug(name),
		}))
		.sort((a, b) => b.count - a.count)
		.slice(0, limit);
}