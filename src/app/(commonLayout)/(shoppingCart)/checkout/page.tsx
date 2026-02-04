"use client";

import { ChevronLeft, Lock, MapPin, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { placeOrderAction } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/providers/CartContext";

export default function CheckoutPage() {
	const router = useRouter();
	const { items, clearCart, totalPrice } = useCart();
	const session = authClient.useSession();

	const [address, setAddress] = useState("");
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: window.location.origin + "/checkout",
		});
	};

	const handlePlaceOrder = async () => {
		if (!address.trim()) return toast.error("Please provide a delivery address");
		if (items.length === 0) return toast.error("Your cart is empty");
		if (!session.data) return toast.error("Please sign in first");

		setLoading(true);
		try {
			const result = await placeOrderAction({
				providerId: items[0].providerId,
				deliveryAddress: address,
				items: items.map(item => ({ mealId: item.mealId, quantity: item.quantity })),
			});

			if (!result.success) throw new Error(result.message);

			clearCart();
			toast.success("Order Placed!", { description: "Your meal is being prepared." });
			router.push("/dashboard/orders");
		} catch (err: any) {
			toast.error(err.message || "Checkout failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container max-w-2xl py-20 px-4 mx-auto space-y-10'>
			<Button
				variant='ghost'
				onClick={() => router.back()}
				className='rounded-full text-muted-foreground'
			>
				<ChevronLeft size={16} /> Back to Bag
			</Button>

			<div className='space-y-2 text-center'>
				<h1 className='text-4xl font-black tracking-tight uppercase italic'>Checkout</h1>
				<p className='text-muted-foreground font-medium'>
					Finalize your details and enjoy your meal
				</p>
			</div>

			<div className='bg-card border-2 border-muted p-8 rounded-[3rem] shadow-2xl space-y-8'>
				{/* STATUS BAR */}
				<div className='flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-muted'>
					<div className='flex items-center gap-3'>
						<Truck className='text-primary' size={20} />
						<span className='text-xs font-bold uppercase tracking-widest'>Standard Delivery</span>
					</div>
					<Badge className='bg-green-500/10 text-green-600 border-none font-bold'>
						৳0.00 (FREE)
					</Badge>
				</div>

				{/* AUTH SECTION */}
				{!session.data ? (
					<div className='space-y-4 text-center'>
						<div className='bg-primary/5 p-6 rounded-2xl border border-primary/20 border-dashed'>
							<Lock className='mx-auto mb-3 text-primary' size={24} />
							<p className='text-sm font-bold mb-4'>You need to be signed in to place an order</p>
							<Button
								variant='outline'
								className='w-full flex items-center gap-2 h-12 rounded-xl border-2 font-bold shadow-sm'
								onClick={handleGoogleLogin}
							>
								<FcGoogle className='h-6 w-6' />
								Continue with Google
							</Button>
						</div>
					</div>
				) : (
					<div className='space-y-6'>
						<div className='space-y-3'>
							<label className='text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2'>
								Delivery Address
							</label>
							<div className='relative'>
								<MapPin
									className='absolute left-4 top-1/2 -translate-y-1/2 text-primary'
									size={20}
								/>
								<Input
									placeholder='E.g. House 12, Road 5, Dhanmondi, Dhaka'
									className='h-14 pl-12 rounded-2xl border-2 focus-visible:ring-primary shadow-sm bg-muted/10'
									value={address}
									onChange={e => setAddress(e.target.value)}
								/>
							</div>
						</div>

						<div className='bg-muted/10 p-6 rounded-2xl border border-muted space-y-3'>
							<div className='flex justify-between items-center'>
								<span className='font-bold'>Total Amount Payable</span>
								<span className='text-2xl font-black text-primary font-mono'>৳{totalPrice}</span>
							</div>
							<div className='flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
								<ShieldCheck size={14} className='text-blue-500' />
								Payment: Cash on Delivery
							</div>
						</div>

						<Button
							className='w-full h-16 rounded-[1.5rem] font-black text-xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95'
							onClick={handlePlaceOrder}
							disabled={loading}
						>
							{loading ? "Processing..." : "Confirm Order"}
						</Button>
					</div>
				)}
			</div>

			<p className='text-center text-[10px] text-muted-foreground font-medium uppercase tracking-[0.3em]'>
				Verified Secure Checkout
			</p>
		</div>
	);
}
