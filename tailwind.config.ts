import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			// ADD THIS SECTION BELOW
			animation: {
				"bounce-slow": "bounce-slow 3s infinite",
				"loading-bar": "loading-bar 1.5s infinite linear",
			},
			keyframes: {
				"bounce-slow": {
					"0%, 100%": {
						transform: "translateY(-5%)",
						animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
					},
					"50%": {
						transform: "translateY(0)",
						animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
					},
				},
				"loading-bar": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
			},
			// END OF SECTION
		},
	},
	plugins: [],
};

export default config;
