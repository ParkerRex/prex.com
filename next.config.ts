import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	pageExtensions: ["js", "jsx", "ts", "tsx"],
};

export default nextConfig;
