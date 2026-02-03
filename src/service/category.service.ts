import { env } from "@/env";
import { Category } from "@/types";
import { cookies } from "next/headers";

export const categoryService = {
	getAll: async () => {
		const cookieStore = await cookies();

		const res = await fetch(`${env.API_URL}/api/categories`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			cache: "no-store",
		});

		if (!res.ok) throw new Error("Failed to load categories");

		return res.json() as Promise<{ success: boolean; data: Category[] }>;
	},
};
