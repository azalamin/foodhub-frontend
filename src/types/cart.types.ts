export type CartItem = {
	providerId: any;
	mealId: string;
	name: string;
	price: number;
	quantity: number;
};

export interface CartContextType {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
	addToCart: (item: CartItem) => void;
	removeFromCart: (mealId: string) => void;
	updateQuantity: (mealId: string, quantity: number) => void;
	clearCart: () => void;
}
