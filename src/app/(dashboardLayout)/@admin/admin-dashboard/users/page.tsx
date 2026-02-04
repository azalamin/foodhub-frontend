import { AdminUserTable } from "@/components/modules/admin/user-table";
import { userService } from "@/service/user.service";
import { ShieldCheck, Users } from "lucide-react";
import { Suspense } from "react";
import Loading from "../../loading"; // Path to your admin loading component

export default function AdminUsersPage() {
	return (
		<div className='space-y-10 pb-12'>
			{/* --- COMMAND HEADER (Renders Instantly) --- */}
			<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-muted pb-8'>
				<div className='space-y-2'>
					<div className='flex items-center gap-2 text-emerald-600'>
						<ShieldCheck size={20} />
						<span className='text-[10px] font-black uppercase tracking-[0.3em]'>
							System Administration
						</span>
					</div>
					<h1 className='text-4xl font-black tracking-tight italic uppercase'>
						User <span className='text-emerald-500'>Directory</span>
					</h1>
					<p className='text-muted-foreground font-medium italic text-sm'>
						Monitor accounts, manage roles, and control access levels.
					</p>
				</div>
			</div>

			{/* --- DATA FETCHING AREA (Wrapped in Suspense) --- */}
			<Suspense fallback={<Loading />}>
				<AdminUsersContainer />
			</Suspense>
		</div>
	);
}

// Dedicated Data Fetcher for Users
async function AdminUsersContainer() {
	const { data } = await userService.getAllUsers();
	const users = data || [];

	return (
		<>
			{/* Database Stats Badge (Streams in with data) */}
			<div className='absolute top-24 right-8 hidden xl:flex bg-emerald-500/10 px-6 py-3 rounded-[2rem] border-2 border-emerald-500/20 items-center gap-4'>
				<Users className='text-emerald-600' size={20} />
				<div className='flex flex-col'>
					<span className='text-[10px] font-black uppercase text-muted-foreground leading-none'>
						Database
					</span>
					<span className='text-sm font-black uppercase italic text-emerald-700 leading-tight'>
						{users.length} Total Accounts
					</span>
				</div>
			</div>

			<AdminUserTable users={users} />
		</>
	);
}
