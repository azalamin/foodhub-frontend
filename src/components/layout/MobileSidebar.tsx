"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarLink } from "@/components/ui/SidebarLink";
import { handleLogout } from "@/lib/utils";
import { LogOut, Menu } from "lucide-react";

type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

export function MobileSidebar({ role }: { role: Role }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon'>
					<Menu className='h-5 w-5' />
				</Button>
			</SheetTrigger>

			<SheetContent side='left' className='w-64 p-0'>
				<SheetHeader className='border-b px-6 py-5'>
					<SheetTitle className='text-left font-bold'>🍱 FoodHub</SheetTitle>
				</SheetHeader>

				<nav className='px-3 py-4 space-y-1'>
					{role === "CUSTOMER" && (
						<>
							<SidebarLink href='/dashboard/orders' label='My Orders' />
							<SidebarLink href='/dashboard/profile' label='My Profile' />
						</>
					)}

					{role === "PROVIDER" && (
						<>
							<SidebarLink href='/provider-dashboard/orders' label='Orders' />
							<SidebarLink href='/provider-dashboard/meals' label='Meals' />
						</>
					)}

					{role === "ADMIN" && (
						<>
							<SidebarLink href='/admin-dashboard/users' label='Users' />
							<SidebarLink href='/admin-dashboard/orders' label='Orders' />
							<SidebarLink href='/admin-dashboard/categories' label='Categories' />
						</>
					)}
				</nav>

				<div className='border-t p-4'>
					<Button
						variant='ghost'
						className='w-full justify-start text-red-500'
						onClick={() => handleLogout()}
					>
						<LogOut className='mr-2 h-4 w-4' />
						Log out
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
