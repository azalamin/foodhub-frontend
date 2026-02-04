"use client";

import { updateOrderStatusProviderAction } from "@/actions/order.action";
import { CheckCircle2, ChevronRight, Clock, MapPin, Timer, XCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const statusStyles: Record<string, { color: string; icon: any; bg: string }> = {
	PLACED: { color: "text-blue-600", bg: "bg-blue-50", icon: Clock },
	PREPARING: { color: "text-orange-600", bg: "bg-orange-50", icon: Timer },
	READY: { color: "text-purple-600", bg: "bg-purple-50", icon: CheckCircle2 },
	DELIVERED: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
	CANCELLED: { color: "text-red-600", bg: "bg-red-50", icon: XCircle },
};

export function ProviderOrderTable({ orders }: { orders: any[] }) {
	const [isPending, startTransition] = useTransition();

	const handleStatusUpdate = (id: string, status: string) => {
		startTransition(async () => {
			try {
				await updateOrderStatusProviderAction(id, status);
				toast.success(`Order #${id.slice(-4)} updated to ${status}`);
			} catch (err: any) {
				toast.error(err.message || "Failed to update status");
			}
		});
	};

	return (
		<div className='bg-card border-2 border-muted rounded-[2.5rem] overflow-hidden shadow-sm'>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='border-b-2 border-muted bg-muted/10'>
							<th className='px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Reference
							</th>
							<th className='px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Customer & Destination
							</th>
							<th className='px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Menu Items
							</th>
							<th className='px-8 py-6 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Earnings
							</th>
							<th className='px-8 py-6 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Flow State
							</th>
							<th className='px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Command
							</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 divide-muted/50'>
						{orders?.map(order => {
							const state = statusStyles[order.status] || statusStyles.PLACED;

							return (
								<tr key={order.id} className='hover:bg-muted/20 transition-all group'>
									{/* Order ID */}
									<td className='px-8 py-6'>
										<div className='flex items-center gap-3'>
											<div className='h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center font-black text-[10px] border-2 border-muted group-hover:border-emerald-500/50 transition-colors'>
												ID
											</div>
											<span className='font-mono text-xs font-black italic'>
												#{order?.id?.slice(-6).toUpperCase()}
											</span>
										</div>
									</td>

									{/* Customer & Address */}
									<td className='px-8 py-6'>
										<div className='font-black text-sm uppercase italic'>
											{order.customer?.name}
										</div>
										<div className='flex items-center gap-1 text-[10px] font-medium text-muted-foreground mt-1'>
											<MapPin size={12} className='text-emerald-500' />
											<span className='truncate max-w-[150px]'>{order.deliveryAddress}</span>
										</div>
									</td>

									{/* Items */}
									<td className='px-8 py-6'>
										<div className='flex flex-wrap gap-1 max-w-[200px]'>
											{order.items?.map((i: any, idx: number) => (
												<span
													key={idx}
													className='bg-muted px-2 py-0.5 rounded-md text-[10px] font-bold'
												>
													{i.name}
												</span>
											))}
										</div>
									</td>

									{/* Total Price with your Comma Style */}
									<td className='px-8 py-6 text-center'>
										<span className='font-black text-emerald-600 italic'>
											৳
											{(order.totalPrice ?? 0).toLocaleString("en-IN", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</span>
									</td>

									{/* Flow State Badge */}
									<td className='px-8 py-6 text-center'>
										<div
											className={`inline-flex items-center gap-2 ${state.bg} ${state.color} px-4 py-1.5 rounded-2xl border-2 border-current/10`}
										>
											<state.icon size={14} strokeWidth={3} />
											<span className='text-[10px] font-black uppercase tracking-tighter'>
												{order.status}
											</span>
										</div>
									</td>

									{/* Actions */}
									<td className='px-8 py-6 text-right'>
										<div className='relative inline-block'>
											<select
												disabled={isPending}
												onChange={e => handleStatusUpdate(order.id, e.target.value)}
												defaultValue={order.status}
												className={`
                                                    appearance-none cursor-pointer font-black text-[10px] uppercase tracking-widest
                                                    bg-background border-2 border-muted rounded-xl px-4 py-2 pr-8
                                                    focus:border-emerald-500 focus:outline-none transition-all
                                                    disabled:opacity-50
                                                `}
											>
												<option value='PLACED'>PLACED</option>
												<option value='PREPARING'>PREPARING</option>
												<option value='READY'>READY</option>
												<option value='DELIVERED'>DELIVERED</option>
												<option value='CANCELLED'>CANCELLED</option>
											</select>
											<ChevronRight
												className='absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground pointer-events-none'
												size={12}
											/>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
