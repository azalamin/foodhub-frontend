import { User } from "@/types/user.types";
import { cookies } from "next/headers";
import { env } from "../env";

export const userService = {
	getSession: async () => {
		try {
			const cookiesStore = await cookies();
			// Build cookie header manually to avoid encodeURIComponent() mangling
			// token values (cookies().toString() URL-encodes values which breaks lookup).
			const cookieHeader = cookiesStore
				.getAll()
				.map(c => `${c.name}=${c.value}`)
				.join("; ");

			const res = await fetch(`${env.AUTH_URL}/get-session`, {
				headers: {
					Cookie: cookieHeader,
				},
				cache: "no-store",
			});
			const session = await res.json();

			if (session === null) {
				return { data: null, error: { message: "Session is missing!" } };
			}

			return { data: session, error: null };
		} catch (err) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},

	getAllUsers: async () => {
		const cookieStore = await cookies();

		const res = await fetch(`${env.API_URL}/api/users/admin/users/`, {
			method: "GET",
			credentials: "include",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
		});

		if (!res.ok) {
			throw new Error("Failed to fetch users");
		}

		return res.json() as Promise<{ success: boolean; data: User[] }>;
	},

	upgradeToProvider: async (userId: string) => {
		const res = await fetch(`${env.API_URL}/api/users/${userId}/role`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Origin: env.FRONTEND_URL,
			},
			credentials: "include",
			body: JSON.stringify({ role: "PROVIDER" }),
		});

		const data = await res.json();

		await fetch(`${env.API_URL}/api/providers`, {
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
