import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default async function LoginPage() {
	return (
		<div className='min-h-screen bg-muted/30 flex items-center justify-center pb-6 px-4'>
			<div className='grid w-full max-w-5xl min-h-[600px] lg:grid-cols-2 bg-background rounded-[2.5rem] overflow-hidden shadow-2xl border-none'>
				{/* LEFT SIDE: THE FORM */}
				<div className='flex flex-col justify-center px-8 py-10 lg:px-12'>
					<div className='mx-auto w-full max-w-[320px] space-y-6'>
						<Link href='/' className='flex items-center gap-2 w-fit group'>
							<div className='bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform'>
								<UtensilsCrossed className='text-white' size={20} />
							</div>
							<span className='text-xl font-black tracking-tighter italic uppercase'>
								Food<span className='text-primary'>Hub</span>
							</span>
						</Link>

						<div className='space-y-1'>
							<h1 className='text-3xl font-black tracking-tight italic uppercase leading-none'>
								Welcome <span className='text-primary'>Back</span>
							</h1>
							<p className='text-muted-foreground font-medium text-[13px]'>
								Log in to continue your food journey.
							</p>
						</div>

						<LoginForm />
					</div>
				</div>

				{/* RIGHT SIDE: THE VISUAL */}
				<div className='relative hidden lg:block overflow-hidden'>
					<img
						src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070'
						alt='Delicious Food Background'
						className='absolute inset-0 h-full w-full object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-10'>
						<div className='text-white space-y-2'>
							<div className='bg-primary w-fit px-2 py-0.5 rounded-md'>
								<p className='text-[9px] font-black uppercase tracking-[0.2em] text-white'>
									Join 10k+ Foodies
								</p>
							</div>
							<h2 className='text-4xl font-black leading-tight italic uppercase'>
								Best Flavors <br />
								<span className='text-green-500'>For You.</span>
							</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
