"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CustomLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export function CustomLink({
	href,
	children,
	className = "",
}: CustomLinkProps) {
	const [isHovered, setIsHovered] = useState(false);
	const isExternal = href.startsWith("http") || href.startsWith("//");
	const isAnchor = href.startsWith("#");

	const linkClasses = `
    inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 
    transition-colors duration-200 underline decoration-blue-400/50 
    hover:decoration-blue-300 underline-offset-2 ${className}
  `;

	const cursorStyle = isHovered ? { cursor: "pointer" } : {};

	if (isExternal) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={linkClasses}
				style={cursorStyle}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{children}
				<ExternalLink className="w-3 h-3 opacity-70" />
			</a>
		);
	}

	if (isAnchor) {
		return (
			<a
				href={href}
				className={linkClasses}
				style={cursorStyle}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{children}
			</a>
		);
	}

	return (
		<Link
			href={href}
			className={linkClasses}
			style={cursorStyle}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{children}
		</Link>
	);
}
