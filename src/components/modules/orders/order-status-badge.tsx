import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
	PLACED: "bg-blue-100 text-blue-700",
	PREPARING: "bg-yellow-100 text-yellow-700",
	READY: "bg-purple-100 text-purple-700",
	DELIVERED: "bg-green-100 text-green-700",
	CANCELLED: "bg-red-100 text-red-700",
};

export function OrderStatusBadge({ status }: { status: string }) {
	return (
		<span
			className={cn(
				"rounded-full px-3 py-1 text-xs font-semibold",
				statusStyles[status] ?? "bg-gray-100 text-gray-700",
			)}
		>
			{status}
		</span>
	);
}
