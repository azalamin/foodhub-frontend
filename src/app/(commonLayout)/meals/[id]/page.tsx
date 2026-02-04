import { AddToCart } from "@/components/modules/meals/add-to-cart";
import { env } from "@/env";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, ShieldCheck, Star, Store, ChevronRight, Info, Leaf, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getMeal(mealId: string) {
	const res = await fetch(`${env.API_URL}/api/meals/${mealId}`, {
		cache: "no-store",
	});
	if (!res.ok) return null;
	const data = await res.json();
	return data.data;
}

export default async function MealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const meal = await getMeal(id);

	if (!meal) return notFound();

	return (
		<div className='container mx-auto py-8 lg:py-16 px-4'>
			{/* Navigation Header */}
			<div className='flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4'>
				<Button
					variant='ghost'
					asChild
					className='w-fit rounded-full -ml-2 text-muted-foreground hover:text-primary'
				>
					<Link href='/meals'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Back to all meals
					</Link>
				</Button>

				<nav className='flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60'>
					<Link href='/' className='hover:text-primary transition-colors'>
						Home
					</Link>
					<ChevronRight size={12} />
					<Link href='/meals' className='hover:text-primary transition-colors'>
						Meals
					</Link>
					<ChevronRight size={12} />
					<span className='text-primary truncate max-w-[150px]'>{meal.name}</span>
				</nav>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20'>
				{/* LEFT: VISUALS */}
				<div className='lg:col-span-7 space-y-8'>
					<div className='relative aspect-[4/3] rounded-[3rem] overflow-hidden border-8 border-muted/30 shadow-2xl'>
						<Image
							src={meal.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
							alt={meal.name}
							fill
							priority
							className='object-cover'
						/>

						<div className='absolute top-6 left-6 flex flex-col gap-3'>
							{meal.dietaryType !== "NONE" && (
								<Badge className='bg-white/95 backdrop-blur-md text-slate-900 border-none font-bold px-4 py-1.5 rounded-full shadow-xl'>
									<Leaf className='mr-2 h-4 w-4 text-green-600' />
									{meal.dietaryType}
								</Badge>
							)}
						</div>
					</div>

					{/* Quick Stats Grid */}
					<div className='grid grid-cols-3 gap-6 p-8 rounded-[2.5rem] bg-muted/20 border border-muted/50'>
						<div className='flex flex-col items-center gap-2'>
							<Clock className='h-6 w-6 text-primary' />
							<div className='text-center'>
								<p className='text-[10px] uppercase font-bold text-muted-foreground tracking-tighter'>
									Delivery
								</p>
								<p className='text-sm font-black'>25-35 MIN</p>
							</div>
						</div>
						<div className='flex flex-col items-center gap-2 border-x border-muted/50'>
							<Star className='h-6 w-6 text-yellow-500 fill-yellow-500' />
							<div className='text-center'>
								<p className='text-[10px] uppercase font-bold text-muted-foreground tracking-tighter'>
									Rating
								</p>
								<p className='text-sm font-black'>4.8 (120+)</p>
							</div>
						</div>
						<div className='flex flex-col items-center gap-2'>
							<ShieldCheck className='h-6 w-6 text-blue-500' />
							<div className='text-center'>
								<p className='text-[10px] uppercase font-bold text-muted-foreground tracking-tighter'>
									Quality
								</p>
								<p className='text-sm font-black'>VERIFIED</p>
							</div>
						</div>
					</div>
				</div>

				{/* RIGHT: CONTENT & ACTIONS */}
				<div className='lg:col-span-5 space-y-10'>
					<div className='space-y-6'>
						<div className='space-y-2'>
							<h1 className='text-4xl font-black tracking-tight lg:text-6xl leading-[1.1]'>
								{meal.name}
							</h1>
							<div className='flex items-center gap-3'>
								<span className='text-4xl font-black text-primary font-mono'>৳{meal.price}</span>
								{!meal.isAvailable && (
									<Badge variant='destructive' className='animate-pulse'>
										Sold Out
									</Badge>
								)}
							</div>
						</div>

						<p className='text-lg leading-relaxed text-muted-foreground'>
							{meal.description ||
								"A delicious gourmet experience crafted with fresh local ingredients and our secret house spices."}
						</p>
					</div>

					{/* ACTION AREA */}
					<div className='bg-card border border-muted p-8 rounded-[2.5rem] shadow-2xl shadow-black/5'>
						<AddToCart meal={meal} />
						<div className='mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>
							<Info size={12} className='text-primary' />
							Free delivery on orders above ৳1000
						</div>
					</div>

					{/* PROVIDER PROFILE */}
					<Link href={`/providers/${meal.provider.id}`} className='group block'>
						<div className='rounded-[2.5rem] border-2 border-muted p-6 bg-muted/10 transition-all hover:border-primary/40 hover:bg-primary/[0.02]'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center gap-4'>
									<div className='h-14 w-14 flex items-center justify-center rounded-2xl bg-white shadow-md group-hover:bg-primary group-hover:text-white transition-all'>
										<Store size={24} />
									</div>
									<div>
										<h4 className='font-bold text-lg leading-none'>
											{meal.provider.restaurantName || meal.provider.name}
										</h4>
										<div className='flex items-center gap-2 mt-2'>
											<div
												className={`h-2 w-2 rounded-full ${meal.provider.isOpen ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"}`}
											/>
											<span className='text-xs font-bold text-muted-foreground'>
												{meal.provider.isOpen ? "Open Now" : "Closed"}
											</span>
										</div>
									</div>
								</div>
								<div className='bg-muted h-10 w-10 flex items-center justify-center rounded-full group-hover:bg-primary/10 group-hover:translate-x-1 transition-all'>
									<ChevronRight size={20} className='group-hover:text-primary' />
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
