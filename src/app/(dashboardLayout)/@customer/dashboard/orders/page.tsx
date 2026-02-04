import { getMyOrders } from "@/actions/order.action";
import { OrderCard } from "@/components/modules/orders/order-card";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "../../loading"; // Path to your customer loading state

export default function CustomerOrdersPage() {
	return (
		<div className='max-w-4xl space-y-10 py-6 px-2'>
			{/* Header Section (Renders Instantly) */}
			<div className='flex flex-col gap-1'>
				<h1 className='text-4xl font-black tracking-tight uppercase italic'>
					My <span className='text-primary'>Orders</span>
				</h1>
				<p className='text-muted-foreground font-medium'>
					Track your active cravings and past delights
				</p>
			</div>

			{/* --- DATA FETCHING AREA (Streams in) --- */}
			<Suspense fallback={<Loading />}>
				<OrdersListContainer />
			</Suspense>
		</div>
	);
}

// Separate component for fetching and logic
async function OrdersListContainer() {
	const { data: orders = [] } = await getMyOrders();

	if (orders.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-muted p-20 text-center space-y-6'>
				<div className='bg-muted p-5 rounded-full'>
					<Box className='h-10 w-10 text-muted-foreground/50' />
				</div>
				<div className='space-y-1'>
					<p className='text-xl font-bold'>No orders yet</p>
					<p className='text-sm text-muted-foreground max-w-[200px] mx-auto'>
						Hungry? Start exploring the best meals nearby.
					</p>
				</div>
				<Button asChild className='rounded-2xl font-bold px-8 shadow-xl shadow-primary/20'>
					<Link href='/meals'>Browse Meals</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 gap-6'>
			{orders.map((order: any) => (
				<OrderCard key={order.id} order={order} />
			))}
		</div>
	);
}
