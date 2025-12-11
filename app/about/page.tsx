import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";

export const metadata: Metadata = {
	title: "About Parker Rex",
	description:
		"Learn about Parker Rex, a tech entrepreneur and AI-first builder with a decade of product management experience. From growing a startup to $73M in revenue to building AI tools and communities.",
	openGraph: {
		title: "About Parker Rex - AI-First Builder & Tech Entrepreneur",
		description:
			"Tech entrepreneur and AI-first builder with a decade of product management experience. Growing startups and building AI tools.",
		url: "https://prex.com/about",
	},
	twitter: {
		title: "About Parker Rex - AI-First Builder & Tech Entrepreneur",
		description:
			"Tech entrepreneur and AI-first builder with a decade of product management experience.",
	},
	alternates: {
		canonical: "https://prex.com/about",
	},
};

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
			<div className="container mx-auto px-4 py-16 max-w-2xl flex-1 flex flex-col">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold mb-4">about parker rex</h1>
					<p className="text-gray-600 dark:text-gray-400 text-sm">
						This page is for my Google Knowledge Graph panel. For a more
						comprehensive (and grounded) biography,{" "}
						<Link href="/bio" className="underline hover:no-underline">
							go here
						</Link>
						.
					</p>
				</div>

				{/* Main Content */}
				<div className="mb-12">
					<h2 className="text-gray-500 dark:text-gray-500 text-xs uppercase tracking-wider mb-6 text-center">
						who is parker rex?
					</h2>
					<div className="bg-gray-100 dark:bg-gray-900 p-4">
						<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
							Parker Rex is a tech entrepreneur, software engineer, and media
							creator focused on AI, productivity, and software development.
							With a decade of product management experience, he played a
							pivotal role in growing a restaurant delivery startup from $0 to
							$73M in annual revenue before its acquisition by a publicly traded
							company.
						</p>
					</div>
				</div>

				<Footer currentPage="about" />
			</div>
		</div>
	);
}
