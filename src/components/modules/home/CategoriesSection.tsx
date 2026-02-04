"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types"; // Ensure you have this type defined
import { ArrowRight, Dessert, Flame, Leaf, Pizza, Soup, Utensils } from "lucide-react";
import Link from "next/link";

// Helper to map icons to categories based on name or slug
const getCategoryIcon = (slug: string) => {
	switch (slug) {
		case "bangladeshi":
			return <Flame className='h-8 w-8 text-orange-500' />;
		case "chinese":
			return <Soup className='h-8 w-8 text-red-500' />;
		case "indian":
			return <Utensils className='h-8 w-8 text-yellow-600' />;
		case "desserts":
			return <Dessert className='h-8 w-8 text-pink-500' />;
		case "healthy-fitness":
			return <Leaf className='h-8 w-8 text-green-500' />;
		case "street-food":
			return <Pizza className='h-8 w-8 text-amber-600' />;
		default:
			return <Utensils className='h-8 w-8 text-primary' />;
	}
};

export function CategoriesSection({ categories }: { categories: Category[] }) {
	// If backend is empty, we fallback to a slice or your mock data
	const displayCategories = categories?.length > 0 ? categories.slice(0, 12) : [];

	return (
		<section className='relative py-24 overflow-hidden'>
			{/* Background Accents */}
			<div className='absolute top-0 right-0 -z-10 h-64 w-64 bg-primary/5 blur-[100px] rounded-full' />
			<div className='absolute bottom-0 left-0 -z-10 h-64 w-64 bg-orange-500/5 blur-[100px] rounded-full' />

			<div className='container mx-auto px-4'>
				{/* Header */}
				<div className='mb-16 flex flex-col md:flex-row items-end justify-between gap-6'>
					<div className='space-y-4 text-left'>
						<h2 className='text-4xl font-black tracking-tight sm:text-5xl'>
							Explore by <span className='text-primary'>Cuisine</span>
						</h2>
						<p className='max-w-xl text-lg text-muted-foreground'>
							From traditional spices to modern fitness bowls—find exactly what you're craving.
						</p>
					</div>

					<Button
						asChild
						variant='ghost'
						className='hidden md:flex items-center gap-2 group text-primary hover:bg-primary/10 rounded-full'
					>
						<Link href='/meals'>
							View All Cuisines
							<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
						</Link>
					</Button>
				</div>

				{/* Grid */}
				<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
					{displayCategories.map(category => (
						<Link
							key={category.id}
							href={`/meals?category=${category.id}`}
							className='group relative'
						>
							<Card className='h-full border-none bg-card/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-card group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/10'>
								<CardContent className='flex h-full flex-col items-center justify-center gap-4 p-8 text-center'>
									{/* Icon Container with Glow */}
									<div className='relative'>
										<div className='absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity' />
										<div className='relative p-4 rounded-2xl bg-muted/50 group-hover:bg-primary/10 transition-colors'>
											{getCategoryIcon(category.slug)}
										</div>
									</div>

									<div className='space-y-1'>
										<span className='block font-bold text-foreground group-hover:text-primary transition-colors'>
											{category.name}
										</span>
										<span className='text-[10px] uppercase tracking-widest text-muted-foreground font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0'>
											Explore
										</span>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* Mobile-only CTA */}
				<div className='mt-12 flex justify-center md:hidden'>
					<Button asChild variant='outline' className='w-full rounded-2xl h-12'>
						<Link href='/meals' className='gap-2'>
							View All Cuisines
							<ArrowRight className='h-4 w-4' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
