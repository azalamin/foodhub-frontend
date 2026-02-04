"use client";

import { UtensilsCrossed } from "lucide-react";

export default function Loading() {
	return (
		<div className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background'>
			{/* Background Glow Accent */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full' />

			<div className='relative flex flex-col items-center gap-6'>
				{/* BRAND LOGO WITH PULSE */}
				<div className='relative'>
					{/* Outer Ring Animation */}
					<div className='absolute inset-0 rounded-3xl bg-emerald-500/20 animate-ping duration-[2000ms]' />

					<div className='relative bg-emerald-600 p-4 rounded-[2rem] shadow-2xl shadow-emerald-500/40 border-4 border-background'>
						<UtensilsCrossed className='text-white' size={40} strokeWidth={2.5} />
					</div>
				</div>

				{/* BRAND TEXT */}
				<div className='text-center space-y-2'>
					<h2 className='text-3xl font-black tracking-tighter italic uppercase animate-pulse'>
						Food<span className='text-emerald-500'>Hub</span>
					</h2>

					{/* PRECISE PROGRESS BAR */}
					<div className='w-40 h-1.5 bg-muted rounded-full overflow-hidden border border-muted shadow-inner'>
						<div className='h-full bg-emerald-500 rounded-full animate-loading-bar w-[40%]' />
					</div>

					<p className='text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground pt-2'>
						Preparing your kitchen...
					</p>
				</div>
			</div>

			<style jsx>{`
				@keyframes loading-bar {
					0% {
						transform: translateX(-100%);
					}
					50% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(100%);
					}
				}
				.animate-loading-bar {
					animation: loading-bar 1.5s infinite linear;
				}
			`}</style>
		</div>
	);
}
