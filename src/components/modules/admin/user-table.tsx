"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user.types";
import { UserActions } from "./user-actions";

interface Props {
	users: User[];
}

export function AdminUserTable({ users }: Props) {
	return (
		<div className='overflow-x-auto rounded-lg border'>
			<table className='w-full text-sm'>
				<thead className='bg-muted'>
					<tr>
						<th className='px-4 py-3 text-left'>Name</th>
						<th className='px-4 py-3 text-left'>Email</th>
						<th className='px-4 py-3'>Role</th>
						<th className='px-4 py-3'>Status</th>
						<th className='px-4 py-3'>Joined</th>
						<th className='px-4 py-3 text-right'>Actions</th>
					</tr>
				</thead>

				<tbody>
					{users.map(user => (
						<tr key={user.id} className='border-t'>
							<td className='px-4 py-3 font-medium'>{user.name}</td>
							<td className='px-4 py-3'>{user.email}</td>

							<td className='px-4 py-3 text-center'>
								<Badge variant='outline'>{user.role}</Badge>
							</td>

							<td className='px-4 py-3 text-center'>
								<Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
									{user.status}
								</Badge>
							</td>

							<td className='px-4 py-3 text-center'>
								{new Date(user.createdAt).toLocaleDateString()}
							</td>

							<td className='px-4 py-3 text-right'>
								<UserActions user={user} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
