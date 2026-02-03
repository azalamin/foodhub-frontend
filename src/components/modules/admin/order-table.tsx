"use client";

import { Badge } from "@/components/ui/badge";
import { AdminOrder } from "@/types";
import { OrderActions } from "./order-action";

interface Props {
	orders: AdminOrder[];
}

export function AdminOrderTable({ orders }: Props) {
	return (
		<div className='rounded-lg border overflow-x-auto'>
			<table className='w-full text-sm'>
				<thead className='bg-muted'>
					<tr>
						<th className='px-4 py-3 text-left'>Order ID</th>
						<th className='px-4 py-3'>Customer</th>
						<th className='px-4 py-3'>Provider</th>
						<th className='px-4 py-3'>Total</th>
						<th className='px-4 py-3'>Status</th>
						<th className='px-4 py-3'>Date</th>
						<th className='px-4 py-3 text-right'>Actions</th>
					</tr>
				</thead>

				<tbody>
					{orders.map(order => (
						<tr key={order.id} className='border-t'>
							<td className='px-4 py-3 font-mono text-xs'>{order.id.slice(0, 8)}…</td>

							<td className='px-4 py-3'>
								<div className='font-medium'>{order.customer.name}</div>
								<div className='text-xs text-muted-foreground'>{order.customer.email}</div>
							</td>

							<td className='px-4 py-3 text-center'>{order.provider.restaurantName}</td>

							<td className='px-4 py-3 text-center'>৳{order.totalPrice}</td>

							<td className='px-4 py-3 text-center'>
								<StatusBadge status={order.status} />
							</td>

							<td className='px-4 py-3 text-center'>
								{new Date(order.createdAt).toLocaleDateString()}
							</td>

							<td className='px-4 py-3 text-right'>
								<OrderActions
									order={order}
									onStatusChange={function (order: AdminOrder): void {
										throw new Error("Function not implemented.");
									}}
									onDelete={function (): void {
										throw new Error("Function not implemented.");
									}}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function StatusBadge({ status }: { status: AdminOrder["status"] }) {
	const map: Record<string, "default" | "secondary" | "destructive"> = {
		PLACED: "secondary",
		PREPARING: "default",
		READY: "default",
		DELIVERED: "default",
		CANCELLED: "destructive",
	};

	return <Badge variant={map[status]}>{status}</Badge>;
}
