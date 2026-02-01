import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { authClient } from "./auth-client";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleLogout = async () => {
	await authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				redirect("/");
			},
		},
	});
};
