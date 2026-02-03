import { MealTable } from "@/components/modules/meals/meal-table";
import { MealForm } from "@/components/modules/provider/meal-form";
import { categoryService } from "@/service/category.service";
import { mealService } from "@/service/meal.service";

export default async function MealsProviderPage() {
	const [mealsRes, categoriesRes] = await Promise.all([
		mealService.getCurrentProviderMeals(),
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
