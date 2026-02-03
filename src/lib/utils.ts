import { SearchParams } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { authClient } from "./auth-client";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleLogout = async () => {
	await authClient.signOut();
	window.location.href = "/";
};

export function buildQuery(params: SearchParams) {
	const query = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (!value) continue;

		if (Array.isArray(value)) {
			value.forEach(v => query.append(key, v));
		} else {
			query.set(key, value);
		}
	}

	return query.toString();
}
