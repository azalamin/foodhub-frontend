export type CartItem = {
	mealId: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
};

export type CartContextType = {
	items: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (mealId: string) => void;
	clearCart: () => void;
	totalItems: number;
	totalPrice: number;
};
