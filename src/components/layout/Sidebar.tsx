"use client";

import { Button } from "@/components/ui/button";
import { SidebarLink } from "@/components/ui/SidebarLink";
import { authClient } from "@/lib/auth-client";
import {
	Home,
	Layers,
	LayoutDashboard,
	LogOut,
	Settings,
	ShoppingBag,
	UserCircle,
	Users,
	UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

interface SidebarProps {
	role: Role;
}

export function Sidebar({ role }: SidebarProps) {
	const pathname = usePathname();
	const router = useRouter();

	const onLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
					router.refresh();
				},
			},
		});
		toast.success("Logged out successfully");
	};

	return (
		<aside className='fixed left-0 top-0 z-40 hidden md:flex h-screen w-64 flex-col border-r bg-card/50 backdrop-blur-xl'>
			{/* BRAND & QUICK EXIT */}
			<div className='px-6 py-6'>
				<div className='flex items-center gap-2 mb-6'>
					<div className='bg-primary p-1.5 rounded-lg'>
						<span className='text-xl'>🍱</span>
					</div>
					<div>
						<h2 className='text-sm font-bold tracking-tight'>FoodHub</h2>
						<p className='text-[10px] uppercase tracking-widest text-muted-foreground font-semibold'>
							{role} Panel
						</p>
					</div>
				</div>

				<Button
					variant='outline'
					size='sm'
					asChild
					className='w-full justify-start gap-2 text-xs font-medium hover:bg-muted'
				>
					<Link href='/'>
						<Home className='h-3.5 w-3.5' />
						Back to Home
					</Link>
				</Button>
			</div>

			{/* NAV SECTION */}
			<nav className='flex-1 px-4 py-2 space-y-8 overflow-y-auto'>
				{/* DYNAMIC ROLE LINKS */}
				<div>
					<p className='px-2 mb-2 text-[10px] font-bold uppercase text-muted-foreground/60 tracking-widest'>
						Management
					</p>
					<div className='space-y-1'>
						{role === "CUSTOMER" && (
							<>
								<SidebarLink
									icon={<ShoppingBag size={18} />}
									href='/dashboard/orders'
									label='My Orders'
									active={pathname === "/dashboard/orders"}
								/>
								<SidebarLink
									icon={<UserCircle size={18} />}
									href='/dashboard/profile'
									label='My Profile'
									active={pathname === "/dashboard/profile"}
								/>
							</>
						)}

						{role === "PROVIDER" && (
							<>
								<SidebarLink
									icon={<LayoutDashboard size={18} />}
									href='/provider-dashboard/overview'
									label='Overview'
									active={pathname === "/provider-dashboard/overview"}
								/>
								<SidebarLink
									icon={<ShoppingBag size={18} />}
									href='/provider-dashboard/orders'
									label='New Orders'
									active={pathname === "/provider-dashboard/orders"}
								/>
								<SidebarLink
									icon={<ShoppingBag size={18} />}
									href='/provider-dashboard/all-orders'
									label='All Orders'
									active={pathname === "/provider-dashboard/all-orders"}
								/>
								<SidebarLink
									icon={<UtensilsCrossed size={18} />}
									href='/provider-dashboard/menu'
									label='Menu Items'
									active={pathname === "/provider-dashboard/menu"}
								/>
							</>
						)}

						{role === "ADMIN" && (
							<>
								<SidebarLink
									icon={<Users size={18} />}
									href='/admin-dashboard/users'
									label='Manage Users'
									active={pathname === "/admin-dashboard/users"}
								/>
								<SidebarLink
									icon={<ShoppingBag size={18} />}
									href='/admin-dashboard/orders'
									label='All Orders'
									active={pathname === "/admin-dashboard/orders"}
								/>
								<SidebarLink
									icon={<Layers size={18} />}
									href='/admin-dashboard/categories'
									label='Categories'
									active={pathname === "/admin-dashboard/categories"}
								/>
							</>
						)}
					</div>
				</div>

				{/* COMMON SETTINGS */}
				<div>
					<p className='px-2 mb-2 text-[10px] font-bold uppercase text-muted-foreground/60 tracking-widest'>
						Settings
					</p>
					<div className='space-y-1'>
						{(() => {
							const settingsPath =
								role === "PROVIDER" ? "/provider-dashboard/profile" : "/dashboard/profile";

							return (
								<SidebarLink
									icon={<Settings size={18} />}
									href={settingsPath}
									label='General Settings'
									active={pathname === settingsPath}
								/>
							);
						})()}
					</div>
				</div>
			</nav>

			{/* LOGOUT FOOTER */}
			<div className='p-4 mt-auto'>
				<Button
					variant='ghost'
					className='w-full justify-start gap-3 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all rounded-xl'
					onClick={onLogout}
				>
					<LogOut className='h-4 w-4' />
					<span className='text-sm font-medium'>Log out</span>
				</Button>
			</div>
		</aside>
	);
}
