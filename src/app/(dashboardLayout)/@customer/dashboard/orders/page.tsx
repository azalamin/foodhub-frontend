import { getMyOrders } from "@/actions/order.action";
import { OrderCard } from "@/components/modules/orders/order-card";

export default async function CustomerOrdersPage() {
	const { data } = await getMyOrders();

	const orders = data;

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div>
				<h1 className='text-2xl font-bold tracking-tight'>My Orders</h1>
				<p className='text-sm text-muted-foreground'>Track your current and past food orders</p>
			</div>

			{/* Orders */}
			{orders.length === 0 ? (
				<div className='rounded-lg border border-dashed p-10 text-center'>
					<p className='text-sm text-muted-foreground'>You haven’t placed any orders yet 🍽️</p>
				</div>
			) : (
				<div className='space-y-4'>
					{orders.map((order: any) => (
						<OrderCard key={order.id} order={order} />
					))}
				</div>
			)}
		</div>
	);
}
