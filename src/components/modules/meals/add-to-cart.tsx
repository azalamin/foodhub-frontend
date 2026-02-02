"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function AddToCart({ meal }: { meal: any }) {
	const [quantity, setQuantity] = useState(1);
	const router = useRouter();
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		if (!meal.isAvailable) {
			toast.error("Meal is not available ❌");
			return;
		}

		addToCart({
			mealId: meal.id,
			name: meal.name,
			price: meal.price,
			quantity,
		});

		toast.success("Added to cart 🛒", {
			description: `${meal.name} × ${quantity}`,
		});
	};

	const buyNow = () => {
		handleAddToCart();
		router.push("/checkout");
	};

	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-4'>
				<Button variant='outline' onClick={() => setQuantity(q => Math.max(1, q - 1))}>
					-
				</Button>

				<span className='font-medium'>{quantity}</span>

				<Button variant='outline' onClick={() => setQuantity(q => q + 1)}>
					+
				</Button>
			</div>

			<div className='flex gap-3'>
				<Button onClick={handleAddToCart} disabled={!meal.isAvailable}>
					Add to Cart
				</Button>

				<Button variant='outline' onClick={buyNow} disabled={!meal.isAvailable}>
					Buy Now
				</Button>
			</div>
		</div>
	);
}
