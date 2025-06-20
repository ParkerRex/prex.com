export const blogCategories = ["updates", "notes", "ai"] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	category: BlogCategory;
	readingTime: number;
	tags?: string[];
}

export const categoryInfo: Record<
	BlogCategory,
	{ title: string; description: string }
> = {
	updates: {
		title: "Updates",
		description: "Product updates, announcements, and project progress",
	},
	notes: {
		title: "Notes",
		description: "Quick thoughts, observations, and learning notes",
	},
	ai: {
		title: "AI",
		description: "AI tools, workflows, and development insights",
	},
};
