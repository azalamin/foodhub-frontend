"use server";

import { providerService } from "@/service/provider.service";
import { revalidatePath } from "next/cache";

export const updateProviderProfileAction = async (data: any) => {
	const result = await providerService.updateProfile(data);
	revalidatePath("/provider/profile");
	return result;
};
