import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className='border-t bg-background'>
			<div className='container mx-auto px-4 py-12'>
				<div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
					{/* BRAND */}
					<div>
						<div className='flex items-center gap-2 text-lg font-bold'>🍱 FoodHub</div>
						<p className='mt-3 text-sm text-muted-foreground'>
							FoodHub connects customers with trusted food providers for fast, reliable, and
							delicious meals.
						</p>

						<div className='mt-4 flex gap-3'>
							<Link href='#' className='text-muted-foreground hover:text-primary'>
								<Facebook className='h-5 w-5' />
							</Link>
							<Link href='#' className='text-muted-foreground hover:text-primary'>
								<Instagram className='h-5 w-5' />
							</Link>
							<Link href='#' className='text-muted-foreground hover:text-primary'>
								<Twitter className='h-5 w-5' />
							</Link>
						</div>
					</div>

					{/* EXPLORE */}
					<div>
						<h4 className='mb-3 text-sm font-semibold uppercase tracking-wide'>Explore</h4>
						<ul className='space-y-2 text-sm text-muted-foreground'>
							<li>
								<Link href='/meals' className='hover:text-primary'>
									Meals
								</Link>
							</li>
							<li>
								<Link href='/providers' className='hover:text-primary'>
									Providers
								</Link>
							</li>
							<li>
								<Link href='/categories' className='hover:text-primary'>
									Categories
								</Link>
							</li>
						</ul>
					</div>

					{/* FOR PROVIDERS */}
					<div>
						<h4 className='mb-3 text-sm font-semibold uppercase tracking-wide'>For Providers</h4>
						<ul className='space-y-2 text-sm text-muted-foreground'>
							<li>
								<Link href='/provider/register' className='hover:text-primary'>
									Become a Provider
								</Link>
							</li>
							<li>
								<Link href='/provider/dashboard' className='hover:text-primary'>
									Provider Dashboard
								</Link>
							</li>
							<li>
								<Link href='/provider/support' className='hover:text-primary'>
									Provider Support
								</Link>
							</li>
						</ul>
					</div>

					{/* LEGAL */}
					<div>
						<h4 className='mb-3 text-sm font-semibold uppercase tracking-wide'>Legal</h4>
						<ul className='space-y-2 text-sm text-muted-foreground'>
							<li>
								<Link href='/terms' className='hover:text-primary'>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link href='/privacy' className='hover:text-primary'>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href='/contact' className='hover:text-primary'>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* BOTTOM BAR */}
				<div className='mt-12 border-t pt-6 text-center text-sm text-muted-foreground'>
					© {new Date().getFullYear()} FoodHub. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
