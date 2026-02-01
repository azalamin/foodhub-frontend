import { env } from "../env";

export const userService = {
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

		if (!res.ok) {
			throw new Error(data.message || "Failed to upgrade role");
		}

		return data;
	},
};
