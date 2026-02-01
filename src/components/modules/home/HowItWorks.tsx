import { Search, ShoppingCart, Star, Truck } from "lucide-react";

const steps = [
	{
		step: "01",
		title: "Browse Providers & Meals",
		description:
			"Explore trusted food providers, view their menus, and choose meals that fit your taste.",
		icon: Search,
	},
	{
		step: "02",
		title: "Add to Cart",
		description: "Select your favorite meals, adjust quantities, and add them to your cart easily.",
		icon: ShoppingCart,
	},
	{
		step: "03",
		title: "Place Order",
		description: "Confirm your order with delivery address and place it using Cash on Delivery.",
		icon: Truck,
	},
	{
		step: "04",
		title: "Track & Review",
		description: "Track your order status in real-time and leave reviews after delivery.",
		icon: Star,
	},
];

export function HowItWorks() {
	return (
		<section className='py-20 bg-muted/30'>
			<div className='container mx-auto'>
				{/* Header */}
				<div className='mb-16 text-center'>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>How FoodHub Works</h2>
					<p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>
						Order delicious food in just a few simple steps.
					</p>
				</div>

				{/* Steps */}
				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
					{steps.map(step => {
						const Icon = step.icon;

						return (
							<div
								key={step.step}
								className='relative flex flex-col items-center rounded-xl bg-background p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md'
							>
								{/* Step Number */}
								<span className='absolute -top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground'>
									Step {step.step}
								</span>

								{/* Icon */}
								<div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary'>
									<Icon className='h-6 w-6' />
								</div>

								<h3 className='mb-2 text-lg font-semibold'>{step.title}</h3>

								<p className='text-sm text-muted-foreground'>{step.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
