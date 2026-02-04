"use server";

import { env } from "@/env";
import { orderService } from "@/service/order.service";
import { CreateOrderPayload, OrderStatus } from "@/types";
import { revalidatePath } from "next/cache";
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

	const res = await fetch(`${env.API_URL}/api/admin/orders/${orderId}/status`, {
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

export async function cancelOrderByAdminAction(orderId: string, status: OrderStatus) {
	const cookieStore = await cookies();

	const res = await fetch(`${env.API_URL}/api/admin/orders/${orderId}/cancel`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieStore.toString(),
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to cancel order status");
	}

	revalidatePath("/admin-dashboard/orders");

	return data;
}

export const updateOrderStatusProviderAction = async (orderId: string, status: string) => {
	const result = await orderService.updateOrderStatus(orderId, status);
	revalidatePath("/provider/orders");
	return result;
};

export async function getOrderById(orderId: string) {
	try {
		const result = await orderService.getSingleOrder(orderId);

		if (!result || !result.success) {
			return {
				success: false,
				message: result?.message || "Order not found",
				data: null,
			};
		}

		return {
			success: true,
			data: result.data,
		};
	} catch (error: any) {
		return {
			success: false,
			message: "Something went wrong while loading your order.",
			data: null,
		};
	}
}
