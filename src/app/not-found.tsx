import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
			{/* Emoji / Illustration */}
			<div className='mb-6 text-7xl'>🍽️</div>

			{/* Title */}
			<h1 className='text-3xl font-bold tracking-tight'>Page not found</h1>

			{/* Description */}
			<p className='mt-3 max-w-md text-muted-foreground'>
				Looks like this page took a lunch break. The food is ready, but this route doesn’t exist.
			</p>

			{/* Actions */}
			<div className='mt-8 flex flex-col gap-3 sm:flex-row'>
				<Button asChild>
					<Link href='/'>Go back home</Link>
				</Button>

				<Button asChild variant='outline'>
					<Link href='/meals'>Browse meals</Link>
				</Button>
			</div>

			{/* Footer hint */}
			<p className='mt-10 text-xs text-muted-foreground'>Error 404 · FoodHub</p>
		</div>
	);
}
