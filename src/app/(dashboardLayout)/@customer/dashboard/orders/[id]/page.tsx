import { getOrderById } from "@/actions/order.action";
import { OrderStepper } from "@/components/modules/orders/order-stepper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ChevronLeft, CreditCard, MapPin, Receipt, Store } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "../../../loading"; // Path to your loading component

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	return (
		<div className='max-w-4xl mx-auto py-10 px-4 space-y-10'>
			{/* Header (Renders Instantly) */}
			<div className='flex items-center justify-between'>
				<Button variant='ghost' asChild className='rounded-full text-muted-foreground'>
					<Link href='/dashboard/orders'>
						<ChevronLeft size={16} className='mr-2' /> Back to Orders
					</Link>
				</Button>
				{/* We use a generic label since we don't have the date yet */}
				<p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
					Order Tracking
				</p>
			</div>

			{/* --- DATA FETCHING AREA (Streams in) --- */}
			<Suspense fallback={<Loading />}>
				<OrderContentContainer id={id} />
			</Suspense>
		</div>
	);
}

// Separate component for fetching and conditional logic
async function OrderContentContainer({ id }: { id: string }) {
	const { data: order } = await getOrderById(id);

	if (!order) return notFound();

	return (
		<>
			{/* Live Stepper Section */}
			<div className='bg-card border-2 border-muted p-10 rounded-[3rem] shadow-xl'>
				<div className='flex justify-between items-center mb-6'>
					<p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
						Reference: #{order.id.slice(-6).toUpperCase()}
					</p>
					<p className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
						{format(new Date(order.createdAt), "PPP")}
					</p>
				</div>
				<OrderStepper currentStatus={order.status} />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
				{/* LEFT: Order Summary */}
				<div className='lg:col-span-7 space-y-6'>
					<div className='bg-card border-2 border-muted p-8 rounded-[2.5rem] space-y-6'>
						<div className='flex items-center gap-3'>
							<Receipt className='text-primary' size={20} />
							<h3 className='font-black text-xl italic uppercase'>Order Items</h3>
						</div>

						<div className='space-y-4'>
							{order.items.map((item: any) => (
								<div key={item.id} className='flex justify-between items-center'>
									<div className='flex items-center gap-4'>
										<div className='h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-bold text-sm'>
											{item.quantity}x
										</div>
										<p className='font-bold'>{item.meal?.name || "Delicious Meal"}</p>
									</div>
									<p className='font-mono font-bold'>৳{item.price * item.quantity}</p>
								</div>
							))}
						</div>

						<Separator />

						<div className='space-y-2'>
							<div className='flex justify-between text-sm text-muted-foreground'>
								<span>Subtotal</span>
								<span>৳{order.totalPrice}</span>
							</div>
							<div className='flex justify-between text-sm text-muted-foreground'>
								<span>Delivery Fee</span>
								<span className='text-green-600 font-bold'>FREE</span>
							</div>
							<div className='flex justify-between items-baseline pt-2'>
								<span className='font-black text-xl'>Total Paid</span>
								<span className='text-3xl font-black text-primary font-mono'>
									৳{order.totalPrice}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* RIGHT: Logistics */}
				<div className='lg:col-span-5 space-y-6'>
					<div className='bg-muted/30 border-2 border-muted p-6 rounded-[2rem] space-y-3'>
						<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground'>
							<MapPin size={14} className='text-primary' /> Delivery To
						</div>
						<p className='text-sm font-bold leading-relaxed'>{order.deliveryAddress}</p>
					</div>

					<div className='bg-primary/5 border-2 border-primary/10 p-6 rounded-[2rem] space-y-4'>
						<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary'>
							<Store size={14} /> From Kitchen
						</div>
						<div>
							<p className='text-lg font-black'>{order.provider?.restaurantName}</p>
							<p className='text-xs text-muted-foreground'>Verified Premium Provider</p>
						</div>
						<Button
							variant='outline'
							size='sm'
							className='w-full rounded-xl border-primary/20 hover:bg-primary/10 text-primary font-bold'
						>
							Contact Kitchen
						</Button>
					</div>

					<div className='flex items-center gap-3 px-6 py-4 bg-muted/20 rounded-2xl'>
						<CreditCard size={18} className='text-muted-foreground' />
						<div>
							<p className='text-[10px] font-bold uppercase text-muted-foreground'>
								Payment Method
							</p>
							<p className='text-xs font-bold italic'>Cash on Delivery</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
