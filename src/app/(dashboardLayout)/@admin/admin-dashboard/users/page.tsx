import { AdminUserTable } from "@/components/modules/admin/user-table";
import { userService } from "@/service/user.service";

export default async function AdminUsersPage() {
	const { data } = await userService.getAllUsers();

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Users</h1>
				<p className='text-muted-foreground'>Manage customers and providers</p>
			</div>

			<AdminUserTable users={data} />
		</div>
	);
}
