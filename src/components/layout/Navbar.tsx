"use client";

import { Menu, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

/* ------------------------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------------------------ */

interface MenuItem {
	title: string;
	url: string;
}

/* ------------------------------------------------------------------ */
/* MOCK AUTH (replace later with real auth) */
/* ------------------------------------------------------------------ */

const user = {
	name: "Al Amin",
	role: "ADMIN", // CUSTOMER | PROVIDER | ADMIN | null
};

// const user = {
// 	name: "Al Amin",
// 	role: "CUSTOMER", // CUSTOMER | PROVIDER | ADMIN | null
// };

const cartCount = 2;

/* ------------------------------------------------------------------ */
/* COMPONENT */
/* ------------------------------------------------------------------ */

export function Navbar() {
	const pathname = usePathname();
	const { theme, setTheme } = useTheme();

	const menu: MenuItem[] = [
		{ title: "Home", url: "/" },
		{ title: "Meals", url: "/meals" },
		{ title: "Providers", url: "/providers" },
	];

	return (
		<header className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur'>
			<div className='container mx-auto flex h-16 items-center justify-between'>
				{/* LOGO */}
				<Link href='/' className='flex items-center gap-2'>
					<span className='text-2xl'>🍱</span>
					<span className='text-lg font-bold tracking-tight'>FoodHub</span>
				</Link>

				{/* DESKTOP NAV */}
				<nav className='hidden lg:flex'>
					<NavigationMenu>
						<NavigationMenuList>
							{menu.map(item => (
								<NavigationMenuItem key={item.title}>
									<NavigationMenuLink asChild>
										<Link
											href={item.url}
											className={cn(
												"inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors",
												pathname === item.url ? "bg-muted text-foreground" : "hover:bg-muted",
											)}
										>
											{item.title}
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</nav>

				{/* RIGHT ACTIONS */}
				<div className='flex items-center gap-2'>
					{/* THEME TOGGLE */}
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{theme === "dark" ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
					</Button>

					{/* CART */}
					<Link href='/cart' className='relative mr-1'>
						<Button variant='ghost' size='icon'>
							<ShoppingCart className='h-5 w-5' />
						</Button>
						{cartCount > 0 && (
							<span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
								{cartCount}
							</span>
						)}
					</Link>

					{/* USER / AUTH */}
					{user ? <UserMenu /> : <AuthButtons />}
					{/* <AuthButtons /> */}

					{/* MOBILE MENU */}
					<MobileMenu menu={menu} pathname={pathname} />
				</div>
			</div>
		</header>
	);
}

/* ------------------------------------------------------------------ */
/* SUB COMPONENTS */
/* ------------------------------------------------------------------ */

function AuthButtons() {
	return (
		<div className='hidden sm:flex gap-2'>
			<Button asChild variant='outline' size='sm'>
				<Link href='/login'>Login</Link>
			</Button>
			<Button asChild size='sm'>
				<Link href='/register'>Sign up</Link>
			</Button>
		</div>
	);
}

function UserMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarFallback>
							<User className='h-4 w-4' />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' className='w-48'>
				<DropdownMenuItem asChild>
					<Link href='/dashboard/profile'>My Profile</Link>
				</DropdownMenuItem>

				{user.role === "CUSTOMER" && (
					<DropdownMenuItem asChild>
						<Link href='/dashboard/orders'>My Orders</Link>
					</DropdownMenuItem>
				)}

				{user.role === "PROVIDER" && (
					<>
						<DropdownMenuItem asChild>
							<Link href='/provider-dashboard/'>Dashboard</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href='/provider/menu'>My Menu</Link>
						</DropdownMenuItem>
					</>
				)}

				{user.role === "ADMIN" && (
					<DropdownMenuItem asChild>
						<Link href='/admin-dashboard'>Admin Dashboard</Link>
					</DropdownMenuItem>
				)}

				<hr className='my-1' />

				<DropdownMenuItem className='text-red-500'>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function MobileMenu({ menu, pathname }: { menu: MenuItem[]; pathname: string }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon' className='lg:hidden'>
					<Menu className='h-5 w-5' />
				</Button>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle className='flex items-center gap-2'>
						🍱 <span className='font-bold'>FoodHub</span>
					</SheetTitle>
				</SheetHeader>

				<div className='mt-6 flex flex-col gap-6 px-3'>
					<Accordion type='single' collapsible>
						{menu.map(item => {
							const isActive = pathname === item.url;

							return (
								<AccordionItem key={item.title} value={item.title}>
									<Link
										href={item.url}
										className={cn(
											"block rounded-md px-3 py-2 font-medium transition-colors mb-3",
											isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
										)}
									>
										{item.title}
									</Link>
								</AccordionItem>
							);
						})}
					</Accordion>

					<div className='flex flex-col gap-3'>
						<Button asChild variant='outline'>
							<Link href='/login'>Login</Link>
						</Button>
						<Button asChild>
							<Link href='/register'>Sign up</Link>
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
