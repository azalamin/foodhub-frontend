"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, ShieldCheck, Star, Store } from "lucide-react";
import Link from "next/link";

type Provider = {
	id: string;
	restaurantName: string;
	description?: string;
	isOpen: boolean;
};

export function FeaturedProviders({ providers }: { providers: any }) {
	// Fix: Ensure we are slicing an actual array
	const providerList = Array.isArray(providers) ? providers : providers?.data || [];
	const displayProviders = providerList.slice(0, 3);

	return (
		<section className='relative py-24 bg-muted/30 overflow-hidden'>
			<div className='absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]' />

			<div className='container mx-auto px-4'>
				<div className='mb-16 flex flex-col md:flex-row items-end justify-between gap-6'>
					<div className='space-y-4 text-left'>
						<Badge
							variant='outline'
							className='border-primary/30 text-primary bg-primary/5 px-4 py-1 rounded-full'
						>
							✨ Verified Kitchens
						</Badge>
						<h2 className='text-4xl font-black tracking-tight sm:text-5xl'>
							Featured <span className='text-primary'>Restaurants</span>
						</h2>
						<p className='max-w-xl text-lg text-muted-foreground'>
							Discover trusted local providers known for their quality, hygiene, and incredible
							taste.
						</p>
					</div>

					<Button
						asChild
						variant='outline'
						className='hidden md:flex rounded-2xl h-12 px-6 group border-2 hover:bg-primary/5 transition-all'
					>
						<Link href='/providers' className='flex items-center gap-2'>
							Explore All Providers
							<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
						</Link>
					</Button>
				</div>

				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					<TooltipProvider>
						{displayProviders.map((provider: Provider) => (
							<Card
								key={provider.id}
								className='group flex h-full flex-col overflow-hidden border-none bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10'
							>
								<div className='relative h-32 w-full bg-gradient-to-br from-primary/20 via-orange-500/10 to-transparent transition-all duration-500 group-hover:from-primary/30'>
									<div className='absolute -bottom-6 left-6'>
										<div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-xl border-4 border-muted/20 transform transition-transform group-hover:scale-110'>
											<Store
												className={cn(
													"h-8 w-8 transition-colors duration-300",
													provider.isOpen ? "text-primary" : "text-muted-foreground",
												)}
											/>
										</div>
									</div>
									<div className='absolute top-4 right-4'>
										<Badge
											className={cn(
												"rounded-full px-3 py-1 shadow-md border-none font-bold text-[10px] uppercase tracking-wider",
												provider.isOpen
													? "bg-green-500 text-white animate-pulse"
													: "bg-muted text-muted-foreground",
											)}
										>
											{provider.isOpen ? "● Open Now" : "Closed"}
										</Badge>
									</div>
								</div>

								<CardContent className='flex flex-col gap-4 p-8 pt-10'>
									<div className='space-y-2 text-left'>
										<div className='flex items-center gap-1.5'>
											<h3 className='text-xl font-bold tracking-tight group-hover:text-primary transition-colors'>
												{provider.restaurantName}
											</h3>
											<Tooltip>
												<TooltipTrigger asChild>
													<ShieldCheck className='h-4 w-4 text-blue-500 cursor-help' />
												</TooltipTrigger>
												<TooltipContent className='bg-blue-600 text-white border-none shadow-lg'>
													<p className='text-xs font-bold'>Verified Provider</p>
												</TooltipContent>
											</Tooltip>
										</div>
										<p className='text-sm leading-relaxed text-muted-foreground line-clamp-2 min-h-[40px]'>
											{provider.description ||
												"A top-rated kitchen serving fresh and delicious meals every day."}
										</p>
									</div>

									<div className='flex items-center gap-4 border-t border-muted/50 pt-4 text-xs font-bold text-muted-foreground/80'>
										<div className='flex items-center gap-1'>
											<Star className='h-3.5 w-3.5 fill-yellow-500 text-yellow-500' />
											4.8 (120+)
										</div>
										<div className='flex items-center gap-1'>
											<Clock className='h-3.5 w-3.5 text-primary' />
											25-35 min
										</div>
									</div>
								</CardContent>

								<CardFooter className='p-8 pt-0'>
									<Button
										asChild
										variant={provider.isOpen ? "default" : "secondary"}
										className={cn(
											"w-full h-12 rounded-xl font-bold transition-all duration-300",
											provider.isOpen
												? "shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
												: "cursor-not-allowed opacity-70",
										)}
										disabled={!provider.isOpen}
									>
										<Link
											href={provider.isOpen ? `/providers/${provider.id}` : "#"}
											className='gap-2'
										>
											{provider.isOpen ? "Explore Menu" : "Opening Soon"}
											<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						))}
					</TooltipProvider>
				</div>
			</div>
		</section>
	);
}
