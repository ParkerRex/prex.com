import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import PianoNavigation from "@/components/piano-navigation";
import MobileNavigation from "@/components/mobile-navigation";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "Parker Rex - AI-First Builder & Content Creator",
		template: "%s | Parker Rex",
	},
	description:
		"AI-first builder & content creator. Building tools, teaching workflows, scaling businesses. Product manager turned entrepreneur focused on AI development and education.",
	keywords: [
		"Parker Rex",
		"AI development",
		"product management",
		"software engineering",
		"content creator",
		"entrepreneur",
		"startup",
		"technology",
		"AI tools",
		"automation",
	],
	authors: [{ name: "Parker Rex", url: "https://prex.com" }],
	creator: "Parker Rex",
	publisher: "Parker Rex",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://prex.com"),
	alternates: {
		canonical: "https://prex.com",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://prex.com",
		title: "Parker Rex - AI-First Builder & Content Creator",
		description:
			"AI-first builder & content creator. Building tools, teaching workflows, scaling businesses.",
		siteName: "Parker Rex",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Parker Rex - AI-First Builder & Content Creator",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Parker Rex - AI-First Builder & Content Creator",
		description:
			"AI-first builder & content creator. Building tools, teaching workflows, scaling businesses.",
		site: "@parkerrex",
		creator: "@parkerrex",
		images: ["/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Parker Rex",
		alternateName: "parkerrex",
		description:
			"AI-first builder & content creator. Building tools, teaching workflows, scaling businesses.",
		url: "https://prex.com",
		image: "https://prex.com/og-image.png",
		sameAs: [
			"https://twitter.com/parkerrex",
			"https://youtube.com/@parkerrex",
			"https://youtube.com/@parkerrexdaily",
			"https://linkedin.com/in/parkermrex",
			"https://github.com/parkerrex",
		],
		jobTitle: "Entrepreneur & AI Developer",
		worksFor: {
			"@type": "Organization",
			name: "REX Labs",
		},
		knowsAbout: [
			"Artificial Intelligence",
			"Software Development",
			"Product Management",
			"Entrepreneurship",
			"Startup Growth",
			"AI Tools",
			"Automation",
		],
	};

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={`${GeistMono.className} overflow-x-hidden`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ErrorBoundary>
						<PianoNavigation />
						<MobileNavigation />
						{children}
					</ErrorBoundary>
				</ThemeProvider>
			</body>
		</html>
	);
}
