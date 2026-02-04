import { MealCard } from "@/components/modules/meals/meal-card";
import { providerService } from "@/service/provider.service";
import { Meal } from "@/types";
import { MapPin, Phone, Star, Utensils } from "lucide-react";

export default async function ProviderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const { data, error } = await providerService.getProviderWithMeals(id);

	if (error || !data) {
		return (
			<div className='container py-40 text-center font-black uppercase italic text-muted-foreground'>
				Chef Not Found
			</div>
		);
	}

	const { restaurantName, isOpen, description, meals, address, phone } = data.data;

	return (
		<div className='container py-12 space-y-16 mx-auto px-4'>
			{/* --- PROVIDER PROFILE HEADER --- */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-start'>
				<div className='lg:col-span-2 space-y-6'>
					<div className='flex flex-wrap items-center gap-4'>
						<h1 className='text-5xl font-black italic uppercase tracking-tighter'>
							{restaurantName}
						</h1>
						<div
							className={`px-4 py-1 rounded-full text-[10px] font-black uppercase italic border-2 ${
								isOpen
									? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
									: "bg-red-500/10 border-red-500/20 text-red-600"
							}`}
						>
							{isOpen ? "• Open Now" : "• Closed"}
						</div>
					</div>

					<p className='text-lg font-medium text-muted-foreground italic leading-relaxed'>
						{description || "No description provided for this kitchen."}
					</p>

					<div className='flex flex-wrap gap-6 pt-4'>
						<div className='flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-muted-foreground'>
							<MapPin size={16} className='text-emerald-500' /> {address}
						</div>
						<div className='flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-muted-foreground'>
							<Phone size={16} className='text-emerald-500' /> {phone}
						</div>
					</div>
				</div>

				{/* QUICK STATS CARD */}
				<div className='bg-card border-2 border-muted p-8 rounded-[2.5rem] shadow-sm space-y-4'>
					<div className='flex items-center justify-between border-b pb-4'>
						<span className='font-black uppercase text-[10px] tracking-widest text-muted-foreground'>
							Kitchen Rating
						</span>
						<div className='flex items-center gap-1 text-yellow-500 font-black italic'>
							<Star size={16} fill='currentColor' /> 4.9
						</div>
					</div>
					<div className='flex items-center justify-between'>
						<span className='font-black uppercase text-[10px] tracking-widest text-muted-foreground'>
							Experience
						</span>
						<span className='font-black italic text-emerald-600'>Pro Chef</span>
					</div>
				</div>
			</div>

			{/* --- MENU SECTION --- */}
			<div className='space-y-8'>
				<div className='flex items-center gap-4'>
					<div className='bg-emerald-600 p-2 rounded-xl text-white'>
						<Utensils size={24} />
					</div>
					<h2 className='text-3xl font-black italic uppercase'>
						Our <span className='text-emerald-500'>Menu</span>
					</h2>
				</div>

				{meals.length === 0 ? (
					<p className='text-muted-foreground font-black italic uppercase py-10'>
						No meals available right now.
					</p>
				) : (
					<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{meals.map((meal: Meal) => (
							<MealCard key={meal.id} meal={meal} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
