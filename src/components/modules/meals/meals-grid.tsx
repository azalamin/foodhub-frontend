import { mealService } from "@/service/meal.service";
import { MealCard } from "./meal-card";
import { MealsPagination } from "./meals-pagination";

export async function MealsGrid({ searchParams }: { searchParams: any }) {
	const { data } = await mealService.getAllMeals(searchParams);

	const mealsData = data.data;

	if (!mealsData.length) {
		return <p className='text-center text-muted-foreground'>No meals found 🍽️</p>;
	}

	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{mealsData.map((meal: any) => (
					<MealCard key={meal.id} meal={meal} />
				))}
			</div>

			<MealsPagination page={data.pagination.page} totalPages={data.pagination.totalPages} />
		</>
	);
}
