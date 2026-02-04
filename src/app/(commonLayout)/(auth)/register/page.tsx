import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { ChefHat, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default async function RegisterPage() {
	return (
		<div className='min-h-screen bg-muted/30 flex items-center justify-center pb-6 px-4'>
			<div className='grid w-full max-w-5xl min-h-[600px] lg:grid-cols-2 bg-background rounded-[2.5rem] overflow-hidden shadow-2xl border-none'>
				<div className='relative hidden lg:block overflow-hidden'>
					<img
						src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070'
						alt='Join FoodHub'
						className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105'
					/>
					<div className='absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/80 flex items-center p-10'>
						<div className='text-white space-y-4'>
							<div className='bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-white/30 flex items-center gap-2'>
								<ChefHat size={14} className='text-primary' />
								<p className='text-[9px] font-black uppercase tracking-widest text-white'>
									Start your journey
								</p>
							</div>
							<h2 className='text-4xl font-black leading-tight italic uppercase text-white'>
								Join the <br />
								<span className='text-green-500'>Foodie</span> <br />
								Revolution.
							</h2>
						</div>
					</div>
				</div>

				{/* RIGHT SIDE: THE FORM */}
				<div className='flex flex-col justify-center px-8 py-8 lg:px-10'>
					<div className='mx-auto w-full max-w-[300px] space-y-6'>
						<Link href='/' className='flex items-center gap-2 w-fit group'>
							<div className='bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform'>
								<UtensilsCrossed className='text-white' size={18} />
							</div>
							<span className='text-lg font-black tracking-tighter italic uppercase'>
								Food<span className='text-primary'>Hub</span>
							</span>
						</Link>

						<div className='space-y-1'>
							<h1 className='text-2xl font-black tracking-tight italic uppercase leading-none'>
								Create <span className='text-primary'>Account</span>
							</h1>
							<p className='text-muted-foreground font-medium text-[12px]'>
								Join 10k+ people ordering meals.
							</p>
						</div>

						<RegisterForm />
					</div>
				</div>
			</div>
		</div>
	);
}
