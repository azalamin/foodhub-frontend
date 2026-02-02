"use server";

import { env } from "@/env";
import { userService } from "@/service/user.service";
import { cookies } from "next/headers";

export async function upgradeToProviderAction(userId: string) {
	return await userService.upgradeToProvider(userId);
}

export async function updateUserStatusAction(userId: string, status: "ACTIVE" | "SUSPENDED") {
	const cookieStore = cookies();

	const res = await fetch(`${env.API_URL}/api/users/${userId}/status`, {
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

	return data;
}

export async function adminUpgradeToProviderAction(userId: string) {
	const cookieStore = cookies();

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

	return data;
}
