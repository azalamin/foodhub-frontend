import { env } from "@/env";
import { cookies } from "next/headers";

export const orderService = {
	getMyOrders: async () => {
		try {
			const cookieStore = await cookies();

			const res = await fetch(`${env.API_URL}/api/orders`, {
				credentials: "include",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieStore.toString(),
				},
			});

			if (!res.ok) {
				throw new Error("Unauthorized or failed to fetch orders");
			}

			const data = await res.json();

			if (!data.success) {
				return { data: null, error: { message: data.message ?? "Failed" } };
			}

			return { data: data.data, error: null };
		} catch (error) {
			return { data: null, error: { message: "Something went wrong!" } };
		}
	},
};
