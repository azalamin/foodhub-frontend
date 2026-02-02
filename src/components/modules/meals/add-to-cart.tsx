"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartProps {
	meal: {
		id: string;
		name: string;
		price: number;
		isAvailable: boolean;
	};
}

export function AddToCart({ meal }: AddToCartProps) {
	const [quantity, setQuantity] = useState(1);
	const router = useRouter();

	const addToCart = () => {
		if (!meal.isAvailable) {
			toast.error("Meal is not available");
			return;
		}

		// store in localStorage (frontend cart)
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");

		cart.push({
			mealId: meal.id,
			name: meal.name,
			price: meal.price,
			quantity,
		});

		localStorage.setItem("cart", JSON.stringify(cart));

		toast.success("Added to cart");
	};

	const buyNow = () => {
		addToCart();
		router.push("/checkout");
	};

	return (
		<div className='space-y-4'>
			{/* QUANTITY */}
			<div className='flex items-center gap-4'>
				<Button variant='outline' onClick={() => setQuantity(q => Math.max(1, q - 1))}>
					-
				</Button>
				<span className='font-medium'>{quantity}</span>
				<Button variant='outline' onClick={() => setQuantity(q => q + 1)}>
					+
				</Button>
			</div>

			{/* ACTIONS */}
			<div className='flex gap-3'>
				<Button className='flex-1' onClick={addToCart} disabled={!meal.isAvailable}>
					Add to Cart
				</Button>

				<Button variant='outline' className='flex-1' onClick={buyNow} disabled={!meal.isAvailable}>
					Buy Now
				</Button>
			</div>
		</div>
	);
}
