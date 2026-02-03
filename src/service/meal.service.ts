import { env } from "@/env";
import { buildQuery } from "@/lib/utils";
import { Meal, SearchParams } from "@/types";
import { cookies } from "next/headers";

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

	getProviderMeals: async () => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/meals`, {
			headers: { Cookie: cookieStore.toString() },
			cache: "no-store",
		});
		return res.json() as Promise<{ success: boolean; data: Meal[] }>;
	},

	createMeal: async (mealData: Partial<Meal>) => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/meals`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
			body: JSON.stringify(mealData),
		});
		return res.json();
	},

	updateMeal: async (mealId: string, mealData: { price?: number; isAvailable?: boolean }) => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/meals/${mealId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
			body: JSON.stringify(mealData),
		});
		return res.json();
	},

	deleteMeal: async (mealId: string) => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/meals/${mealId}`, {
			method: "DELETE",
			headers: { Cookie: cookieStore.toString() },
		});
		return res.json();
	},
};
