import { mealService } from "@/service/meal.service";
import { MealCard } from "./meal-card";
import { MealsPagination } from "./meals-pagination";

export async function MealsGrid({ searchParams }: { searchParams: any }) {
	// Resolve the promise searchParams in Next 15 if needed, or use them directly
	const resolvedParams = await searchParams;

	const query = {
		search: resolvedParams.search || "",
		dietaryType: resolvedParams.dietaryType || "",
		isAvailable: resolvedParams.isAvailable || "",
		limit: resolvedParams.limit || 32, // Loads 32 initially (nice grid for 4-cols)
		page: resolvedParams.page || 1,
	};

	const { data } = await mealService.getAllMeals(query);
	const mealsData = data.data;

	if (!mealsData || mealsData.length === 0) {
		return (
			<div className='text-center py-20 opacity-50'>
				<p className='text-4xl'>🥘</p>
				<p className='mt-4 font-bold'>We couldn't find any meals.</p>
				<p className='text-sm'>Try clearing your filters.</p>
			</div>
		);
	}

	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
				{mealsData.map((meal: any) => (
					<MealCard key={meal.id} meal={meal} />
				))}
			</div>
			<MealsPagination page={data.pagination.page} totalPages={data.pagination.totalPages} />
		</>
	);
}
