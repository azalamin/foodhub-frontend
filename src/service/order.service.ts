export const runtime = "nodejs";

import { env } from "@/env";
import { AdminOrder, CreateOrderPayload } from "@/types";
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

	createOrder: async (payload: CreateOrderPayload) => {
		const cookieStore = await cookies();

		const res = await fetch(`${env.API_URL}/api/orders`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.toString(),
			},
			credentials: "include",

			cache: "no-store",
			body: JSON.stringify(payload),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || "Failed to place order");
		}

		return data;
	},

	getAllOrders: async () => {
		const cookieStore = await cookies();

		const res = await fetch(`${env.API_URL}/api/admin/orders`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch orders");
		}

		return res.json() as Promise<{ success: boolean; data: AdminOrder[] }>;
	},
};
