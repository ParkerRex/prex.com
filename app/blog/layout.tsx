import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog - Parker Rex",
	description: "Thoughts on AI, development, and building in public",
	openGraph: {
		title: "Blog - Parker Rex",
		description: "Thoughts on AI, development, and building in public",
		type: "website",
		url: "https://prex.com/blog",
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog - Parker Rex",
		description: "Thoughts on AI, development, and building in public",
	},
};

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
			<div className="container mx-auto px-4 py-16 max-w-2xl">
				<header className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">blog</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						thoughts on ai, development, and building in public
					</p>
				</header>
				<main>{children}</main>
			</div>
		</div>
	);
}
