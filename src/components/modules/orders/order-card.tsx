"use client";

import { Order } from "@/types";
import { format } from "date-fns";
import { Calendar, ChevronRight, Receipt, Star, Utensils } from "lucide-react";
import Link from "next/link";
import { ReviewModal } from "../review/review-modal";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderCard({ order }: { order: Order }) {
	return (
		<div className='group relative rounded-[2rem] border-2 border-muted bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5'>
			{/* Upper Section */}
			<div className='flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6'>
				<div className='flex items-center gap-4'>
					<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white'>
						<Utensils className='h-7 w-7' />
					</div>
					<div className='space-y-1'>
						<h3 className='text-xl font-black tracking-tight'>{order.provider?.restaurantName}</h3>
						<div className='flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
							<span className='flex items-center gap-1'>
								<Calendar size={12} className='text-primary' />
								{format(new Date(order.createdAt), "MMM d, yyyy")}
							</span>
							<span className='flex items-center gap-1'>
								<Receipt size={12} className='text-primary' />
								ID: {order.id.slice(0, 8).toUpperCase()}
							</span>
						</div>
					</div>
				</div>

				<div className='flex items-center self-start gap-3'>
					{/* SHOW RATING IF REVIEW EXISTS */}
					{order.review && (
						<div className='flex items-center gap-1 bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full border border-emerald-500/20'>
							<Star size={12} className='fill-emerald-600' />
							<span className='text-[10px] font-black'>{order.review.rating}</span>
						</div>
					)}
					<OrderStatusBadge status={order.status} />
				</div>
			</div>

			{/* Items Summary */}
			<div className='rounded-2xl bg-muted/30 p-4 mb-6 border border-muted/50'>
				<div className='grid gap-2'>
					{order.items.map(item => (
						<div key={item.id} className='flex justify-between items-center text-sm'>
							<span className='font-bold text-muted-foreground'>
								<span className='text-primary'>{item.quantity}x</span> {item.mealName}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Footer Actions */}
			<div className='flex items-center justify-between pt-4 border-t border-muted/50'>
				<div>
					<p className='text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-0.5'>
						Total Paid
					</p>
					<p className='text-2xl font-black text-foreground font-mono'>৳{order.totalPrice}</p>
				</div>

				<div className='flex items-center gap-3'>
					{/* SHOW REVIEW BUTTON ONLY IF DELIVERED AND NO REVIEW YET */}
					{order.status === "DELIVERED" && !order.review && (
						<ReviewModal
							orderId={order.id}
							mealId={order.items[0]?.mealId} // Assuming the first item for the review link
							mealName={order.items[0]?.mealName}
						/>
					)}

					<Link
						href={`/dashboard/orders/${order.id}`}
						className='group/btn inline-flex items-center gap-2 rounded-xl bg-background border-2 px-5 py-2.5 text-sm font-black transition-all hover:bg-primary hover:border-primary hover:text-white shadow-sm'
					>
						Track
						<ChevronRight
							size={16}
							className='transition-transform group-hover/btn:translate-x-1'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
