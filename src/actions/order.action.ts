"use server";

import { env } from "@/env";
import { orderService } from "@/service/order.service";
import { CreateOrderPayload, OrderStatus } from "@/types";
import { cookies } from "next/headers";

export async function getMyOrders() {
	return await orderService.getMyOrders();
}

export async function placeOrderAction(payload: CreateOrderPayload) {
	try {
		const data = await orderService.createOrder(payload);
		return { success: true, data };
	} catch (error: any) {
		return {
			success: false,
			message: error.message || "Order failed",
		};
	}
}

export async function updateOrderStatusAction(orderId: string, status: OrderStatus) {
	const cookieStore = await cookies();

	const res = await fetch(`${env.API_URL}/api/orders/${orderId}/status`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieStore.toString(),
		},
		body: JSON.stringify({ status }),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to update order status");
	}

	return data;
}
