import { ArrowRight, Store } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Provider = {
	id: string;
	restaurantName: string;
	description?: string;
	isOpen: boolean;
};

const mockProviders: Provider[] = [
	{
		id: "1",
		restaurantName: "Dhaka Biryani House",
		description: "Authentic Bangladeshi biryani & traditional meals",
		isOpen: true,
	},
	{
		id: "2",
		restaurantName: "Golden Dragon",
		description: "Chinese & Thai cuisine with bold flavors",
		isOpen: true,
	},
	{
		id: "3",
		restaurantName: "Sweet Treats",
		description: "Desserts, cakes & sweet delights",
		isOpen: false,
	},
];

export function FeaturedProviders() {
	return (
		<section className='py-20'>
			<div className='container mx-auto'>
				{/* Header */}
				<div className='mb-12 flex flex-col gap-3 text-center'>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>Featured Providers</h2>
					<p className='mx-auto max-w-2xl text-muted-foreground'>
						Discover trusted restaurants and food providers serving delicious meals every day.
					</p>
				</div>

				{/* Grid */}
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{mockProviders.map(provider => (
						<Card
							key={provider.id}
							className='flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-lg'
						>
							<CardContent className='flex flex-col gap-4 p-6'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-2'>
										<div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
											<Store className='h-5 w-5' />
										</div>
										<h3 className='font-semibold'>{provider.restaurantName}</h3>
									</div>

									<Badge variant={provider.isOpen ? "default" : "secondary"}>
										{provider.isOpen ? "Open" : "Closed"}
									</Badge>
								</div>

								<p className='text-sm text-muted-foreground'>{provider.description}</p>
							</CardContent>

							<CardFooter className='mt-auto p-6 pt-0'>
								<Button
									asChild
									variant='outline'
									className='w-full gap-2'
									disabled={!provider.isOpen}
								>
									<Link href={`/providers/${provider.id}`}>
										View Menu
										<ArrowRight className='h-4 w-4' />
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>

				{/* CTA */}
				<div className='mt-12 flex justify-center'>
					<Button asChild className='gap-2'>
						<Link href='/providers'>
							View All Providers
							<ArrowRight className='h-4 w-4' />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
