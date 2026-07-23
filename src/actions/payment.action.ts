"use server";

import { paymentService } from "@/service/payment.service";
import { CreateOrderPayload } from "@/types";

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
		return { success: true, data: result.data };
	} catch (error: any) {
		return { success: false, message: error.message || "Failed to confirm payment" };
	}
}
