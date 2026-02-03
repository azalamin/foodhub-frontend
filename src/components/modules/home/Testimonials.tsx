"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Quote, Star } from "lucide-react";

const testimonials = [
	{
		name: "Anika Rahman",
		role: "Food Blogger",
		content:
			"FoodHub has completely changed how I discover local kitchens. The delivery is always on time, and the quality of the biryani I ordered was top-notch!",
		image: "https://i.pravatar.cc/150?u=anika",
		rating: 5,
	},
	{
		name: "Tanvir Ahmed",
		role: "Software Engineer",
		content:
			"I love the 'Verified Provider' system. It gives me peace of mind knowing the hygiene standards are checked. Best food app in Dhaka!",
		image: "https://i.pravatar.cc/150?u=tanvir",
		rating: 5,
	},
	{
		name: "Sarah Kabir",
		role: "Fitness Enthusiast",
		content:
			"The Healthy & Fitness category is a lifesaver. Finding macro-friendly meals that actually taste good is so easy here. Highly recommended!",
		image: "https://i.pravatar.cc/150?u=sarah",
		rating: 4,
	},
];

export function Testimonials() {
	return (
		<section className='relative py-24 bg-background overflow-hidden'>
			{/* Background Decorative Elements */}
			<div className='absolute top-1/2 left-0 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]' />
			<div className='absolute top-1/2 right-0 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]' />

			<div className='container mx-auto px-4'>
				{/* Header */}
				<div className='mb-16 text-center space-y-4'>
					<Badge
						variant='outline'
						className='px-4 py-1 rounded-full border-primary/30 text-primary bg-primary/5 uppercase tracking-widest text-[10px] font-bold'
					>
						Wall of Love
					</Badge>
					<h2 className='text-4xl font-black tracking-tight sm:text-5xl'>
						What Our <span className='text-primary'>Foodies</span> Say
					</h2>
					<p className='mx-auto max-w-xl text-lg text-muted-foreground'>
						Join thousands of happy customers who enjoy fresh, delicious meals every single day.
					</p>
				</div>

				{/* Grid */}
				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
					{testimonials.map((review, index) => (
						<Card
							key={index}
							className='relative border-none bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 group'
						>
							<CardContent className='p-8 space-y-6'>
								{/* Rating & Quote Icon */}
								<div className='flex items-center justify-between'>
									<div className='flex gap-0.5'>
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={16}
												className={
													i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
												}
											/>
										))}
									</div>
									<Quote className='h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors' />
								</div>

								{/* Content */}
								<p className='text-muted-foreground italic leading-relaxed'>"{review.content}"</p>

								{/* User Info */}
								<div className='flex items-center justify-between pt-4 border-t border-muted/50'>
									<div className='flex items-center gap-3'>
										<Avatar className='h-12 w-12 border-2 border-primary/10'>
											<AvatarImage src={review.image} alt={review.name} />
											<AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div className='text-left'>
											<h4 className='text-sm font-bold'>{review.name}</h4>
											<p className='text-xs text-muted-foreground'>{review.role}</p>
										</div>
									</div>

									<div className='flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-500/10 px-2 py-1 rounded-full'>
										<CheckCircle2 size={12} />
										Verified
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
