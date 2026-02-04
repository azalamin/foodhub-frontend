"use client";

import { Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartContext";

export function AddToCart({ meal }: { meal: any }) {
	const [quantity, setQuantity] = useState(1);
	const router = useRouter();
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		if (!meal.isAvailable) {
			toast.error("Oops! This meal is currently sold out.");
			return;
		}

		addToCart({
			mealId: meal.id,
			name: meal.name,
			price: meal.price,
			quantity,
			providerId: undefined, // You can map this if needed
		});

		toast.success("Added to your bag!", {
			description: `${quantity} x ${meal.name} is ready for checkout.`,
			icon: <ShoppingBag className='h-4 w-4 text-primary' />,
		});
	};

	const buyNow = () => {
		if (!meal.isAvailable) return;
		handleAddToCart();
		router.push("/checkout");
	};

	return (
		<div className='space-y-6'>
			{/* Quantity Selector */}
			<div className='flex items-center justify-between bg-muted/40 rounded-2xl p-2 border border-muted'>
				<p className='text-xs font-bold uppercase tracking-widest text-muted-foreground ml-3'>
					Quantity
				</p>
				<div className='flex items-center gap-5'>
					<Button
						variant='ghost'
						size='icon'
						className='h-10 w-10 rounded-xl hover:bg-background shadow-sm'
						onClick={() => setQuantity(q => Math.max(1, q - 1))}
					>
						<Minus size={16} />
					</Button>

					<span className='font-black text-xl w-6 text-center'>{quantity}</span>

					<Button
						variant='ghost'
						size='icon'
						className='h-10 w-10 rounded-xl hover:bg-background shadow-sm'
						onClick={() => setQuantity(q => q + 1)}
					>
						<Plus size={16} />
					</Button>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex flex-col sm:flex-row gap-4'>
				<Button
					onClick={handleAddToCart}
					disabled={!meal.isAvailable}
					size='xl'
					className='flex-1 rounded-2xl font-black gap-2 shadow-xl shadow-primary/20 transition-all active:scale-95'
				>
					<ShoppingBag size={20} />
					Add to Bag
				</Button>

				<Button
					variant='outline'
					onClick={buyNow}
					disabled={!meal.isAvailable}
					size='xl'
					className='flex-1 rounded-2xl border-2 font-black gap-2 hover:bg-muted transition-all active:scale-95'
				>
					<Zap size={20} className='text-yellow-500 fill-yellow-500' />
					Buy Now
				</Button>
			</div>
		</div>
	);
}
