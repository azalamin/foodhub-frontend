import { AdminOrderTable } from "@/components/modules/admin/order-table";
import { orderService } from "@/service/order.service";

export default async function AdminOrdersPage() {
	const { data } = await orderService.getAllOrders();

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Orders</h1>
				<p className='text-muted-foreground'>View and manage all platform orders</p>
			</div>

			<AdminOrderTable orders={data} />
		</div>
	);
}
