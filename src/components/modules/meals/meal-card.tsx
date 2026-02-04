"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MealCard({ meal }: { meal: any }) {
	const displayRating = meal.averageRating ? Number(meal.averageRating).toFixed(1) : "0.0";
	const totalReviews = meal._count?.reviews || 0;

	return (
		<Link
			href={`/meals/${meal.id}`}
			className='group relative flex flex-col bg-card rounded-[2rem] border-none overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10'
		>
			{/* Image Wrapper */}
			<div className='relative h-60 w-full overflow-hidden'>
				<Image
					src={meal.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
					alt={meal.name}
					fill
					className='object-cover transition-transform duration-700 group-hover:scale-110'
				/>

				{/* Dietary Badge - Back to White/Slate */}
				<div className='absolute top-4 left-4'>
					<Badge className='bg-white/90 backdrop-blur-md text-slate-900 border-none font-bold text-[10px] uppercase px-3 py-1'>
						{meal.dietaryType === "NONE" || !meal.dietaryType ? "Chef Special" : meal.dietaryType}
					</Badge>
				</div>

				{!meal.isAvailable && (
					<div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
						<span className='text-white font-black uppercase tracking-widest border-2 border-white px-4 py-2 rotate-[-10deg]'>
							Sold Out
						</span>
					</div>
				)}
			</div>

			{/* Content */}
			<div className='p-6 flex flex-col flex-1 gap-3'>
				<div className='flex justify-between items-start'>
					<h3 className='text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors'>
						{meal.name}
					</h3>
				</div>

				<p className='text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10'>
					{meal.description}
				</p>

				{/* Rating & Clock Section - Restored Colors */}
				<div className='flex items-center gap-4 text-[11px] font-bold text-muted-foreground/70'>
					<div className='flex items-center gap-1'>
						<Star className='h-3 w-3 fill-yellow-500 text-yellow-500' />
						<span className='text-foreground'>{displayRating}</span>
						<span className='text-[10px] opacity-60'>({totalReviews})</span>
					</div>
					<div className='flex items-center gap-1 text-primary'>
						<Clock className='h-3 w-3' />
						25 min
					</div>
				</div>

				{/* Footer Section - Restored Borders and Primary Button */}
				<div className='flex items-center justify-between mt-auto pt-4 border-t border-muted/50'>
					<div className='flex flex-col'>
						<span className='text-[10px] text-muted-foreground uppercase font-bold tracking-wider'>
							Price
						</span>
						<span className='text-2xl font-black text-foreground'>৳{meal.price}</span>
					</div>

					<Button
						size='icon'
						disabled={!meal.isAvailable}
						className='rounded-2xl h-11 w-11 shadow-lg shadow-primary/20 transition-transform group-active:scale-90'
					>
						<ShoppingCart className='h-5 w-5' />
					</Button>
				</div>
			</div>
		</Link>
	);
}
