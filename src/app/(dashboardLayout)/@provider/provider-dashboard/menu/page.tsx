import { MealTable } from "@/components/modules/meals/meal-table";
import { MealForm } from "@/components/modules/provider/meal-form";
import { categoryService } from "@/service/category.service";
import { mealService } from "@/service/meal.service";
import { Sparkles, Utensils } from "lucide-react";
import { Suspense } from "react";
import Loading from "../../loading"; // Ensure this path points to your loading file

export default async function MealsProviderPage() {
	const categoriesRes = await categoryService.getAll();
	const categories = categoriesRes?.data || [];

	return (
		<div className='space-y-10 pb-12'>
			{/* --- HEADER (Shows up instantly) --- */}
			<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-muted pb-8'>
				<div className='space-y-2'>
					<div className='flex items-center gap-2 text-emerald-600'>
						<Utensils size={20} />
						<span className='text-[10px] font-black uppercase tracking-[0.3em]'>
							Kitchen Inventory
						</span>
					</div>
					<h1 className='text-4xl font-black tracking-tight italic uppercase'>
						Menu <span className='text-emerald-500'>Management</span>
					</h1>
				</div>
			</div>

			<div className='grid grid-cols-1 xl:grid-cols-12 gap-10'>
				{/* LEFT: FORM (Shows up instantly) */}
				<div className='xl:col-span-4'>
					<div className='sticky top-6 space-y-6'>
						<h2 className='text-xl font-black italic uppercase ml-2'>
							Add <span className='text-emerald-500'>New Item</span>
						</h2>
						<MealForm categories={categories} />
					</div>
				</div>

				{/* RIGHT: TABLE (Wrapped in Suspense) */}
				<div className='xl:col-span-8 space-y-6'>
					<h2 className='text-xl font-black italic uppercase ml-2 text-emerald-600'>
						Live <span className='text-foreground'>Menu Items</span>
					</h2>

					<Suspense fallback={<Loading />}>
						<MealTableContainer categories={categories} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}

// Data Fetching Component for the Table
async function MealTableContainer({ categories }: { categories: any[] }) {
	const mealsRes = await mealService.getCurrentProviderMeals();
	const meals = mealsRes?.data || [];

	return (
		<>
			<div className='absolute top-20 right-8 hidden xl:flex bg-emerald-500/10 px-5 py-2.5 rounded-2xl border-2 border-emerald-500/20 items-center gap-3'>
				<Sparkles className='text-emerald-600' size={18} />
				<span className='text-xs font-black uppercase italic text-emerald-700'>
					{meals.length} Dishes Live
				</span>
			</div>

			<MealTable meals={meals} categories={categories} />
		</>
	);
}
