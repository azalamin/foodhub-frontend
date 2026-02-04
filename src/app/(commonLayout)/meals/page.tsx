import { MealsFilters } from "@/components/modules/meals/meals-filters";
import { MealsGrid } from "@/components/modules/meals/meals-grid";
import { Badge } from "@/components/ui/badge";
import { Suspense } from "react";

export default async function MealsPage({
	searchParams,
}: {
	searchParams: Promise<{
		search?: string;
		categoryId?: string;
		dietaryType?: string;
		sort?: string;
		isAvailable?: string;
		page?: string;
	}>;
}) {
	const filters = await searchParams;

	const filterKey = JSON.stringify(filters);

	return (
		<div className='container mx-auto py-12 space-y-10 px-4'>
			{/* Header Section */}
			<div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
				<div className='space-y-2'>
					<Badge
						variant='outline'
						className='text-primary border-primary/20 bg-primary/5 rounded-full px-4'
					>
						🍱 Freshly Prepared
					</Badge>
					<h1 className='text-4xl font-black tracking-tight sm:text-5xl'>
						Explore <span className='text-primary'>Meals</span>
					</h1>
					<p className='text-muted-foreground text-lg max-w-lg'>
						Discover top-rated cuisines and delicious meals from verified local providers.
					</p>
				</div>
			</div>

			<MealsFilters />

			{/* Meals Display Area */}
			<Suspense
				key={filterKey}
				fallback={
					<div className='h-96 flex items-center justify-center text-muted-foreground font-bold italic animate-pulse'>
						Loading deliciousness...
					</div>
				}
			>
				<MealsGrid searchParams={filters} />
			</Suspense>
		</div>
	);
}
