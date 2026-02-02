"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartContext";
import Link from "next/link";

export default function CartPage() {
	const { items, removeFromCart, totalPrice } = useCart();

	if (!items.length) {
		return (
			<div className='container py-20 text-center'>
				<p className='text-muted-foreground'>Your cart is empty</p>
				<Link href='/meals'>
					<Button className='mt-4'>Browse meals</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className='container py-10 space-y-6'>
			<h1 className='text-2xl font-bold'>Your Cart</h1>

			{items.map(item => (
				<div key={item.mealId} className='flex justify-between border p-4 rounded-lg'>
					<div>
						<p className='font-medium'>{item.name}</p>
						<p className='text-sm text-muted-foreground'>
							৳{item.price} × {item.quantity}
						</p>
					</div>

					<Button variant='ghost' onClick={() => removeFromCart(item.mealId)}>
						Remove
					</Button>
				</div>
			))}

			<div className='flex justify-between border-t pt-4'>
				<p className='font-semibold'>Total: ৳{totalPrice}</p>
				<Link href='/checkout'>
					<Button size='lg'>Checkout</Button>
				</Link>
			</div>
		</div>
	);
}
