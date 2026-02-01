import { Store, Utensils } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className='relative overflow-hidden bg-background'>
			<div className='container mx-auto grid min-h-[80vh] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2'>
				{/* LEFT: Content */}
				<div className='flex flex-col gap-6'>
					<span className='inline-flex w-fit items-center rounded-full bg-muted px-4 py-1 text-sm font-medium'>
						🍽️ Discover • Order • Enjoy
					</span>

					<h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
						Order Delicious Meals <br />
						<span className='text-primary'>From Local Restaurants</span>
					</h1>

					<p className='max-w-xl text-lg text-muted-foreground'>
						FoodHub connects you with trusted food providers around you. Browse menus, place orders,
						and enjoy fresh meals — all in one place.
					</p>

					<div className='flex flex-col gap-4 sm:flex-row'>
						<Button asChild size='lg' className='gap-2'>
							<Link href='/meals'>
								Browse Meals
								<Utensils className='h-4 w-4' />
							</Link>
						</Button>

						<Button asChild size='lg' variant='outline' className='gap-2'>
							<Link href='/register?role=PROVIDER'>
								Become a Provider
								<Store className='h-4 w-4' />
							</Link>
						</Button>
					</div>

					{/* Trust Indicators */}
					<div className='mt-6 flex items-center gap-6 text-sm text-muted-foreground'>
						<div>✔ Cash on Delivery</div>
						<div>✔ Verified Providers</div>
						<div>✔ Fast Ordering</div>
					</div>
				</div>

				{/* RIGHT: Visual */}
				<div className='relative hidden lg:block'>
					<div className='absolute -top-10 -right-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl' />
					<div className='absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-secondary/30 blur-3xl' />

					<div className='relative rounded-2xl border bg-card p-6 shadow-lg'>
						<img
							src='https://images.unsplash.com/photo-1600891964599-f61ba0e24092'
							alt='Delicious food'
							className='h-[420px] w-full rounded-xl object-cover'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
