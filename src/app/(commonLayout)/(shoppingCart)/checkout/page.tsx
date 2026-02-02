"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { placeOrderAction } from "@/actions/order.action";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/providers/CartContext";

export default function CheckoutPage() {
	const router = useRouter();
	const { items, clearCart } = useCart();
	const session = authClient.useSession();

	const [address, setAddress] = useState("");
	const [loading, setLoading] = useState(false);

	const handleGoogleLogin = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "http://localhost:3000/checkout",
		});
	};

	const handlePlaceOrder = async () => {
		if (!address.trim()) {
			toast.error("Delivery address is required");
			return;
		}

		if (items.length === 0) {
			toast.error("Cart is empty");
			return;
		}

		if (!session.data) {
			toast.error("Please sign in to place your order");
			return;
		}

		setLoading(true);

		try {
			const result = await placeOrderAction({
				providerId: items[0].providerId,
				deliveryAddress: address,
				items: items.map(item => ({
					mealId: item.mealId,
					quantity: item.quantity,
				})),
			});

			if (!result.success) {
				throw new Error(result.message);
			}

			clearCart();
			toast.success("Order placed successfully!");
			router.push("/dashboard/orders");
		} catch (err: any) {
			toast.error(err.message || "Failed to place order");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container max-w-xl py-12 space-y-6 mx-auto mt-20'>
			<h1 className='text-2xl font-bold'>Checkout</h1>

			{/* GUEST USER */}
			{!session.data && (
				<Button
					variant='outline'
					className='w-full flex items-center gap-2'
					onClick={handleGoogleLogin}
				>
					<FcGoogle className='h-5 w-5' />
					Continue with Google to place order
				</Button>
			)}

			{/* LOGGED IN USER */}
			{session.data && (
				<>
					<Input
						placeholder='Delivery address'
						value={address}
						onChange={e => setAddress(e.target.value)}
					/>
					<Button className='w-full' onClick={handlePlaceOrder} disabled={loading}>
						{loading ? "Placing order..." : "Place Order (Cash on Delivery)"}
					</Button>
				</>
			)}
		</div>
	);
}
