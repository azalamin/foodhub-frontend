import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className='container mx-auto py-10 grid grid-cols-4 gap-6'>
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className='space-y-3'>
					<Skeleton className='h-44 w-full rounded-xl' />
					<Skeleton className='h-4 w-3/4' />
					<Skeleton className='h-4 w-1/2' />
				</div>
			))}
		</div>
	);
}
