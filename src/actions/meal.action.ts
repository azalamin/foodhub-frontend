"use server";

import { mealService } from "@/service/meal.service";
import { revalidatePath } from "next/cache";

export const createMealAction = async (data: any) => {
	try {
		const result = await mealService.createMeal(data);
		revalidatePath("/provider/menu");
		return result;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const updateMealAction = async (id: string, data: any) => {
	try {
		const result = await mealService.updateMeal(id, data);
		revalidatePath("/provider/menu");
		return result;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const deleteMealAction = async (id: string) => {
	const result = await mealService.deleteMeal(id);
	revalidatePath("/provider/menu");
	return result;
};
