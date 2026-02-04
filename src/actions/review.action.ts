"use server";

import { reviewService } from "@/service/review.service";
import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: {
	orderId: string;
	mealId: string;
	rating: number;
	comment: string;
}) {
	try {
		const result = await reviewService.createReview(formData);
		revalidatePath("/orders");
		return { success: true, data: result };
	} catch (error: any) {
		throw new Error(error.message);
	}
}
