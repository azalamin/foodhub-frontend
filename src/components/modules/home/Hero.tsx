"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShieldCheck, Star, Store, Utensils } from "lucide-react";
import Link from "next/link";

export function Hero() {
	return (
		<section className='relative overflow-hidden bg-background pt-8 lg:pt-16'>
			{/* Background Decor */}
			<div className='absolute left-1/2 top-0 -z-10 h-[600px] w-full -translate-x-1/2 opacity-20 [background:radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)]' />
			<div className='absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />

			<div className='container mx-auto grid min-h-[70vh] grid-cols-1 items-center gap-12 pb-20 lg:grid-cols-2 px-4'>
				{/* LEFT: CONTENT */}
				<div className='flex flex-col gap-8 text-center lg:text-left'>
					<div className='flex justify-center lg:justify-start'>
						<Badge
							variant='secondary'
							className='px-4 py-1.5 text-sm font-semibold rounded-full border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-bottom-3 duration-1000'
						>
							🚀 The #1 Food Marketplace in Bangladesh
						</Badge>
					</div>

					<h1 className='text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]'>
						Satisfy Your Cravings <br />
						<span className='bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent'>
							In Just a Few Clicks.
						</span>
					</h1>

					<p className='mx-auto max-w-xl text-lg text-muted-foreground lg:mx-0 lg:text-xl leading-relaxed'>
						Join thousands of foodies ordering from top-rated local kitchens. Fresh, hot, and
						hygienic meals delivered straight to your doorstep.
					</p>

					<div className='flex flex-col gap-4 sm:flex-row justify-center lg:justify-start'>
						<Button
							asChild
							size='xl'
							className='h-14 px-8 text-lg rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 group'
						>
							<Link href='/meals'>
								Start Ordering
								<ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
							</Link>
						</Button>

						<Button
							asChild
							size='xl'
							variant='outline'
							className='h-14 px-8 text-lg rounded-2xl border-2 hover:bg-muted transition-all'
						>
							<Link href='/register?role=PROVIDER' className='flex items-center gap-2'>
								<Store className='h-5 w-5 text-primary' />
								Sell on FoodHub
							</Link>
						</Button>
					</div>

					{/* Trust Badges */}
					<div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4'>
						<div className='flex items-center gap-2 text-sm font-medium'>
							<ShieldCheck className='text-green-500 h-5 w-5' />
							<span>100% Secure</span>
						</div>
						<div className='flex items-center gap-2 text-sm font-medium'>
							<Clock className='text-orange-500 h-5 w-5' />
							<span>Fast Delivery</span>
						</div>
						<div className='flex items-center gap-2 text-sm font-medium'>
							<Star className='text-yellow-500 h-5 w-5 fill-yellow-500' />
							<span>4.9/5 Rating</span>
						</div>
					</div>
				</div>

				{/* RIGHT: VISUAL ASSETS */}
				<div className='relative group'>
					{/* Glowing Orbs */}
					<div className='absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px] animate-pulse' />
					<div className='absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-orange-500/20 blur-[100px] animate-pulse delay-700' />

					{/* Main Image Container */}
					<div className='relative rounded-[2.5rem] border-8 border-card bg-card p-2 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]'>
						<img
							src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070'
							alt='Premium Platter'
							className='h-[500px] w-full rounded-[2rem] object-cover'
						/>

						{/* Floating Sales Card 1 */}
						<div className='absolute -left-10 top-1/4 animate-bounce-slow'>
							<div className='flex items-center gap-4 rounded-2xl border bg-background/90 p-4 shadow-xl backdrop-blur-md'>
								<div className='rounded-full bg-green-500/10 p-2 text-green-600'>
									<Utensils size={24} />
								</div>
								<div>
									<p className='text-xs font-bold text-muted-foreground uppercase tracking-tight'>
										Orders Today
									</p>
									<p className='text-xl font-black'>1,250+</p>
								</div>
							</div>
						</div>

						{/* Floating Sales Card 2 */}
						<div className='absolute -right-6 bottom-12 animate-bounce-slow delay-1000'>
							<div className='flex items-center gap-3 rounded-2xl border bg-background/90 p-3 shadow-xl backdrop-blur-md'>
								<div className='flex -space-x-3'>
									{[1, 2, 3].map(i => (
										<div
											key={i}
											className='h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden'
										>
											<img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt='user' />
										</div>
									))}
								</div>
								<div className='text-xs font-bold'>
									<p>500+ happy</p>
									<p className='text-primary'>customers nearby</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
