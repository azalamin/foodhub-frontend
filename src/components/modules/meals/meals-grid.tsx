import { mealService } from "@/service/meal.service";
import { MealCard } from "./meal-card";
import { MealsPagination } from "./meals-pagination";

export async function MealsGrid({ searchParams }: { searchParams: any }) {
	const params = searchParams;

	const query = {
		search: params.search || "",
		dietaryType: params.dietaryType || "",
		isAvailable: params.isAvailable || "",
		sort: params.sort || "", // Pass the string "price_asc" or "price_desc"
		page: params.page || 1,
	};

	const { data } = await mealService.getAllMeals(query);

	const mealsData = data?.data;

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
