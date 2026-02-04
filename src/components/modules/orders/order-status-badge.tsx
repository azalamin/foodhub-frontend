import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Added PLACED to the config
const statusConfig: Record<string, { label: string; className: string }> = {
	PLACED: {
		label: "Order Placed",
		className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
	},
	PENDING: {
		label: "Awaiting Confirmation",
		className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
	},
	PREPARING: {
		label: "In Kitchen",
		className: "bg-orange-500/10 text-orange-600 border-orange-500/20",
	},
	OUT_FOR_DELIVERY: {
		label: "On the way",
		className: "bg-primary/10 text-primary border-primary/20 animate-pulse",
	},
	DELIVERED: {
		label: "Delivered",
		className: "bg-green-500/10 text-green-600 border-green-500/20",
	},
	CANCELLED: {
		label: "Cancelled",
		className: "bg-red-500/10 text-red-600 border-red-500/20",
	},
};

export function OrderStatusBadge({ status }: { status: string }) {
	// Fallback to PLACED if status is unknown
	const config = statusConfig[status] || statusConfig.PLACED;

	return (
		<Badge
			variant='outline'
			className={cn(
				"px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest border shadow-none whitespace-nowrap",
				config.className,
			)}
		>
			{config.label}
		</Badge>
	);
}
