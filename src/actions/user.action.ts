"use server";

import { userService } from "@/service/user.service";

export async function upgradeToProviderAction(userId: string) {
	return await userService.upgradeToProvider(userId);
}
