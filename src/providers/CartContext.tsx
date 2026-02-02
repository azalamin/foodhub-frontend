"use client";

import { CartContextType, CartItem } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<CartItem[]>([]);

	// Load cart from localStorage
	useEffect(() => {
		const stored = localStorage.getItem("cart");
		if (stored) setItems(JSON.parse(stored));
	}, []);

	// Persist cart
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(items));
	}, [items]);

	const addToCart = (item: CartItem) => {
		setItems(prev => {
			const existing = prev.find(i => i.mealId === item.mealId);

			if (existing) {
				return prev.map(i =>
					i.mealId === item.mealId ? { ...i, quantity: i.quantity + item.quantity } : i,
				);
			}

			return [...prev, item];
		});
	};

	const removeFromCart = (mealId: string) => {
		setItems(prev => prev.filter(i => i.mealId !== mealId));
	};

	const clearCart = () => {
		setItems([]);
		localStorage.removeItem("cart");
	};

	const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
	const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				items,
				addToCart,
				removeFromCart,
				clearCart,
				totalItems,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within CartProvider");
	return context;
}
