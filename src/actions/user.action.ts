"use server";

import { env } from "@/env";
import { userService } from "@/service/user.service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function upgradeToProviderAction(userId: string) {
	const result = await userService.upgradeToProvider(userId);
	revalidatePath("/admin-dashboard/users");
	return result;
}

export async function updateUserStatusAction(userId: string, status: "ACTIVE" | "SUSPENDED") {
	const cookieStore = await cookies();

	const res = await fetch(`${env.API_URL}/api/users/admin/users/${userId}/status`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieStore.toString(),
		},
		body: JSON.stringify({ status }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to update status");
	}

	revalidatePath("/admin-dashboard/users");

	return data;
}

export async function adminUpgradeToProviderAction(userId: string) {
	const cookieStore = await cookies();

	const res = await fetch(`${env.API_URL}/api/users/${userId}/role`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieStore.toString(),
		},
		body: JSON.stringify({ role: "PROVIDER" }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to upgrade role");
	}

	revalidatePath("/admin-dashboard/users");

	return data;
}
