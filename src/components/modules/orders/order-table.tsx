"use client";

import { updateOrderStatusProviderAction } from "@/actions/order.action";
import { Badge } from "@/components/ui/badge";
import { useTransition } from "react";
import { toast } from "sonner";

export function ProviderOrderTable({ orders }: { orders: any[] }) {
	const [isPending, startTransition] = useTransition();

	const handleStatusUpdate = (id: string, status: string) => {
		startTransition(async () => {
			try {
				await updateOrderStatusProviderAction(id, status);
				toast.success("Order status updated");
			} catch (err: any) {
				toast.error(err.message || "Failed to update status");
			}
		});
	};

	return (
		<div className='overflow-x-auto rounded-lg border'>
			<table className='w-full text-sm'>
				<thead className='bg-muted'>
					<tr>
						<th className='px-4 py-3 text-left'>Order ID</th>
						<th className='px-4 py-3 text-left'>Customer</th>
						<th className='px-4 py-3 text-left'>Items</th>
						<th className='px-4 py-3 text-center'>Total</th>
						<th className='px-4 py-3 text-center'>Status</th>
						<th className='px-4 py-3 text-right'>Action</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map(order => (
						<tr key={order.id} className='border-t hover:bg-muted/30 transition-colors'>
							{/* Order ID */}
							<td className='px-4 py-3 font-mono text-xs'>#{order?.id?.slice(-6).toUpperCase()}</td>

							{/* Customer Info */}
							<td className='px-4 py-3'>
								<div className='font-medium'>{order.customer?.name}</div>
								<div className='text-[10px] text-muted-foreground'>{order.deliveryAddress}</div>
							</td>

							{/* Items safe check */}
							<td className='px-4 py-3'>
								{order.items && order.items.length > 0 ? (
									order.items.map((i: any) => i.name).join(", ")
								) : (
									<span className='text-muted-foreground italic text-xs'>No items listed</span>
								)}
							</td>

							{/* Fixed the key from totalAmount to totalPrice */}
							<td className='px-4 py-3 text-center font-bold'>
								{(order.totalPrice ?? 0).toLocaleString("en-IN", {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</td>

							{/* Status Badge */}
							<td className='px-4 py-3 text-center'>
								<Badge
									variant={order.status === "DELIVERED" ? "default" : "outline"}
									className='text-[10px]'
								>
									{order.status}
								</Badge>
							</td>

							{/* Action Select */}
							<td className='px-4 py-3 text-right'>
								<select
									disabled={isPending}
									onChange={e => handleStatusUpdate(order.id, e.target.value)}
									defaultValue={order.status}
									className='border rounded p-1 text-xs bg-background cursor-pointer'
								>
									<option value='PLACED'>Placed</option>
									<option value='PREPARING'>Preparing</option>
									<option value='READY'>Ready</option>
									<option value='DELIVERED'>Delivered</option>
									<option value='CANCELLED'>Cancelled</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
