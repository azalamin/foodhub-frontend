import { ProviderProfileForm } from "@/components/modules/provider/profile-form";
import { providerService } from "@/service/provider.service";

export default async function ProviderProfilePage() {
	const { data } = await providerService.getMyProfile();

	return (
		<div className='space-y-6 max-w-2xl'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Restaurant Profile</h1>
				<p className='text-muted-foreground'>Update your restaurant details and status</p>
			</div>
			<div className='rounded-lg border p-6 bg-card'>
				<ProviderProfileForm profile={data} />
			</div>
		</div>
	);
}
