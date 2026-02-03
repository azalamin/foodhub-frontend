import { ProviderOrderTable } from "@/components/modules/orders/order-table";
import { orderService } from "@/service/order.service";

export default async function ProviderOrdersPage() {
	const { data } = await orderService.getProviderOrders();

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Orders</h1>
				<p className='text-muted-foreground'>Manage your restaurant's incoming orders</p>
			</div>
			<ProviderOrderTable orders={data} />
		</div>
	);
}
