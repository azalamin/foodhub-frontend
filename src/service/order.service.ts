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

	getProviderIncomingOrders: async () => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/orders`, {
			headers: { Cookie: cookieStore.toString() },
			cache: "no-store",
		});
		return res.json();
	},

	getProviderAllOrders: async () => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/all-orders`, {
			headers: { Cookie: cookieStore.toString() },
			cache: "no-store",
		});
		return res.json();
	},

	updateOrderStatus: async (orderId: string, status: string) => {
		const cookieStore = await cookies();
		const res = await fetch(`${env.API_URL}/api/provider/orders/${orderId}/status`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json", Cookie: cookieStore.toString() },
			body: JSON.stringify({ status }),
		});
		return res.json();
	},

	getSingleOrder: async (orderId: string) => {
		try {
			const cookieStore = await cookies();
			const res = await fetch(`${env.API_URL}/api/orders/${orderId}`, {
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
					// Pass the cookies so the Express authMiddleware works
					Cookie: cookieStore.toString(),
				},
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.message || "Failed to fetch order");
			}

			return result;
		} catch (error: any) {
			return { success: false, message: error.message };
		}
	},
};
