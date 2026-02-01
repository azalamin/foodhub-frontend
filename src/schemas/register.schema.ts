import * as z from "zod";

export const registerSchema = z.object({
	name: z.string().min(2, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Minimum length is 8"),
	role: z.enum(["CUSTOMER", "PROVIDER"]),
});
