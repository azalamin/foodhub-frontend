"use client";

import { Badge } from "@/components/ui/badge";
import { Meal } from "@/types/meal.types";
import { MealActions } from "./meal-actions";

interface Props {
	meals: Meal[];
}

export function MealTable({ meals }: Props) {
	return (
		<div className='overflow-x-auto rounded-lg border'>
			<table className='w-full text-sm'>
				<thead className='bg-muted'>
					<tr>
						<th className='px-4 py-3 text-left'>Meal Details</th>
						<th className='px-4 py-3 text-center'>Dietary</th>
						<th className='px-4 py-3 text-center'>Price (BDT)</th>
						<th className='px-4 py-3 text-center'>Status</th>
						<th className='px-4 py-3 text-right'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{meals?.length > 0 ? (
						meals.map(meal => (
							<tr key={meal.id} className='border-t hover:bg-muted/50 transition-colors'>
								<td className='px-4 py-3'>
									<div className='font-medium text-base'>{meal.name}</div>
									<div className='text-xs text-muted-foreground line-clamp-1'>
										{meal.description || "No description provided"}
									</div>
								</td>
								<td className='px-4 py-3 text-center'>
									<Badge variant='outline' className='text-[10px] font-bold'>
										{meal.dietaryType}
									</Badge>
								</td>
								<td className='px-4 py-3 text-center font-mono font-semibold'>
									{/* Comma formatting as requested: 17,66,322.22 */}
									{meal.price.toLocaleString("en-IN", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</td>
								<td className='px-4 py-3 text-center'>
									<Badge variant={meal.isAvailable ? "default" : "destructive"}>
										{meal.isAvailable ? "Available" : "Hidden"}
									</Badge>
								</td>
								<td className='px-4 py-3 text-right'>
									<MealActions meal={meal} />
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5} className='px-4 py-10 text-center text-muted-foreground'>
								No meals found in your menu. Add your first meal above!
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
