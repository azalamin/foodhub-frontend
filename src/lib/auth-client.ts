import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_AUTH_URL || "https://food-hub-server-lime.vercel.app",
	fetchOptions: {
		credentials: "include",
	},
});
