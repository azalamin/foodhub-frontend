import { MealForm } from "@/components/modules/provider/meal-form";
import { mealService } from "@/service/meal.service";
import { categoryService } from "@/service/category.service";
import { MealTable } from "@/components/modules/meals/meal-table";

export default async function MealsProviderPage() {
	// Fetch both meals and categories in parallel
	const [mealsRes, categoriesRes] = await Promise.all([
		mealService.getProviderMeals(),
		categoryService.getAll(),
	]);

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Menu Management</h1>
				<p className='text-muted-foreground'>Add new meals and manage your existing menu items</p>
			</div>

			{/* Pass categories data to the form */}
			<MealForm categories={categoriesRes.data} />

			<MealTable meals={mealsRes.data} />
		</div>
	);
}
