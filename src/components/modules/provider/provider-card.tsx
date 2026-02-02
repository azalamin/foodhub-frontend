import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Provider } from "@/types";

export function ProviderCard({ provider }: { provider: Provider }) {
	return (
		<div className='group rounded-xl border bg-card p-4 transition hover:shadow-lg'>
			{/* IMAGE */}
			<div className='mb-4 h-40 w-full overflow-hidden rounded-lg bg-muted'>
				{provider.image ? (
					<img
						src={provider.image}
						alt={provider.name}
						className='h-full w-full object-cover transition group-hover:scale-105'
					/>
				) : (
					<div className='flex h-full items-center justify-center text-3xl'>🍽️</div>
				)}
			</div>

			{/* INFO */}
			<div className='space-y-2'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold'>{provider.name}</h3>
					<Badge variant={provider.isOpen ? "default" : "secondary"}>
						{provider.isOpen ? "Open" : "Closed"}
					</Badge>
				</div>

				{provider.description && (
					<p className='line-clamp-2 text-sm text-muted-foreground'>{provider.description}</p>
				)}

				<p className='text-sm text-muted-foreground'>{provider.mealsCount} meals available</p>

				<Button asChild className='mt-2 w-full' disabled={!provider.isOpen}>
					<Link href={`/providers/${provider.id}`}>View Menu</Link>
				</Button>
			</div>
		</div>
	);
}
