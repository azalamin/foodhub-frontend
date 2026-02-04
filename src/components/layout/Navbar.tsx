"use client";

import { authClient } from "@/lib/auth-client";
import {
	ChevronDown,
	LayoutDashboard,
	LogOut,
	Menu,
	Moon,
	Settings,
	ShoppingCart,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/providers/AuthContext";
import { useCart } from "@/providers/CartContext";
import { NavbarProps } from "@/types";

export function Navbar({ user: initialUser }: NavbarProps) {
	const pathname = usePathname();
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const { totalItems } = useCart();

	const { data: session } = useAuth();
	// Casting for role access
	const currentUser = (session?.user as any) ?? initialUser;

	const menu = [
		{ title: "Home", url: "/" },
		{ title: "Meals", url: "/meals" },
		{ title: "Providers", url: "/providers" },
	];

	const onLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
					router.refresh();
				},
			},
		});
	};

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40'>
			<div className='container mx-auto flex h-16 items-center justify-between px-4'>
				{/* LEFT: LOGO */}
				<div className='flex items-center gap-8'>
					<Link href='/' className='flex items-center gap-2 transition-transform hover:scale-105'>
						<div className='bg-primary p-1 rounded-lg shadow-lg shadow-primary/20'>
							<span className='text-xl'>🍱</span>
						</div>
						<span className='text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70'>
							FoodHub
						</span>
					</Link>

					{/* DESKTOP MENU */}
					<nav className='hidden lg:flex items-center gap-1'>
						{menu.map(item => (
							<Link
								key={item.title}
								href={item.url}
								className={cn(
									"relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full",
									pathname === item.url
										? "bg-primary/10 text-primary"
										: "text-muted-foreground hover:text-foreground hover:bg-muted/50",
								)}
							>
								{item.title}
								{pathname === item.url && (
									<span className='absolute inset-x-4 -bottom-[18px] h-0.5 bg-primary rounded-full' />
								)}
							</Link>
						))}
					</nav>
				</div>

				{/* RIGHT: ACTIONS */}
				<div className='flex items-center gap-3'>
					<div className='hidden sm:flex items-center gap-2 mr-2 border-r pr-4 border-muted'>
						{/* THEME */}
						<Button
							variant='ghost'
							size='icon'
							className='rounded-full hover:bg-primary/10 hover:text-primary transition-colors'
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
							<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
						</Button>

						{/* CART */}
						<Link href='/cart' className='relative'>
							<Button
								variant='ghost'
								size='icon'
								className='rounded-full hover:bg-primary/10 hover:text-primary transition-colors'
							>
								<ShoppingCart className='h-5 w-5' />
							</Button>
							{totalItems > 0 && (
								<span className='absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in'>
									{totalItems}
								</span>
							)}
						</Link>
					</div>

					{/* USER PROFILE / AUTH */}
					{currentUser ? (
						<UserMenu user={currentUser} onLogout={onLogout} />
					) : (
						<div className='flex items-center gap-2'>
							<Button asChild variant='ghost' size='sm' className='rounded-full hidden sm:flex'>
								<Link href='/login'>Sign In</Link>
							</Button>
							<Button asChild size='sm' className='rounded-full shadow-md shadow-primary/20'>
								<Link href='/register'>Get Started</Link>
							</Button>
						</div>
					)}

					{/* MOBILE TOGGLE */}
					<MobileMenu menu={menu} pathname={pathname} user={currentUser} onLogout={onLogout} />
				</div>
			</div>
		</header>
	);
}

/* ------------------------------------------------------------------ */
/* REFINED USER MENU */
/* ------------------------------------------------------------------ */

