"use server";

import { paymentService } from "@/service/payment.service";
import { CreateOrderPayload } from "@/types";

import { revalidatePath } from "next/cache";

export async function createPaymentIntentAction(payload: CreateOrderPayload) {
	try {
		const result = await paymentService.createPaymentIntent(payload);
		return { success: true, data: result.data };
	} catch (error: any) {
		return { success: false, message: error.message || "Failed to initiate payment" };
	}
}

export async function confirmPaymentAction(orderId: string) {
	try {
		const result = await paymentService.confirmPayment(orderId);
		revalidatePath("/dashboard/orders");
		revalidatePath(`/dashboard/orders/${orderId}`);
		revalidatePath("/provider-dashboard/orders");
		revalidatePath("/provider-dashboard/all-orders");
		revalidatePath("/admin-dashboard/orders");
		return { success: true, data: result.data };
	} catch (error: any) {
		return { success: false, message: error.message || "Failed to confirm payment" };
	}
}
