"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, ShoppingCart, Star, Truck } from "lucide-react";

const steps = [
	{
		step: "01",
		title: "Browse Menu",
		description: "Explore trusted local kitchens and discover meals that match your taste.",
		icon: Search,
		color: "text-blue-500",
		bg: "bg-blue-500/10",
	},
	{
		step: "02",
		title: "Add to Cart",
		description: "Select your favorites, adjust portions, and prepare for a delicious treat.",
		icon: ShoppingCart,
		color: "text-orange-500",
		bg: "bg-orange-500/10",
	},
	{
		step: "03",
		title: "Fast Delivery",
		description: "Your meal is prepared fresh and delivered hot straight to your door.",
		icon: Truck,
		color: "text-green-500",
		bg: "bg-green-500/10",
	},
	{
		step: "04",
		title: "Enjoy & Rate",
		description: "Enjoy your fresh meal and share your experience with the community.",
		icon: Star,
		color: "text-yellow-500",
		bg: "bg-yellow-500/10",
	},
];

export function HowItWorks() {
	return (
		<section className='relative py-24 overflow-hidden'>
			{/* Background Decor */}
			<div className='absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 bg-[radial-gradient(circle_at_center,var(--muted)_0%,transparent_100%)] opacity-40' />

			<div className='container mx-auto px-4'>
				{/* Header */}
				<div className='mb-20 text-center space-y-4'>
					<Badge
						variant='outline'
						className='px-4 py-1 rounded-full border-primary/30 text-primary bg-primary/5'
					>
						Simple Process
					</Badge>
					<h2 className='text-4xl font-black tracking-tight sm:text-5xl'>
						How <span className='text-primary'>FoodHub</span> Works
					</h2>
					<p className='mx-auto max-w-xl text-lg text-muted-foreground'>
						Getting fresh, delicious meals has never been this easy. Follow these four simple steps.
					</p>
				</div>

				{/* Steps Container */}
				<div className='relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4'>
					{/* Connecting Line (Desktop Only) */}
					<div className='absolute top-1/4 left-0 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent lg:block' />

					{steps.map((item, index) => {
						const Icon = item.icon;

						return (
							<div
								key={item.step}
								className='group relative flex flex-col items-center text-center'
							>
								{/* Step Icon & Number */}
								<div className='relative mb-8'>
									<div
										className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-card shadow-xl transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 border-2 border-muted`}
									>
										<div className={`absolute inset-0 rounded-[1.8rem] opacity-20 ${item.bg}`} />
										<Icon className={`h-8 w-8 ${item.color}`} />
									</div>

									{/* Floating Step Number */}
									<div className='absolute -right-2 -top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-xs text-primary-foreground shadow-lg'>
										{item.step}
									</div>

									{/* Animation arrow for desktop */}
									{index !== steps.length - 1 && (
										<ArrowRight className='absolute -right-16 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-muted-foreground/30 lg:block animate-pulse' />
									)}
								</div>

								{/* Content */}
								<div className='space-y-3 px-4'>
									<h3 className='text-xl font-bold tracking-tight group-hover:text-primary transition-colors'>
										{item.title}
									</h3>
									<p className='text-sm leading-relaxed text-muted-foreground'>
										{item.description}
									</p>
								</div>

								{/* Decorative glow on hover */}
								<div
									className={`absolute inset-0 -z-10 translate-y-10 rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-20 ${item.bg}`}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
