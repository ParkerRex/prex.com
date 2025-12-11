import fs from "node:fs";
import path from "node:path";
import { type Browser, chromium, type Page } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Assuming dev server is running
const PAGES = ["/", "/about", "/research"];
const VIEWPORTS = [
	{ name: "mobile", width: 375, height: 667 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1440, height: 900 },
];

async function captureScreenshots() {
	const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
	const outputDir = path.join(process.cwd(), "screenshots", timestamp);

	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	console.log(`Starting screenshot capture... Output: ${outputDir}`);

	const browser: Browser = await chromium.launch();
	const context = await browser.newContext();
	const page: Page = await context.newPage();

	for (const route of PAGES) {
		const url = `${BASE_URL}${route}`;
		console.log(`Navigating to ${url}...`);

		try {
			await page.goto(url, { waitUntil: "networkidle" }); // Wait for content to load

			for (const viewport of VIEWPORTS) {
				await page.setViewportSize({
					width: viewport.width,
					height: viewport.height,
				});

				// Short wait to ensure layout adapts
				await page.waitForTimeout(500);

				const filename = `${route === "/" ? "home" : route.slice(1)}-${viewport.name}.png`;
				const filepath = path.join(outputDir, filename);

				await page.screenshot({ path: filepath, fullPage: true });
				console.log(
					`  Captured ${viewport.name} (${viewport.width}x${viewport.height}) -> ${filename}`,
				);
			}
		} catch (error) {
			console.error(`  Failed to capture ${route}:`, error);
		}
	}

	await browser.close();
	console.log("Screenshot capture complete!");
}

captureScreenshots().catch((err) => {
	console.error("Error running screenshots:", err);
	process.exit(1);
});
