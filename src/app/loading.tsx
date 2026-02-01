import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className='flex min-h-screen items-center justify-center bg-background'>
			<div className='flex flex-col items-center gap-4'>
				{/* Spinner */}
				<Loader2 className='h-10 w-10 animate-spin text-primary' />

				{/* Brand */}
				<p className='text-sm text-muted-foreground'>Loading FoodHub…</p>
			</div>
		</div>
	);
}
