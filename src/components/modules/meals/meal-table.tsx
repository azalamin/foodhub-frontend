import { Meal } from "@/types/meal.types";
import { Category } from "@/types";
import { MealActions } from "./meal-actions"; // Ensure correct path

interface Props {
	meals: Meal[];
	categories: Category[]; // Add this
}

export function MealTable({ meals, categories }: Props) {
	return (
		<div className='overflow-x-auto rounded-lg border'>
			<table className='w-full text-sm'>
				<thead className='bg-muted'>
					<tr>
						<th className='px-4 py-3 text-left'>Meal Details</th>
						<th className='px-4 py-3 text-center'>Price</th>
						<th className='px-4 py-3 text-right'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{meals?.map(meal => (
						<tr key={meal.id} className='border-t'>
							<td className='px-4 py-3 font-medium'>{meal.name}</td>
							<td className='px-4 py-3 text-center font-mono'>
								{meal.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
							</td>
							<td className='px-4 py-3 text-right'>
								{/* Pass the categories here */}
								<MealActions meal={meal} categories={categories} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
