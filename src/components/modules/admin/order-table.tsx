"use client";

import { AdminOrder } from "@/types";
import { CalendarDays, Store, User } from "lucide-react";
import { OrderActions } from "./order-action";

export function AdminOrderTable({ orders }: { orders: AdminOrder[] }) {
	return (
		<div className='bg-card border-2 border-muted rounded-[2.5rem] overflow-hidden shadow-sm'>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='bg-muted/10 border-b-2 border-muted'>
							<th className='px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Reference
							</th>
							<th className='px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Parties
							</th>
							<th className='px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Financials
							</th>
							<th className='px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Status
							</th>
							<th className='px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Timeline
							</th>
							<th className='px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Command
							</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 divide-muted/50'>
						{orders.map(order => (
							<tr key={order.id} className='hover:bg-muted/10 transition-all group'>
								{/* Order ID */}
								<td className='px-8 py-5'>
									<span className='font-mono text-xs font-black italic text-muted-foreground group-hover:text-emerald-600 transition-colors'>
										#{order.id.slice(-8).toUpperCase()}
									</span>
								</td>

								{/* Parties (Customer & Provider) */}
								<td className='px-8 py-5'>
									<div className='flex flex-col gap-2'>
										<div className='flex items-center gap-2'>
											<User size={12} className='text-emerald-500' />
											<span className='text-xs font-black uppercase italic'>
												{order.customer.name}
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<Store size={12} className='text-muted-foreground' />
											<span className='text-[10px] font-bold text-muted-foreground uppercase tracking-tighter italic'>
												{order.provider.restaurantName}
											</span>
										</div>
									</div>
								</td>

								{/* Financials */}
								<td className='px-8 py-5 text-center'>
									<div className='flex flex-col items-center gap-0.5'>
										<span className='font-black text-emerald-600 italic'>
											৳{order.totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
										</span>
										<span className='text-[8px] font-black uppercase text-muted-foreground tracking-widest'>
											Net Total
										</span>
									</div>
								</td>

								{/* Status */}
								<td className='px-8 py-5 text-center'>
									<StatusBadge status={order.status} />
								</td>

								{/* Timeline */}
								<td className='px-8 py-5 text-center'>
									<div className='flex flex-col items-center gap-0.5 text-muted-foreground font-black italic'>
										<div className='flex items-center gap-1 text-[10px]'>
											<CalendarDays size={12} />
											{new Date(order.createdAt).toLocaleDateString("en-GB", {
												day: "2-digit",
												month: "short",
											})}
										</div>
										<span className='text-[8px] uppercase tracking-tighter'>Registered</span>
									</div>
								</td>

								{/* Actions */}
								<td className='px-8 py-5 text-right'>
									<OrderActions order={order} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function StatusBadge({ status }: { status: AdminOrder["status"] }) {
	const styles: Record<string, string> = {
		PLACED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
		PREPARING: "bg-orange-500/10 text-orange-600 border-orange-500/20",
		READY: "bg-purple-500/10 text-purple-600 border-purple-500/20",
		DELIVERED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
		CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
	};

	return (
		<span
			className={`px-3 py-1 rounded-full text-[9px] font-black uppercase italic border-2 ${styles[status]}`}
		>
			{status}
		</span>
	);
}
