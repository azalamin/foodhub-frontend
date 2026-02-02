"use client";

import { CartContextType, CartItem } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	/* Load cart from localStorage (once) */
	useEffect(() => {
		const stored = localStorage.getItem("cart");
		if (stored) {
			setItems(JSON.parse(stored));
		}
	}, []);

	/* Persist cart to localStorage */
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addToCart = (item: CartItem) => {
		setItems(prev => {
			const existing = prev.find(p => p.mealId === item.mealId);

			if (existing) {
				return prev.map(p =>
					p.mealId === item.mealId ? { ...p, quantity: p.quantity + item.quantity } : p,
				);
			}

			return [...prev, item];
		});
	};

	const removeFromCart = (mealId: string) => {
		setItems(prev => prev.filter(item => item.mealId !== mealId));
	};

	const updateQuantity = (mealId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(mealId);
			return;
		}

		setItems(prev => prev.map(item => (item.mealId === mealId ? { ...item, quantity } : item)));
	};

	const clearCart = () => setItems([]);

	/* ------------------------------------------------------------------ */
	/* DERIVED VALUES */
	/* ------------------------------------------------------------------ */

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

	const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				items,
				totalItems,
				totalPrice,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within CartProvider");
	}
	return context;
}
