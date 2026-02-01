import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Category = {
	id: string;
	name: string;
	slug: string;
};

const mockCategories: Category[] = [
	{ id: "1", name: "Bangladeshi", slug: "bangladeshi" },
	{ id: "2", name: "Chinese", slug: "chinese" },
	{ id: "3", name: "Indian", slug: "indian" },
	{ id: "4", name: "Desserts", slug: "desserts" },
	{ id: "5", name: "Healthy & Fitness", slug: "healthy-fitness" },
	{ id: "6", name: "Street Food", slug: "street-food" },
];

export function CategoriesSection() {
	return (
		<section className='py-20 bg-muted/40'>
			<div className='container mx-auto'>
				{/* Header */}
				<div className='mb-12 flex flex-col gap-3 text-center'>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Explore by Cuisine</h2>
					<p className='mx-auto max-w-2xl text-muted-foreground'>
						Browse meals from different cuisines and find something that matches your taste today.
					</p>
				</div>

				{/* Grid */}
				<div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6'>
					{mockCategories.map(category => (
						<Link key={category.id} href={`/meals?category=${category.slug}`} className='group'>
							<Card className='h-full transition-all hover:-translate-y-1 hover:shadow-lg'>
								<CardContent className='flex h-full flex-col items-center justify-center gap-3 p-6 text-center'>
									<div className='text-3xl'>🍽️</div>
									<span className='font-medium'>{category.name}</span>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>

				{/* CTA */}
				<div className='mt-12 flex justify-center'>
					<Button asChild variant='outline' className='gap-2'>
						<Link href='/meals'>
							View All Meals
							<ArrowRight className='h-4 w-4' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
