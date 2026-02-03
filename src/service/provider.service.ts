import { env } from "@/env";
import { cookies } from "next/headers";

export const providerService = {
	getPublicProviders: async () => {
		try {
			const res = await fetch(`${env.API_URL}/api/providers`, {
				cache: "no-store",
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				return { data: [], error: { message: "Failed" } };
			}

			return { data: data, error: null };
		} catch {
			return { data: [], error: { message: "Something went wrong" } };
		}
	},
	getProviderWithMeals: async (id: string) => {
		try {
			const res = await fetch(`${env.API_URL}/api/providers/${id}`, {
				cache: "no-store",
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				return { data: [], error: { message: "Failed" } };
			}

			return { data: data, error: null };
		} catch {
			return { data: [], error: { message: "Something went wrong" } };
		}
	},

	getMyProfile: async () => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/me`, {
			headers: { Cookie: cookieStore.toString() },
			cache: "no-store",
		});
		return res.json();
	},

	updateProfile: async (profileData: {
		restaurantName: string;
		address: string;
		phone: string;
		isOpen: boolean;
	}) => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/me`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(profileData),
		});

		const result = await res.json();

		if (!res.ok) {
			throw new Error(result.message || "Failed to update profile");
		}

		return result;
	},
};
