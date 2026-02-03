"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Github, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className='border-t bg-card/30 backdrop-blur-xl'>
			<div className='container mx-auto px-6 py-16'>
				<div className='grid gap-12 lg:grid-cols-12'>
					{/* BRAND SECTION - Takes up more space */}
					<div className='lg:col-span-4 space-y-6'>
						<Link
							href='/'
							className='flex items-center gap-2 transition-transform hover:scale-105 w-fit'
						>
							<div className='bg-primary p-1.5 rounded-xl shadow-lg shadow-primary/20'>
								<span className='text-2xl'>🍱</span>
							</div>
							<span className='text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70'>
								FoodHub
							</span>
						</Link>

						<p className='text-sm leading-relaxed text-muted-foreground max-w-xs'>
							Elevating your dining experience by connecting you with the finest local kitchens.
							Freshness delivered, one plate at a time.
						</p>

						<div className='flex gap-2'>
							{[
								{ icon: <Facebook size={18} />, href: "#" },
								{ icon: <Instagram size={18} />, href: "#" },
								{ icon: <Twitter size={18} />, href: "#" },
								{ icon: <Github size={18} />, href: "#" },
							].map((social, idx) => (
								<Button
									key={idx}
									variant='outline'
									size='icon'
									className='rounded-full h-9 w-9 hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-muted/50'
									asChild
								>
									<Link href={social.href}>{social.icon}</Link>
								</Button>
							))}
						</div>
					</div>

					{/* LINKS GRID - Responsive 3 columns */}
					<div className='lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8'>
						{/* EXPLORE */}
						<div className='space-y-4'>
							<h4 className='text-xs font-bold uppercase tracking-[0.2em] text-foreground/50'>
								Explore
							</h4>
							<ul className='space-y-3'>
								{["Meals", "Providers", "Categories", "Top Rated"].map(item => (
									<li key={item}>
										<Link
											href={`/${item.toLowerCase()}`}
											className='text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group'
										>
											<span className='h-px w-0 bg-primary transition-all group-hover:w-3' />
											{item}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* PARTNERS */}
						<div className='space-y-4'>
							<h4 className='text-xs font-bold uppercase tracking-[0.2em] text-foreground/50'>
								For Partners
							</h4>
							<ul className='space-y-3'>
								{["Become a Provider", "Dashboard", "Merchant Policy", "Support"].map(item => (
									<li key={item}>
										<Link
											href='#'
											className='text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group'
										>
											<span className='h-px w-0 bg-primary transition-all group-hover:w-3' />
											{item}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* CONTACT / NEWSLETTER */}
						<div className='space-y-4 col-span-2 md:col-span-1'>
							<h4 className='text-xs font-bold uppercase tracking-[0.2em] text-foreground/50'>
								Contact
							</h4>
							<ul className='space-y-3 text-sm text-muted-foreground'>
								<li className='flex items-center gap-3'>
									<MapPin size={16} className='text-primary' />
									Dhaka, Bangladesh
								</li>
								<li className='flex items-center gap-3'>
									<Phone size={16} className='text-primary' />
									+880 1700 000 000
								</li>
								<li className='flex items-center gap-3'>
									<Mail size={16} className='text-primary' />
									hello@foodhub.com
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* BOTTOM BAR */}
				<div className='mt-16 pt-8 border-t border-muted/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground'>
					<p>© {new Date().getFullYear()} FoodHub Inc. Crafting delicious moments.</p>

					<div className='flex gap-6'>
						<Link href='/terms' className='hover:text-primary transition-colors'>
							Terms
						</Link>
						<Link href='/privacy' className='hover:text-primary transition-colors'>
							Privacy
						</Link>
						<Link href='/cookies' className='hover:text-primary transition-colors'>
							Cookies
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
