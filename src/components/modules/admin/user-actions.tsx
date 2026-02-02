"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserStatusAction, upgradeToProviderAction } from "@/actions/user.action";
import { useTransition } from "react";
import { User } from "@/types/user.types";

export function UserActions({ user }: { user: User }) {
	const [isPending, startTransition] = useTransition();

	const toggleStatus = () => {
		startTransition(async () => {
			try {
				await updateUserStatusAction(user.id, user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE");
				toast.success("User status updated");
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	const upgradeRole = () => {
		startTransition(async () => {
			try {
				await upgradeToProviderAction(user.id);
				toast.success("User upgraded to provider");
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	if (user.role === "ADMIN") return null;

	return (
		<div className='flex justify-end gap-2'>
			<Button size='sm' variant='outline' onClick={toggleStatus} disabled={isPending}>
				{user.status === "ACTIVE" ? "Suspend" : "Activate"}
			</Button>

			{user.role === "CUSTOMER" && (
				<Button size='sm' onClick={upgradeRole} disabled={isPending}>
					Make Provider
				</Button>
			)}
		</div>
	);
}
