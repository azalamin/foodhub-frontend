import { Category } from "@/types";
import { Meal } from "@/types/meal.types";
import { Utensils } from "lucide-react";
import { MealActions } from "./meal-actions";

interface Props {
	meals: Meal[];
	categories: Category[];
}

export function MealTable({ meals, categories }: Props) {
	return (
		<div className='bg-card border-2 border-muted rounded-[2.5rem] overflow-hidden'>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='bg-muted/10 border-b-2 border-muted'>
							<th className='px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Dish Information
							</th>
							<th className='px-8 py-6 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Pricing
							</th>
							<th className='px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Control
							</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 divide-muted/50'>
						{meals?.map(meal => (
							<tr key={meal.id} className='hover:bg-muted/20 transition-all group'>
								<td className='px-8 py-6'>
									<div className='flex items-center gap-4'>
										<div className='h-14 w-14 rounded-2xl bg-muted overflow-hidden border-2 border-muted group-hover:border-emerald-500/50 transition-all'>
											{meal.imageUrl ? (
												<img
													src={meal.imageUrl}
													alt={meal.name}
													className='h-full w-full object-cover'
												/>
											) : (
												<div className='h-full w-full flex items-center justify-center text-muted-foreground'>
													<Utensils size={20} />
												</div>
											)}
										</div>
										<div>
											<p className='font-black text-sm uppercase italic'>{meal.name}</p>
											<div className='flex items-center gap-2 mt-1'>
												<span className='text-[9px] font-black bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md uppercase'>
													{categories.find(c => c.id === meal.categoryId)?.name || "General"}
												</span>
												{!meal.isAvailable && (
													<span className='text-[9px] font-black bg-red-500/10 text-red-600 px-2 py-0.5 rounded-md uppercase'>
														Sold Out
													</span>
												)}
											</div>
										</div>
									</div>
								</td>
								<td className='px-8 py-6 text-center'>
									<span className='font-black text-emerald-600 italic text-md'>
										৳{meal.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
									</span>
								</td>
								<td className='px-8 py-6 text-right'>
									<MealActions meal={meal} categories={categories} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{meals?.length === 0 && (
				<div className='p-20 text-center space-y-2'>
					<p className='font-black text-muted-foreground uppercase italic text-sm'>
						Your menu is empty.
					</p>
					<p className='text-xs text-muted-foreground/60'>
						Add your first dish using the form on the left.
					</p>
				</div>
			)}
		</div>
	);
}
