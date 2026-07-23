import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Banknote, CheckCircle2, CreditCard, RotateCcw, XCircle } from "lucide-react";

interface PaymentStatusBadgeProps {
	paymentStatus?: string;
	paymentMethod?: string;
	className?: string;
}

export function PaymentStatusBadge({
	paymentStatus,
	paymentMethod,
	className,
}: PaymentStatusBadgeProps) {
	let label = "Unpaid";
	let badgeClass = "bg-rose-500/10 text-rose-600 border-rose-500/20";
	let Icon = CreditCard;

	if (paymentStatus === "PAID") {
		label = "Paid";
		badgeClass = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
		Icon = CheckCircle2;
	} else if (paymentMethod === "COD") {
		label = "Cash on Delivery";
		badgeClass = "bg-amber-500/10 text-amber-600 border-amber-500/20";
		Icon = Banknote;
	} else if (paymentStatus === "FAILED") {
		label = "Unpaid";
		badgeClass = "bg-red-500/10 text-red-600 border-red-500/20";
		Icon = XCircle;
	} else if (paymentStatus === "REFUNDED") {
		label = "Refunded";
		badgeClass = "bg-purple-500/10 text-purple-600 border-purple-500/20";
		Icon = RotateCcw;
	}

	return (
		<Badge
			variant='outline'
			className={cn(
				"inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest border shadow-none whitespace-nowrap",
				badgeClass,
				className,
			)}
		>
			<Icon size={12} className='shrink-0' />
			<span>{label}</span>
		</Badge>
	);
}
