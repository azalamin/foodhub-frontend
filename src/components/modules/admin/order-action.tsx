"use client";

import { updateOrderStatusAction, cancelOrderByAdminAction } from "@/actions/order.action"; // Import both
import { Button } from "@/components/ui/button";
import { AdminOrder, OrderStatus } from "@/types";
import { ArrowRightCircle, Loader2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
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
	const router = useRouter();

	const nextStatuses = STATUS_FLOW[order.status];

	if (nextStatuses.length === 0)
		return (
			<span className='text-[9px] font-black uppercase italic text-muted-foreground opacity-50 px-4'>
				Cycle Ended
			</span>
		);

	const handleAction = (status: OrderStatus) => {
		startTransition(async () => {
			try {
				if (status === "CANCELLED") {
					// Call the specialized cancel action
					await cancelOrderByAdminAction(order.id, status);
					toast.success(`Order #${order.id.slice(-4)} Cancelled`, {
						icon: <XCircle className='text-red-500' />,
					});
				} else {
					// Call the regular flow action
					await updateOrderStatusAction(order.id, status);
					toast.success(`Order updated to ${status}`);
				}

				router.refresh();
			} catch (err: any) {
				toast.error(err.message || "Action failed");
			}
		});
	};

	return (
		<div className='flex justify-end gap-2'>
			{nextStatuses.map(status => (
				<Button
					key={status}
					size='sm'
					variant='ghost'
					disabled={pending}
					onClick={() => handleAction(status)}
					className={`h-9 rounded-xl border-2 font-black uppercase text-[9px] tracking-widest gap-2 transition-all active:scale-95 ${
						status === "CANCELLED"
							? "hover:bg-red-50 hover:text-red-600 hover:border-red-500/50"
							: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-500/50"
					}`}
				>
					{pending ? (
						<Loader2 className='animate-spin size-3' />
					) : status === "CANCELLED" ? (
						<XCircle size={14} />
					) : (
						<ArrowRightCircle size={14} />
					)}
					{status}
				</Button>
			))}
		</div>
	);
}
