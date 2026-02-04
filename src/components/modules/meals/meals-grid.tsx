import { mealService } from "@/service/meal.service";
import { SearchX } from "lucide-react";
import { MealCard } from "./meal-card";
import { MealsPagination } from "./meals-pagination";

export async function MealsGrid({ searchParams }: { searchParams: any }) {
	// Injecting limit=30 into searchParams if not provided
	const params = {
		...searchParams,
		limit: searchParams.limit || 30,
		page: searchParams.page || 1,
	};

	const { data } = await mealService.getAllMeals(params);
	const mealsData = data.data;

	if (!mealsData || mealsData.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-20 space-y-4'>
				<div className='bg-muted p-6 rounded-full'>
					<SearchX className='h-12 w-12 text-muted-foreground' />
				</div>
				<h3 className='text-xl font-bold'>No meals found</h3>
				<p className='text-muted-foreground'>Try adjusting your search or filters.</p>
			</div>
		);
	}

	return (
		<div className='space-y-12'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				{mealsData.map((meal: any) => (
					<MealCard key={meal.id} meal={meal} />
				))}
			</div>

			<MealsPagination
				page={Number(data.pagination.page)}
				totalPages={data.pagination.totalPages}
			/>
		</div>
	);
}
