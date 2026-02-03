"use server";

import { env } from "@/env";
import { cookies } from "next/headers";

export async function createCategoryAction(name: string) {
	const cookieStore = await cookies();

	const res = await fetch(`${env.API_URL}/api/categories`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieStore.toString(),
		},
		body: JSON.stringify({ name }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to create category");
	}

	return data;
}

export async function updateCategoryAction(categoryId: string, name: string) {
	const cookieStore = await cookies();

	const res = await fetch(`${env.API_URL}/api/categories/${categoryId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieStore.toString(),
		},
		body: JSON.stringify({ name }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to update category");
	}

	return data;
}

export async function deleteCategoryAction(categoryId: string) {
	const cookieStore = await cookies();

	const res = await fetch(`${env.API_URL}/api/categories/${categoryId}`, {
		method: "DELETE",
		headers: {
			Cookie: cookieStore.toString(),
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to delete category");
	}

	return data;
}
