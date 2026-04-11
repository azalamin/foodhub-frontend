import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "https://food-hub-server-lime.vercel.app",
	fetchOptions: {
		credentials: "include",
	},
});
