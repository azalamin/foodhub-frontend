import { Star, MessageSquare, Quote } from "lucide-react";
import { format } from "date-fns";
import { reviewService } from "@/service/review.service";

export async function MealReviews({ mealId }: { mealId: string }) {
	const data = await reviewService.getReviewsByMeal(mealId);
	const { reviews, stats } = data;

	return (
		<div className='space-y-10 py-12'>
			{/* --- STATS OVERVIEW --- */}
			<div className='flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-muted pb-8'>
				<div className='space-y-2'>
					<div className='flex items-center gap-2 text-emerald-600'>
						<MessageSquare size={18} />
						<span className='text-[10px] font-black uppercase tracking-[0.3em]'>
							Customer Feedback
						</span>
					</div>
					<h2 className='text-4xl font-black tracking-tight italic uppercase'>
						Taste <span className='text-emerald-500'>Testimonials</span>
					</h2>
				</div>

				<div className='flex items-center gap-6 bg-emerald-500/10 px-8 py-4 rounded-[2rem] border-2 border-emerald-500/20'>
					<div className='text-center'>
						<p className='text-4xl font-black text-emerald-600 leading-none'>
							{stats.averageRating.toFixed(1)}
						</p>
						<p className='text-[8px] font-black uppercase tracking-widest text-emerald-700/60 mt-1'>
							Avg Rating
						</p>
					</div>
					<div className='h-10 w-[2px] bg-emerald-500/20' />
					<div className='text-center'>
						<p className='text-4xl font-black text-emerald-600 leading-none'>
							{stats.totalReviews}
						</p>
						<p className='text-[8px] font-black uppercase tracking-widest text-emerald-700/60 mt-1'>
							Reviews
						</p>
					</div>
				</div>
			</div>

			{/* --- REVIEWS LIST --- */}
			{reviews.length === 0 ? (
				<div className='py-20 text-center bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-muted'>
					<p className='font-black uppercase italic text-muted-foreground'>
						No reviews yet. Be the first to try!
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{reviews.map((review: any) => (
						<div
							key={review.id}
							className='relative bg-card border-2 border-muted p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all group'
						>
							<Quote
								className='absolute top-6 right-8 text-muted/20 group-hover:text-emerald-500/20 transition-colors'
								size={40}
							/>

							<div className='flex items-center gap-1 mb-4'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										size={14}
										className={
											i < review.rating ? "fill-emerald-500 text-emerald-500" : "text-muted"
										}
									/>
								))}
							</div>

							<p className='text-lg font-medium italic text-foreground mb-6 leading-relaxed'>
								&ldquo;{review.comment}&rdquo;
							</p>

							<div className='flex items-center justify-between border-t border-muted/50 pt-6'>
								<div className='flex items-center gap-3'>
									<div className='h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-black text-muted-foreground uppercase border-2 border-muted group-hover:border-emerald-500/50 transition-all'>
										{review.customer.name.charAt(0)}
									</div>
									<div>
										<p className='text-[10px] font-black uppercase tracking-tight italic'>
											{review.customer.name}
										</p>
										<p className='text-[8px] font-bold text-muted-foreground uppercase'>
											{format(new Date(review.createdAt), "MMMM yyyy")}
										</p>
									</div>
								</div>
								<div className='bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10'>
									<span className='text-[8px] font-black text-emerald-600 uppercase italic tracking-tighter italic'>
										Verified Diner
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
