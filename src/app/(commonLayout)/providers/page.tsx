import { ProviderCard } from "@/components/modules/provider/provider-card";
import { providerService } from "@/service/provider.service";
import { Provider } from "@/types";
import { Sparkles, Store } from "lucide-react";

export default async function ProvidersPage() {
	const { data, error } = await providerService.getPublicProviders();

	if (error) {
		return (
			<div className='container py-20 text-center font-black uppercase italic text-red-500'>
				Failed to load chefs.
			</div>
		);
	}

	const providers = data?.data || [];

	return (
		<div className='container py-12 space-y-12 mx-auto px-4'>
			{/* --- PREMIUM HEADER --- */}
			<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-muted pb-10'>
				<div className='space-y-3'>
					<div className='flex items-center gap-2 text-emerald-600'>
						<Store size={20} />
						<span className='text-[10px] font-black uppercase tracking-[0.3em]'>
							Verified Kitchens
						</span>
					</div>
					<h1 className='text-5xl font-black tracking-tight italic uppercase'>
						Discover <span className='text-emerald-500'>Chefs</span>
					</h1>
					<p className='text-muted-foreground font-medium italic max-w-md'>
						Browse trusted home chefs and restaurants delivering fresh flavors near you.
					</p>
				</div>

				<div className='bg-emerald-500/10 px-6 py-3 rounded-[2rem] border-2 border-emerald-500/20 flex items-center gap-4'>
					<Sparkles className='text-emerald-600' size={20} />
					<span className='text-sm font-black uppercase italic text-emerald-700'>
						{providers.length} Partners Online
					</span>
				</div>
			</div>

			{/* --- PROVIDERS GRID --- */}
			{providers.length === 0 ? (
				<div className='py-20 text-center space-y-4'>
					<p className='text-muted-foreground font-black uppercase italic'>
						No providers active right now.
					</p>
				</div>
			) : (
				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{providers.map((provider: Provider) => (
						<ProviderCard key={provider.id} provider={provider} />
					))}
				</div>
			)}
		</div>
	);
}
