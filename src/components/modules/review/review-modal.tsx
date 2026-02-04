"use client";

import { createReviewAction } from "@/actions/review.action";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Star } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
	orderId: string;
	mealId: string;
	mealName: string;
}

export function ReviewModal({ orderId, mealId, mealName }: Props) {
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const handleSubmit = () => {
		if (!comment.trim()) return toast.error("Please write a short comment");

		startTransition(async () => {
			try {
				await createReviewAction({ orderId, mealId, rating, comment });
				toast.success("Review submitted! Thank you.");
				setIsOpen(false);
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					size='sm'
					variant='outline'
					className='rounded-xl border-emerald-500/20 text-emerald-600 hover:bg-emerald-50 font-black uppercase text-[10px] tracking-widest'
				>
					Leave Review
				</Button>
			</DialogTrigger>
			<DialogContent className='rounded-[2.5rem] border-2 border-muted bg-background/95 backdrop-blur-xl sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl font-black uppercase italic tracking-tight text-center'>
						Rate Your <span className='text-emerald-500'>Meal</span>
					</DialogTitle>
					<p className='text-center text-xs font-bold text-muted-foreground uppercase tracking-widest'>
						Item: {mealName}
					</p>
				</DialogHeader>

				<div className='space-y-8 py-6'>
					{/* STAR RATING */}
					<div className='flex justify-center gap-2'>
						{[1, 2, 3, 4, 5].map(star => (
							<button
								key={star}
								onClick={() => setRating(star)}
								className='transition-all active:scale-90'
							>
								<Star
									size={32}
									className={`${
										star <= rating ? "fill-emerald-500 text-emerald-500" : "text-muted border-2"
									} transition-colors`}
								/>
							</button>
						))}
					</div>

					{/* COMMENT BOX */}
					<div className='space-y-2'>
						<label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
							Your Experience
						</label>
						<Textarea
							placeholder='How was the food? Was it spicy? Fresh?'
							className='rounded-2xl border-2 bg-muted/20 focus:border-emerald-500 min-h-[120px] font-medium'
							value={comment}
							onChange={e => setComment(e.target.value)}
						/>
					</div>

					<Button
						onClick={handleSubmit}
						disabled={isPending}
						className='w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-sm tracking-[0.2em] shadow-xl shadow-emerald-500/20 gap-2'
					>
						{isPending ? <Loader2 className='animate-spin' /> : <Send size={18} />}
						Submit Review
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
