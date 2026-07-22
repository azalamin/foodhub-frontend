import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "placeholder.jpg",
			},
			{
				protocol: "https",
				hostname: "example.com",
			},
		],
	},
	async rewrites() {
		return [
			{
				// Proxy all auth requests through the frontend so Set-Cookie lands
				// on the frontend domain — readable by both SSR and CSR.
				source: "/api/auth/:path*",
				destination: `${env.API_URL}/api/auth/:path*`,
			},
		];
	},
};

export default nextConfig;
