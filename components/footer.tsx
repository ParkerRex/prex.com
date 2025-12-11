"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface FooterProps {
	currentPage?: "about" | "bio" | "content" | "research";
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
		<footer className="mt-auto pt-16">
			<div className="border-t border-gray-200 dark:border-gray-800 pt-8">
				<div className="flex flex-wrap justify-center gap-6 mb-8">
					{[
						{
							href: "/about",
							label: "about",
							current: currentPage === "about",
						},
						{ href: "/bio", label: "bio", current: currentPage === "bio" },

						{
							href: "/content",
							label: "content",
							current: currentPage === "content",
						},
						{
							href: "/research",
							label: "research",
							current: currentPage === "research",
						},
					].map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`text-sm ${
								link.current
									? "text-gray-900 dark:text-gray-100 font-medium"
									: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
							}`}
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="text-center pb-8">
					<div className="flex items-center justify-center gap-4 mb-4">
						<div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
							<div className="w-2 h-2 bg-white dark:bg-black" />
						</div>
						<button
							type="button"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
							className="p-2 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800"
							aria-label="Toggle theme"
						>
							{theme === "dark" ? (
								<SunIcon className="w-4 h-4 text-gray-800 dark:text-gray-200" />
							) : (
								<MoonIcon className="w-4 h-4 text-gray-800 dark:text-gray-200" />
							)}
						</button>
					</div>
					<p className="text-gray-500 dark:text-gray-500 text-xs">
						2025 parker rex. building the future with ai.
					</p>
				</div>
			</div>
		</footer>
	);
}
