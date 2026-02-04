import { env } from "@/env";
import { cookies } from "next/headers";

export const reviewService = {
	createReview: async (reviewData: {
		orderId: string;
		mealId: string;
		rating: number;
		comment: string;
	}) => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			body: JSON.stringify(reviewData),
		});

		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to submit review");
		return data;
	},

	getReviewsByMeal: async (mealId: string) => {
		try {
			const res = await fetch(`${env.API_URL}/api/meal/${mealId}`, {
				next: { revalidate: 60 },
			});
			if (!res.ok) return { stats: { averageRating: 0, totalReviews: 0 }, reviews: [] };
			const data = await res.json();
			return data.data;
		} catch (err) {
			return { stats: { averageRating: 0, totalReviews: 0 }, reviews: [] };
		}
	},
};
