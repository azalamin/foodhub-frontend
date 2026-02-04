"use client";

import { User } from "@/types/user.types";
import { Mail } from "lucide-react";
import { UserActions } from "./user-actions";

export function AdminUserTable({ users }: { users: User[] }) {
	return (
		<div className='bg-card border-2 border-muted rounded-[2.5rem] overflow-hidden shadow-sm'>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='bg-muted/10 border-b-2 border-muted'>
							<th className='px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Identity
							</th>
							<th className='px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Authority
							</th>
							<th className='px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Status
							</th>
							<th className='px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Registration
							</th>
							<th className='px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Command
							</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 divide-muted/50'>
						{users.map(user => (
							<tr key={user.id} className='hover:bg-muted/10 transition-all group'>
								{/* Identity */}
								<td className='px-8 py-5'>
									<div className='flex items-center gap-4'>
										<div className='h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-black text-muted-foreground border-2 border-muted group-hover:border-emerald-500/50 transition-all uppercase'>
											{user.name.charAt(0)}
										</div>
										<div>
											<p className='font-black text-xs uppercase italic tracking-tight'>
												{user.name}
											</p>
											<div className='flex items-center gap-1 text-[10px] font-bold text-muted-foreground lowercase'>
												<Mail size={10} className='text-emerald-500' /> {user.email}
											</div>
										</div>
									</div>
								</td>

								{/* Role */}
								<td className='px-8 py-5 text-center'>
									<span
										className={`text-[9px] font-black px-3 py-1 rounded-lg border-2 uppercase italic ${
											user.role === "ADMIN"
												? "bg-purple-500/10 border-purple-500/20 text-purple-600"
												: user.role === "PROVIDER"
													? "bg-blue-500/10 border-blue-500/20 text-blue-600"
													: "bg-slate-500/10 border-slate-500/20 text-slate-600"
										}`}
									>
										{user.role}
									</span>
								</td>

								{/* Status */}
								<td className='px-8 py-5 text-center'>
									<div
										className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase italic ${
											user.status === "ACTIVE"
												? "bg-emerald-500/10 text-emerald-600"
												: "bg-red-500/10 text-red-600"
										}`}
									>
										<div
											className={`h-1.5 w-1.5 rounded-full animate-pulse ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-red-500"}`}
										/>
										{user.status}
									</div>
								</td>

								{/* Date */}
								<td className='px-8 py-5 text-center'>
									<div className='flex flex-col items-center'>
										<span className='text-[10px] font-black italic uppercase'>
											{new Date(user.createdAt).toLocaleDateString("en-GB", {
												day: "2-digit",
												month: "short",
												year: "numeric",
											})}
										</span>
										<span className='text-[8px] font-bold text-muted-foreground uppercase tracking-tighter'>
											Verified Account
										</span>
									</div>
								</td>

								{/* Actions */}
								<td className='px-8 py-5 text-right'>
									<UserActions user={user} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
