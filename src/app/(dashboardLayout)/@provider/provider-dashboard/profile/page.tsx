import { ProviderProfileForm } from "@/components/modules/provider/profile-form";
import { providerService } from "@/service/provider.service";
import { ShieldCheck, Store } from "lucide-react";

export default async function ProviderProfilePage() {
	const { data } = await providerService.getMyProfile();

	return (
		<div className='space-y-10 pb-12 max-w-3xl'>
			{/* --- HEADER --- */}
			<div className='space-y-2 border-b-2 border-muted pb-8'>
				<div className='flex items-center gap-2 text-emerald-600 mb-1'>
					<Store size={20} />
					<span className='text-[10px] font-black uppercase tracking-[0.3em]'>
						Business Identity
					</span>
				</div>
				<h1 className='text-4xl font-black tracking-tight italic uppercase'>
					Restaurant <span className='text-emerald-500'>Profile</span>
				</h1>
				<p className='text-muted-foreground font-medium italic text-sm'>
					Manage your public identity and operational status.
				</p>
			</div>

			<div className='relative'>
				{/* Visual Accent */}
				<div className='absolute -top-4 -right-4 bg-emerald-500/10 p-4 rounded-3xl text-emerald-600 hidden md:block'>
					<ShieldCheck size={32} strokeWidth={2.5} />
				</div>

				<ProviderProfileForm profile={data} />
			</div>
		</div>
	);
}
