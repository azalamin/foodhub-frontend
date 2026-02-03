"use client";

import { authClient } from "@/lib/auth-client";
import { Menu, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
import { useAuth } from "@/providers/AuthContext";
import { useCart } from "@/providers/CartContext";

interface MenuItem {
	title: string;
	url: string;
}

type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

interface UserType {
	name: string;
	role: UserRole | string;
}

interface NavbarProps {
	user: UserType | null;
}

export function Navbar({ user: initialUser }: NavbarProps) {
	const pathname = usePathname();
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const { totalItems } = useCart();

	const { data: session } = useAuth();
	const currentUser = (session?.user as unknown as UserType) ?? initialUser;

	const menu: MenuItem[] = [
		{ title: "Home", url: "/" },
		{ title: "Meals", url: "/meals" },
		{ title: "Providers", url: "/providers" },
	];

	const onLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
					router.refresh(); // Clears server cache
				},
			},
		});
	};

	return (
		<header className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur'>
			<div className='container mx-auto flex h-16 items-center justify-between'>
				<Link href='/' className='flex items-center gap-2'>
					<span className='text-2xl'>🍱</span>
					<span className='text-lg font-bold tracking-tight'>FoodHub</span>
				</Link>

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

				<div className='flex items-center gap-2'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					>
						{theme === "dark" ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
					</Button>

					<Link href='/cart' className='relative'>
						<Button variant='ghost' size='icon'>
							<ShoppingCart className='h-5 w-5' />
						</Button>
						{totalItems > 0 && (
							<span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
								{totalItems}
							</span>
						)}
					</Link>

					{currentUser ? <UserMenu user={currentUser} onLogout={onLogout} /> : <AuthButtons />}

					<MobileMenu menu={menu} pathname={pathname} user={currentUser} onLogout={onLogout} />
				</div>
			</div>
		</header>
	);
}

function AuthButtons() {
	return (
		<div className='hidden sm:flex gap-2'>
			<Button asChild variant='outline' size='sm'>
				<Link href='/login'>Login</Link>
			</Button>
			<Button asChild size='sm'>
				<Link href='/register'>Register</Link>
			</Button>
		</div>
	);
}

function UserMenu({ user, onLogout }: { user: UserType; onLogout: () => void }) {
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
							<Link href='/provider-dashboard'>Dashboard</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href='/provider-dashboard/menu'>My Menu</Link>
						</DropdownMenuItem>
					</>
				)}

				<hr className='my-1' />
				<DropdownMenuItem className='text-red-500' onClick={onLogout}>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function MobileMenu({
	menu,
	pathname,
	user,
	onLogout,
}: {
	menu: MenuItem[];
	pathname: string;
	user: UserType | null;
	onLogout: () => void;
}) {
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
						{menu.map(item => (
							<AccordionItem key={item.title} value={item.title} className='border-none'>
								<Link
									href={item.url}
									className={cn(
										"block rounded-md px-3 py-2 font-medium transition-colors",
										pathname === item.url ? "bg-primary text-primary-foreground" : "hover:bg-muted",
									)}
								>
									{item.title}
								</Link>
							</AccordionItem>
						))}
					</Accordion>

					<div className='flex flex-col gap-3'>
						{user ? (
							<>
								<Link href='/dashboard/profile' className='font-medium px-3'>
									My Profile
								</Link>
								<Button variant='outline' className='text-red-500 justify-start' onClick={onLogout}>
									Logout
								</Button>
							</>
						) : (
							<>
								<Button asChild variant='outline'>
									<Link href='/login'>Login</Link>
								</Button>
								<Button asChild>
									<Link href='/register'>Register</Link>
								</Button>
							</>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
