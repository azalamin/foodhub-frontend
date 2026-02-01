import { Button } from "@/components/ui/button";
import { SidebarLink } from "@/components/ui/SidebarLink";
import { handleLogout } from "@/lib/utils";
import { LogOut } from "lucide-react";

type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

interface SidebarProps {
	role: Role;
}

export function Sidebar({ role }: SidebarProps) {
	return (
		<aside
			className='
        fixed left-0 top-0 z-40
        hidden md:flex
        h-screen w-64
        flex-col border-r
        bg-background
      '
		>
			{/* BRAND */}
			<div className='border-b px-6 py-5'>
				<h2 className='text-lg font-bold tracking-tight'>🍱 FoodHub</h2>
				<p className='text-xs text-muted-foreground'>Dashboard</p>
			</div>

			{/* NAV */}
			<nav className='flex-1 px-3 py-4 space-y-1 overflow-y-auto'>
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

			{/* LOGOUT */}
			<div className='border-t p-4'>
				<Button
					variant='ghost'
					className='w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-950'
					onClick={() => handleLogout()}
				>
					<LogOut className='mr-2 h-4 w-4' />
					Log out
				</Button>
			</div>
		</aside>
	);
}
