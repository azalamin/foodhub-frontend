import { MealsFilters } from "@/components/modules/meals/meals-filters";
import { MealsGrid } from "@/components/modules/meals/meals-grid";
import { Suspense } from "react";

export default function MealsPage({
	searchParams,
}: {
	searchParams: {
		search?: string;
		categoryId?: string;
		dietaryType?: string;
		page?: string;
	};
}) {
	return (
		<div className='container mx-auto py-10 space-y-8'>
			{/* Header */}
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Browse Meals</h1>
				<p className='text-muted-foreground'>Discover meals from your favorite restaurants</p>
			</div>

			{/* Filters */}
			<MealsFilters />

			{/* Meals */}
			<Suspense fallback={null}>
				<MealsGrid searchParams={searchParams} />
			</Suspense>
		</div>
	);
}
