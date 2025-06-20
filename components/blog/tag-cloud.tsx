"use client";

import { tagToSlug } from "@/lib/tags";
import Link from "next/link";

interface TagCloudProps {
	tags: string[];
	className?: string;
	showCount?: boolean;
	limit?: number;
	interactive?: boolean;
}

export function TagCloud({
	tags,
	className = "",
	showCount = false,
	limit,
	interactive = true,
}: TagCloudProps) {
	const displayTags = limit ? tags.slice(0, limit) : tags;
	const remainingCount = limit && tags.length > limit ? tags.length - limit : 0;

	if (!tags || tags.length === 0) {
		return null;
	}

	return (
		<div className={`flex flex-wrap gap-2 ${className}`}>
			{displayTags.map((tag) =>
				interactive ? (
					<Link
						key={tag}
						href={`/blog/tags/${tagToSlug(tag)}`}
						className="inline-flex items-center px-2.5 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs transition-colors"
					>
						{tag}
					</Link>
				) : (
					<span
						key={tag}
						className="inline-flex items-center px-2.5 py-1 bg-gray-800 rounded text-xs"
					>
						{tag}
					</span>
				),
			)}
			{remainingCount > 0 && (
				<span className="inline-flex items-center px-2.5 py-1 text-xs text-gray-500">
					+{remainingCount} more
				</span>
			)}
		</div>
	);
}