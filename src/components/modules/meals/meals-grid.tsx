import { env } from "@/env";
import { buildQuery } from "@/lib/utils";
import { MealCard } from "./meal-card";
import { MealsPagination } from "./meals-pagination";

export async function MealsGrid({ searchParams }: { searchParams: any }) {
	const query = buildQuery(searchParams);

	const res = await fetch(`${env.API_URL}/api/meals?${query}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch meals");
	}

	const result = await res.json();

	const { data, pagination } = result.data;

	console.log({ pagination, data });

	if (!data.length) {
		return <p className='text-center text-muted-foreground'>No meals found 🍽️</p>;
	}

	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{data.map((meal: any) => (
					<MealCard key={meal.id} meal={meal} />
				))}
			</div>

			<MealsPagination page={pagination.page} totalPages={pagination.totalPages} />
		</>
	);
}

// "use client";

// export default function Error() {
// 	return (
// 		<div className='text-center py-20'>
// 			<h2 className='text-xl font-semibold'>Something went wrong 😢</h2>
// 			<p className='text-muted-foreground'>Please refresh the page</p>
// 		</div>
// 	);
// }
