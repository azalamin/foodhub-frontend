import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerLoading() {
	return (
		<div className='p-6 space-y-6'>
			<Skeleton className='h-8 w-48' />
			<Skeleton className='h-32 w-full rounded-xl' />
			<Skeleton className='h-32 w-full rounded-xl' />
		</div>
	);
}
