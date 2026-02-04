import { Button } from "@/components/ui/button";
import { ChefHat, Compass, Home, Utensils } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className='relative flex min-h-[90vh] flex-col items-center justify-center px-6 overflow-hidden'>
			{/* --- DECORATIVE BACKGROUND BLURS --- */}
			<div className='absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] -z-10' />
			<div className='absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-600/10 rounded-full blur-[120px] -z-10' />

			<div className='relative flex flex-col items-center text-center space-y-8'>
				{/* ICON BADGE */}
				<div className='bg-emerald-500/10 p-5 rounded-[2.5rem] border-2 border-emerald-500/20 animate-bounce'>
					<ChefHat className='text-emerald-600' size={48} strokeWidth={1.5} />
				</div>

				{/* HERO TEXT */}
				<div className='space-y-4'>
					<div className='flex items-center justify-center gap-2 text-emerald-600 mb-2'>
						<Utensils size={16} />
						<span className='text-[10px] font-black uppercase tracking-[0.4em]'>
							Error Code 404
						</span>
					</div>

					<h1 className='text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none'>
						Table <span className='text-emerald-500'>Not Found</span>
					</h1>

					<p className='mt-3 max-w-lg mx-auto text-muted-foreground font-medium italic text-lg leading-relaxed'>
						It seems the page you are looking for has been cleared from the menu. Let&apos;s get you
						back to the main course.
					</p>
				</div>

				{/* ACTIONS */}
				<div className='mt-8 flex flex-col gap-4 sm:flex-row'>
					<Button
						asChild
						className='h-14 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95 gap-2'
					>
						<Link href='/'>
							<Home size={18} />
							Return Home
						</Link>
					</Button>

					<Button
						asChild
						variant='outline'
						className='h-14 px-10 rounded-2xl border-2 border-muted hover:border-emerald-500/50 hover:bg-emerald-50 font-black uppercase text-xs tracking-widest transition-all active:scale-95 gap-2'
					>
						<Link href='/meals'>
							<Compass size={18} />
							Browse Menu
						</Link>
					</Button>
				</div>
			</div>

			{/* BRAND FOOTER */}
			<div className='absolute bottom-10 flex flex-col items-center gap-2'>
				<div className='h-1 w-12 bg-muted rounded-full' />
				<p className='text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
					FoodHub <span className='text-emerald-500'>Systems</span> © 2026
				</p>
			</div>
		</div>
	);
}
