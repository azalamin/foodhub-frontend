import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	// Point at the Next.js proxy (/api/auth/*) so session cookies land on the
	// frontend domain and are readable by both SSR (cookies()) and CSR.
	baseURL:
		typeof window !== "undefined"
			? window.location.origin
			: process.env.NEXT_PUBLIC_FRONTEND_URL || "https://foodhubbd.vercel.app",
	fetchOptions: {
		credentials: "include",
	},
});
