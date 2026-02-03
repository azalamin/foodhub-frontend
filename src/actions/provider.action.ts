"use server";

import { providerService } from "@/service/provider.service";
import { revalidatePath } from "next/cache";

export const updateProviderProfileAction = async (data: any) => {
	try {
		const result = await providerService.updateProfile(data);
		revalidatePath("/provider/profile");
		return result;
	} catch (error: any) {
		throw new Error(error.message || "An unexpected error occurred");
	}
};
