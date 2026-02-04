"use client";

import { adminUpgradeToProviderAction, updateUserStatusAction } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user.types";
import { Loader2, Power, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function UserActions({ user }: { user: User }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const toggleStatus = () => {
		const nextStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
		startTransition(async () => {
			try {
				await updateUserStatusAction(user.id, nextStatus);
				toast.success(`User ${nextStatus.toLowerCase()} successfully`);
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	const upgradeRole = () => {
		startTransition(async () => {
			try {
				await adminUpgradeToProviderAction(user.id);
				toast.success("Identity upgraded to Provider");
				router.refresh();
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	if (user.role === "ADMIN")
		return (
			<span className='text-[9px] font-black uppercase italic text-muted-foreground opacity-50'>
				Locked
			</span>
		);

	return (
		<div className='flex justify-end gap-2'>
			{/* Status Toggle Button */}
			<Button
				size='sm'
				variant='ghost'
				onClick={toggleStatus}
				disabled={isPending}
				className={`h-9 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest gap-2 transition-all active:scale-95 ${
					user.status === "ACTIVE"
						? "hover:bg-red-50 hover:text-red-600 hover:border-red-500/50"
						: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-500/50"
				}`}
			>
				{isPending ? <Loader2 className='animate-spin size-3' /> : <Power size={14} />}
				{user.status === "ACTIVE" ? "Suspend" : "Activate"}
			</Button>

			{/* Upgrade Button */}
			{user.role === "CUSTOMER" && (
				<Button
					size='sm'
					onClick={upgradeRole}
					disabled={isPending}
					className='h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95'
				>
					{isPending ? <Loader2 className='animate-spin size-3' /> : <UserPlus size={14} />}
					Upgrade
				</Button>
			)}
		</div>
	);
}
