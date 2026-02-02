import { AddToCart } from "@/components/modules/meals/add-to-cart";
import { env } from "@/env";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getMeal(mealId: string) {
	const res = await fetch(`${env.API_URL}/api/meals/${mealId}`, {
		cache: "no-store",
	});

	if (!res.ok) return null;

	const data = await res.json();

	return data.data;
}

export default async function MealDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const meal = await getMeal(id);

	if (!meal) return notFound();

	return (
		<div className='container mx-auto py-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
				{/* IMAGE */}
				<div className='relative aspect-square rounded-xl overflow-hidden border'>
					<Image
						src={meal.imageUrl || "/placeholder-food.jpg"}
						alt={meal.name}
						fill
						className='object-cover'
					/>
				</div>

				{/* DETAILS */}
				<div className='space-y-5'>
					<h1 className='text-3xl font-bold'>{meal.name}</h1>

					<p className='text-muted-foreground'>{meal.description}</p>

					<p className='text-2xl font-semibold'>৳ {meal.price}</p>

					<AddToCart meal={meal} />

					{/* PROVIDER */}
					<div className='rounded-lg border p-4 bg-muted/40'>
						<p className='font-medium'>Provider: {meal.provider.name}</p>
						<p className={meal.provider.isOpen ? "text-green-600 text-sm" : "text-red-500 text-sm"}>
							{meal.provider.isOpen ? "Open now" : "Closed"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
