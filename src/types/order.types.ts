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
	review: any;
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

export interface CreateOrderPayload {
	providerId: string;
	deliveryAddress: string;
	items: {
		mealId: string;
		quantity: number;
	}[];
}

export interface OrderWithCustomer extends Order {
	customer: {
		id: string;
		name: string;
		email: string;
	};
}

export interface AdminOrderItem {
	id: string;
	mealName: string;
	mealPrice: number;
	quantity: number;
}

export interface AdminOrder {
	id: string;
	status: OrderStatus;
	totalPrice: number;
	deliveryAddress: string;
	createdAt: string;

	customer: {
		id: string;
		name: string;
		email: string;
	};

	provider: {
		id: string;
		restaurantName: string;
	};

	items: OrderItem[];
}
