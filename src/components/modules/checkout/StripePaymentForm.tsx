"use client";

import { Button } from "@/components/ui/button";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StripePaymentFormProps {
	orderId: string;
	totalPrice: number;
	onSuccess: () => void;
}

export function StripePaymentForm({ orderId, totalPrice, onSuccess }: StripePaymentFormProps) {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessing(true);

		try {
			const { error, paymentIntent } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${window.location.origin}/payment/success?orderId=${orderId}`,
				},
				redirect: "if_required",
			});

			if (error) {
				toast.error(error.message || "Payment failed. Please try again.");
				return;
			}

			if (paymentIntent?.status === "succeeded") {
				toast.success("Payment successful!", { description: "Your order is being prepared." });
				onSuccess();
			}
		} catch {
			toast.error("An unexpected error occurred. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>
			<div className='space-y-3'>
				<label className='text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2'>
					Card Details
				</label>
				<div className='border-2 border-muted rounded-2xl p-4 bg-muted/10 focus-within:border-primary transition-colors'>
					<PaymentElement
						options={{
							layout: "tabs",
							defaultValues: {
								billingDetails: {},
							},
						}}
					/>
				</div>
			</div>

			<div className='bg-muted/10 p-6 rounded-2xl border border-muted space-y-3'>
				<div className='flex justify-between items-center'>
					<span className='font-bold'>Amount to Pay</span>
					<span className='text-2xl font-black text-primary font-mono'>৳{totalPrice}</span>
				</div>
				<div className='flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
					<ShieldCheck size={14} className='text-blue-500' />
					Secured by Stripe · 256-bit SSL
				</div>
			</div>

			<Button
				type='submit'
				className='w-full h-16 rounded-[1.5rem] font-black text-xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center gap-3'
				disabled={isProcessing || !stripe || !elements}
			>
				<Lock size={20} />
				{isProcessing ? "Processing Payment..." : `Pay ৳${totalPrice}`}
			</Button>
		</form>
	);
}
