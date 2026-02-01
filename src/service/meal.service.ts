import { env } from "@/env";
import { buildQuery } from "@/lib/utils";
import { SearchParams } from "@/types";

export const mealService = {
	getAllMeals: async (searchParams: SearchParams) => {
		try {
			const query = buildQuery(searchParams);

			const res = await fetch(`${env.API_URL}/api/meals?${query}`, {
				cache: "no-store",
			});

			if (!res.ok) {
				throw new Error("Failed to fetch meals");
			}

			const data = await res.json();

			if (!data.success) {
				return { data: null, error: { message: data.message ?? "Failed" } };
			}

			return { data: data.data, error: null };
		} catch (error) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
};
