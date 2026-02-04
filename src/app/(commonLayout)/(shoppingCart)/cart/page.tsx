"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/providers/CartContext";
import { ArrowRight, ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
	const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

	if (!items.length) {
		return (
			<div className='container py-32 text-center space-y-6'>
				<div className='bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto'>
					<ShoppingBag className='text-muted-foreground h-10 w-10' />
				</div>
				<div className='space-y-2'>
					<h2 className='text-2xl font-black italic'>Your bag is empty</h2>
					<p className='text-muted-foreground'>
						Looks like you haven't added any delicious meals yet.
					</p>
				</div>
				<Button
					asChild
					size='lg'
					className='rounded-2xl px-8 font-bold shadow-xl shadow-primary/20'
				>
					<Link href='/meals'>Start Browsing</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className='container py-12 lg:py-20 max-w-4xl mx-auto px-4 space-y-10'>
			<div className='flex items-center justify-between'>
				<div className='space-y-1'>
					<h1 className='text-4xl font-black tracking-tight'>
						Review <span className='text-primary'>Bag</span>
					</h1>
					<p className='text-muted-foreground text-sm font-medium'>
						{items.length} items ready for checkout
					</p>
				</div>
				<Button variant='ghost' asChild className='rounded-full text-muted-foreground'>
					<Link href='/meals'>
						<ChevronLeft size={16} /> Continue Shopping
					</Link>
				</Button>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
				{/* ITEMS LIST */}
				<div className='lg:col-span-7 space-y-4'>
					{items.map(item => (
						<div
							key={item.mealId}
							className='flex items-center gap-4 bg-card border border-muted p-5 rounded-[2rem] shadow-sm transition-all hover:shadow-md'
						>
							<div className='flex-1 space-y-1'>
								<p className='font-black text-lg'>{item.name}</p>
								<p className='text-primary font-bold'>৳{item.price}</p>
							</div>

							{/* Quantity Toggles */}
							<div className='flex items-center bg-muted/50 rounded-xl p-1 border'>
								<Button
									variant='ghost'
									size='icon'
									className='h-8 w-8 rounded-lg'
									onClick={() => updateQuantity(item.mealId, Math.max(1, item.quantity - 1))}
								>
									<Minus size={14} />
								</Button>
								<span className='w-8 text-center font-black text-sm'>{item.quantity}</span>
								<Button
									variant='ghost'
									size='icon'
									className='h-8 w-8 rounded-lg'
									onClick={() => updateQuantity(item.mealId, item.quantity + 1)}
								>
									<Plus size={14} />
								</Button>
							</div>

							<Button
								variant='ghost'
								size='icon'
								className='text-muted-foreground hover:text-red-500 rounded-full'
								onClick={() => removeFromCart(item.mealId)}
							>
								<Trash2 size={18} />
							</Button>
						</div>
					))}
				</div>

				{/* SUMMARY PANEL */}
				<div className='lg:col-span-5'>
					<div className='bg-card border-2 border-primary/10 p-8 rounded-[2.5rem] shadow-2xl shadow-primary/5 space-y-6 sticky top-24'>
						<h3 className='font-black text-xl italic tracking-tight uppercase'>Order Summary</h3>

						<div className='space-y-3'>
							<div className='flex justify-between text-sm'>
								<span className='text-muted-foreground font-medium'>Subtotal</span>
								<span className='font-bold'>৳{totalPrice}</span>
							</div>
							<div className='flex justify-between text-sm'>
								<span className='text-muted-foreground font-medium'>Delivery Fee</span>
								<span className='text-green-600 font-bold'>FREE</span>
							</div>
							<Separator className='my-4' />
							<div className='flex justify-between items-baseline'>
								<span className='font-black text-lg'>Total</span>
								<span className='text-3xl font-black text-primary font-mono'>৳{totalPrice}</span>
							</div>
						</div>

						<Button
							asChild
							size='xl'
							className='w-full rounded-2xl font-black text-lg gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all'
						>
							<Link href='/checkout'>
								Checkout Now
								<ArrowRight size={20} />
							</Link>
						</Button>

						<p className='text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest'>
							Secure Checkout • Cash on Delivery
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
