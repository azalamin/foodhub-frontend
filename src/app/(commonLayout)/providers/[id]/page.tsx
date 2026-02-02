import { MealCard } from "@/components/modules/meals/meal-card";
import { Badge } from "@/components/ui/badge";
import { providerService } from "@/service/provider.service";
import { Meal } from "@/types";

export default async function ProviderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const { data, error } = await providerService.getProviderWithMeals(id);

	if (error || !data) {
		return (
			<div className='container py-20 text-center text-muted-foreground'>Provider not found</div>
		);
	}

	const { restaurantName, isOpen, description, meals } = data.data;

	return (
		<div className='container py-10 space-y-10 mx-auto'>
			{/* PROVIDER HEADER */}
			<div className='space-y-4'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>{restaurantName}</h1>
					<Badge variant={isOpen ? "default" : "secondary"}>{isOpen ? "Open Now" : "Closed"}</Badge>
				</div>

				{description && <p className='max-w-2xl text-muted-foreground'>{data.description}</p>}
			</div>

			{/* MENU */}
			<div className='space-y-6'>
				<h2 className='text-2xl font-semibold'>Menu</h2>

				{meals.length === 0 ? (
					<p className='text-muted-foreground'>No meals available right now.</p>
				) : (
					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{meals.map((meal: Meal) => (
							<MealCard key={meal.id} meal={meal} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
