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
				source: "/api/auth/:path*",
				destination: `${env.NEXT_PUBLIC_AUTH_URL}/api/auth/:path*`,
			},
		];
	},
};

export default nextConfig;
