import { cookies } from "next/headers";
import { env } from "../env";

const AUTH_URL = env.AUTH_URL;

export const userService = {
	getSession: async function () {
		try {
			const cookiesStore = await cookies();
			const res = await fetch(`${AUTH_URL}/get-session`, {
				headers: {
					Cookie: cookiesStore.toString(),
				},
				cache: "no-store",
			});
			const session = await res.json();

			if (session === null) {
				return { data: null, error: { message: "Session is missing!" } };
			}

			return { data: session, error: null };
		} catch (err) {
			console.error(err);
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
	upgradeToProvider: async (userId: string) => {
		const res = await fetch(`${env.API_URL}/api/users/${userId}/role`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				origin: env.FRONTEND_URL,
			},
			credentials: "include",
			body: JSON.stringify({ role: "PROVIDER" }),
		});

		const data = await res.json();

		const result = await fetch(`${env.API_URL}/api/providers`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Origin: env.FRONTEND_URL,
			},
			credentials: "include",
			body: JSON.stringify({ id: data.id }),
		});

		if (!res.ok) {
			throw new Error(data.message || "Failed to upgrade role");
		}

		return data;
	},
};
