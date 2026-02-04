import { env } from "@/env";
import { Meal } from "@/types";
import { cookies } from "next/headers";
import { providerService } from "./provider.service";
import { userService } from "./user.service";

export const mealService = {
	getAllMeals: async (searchParams: any) => {
		try {
			const queryParams = new URLSearchParams();

			if (searchParams.search) queryParams.set("search", searchParams.search);
			if (searchParams.dietaryType) queryParams.set("dietaryPreference", searchParams.dietaryType);
			if (searchParams.isAvailable) queryParams.set("isAvailable", searchParams.isAvailable);
			if (searchParams.page) queryParams.set("page", searchParams.page);

			if (searchParams.sort && searchParams.sort !== "all") {
				const [field, order] = searchParams.sort.split("_");
				queryParams.set("sortBy", field);
				queryParams.set("sortOrder", order);
			} else {
				queryParams.set("sortBy", "createdAt");
				queryParams.set("sortOrder", "desc");
			}

			const res = await fetch(`${env.API_URL}/api/meals?${queryParams.toString()}`, {
				cache: "no-store",
			});

			const data = await res.json();
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

	createMeal: async (mealData: any) => {
		const cookieStore = await cookies();

		const profileRes = await providerService.getMyProfile();
		const providerId = profileRes.data?.id;

		if (!providerId) {
			throw new Error("Provider profile not found.");
		}

		const payload = {
			...mealData,
			providerId: providerId,
			price: Number(mealData.price),
			imageUrl: mealData.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
		};

		const res = await fetch(`${env.API_URL}/api/meals`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(payload),
		});

		const result = await res.json();

		if (!res.ok) {
			throw new Error(result.message || "Failed to create meal");
		}

		return result;
	},

	updateMeal: async (mealId: string, mealData: any) => {
		const cookieStore = await cookies();

		const res = await fetch(`${env.API_URL}/api/provider/meals/${mealId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(mealData),
		});

		const result = await res.json();

		if (!res.ok) {
			throw new Error(result.message || "Failed to update meal");
		}

		return result;
	},

	deleteMeal: async (mealId: string) => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/meals/${mealId}`, {
			method: "DELETE",
			headers: { Cookie: cookieStore.toString() },
		});
		return res.json();
	},

	getCurrentProviderMeals: async () => {
		const session = await userService.getSession();
		const userId = session.data?.user?.id;

		if (!userId) return { success: false, data: [] };

		const profileRes = await fetch(`${env.API_URL}/api/provider/me`, {
			headers: {
				Cookie: (await cookies()).toString(),
			},
			cache: "no-store",
		});

		const profileData = await profileRes.json();
		const providerId = profileData.data?.id;

		if (!providerId) {
			console.error("Provider ID not found in profile fetch");
			return { success: false, data: [] };
		}

		const res = await fetch(`${env.API_URL}/api/providers/${providerId}`, {
			cache: "no-store",
		});

		const result = await res.json();

		return {
			success: true,
			data: result.data?.meals || [],
		};
	},
};
