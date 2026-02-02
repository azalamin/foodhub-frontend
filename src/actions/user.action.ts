"use server";

import { env } from "@/env";
import { userService } from "@/service/user.service";
import { cookies } from "next/headers";

export async function upgradeToProviderAction(userId: string) {
	return await userService.upgradeToProvider(userId);
}
