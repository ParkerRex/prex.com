"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface FooterProps {
	currentPage?: "about" | "research";
}

export default function Footer({ currentPage }: FooterProps) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<footer className="mt-auto pt-16 pb-8 border-t border-border">
			<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
				<div className="flex gap-4">
					<Link
						href="/about"
						className={`hover:text-foreground transition-colors ${currentPage === "about" ? "text-foreground font-bold underline decoration-signal" : ""}`}
					>
						/about
					</Link>
					<Link
						href="/research"
						className={`hover:text-foreground transition-colors ${currentPage === "research" ? "text-foreground font-bold underline decoration-signal" : ""}`}
					>
						/research
					</Link>
				</div>

				<div className="flex items-center gap-4">
					<span>© 2025 REX Labs.</span>
					<button
						type="button"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="hover:text-foreground uppercase tracking-wider"
					>
						[{theme === "dark" ? "Dark mode" : "Light mode"}]
					</button>
				</div>
			</div>
		</footer>
	);
}
