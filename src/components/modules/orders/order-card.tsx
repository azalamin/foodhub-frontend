import { Order } from "@/types";
import { format } from "date-fns";
import Link from "next/link";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderCard({ order }: { order: Order }) {
	return (
		<div className='rounded-xl border bg-card p-5 shadow-sm'>
			<div className='flex items-start justify-between'>
				<div className='space-y-1'>
					<h3 className='font-semibold'>{order.provider?.restaurantName}</h3>
					<p className='text-sm text-muted-foreground'>
						Ordered on {format(new Date(order.createdAt), "PPP")}
					</p>
				</div>

				<OrderStatusBadge status={order.status} />
			</div>

			{/* Items */}
			<div className='mt-4 space-y-1 text-sm'>
				{order.items.map(item => (
					<p key={item.id} className='text-muted-foreground'>
						{item.quantity} × {item.mealName}
					</p>
				))}
			</div>

			{/* Footer */}
			<div className='mt-4 flex items-center justify-between'>
				<p className='font-semibold'>৳ {order.totalPrice}</p>

				<Link
					href={`/dashboard/orders/${order.id}`}
					className='text-sm font-medium text-primary hover:underline'
				>
					View details →
				</Link>
			</div>
		</div>
	);
}
