"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@/types";
import { ArrowRight, MapPin, Star, Utensils } from "lucide-react";
import Link from "next/link";

export function ProviderCard({ provider }: { provider: Provider }) {
	return (
		<div className='group relative bg-card border-2 border-muted rounded-[2rem] p-5 transition-all duration-500 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2'>
			{/* --- IMAGE SECTION --- */}
			<div className='relative mb-5 h-48 w-full overflow-hidden rounded-[1.5rem] bg-muted'>
				{provider.image ? (
					<img
						src={provider.image}
						alt={provider.name}
						className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
					/>
				) : (
					<div className='flex h-full items-center justify-center bg-emerald-500/5 text-emerald-600'>
						<Utensils size={40} strokeWidth={1.5} />
					</div>
				)}

				{/* Status Badge (Floating) */}
				<div
					className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md border shadow-sm ${
						provider.isOpen
							? "bg-emerald-500/80 border-emerald-400 text-white"
							: "bg-black/60 border-white/20 text-white"
					}`}
				>
					{provider.isOpen ? "• Open Now" : "Closed"}
				</div>
			</div>

			{/* --- INFO SECTION --- */}
			<div className='space-y-4'>
				<div className='space-y-1'>
					<div className='flex items-center justify-between'>
						<h3 className='text-xl font-black italic uppercase tracking-tight truncate'>
							{provider.name}
						</h3>
						<div className='flex items-center gap-1 text-yellow-500'>
							<Star size={12} fill='currentColor' />
							<span className='text-[10px] font-black'>4.9</span>
						</div>
					</div>

					<div className='flex items-center gap-1 text-muted-foreground'>
						<MapPin size={12} className='text-emerald-500' />
						<span className='text-[10px] font-bold uppercase tracking-wider truncate'>
							{provider.address || "Local Kitchen"}
						</span>
					</div>
				</div>

				{provider.description && (
					<p className='line-clamp-2 text-xs font-medium text-muted-foreground leading-relaxed italic'>
						"{provider.description}"
					</p>
				)}

				<div className='flex items-center justify-between pt-2 border-t border-muted/50'>
					<span className='text-[10px] font-black uppercase text-emerald-600 tracking-tighter'>
						{provider.mealsCount || 0} Signature Dishes
					</span>

					<Button
						asChild
						variant='ghost'
						size='sm'
						className='group/btn h-8 px-0 hover:bg-transparent'
						disabled={!provider.isOpen}
					>
						<Link
							href={`/providers/${provider.id}`}
							className='flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-foreground group-hover/btn:text-emerald-500 transition-colors'
						>
							View Menu{" "}
							<ArrowRight
								size={14}
								className='transition-transform group-hover/btn:translate-x-1'
							/>
						</Link>
					</Button>
				</div>

				{/* Main CTA for Mobile/Easy Click */}
				<Button
					asChild
					className={`w-full h-12 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg transition-all ${
						provider.isOpen
							? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20 text-white"
							: "bg-muted text-muted-foreground pointer-events-none"
					}`}
				>
					<Link href={`/providers/${provider.id}`}>
						{provider.isOpen ? "Order Now" : "Currently Offline"}
					</Link>
				</Button>
			</div>
		</div>
	);
}
