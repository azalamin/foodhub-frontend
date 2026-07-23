export const runtime = "nodejs";

import { env } from "@/env";
import { CreateOrderPayload } from "@/types";
import { cookies } from "next/headers";

export const paymentService = {
	createPaymentIntent: async (payload: CreateOrderPayload) => {
		const cookieStore = await cookies();

		const res = await fetch(`${env.API_URL}/api/payments/create-intent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; "),
			},
			credentials: "include",
			cache: "no-store",
			body: JSON.stringify(payload),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || "Failed to create payment intent");
		}

		return data as { success: boolean; data: { clientSecret: string; orderId: string; totalPrice: number } };
	},
	confirmPayment: async (orderId: string) => {
		const cookieStore = await cookies();

		const res = await fetch(`${env.API_URL}/api/payments/confirm`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join("; "),
			},
			credentials: "include",
			cache: "no-store",
			body: JSON.stringify({ orderId }),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || "Failed to confirm payment");
		}

		return data as { success: boolean; data: any };
	},
};
