"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Ticket } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function ReadyToOrder() {
	const couponCode = "FOODHUB20";

	const copyCoupon = () => {
		navigator.clipboard.writeText(couponCode);
		toast.success("Code copied!");
	};

	return (
		<section className='container mx-auto px-4 py-12'>
			{" "}
			{/* Reduced section padding */}
			<div className='relative overflow-hidden rounded-[2rem] bg-[#0F172A] px-6 py-10 text-white shadow-xl lg:px-12 lg:py-12'>
				{/* Subtle Background Glows */}
				<div className='absolute -right-10 -top-10 h-64 w-64 rounded-full bg-orange-500/10 blur-[80px]' />

				<div className='relative z-10 grid items-center gap-8 lg:grid-cols-5'>
					{/* LEFT CONTENT - Takes 3/5 of space */}
					<div className='flex flex-col gap-4 text-center lg:col-span-3 lg:text-left'>
						<div className='flex justify-center lg:justify-start'>
							<div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-[#FF7043] backdrop-blur-md uppercase tracking-wider'>
								<Sparkles size={12} />
								First Order Special
							</div>
						</div>

						<h2 className='text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl text-white'>
							Hungry? Get <span className='text-[#FF7043]'>20% Off</span>
						</h2>

						<p className='max-w-md text-base text-slate-400'>
							Join 10,000+ happy foodies. Fresh and delicious local flavors delivered to your door.
						</p>

						<div className='flex flex-col items-center gap-3 sm:flex-row lg:justify-start pt-2'>
							<Button
								asChild
								size='lg'
								className='h-12 bg-[#FF7043] hover:bg-[#f4511e] text-white rounded-xl px-8 shadow-lg shadow-orange-500/20 transition-all hover:scale-105'
							>
								<Link href='/meals' className='gap-2'>
									Order Now
									<ArrowRight size={18} />
								</Link>
							</Button>

							<button
								onClick={copyCoupon}
								className='group flex items-center gap-3 rounded-xl border border-dashed border-slate-700 bg-white/5 px-4 py-2.5 transition-all hover:bg-white/10 hover:border-[#FF7043]'
							>
								<Ticket size={18} className='text-[#FF7043]' />
								<div className='text-left leading-tight'>
									<p className='text-[9px] font-bold uppercase tracking-widest text-slate-500'>
										Code
									</p>
									<p className='font-mono text-base font-bold text-white'>{couponCode}</p>
								</div>
							</button>
						</div>
					</div>

					{/* RIGHT VISUAL - Takes 2/5 of space */}
					<div className='relative hidden lg:flex justify-end lg:col-span-2'>
						<div className='relative h-48 w-48 lg:h-56 lg:w-56'>
							<img
								src='https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981'
								alt='Pizza'
								className='h-full w-full rounded-[1.5rem] object-cover shadow-2xl border-4 border-slate-800'
							/>
							{/* Smaller Floating Badge */}
							<div className='absolute -bottom-3 -right-3 rounded-2xl bg-white px-3 py-2 text-slate-900 shadow-xl'>
								<p className='text-lg font-black text-[#FF7043] leading-none'>4.9/5</p>
								<p className='text-[8px] font-bold uppercase tracking-widest text-slate-500'>
									Rating
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
