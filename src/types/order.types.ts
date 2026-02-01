export type OrderStatus = "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
export interface OrderItem {
	id: string;
	mealId: string;
	mealName: string;
	mealPrice: number;
	quantity: number;
}
export interface OrderProvider {
	id: string;
	restaurantName: string;
}
export interface Order {
	id: string;
	status: OrderStatus;
	totalPrice: number;
	deliveryAddress: string;

	customerId: string;
	providerId: string;

	provider: OrderProvider;
	items: OrderItem[];

	createdAt: string;
	updatedAt: string;
}

export interface OrderWithCustomer extends Order {
	customer: {
		id: string;
		name: string;
		email: string;
	};
}
