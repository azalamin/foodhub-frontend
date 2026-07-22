"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentSuccessContent() {
	const searchParams = useSearchParams();
	const orderId = searchParams.get("orderId");

	return (
		<div className='container max-w-lg py-24 px-4 mx-auto text-center space-y-8'>
			{/* Success Icon */}
			<div className='flex justify-center'>
				<div className='relative'>
					<div className='absolute inset-0 bg-green-500/20 rounded-full scale-150 animate-ping opacity-30' />
					<div className='relative bg-green-500/10 p-6 rounded-full border-2 border-green-500/20'>
						<CheckCircle2 className='h-14 w-14 text-green-500' />
					</div>
				</div>
			</div>

			{/* Message */}
			<div className='space-y-3'>
				<h1 className='text-4xl font-black tracking-tight uppercase italic'>Payment Successful!</h1>
				<p className='text-muted-foreground font-medium text-lg'>
					Your order has been confirmed and is being prepared.
				</p>
				{orderId && (
					<p className='text-xs text-muted-foreground font-mono bg-muted/30 px-4 py-2 rounded-full inline-block'>
						Order ID: {orderId}
					</p>
				)}
			</div>

			{/* Actions */}
			<div className='flex flex-col sm:flex-row gap-4 justify-center'>
				<Button
					asChild
					className='rounded-2xl font-black px-8 shadow-xl shadow-primary/20 h-14 text-base'
				>
					<Link href='/dashboard/orders' className='flex items-center gap-2'>
						Done — View My Orders
						<ChevronRight size={18} />
					</Link>
				</Button>
				<Button
					asChild
					variant='outline'
					className='rounded-2xl font-bold px-8 h-14 text-base border-2'
				>
					<Link href='/meals' className='flex items-center gap-2'>
						<ShoppingBag size={18} />
						Browse More
					</Link>
				</Button>
			</div>

			<p className='text-[10px] text-muted-foreground font-medium uppercase tracking-[0.3em]'>
				A confirmation has been sent to your email
			</p>
		</div>
	);
}

export default function PaymentSuccessPage() {
	return (
		<Suspense fallback={<div className='py-24 text-center'>Loading...</div>}>
			<PaymentSuccessContent />
		</Suspense>
	);
}
