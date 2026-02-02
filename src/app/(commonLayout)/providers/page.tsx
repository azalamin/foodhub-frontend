import { ProviderCard } from "@/components/modules/provider/provider-card";
import { providerService } from "@/service/provider.service";
import { Provider } from "@/types";

export default async function ProvidersPage() {
	const { data, error } = await providerService.getPublicProviders();

	if (error) {
		return (
			<div className='container py-20 text-center text-muted-foreground'>
				Failed to load providers
			</div>
		);
	}

	return (
		<div className='container py-10 space-y-8 mx-auto'>
			{/* HEADER */}
			<div className='max-w-2xl'>
				<h1 className='text-3xl font-bold tracking-tight'>Discover Food Providers</h1>
				<p className='mt-2 text-muted-foreground'>
					Browse trusted home chefs and restaurants near you
				</p>
			</div>

			{/* PROVIDERS GRID */}
			{data.data.length === 0 ? (
				<p className='text-muted-foreground'>No providers available right now.</p>
			) : (
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{data.data.map((provider: Provider) => (
						<ProviderCard key={provider.id} provider={provider} />
					))}
				</div>
			)}
		</div>
	);
}
