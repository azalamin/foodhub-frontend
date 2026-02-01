"use server";

import { orderService } from "@/service/order.service";

export async function getMyOrders() {
	return await orderService.getMyOrders();
}
