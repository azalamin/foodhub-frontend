"use server";

import { orderService } from "@/service/order.service";
import { CreateOrderPayload } from "@/types";

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
