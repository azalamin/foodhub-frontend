import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export function MealCard({ meal }: { meal: any }) {
	return (
		<Link
			href={`/meals/${meal.id}`}
			className='group rounded-xl border overflow-hidden hover:shadow-lg transition'
		>
			<div className='relative h-44'>
				<Image
					src={meal.imageUrl || "/placeholder.jpg"}
					alt={meal.name}
					fill
					className='object-cover group-hover:scale-105 transition'
				/>
			</div>

			<div className='p-4 space-y-2'>
				<h3 className='font-semibold'>{meal.name}</h3>

				<p className='text-sm text-muted-foreground line-clamp-2'>{meal.description}</p>

				<div className='flex items-center justify-between'>
					<span className='font-bold'>৳{meal.price}</span>
					<Badge variant='secondary'>{meal.dietaryType}</Badge>
				</div>
			</div>
		</Link>
	);
}
