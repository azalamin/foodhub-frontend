// actions/auth.action.ts
"use server";
import { revalidatePath } from "next/cache";

export async function logoutAction() {
	// ... perform actual logout logic
	revalidatePath("/", "layout"); // This clears the cache for the entire site
}
