"use client";

import { updateOrderStatusAction } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import { AdminOrder, OrderStatus } from "@/types";
import { useTransition } from "react";
import { toast } from "sonner";

const STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
	PLACED: ["PREPARING", "CANCELLED"],
	PREPARING: ["READY", "CANCELLED"],
	READY: ["DELIVERED"],
	DELIVERED: [],
	CANCELLED: [],
};

export function OrderActions({ order }: { order: AdminOrder }) {
	const [pending, startTransition] = useTransition();

	const nextStatuses = STATUS_FLOW[order.status];

	if (nextStatuses.length === 0) return null;

	return (
		<div className='flex justify-end gap-2'>
			{nextStatuses.map(status => (
				<Button
					key={status}
					size='sm'
					variant={status === "CANCELLED" ? "destructive" : "outline"}
					disabled={pending}
					onClick={() =>
						startTransition(async () => {
							try {
								await updateOrderStatusAction(order.id, status);
								toast.success(`Order marked as ${status}`);
							} catch (err: any) {
								toast.error(err.message);
							}
						})
					}
				>
					{status}
				</Button>
			))}
		</div>
	);
}
