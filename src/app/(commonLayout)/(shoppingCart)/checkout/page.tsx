"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useCart } from "@/providers/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
	const { items, clearCart } = useCart();
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");

	const session = authClient.useSession();

	const handleOrder = async () => {
		if (!session.data) {
			await authClient.signUp.email({
				email,
				password: crypto.randomUUID(),
				callbackURL: "/checkout",
				name: "",
			});
			return;
		}

		// call backend order api here
		clearCart();
	};

	return (
		<div className='container max-w-xl py-10 space-y-4 mx-auto mt-20'>
			<h1 className='text-2xl font-bold'>Checkout</h1>

			<Input
				placeholder='Delivery address'
				value={address}
				onChange={e => setAddress(e.target.value)}
			/>

			{!session.data && (
				<Input
					placeholder='Email for order confirmation'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
			)}

			<Button className='w-full' onClick={handleOrder}>
				Place Order (Cash on Delivery)
			</Button>
		</div>
	);
}