function UserMenu({ user, onLogout }: { user: any; onLogout: () => void }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='relative h-10 flex items-center gap-2 pl-1 pr-3 rounded-full hover:bg-muted transition-all border border-transparent hover:border-muted'
				>
					<Avatar className='h-8 w-8 border-2 border-background shadow-sm'>
						<AvatarImage src={user.image} alt={user.name} />
						<AvatarFallback className='bg-primary/10 text-primary text-xs'>
							{user.name?.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className='hidden md:flex flex-col items-start text-left leading-tight'>
						<span className='text-xs font-bold truncate max-w-[80px]'>{user.name}</span>
						<span className='text-[10px] text-muted-foreground font-medium'>{user.role}</span>
					</div>
					<ChevronDown className='h-3 w-3 text-muted-foreground' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='end'
				className='w-56 mt-2 p-2 rounded-2xl shadow-xl border-muted/50'
			>
				<DropdownMenuLabel className='font-normal p-2'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-bold leading-none'>{user.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{user.role === "CUSTOMER" && (
					<>
						<DropdownMenuItem asChild className='rounded-lg cursor-pointer'>
							<Link href='/dashboard/profile' className='flex items-center gap-2 w-full'>
								<Settings className='h-4 w-4' /> My Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild className='rounded-lg cursor-pointer'>
							<Link href='/dashboard/orders' className='flex items-center gap-2 w-full'>
								<ShoppingCart className='h-4 w-4' /> My Orders
							</Link>
						</DropdownMenuItem>
					</>
				)}

				{(user.role === "PROVIDER" || user.role === "ADMIN") && (
					<>
						{user.role === "PROVIDER" && (
							<DropdownMenuItem asChild className='rounded-lg cursor-pointer'>
								<Link href='/provider-dashboard/profile' className='flex items-center gap-2 w-full'>
									<Settings className='h-4 w-4' /> My Profile
								</Link>
							</DropdownMenuItem>
						)}
						<DropdownMenuItem
							asChild
							className='rounded-lg cursor-pointer bg-primary/5 text-primary font-medium hover:bg-primary/10'
						>
							<Link
								href={
									user.role === "PROVIDER" ? "/provider-dashboard/overview" : "/admin-dashboard"
								}
								className='flex items-center gap-2 w-full'
							>
								<LayoutDashboard className='h-4 w-4' /> Dashboard
							</Link>
						</DropdownMenuItem>
					</>
				)}

				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='rounded-lg text-red-500 focus:bg-red-50 focus:text-red-500 cursor-pointer flex items-center gap-2'
					onClick={onLogout}
				>
					<LogOut className='h-4 w-4' /> Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

/* ------------------------------------------------------------------ */
/* MODERN MOBILE MENU */
/* ------------------------------------------------------------------ */

function MobileMenu({ menu, pathname, user, onLogout }: any) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' size='icon' className='lg:hidden rounded-full hover:bg-muted'>
					<Menu className='h-5 w-5' />
				</Button>
			</SheetTrigger>

			<SheetContent
				side='right'
				className='w-[300px] sm:w-[350px] p-0 border-l border-muted/50 backdrop-blur-xl'
			>
				<SheetHeader className='p-6 border-b bg-muted/20'>
					<SheetTitle className='flex items-center gap-2'>
						<span className='bg-primary p-1 rounded-md text-sm'>🍱</span>
						<span className='font-bold tracking-tight'>FoodHub</span>
					</SheetTitle>
				</SheetHeader>

				<div className='flex flex-col h-[calc(100vh-80px)]'>
					<div className='flex-1 px-4 py-6 overflow-y-auto'>
						<div className='space-y-1'>
							{menu.map((item: any) => (
								<Link
									key={item.title}
									href={item.url}
									className={cn(
										"flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
										pathname === item.url
											? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
											: "hover:bg-muted text-muted-foreground hover:text-foreground",
									)}
								>
									{item.title}
								</Link>
							))}
						</div>
					</div>

					<div className='p-4 border-t bg-muted/10'>
						{user ? (
							<div className='space-y-3'>
								<div className='flex items-center gap-3 px-4 py-2 bg-background rounded-2xl border'>
									<Avatar className='h-10 w-10'>
										<AvatarImage src={user.image} />
										<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
									</Avatar>
									<div className='flex flex-col'>
										<span className='text-sm font-bold'>{user.name}</span>
										<span className='text-[10px] uppercase text-muted-foreground'>{user.role}</span>
									</div>
								</div>
								<Button
									variant='outline'
									className='w-full rounded-xl gap-2 text-red-500'
									onClick={onLogout}
								>
									<LogOut size={16} /> Logout
								</Button>
							</div>
						) : (
							<div className='grid grid-cols-2 gap-3'>
								<Button asChild variant='outline' className='rounded-xl'>
									<Link href='/login'>Login</Link>
								</Button>
								<Button asChild className='rounded-xl'>
									<Link href='/register'>Sign Up</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
