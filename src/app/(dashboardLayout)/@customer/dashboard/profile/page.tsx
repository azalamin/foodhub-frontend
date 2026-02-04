"use client";

import { useForm } from "@tanstack/react-form";
import {
	Camera,
	CheckCircle2,
	Globe,
	Loader2,
	Lock,
	LogOut,
	Mail,
	Phone,
	Save,
	Shield,
	User,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
	const { data: session, isPending: sessionLoading } = authClient.useSession();

	const form = useForm({
		defaultValues: {
			name: session?.user?.name || "",
			phone: (session?.user as any)?.phone || "",
		},
		onSubmit: async ({ value }) => {
			try {
				const res = await fetch("/api/users/me", {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(value),
				});

				const result = await res.json();
				if (!result.success) throw new Error(result.message);

				toast.success("Profile updated!", {
					description: "Your changes are now live across FoodHub.",
				});
			} catch (err: any) {
				toast.error(err.message || "Failed to update profile");
			}
		},
	});

	if (sessionLoading)
		return (
			<div className='flex h-96 items-center justify-center font-black text-primary animate-pulse uppercase italic'>
				Gathering your data...
			</div>
		);

	return (
		<div className='max-w-5xl mx-auto py-12 px-4 space-y-12'>
			<div className='flex flex-col md:flex-row items-center gap-8 bg-card border-2 border-muted p-8 rounded-[3rem] shadow-2xl relative overflow-hidden'>
				<div className='absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20' />

				<div className='relative group'>
					<Avatar className='h-32 w-32 border-4 border-background shadow-2xl transition-transform group-hover:scale-105 duration-500'>
						<AvatarImage src={session?.user?.image || ""} />
						<AvatarFallback className='bg-primary text-primary-foreground text-4xl font-black'>
							{session?.user?.name?.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<button className='absolute bottom-0 right-0 p-2.5 bg-primary text-white rounded-2xl border-4 border-background shadow-lg hover:scale-110 transition-transform'>
						<Camera size={20} />
					</button>
				</div>

				<div className='flex-1 text-center md:text-left space-y-3'>
					<div className='flex flex-wrap justify-center md:justify-start items-center gap-3'>
						<h1 className='text-4xl font-black tracking-tighter lg:text-5xl'>
							{session?.user?.name}
						</h1>
						<Badge className='bg-green-500/10 text-green-600 border-none font-black px-3 py-1 uppercase tracking-widest text-[10px]'>
							<CheckCircle2 size={12} className='mr-1.5' />
							Verified {(session?.user as any)?.role || "Customer"}
						</Badge>
					</div>
					<div className='flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm font-bold text-muted-foreground'>
						<span className='flex items-center gap-1.5'>
							<Mail size={16} className='text-primary' /> {session?.user?.email}
						</span>
						<span className='flex items-center gap-1.5'>
							<Globe size={16} className='text-primary' /> Dhaka, BD
						</span>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
				{/* --- SIDEBAR --- */}
				<div className='lg:col-span-4 space-y-6'>
					<Card className='rounded-[2.5rem] border-2 border-muted overflow-hidden'>
						<div className='bg-muted/30 p-6 border-b border-muted'>
							<h3 className='font-black uppercase tracking-[0.2em] text-[10px] text-muted-foreground'>
								Quick Stats
							</h3>
						</div>
						<CardContent className='p-6 space-y-5'>
							<div className='flex justify-between items-center'>
								<span className='text-xs font-bold text-muted-foreground uppercase flex items-center gap-2'>
									<Shield size={14} className='text-blue-500' /> Trust
								</span>
								<Badge variant='secondary' className='font-black text-[10px]'>
									VERIFIED
								</Badge>
							</div>
							<div className='flex justify-between items-center'>
								<span className='text-xs font-bold text-muted-foreground uppercase flex items-center gap-2'>
									<User size={14} className='text-primary' /> Role
								</span>
								<span className='text-sm font-black italic'>
									{(session?.user as any)?.role || "Customer"}
								</span>
							</div>
						</CardContent>
					</Card>

					<Button
						variant='outline'
						className='w-full rounded-[1.5rem] h-14 border-2 font-black text-red-500 hover:bg-red-50 hover:text-red-600 gap-2'
					>
						<LogOut size={18} /> Sign Out
					</Button>
				</div>

				{/* --- MAIN CONTENT --- */}
				<div className='lg:col-span-8 space-y-8'>
					{/* PERSONAL INFO FORM */}
					<form
						onSubmit={e => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className='bg-card border-2 border-muted p-8 rounded-[3rem] shadow-sm space-y-8'
					>
						<div className='flex items-center gap-3 border-b border-muted pb-6'>
							<div className='p-2.5 bg-primary/10 rounded-2xl text-primary'>
								<User size={22} />
							</div>
							<h2 className='text-2xl font-black italic tracking-tight uppercase'>Personal Info</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* NAME FIELD */}
							<form.Field
								name='name'
								children={field => (
									<div className='space-y-3'>
										<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
											Full Display Name
										</Label>
										<Input
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={e => field.handleChange(e.target.value)}
											className='h-14 rounded-2xl bg-muted/20 border-2 border-transparent focus:border-primary focus:bg-background transition-all font-bold'
										/>
									</div>
								)}
							/>

							{/* PHONE FIELD */}
							<form.Field
								name='phone'
								children={field => (
									<div className='space-y-3'>
										<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
											Phone Number
										</Label>
										<div className='relative'>
											<Phone
												className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
												size={18}
											/>
											<Input
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={e => field.handleChange(e.target.value)}
												placeholder='01XXXXXXXXX'
												className='h-14 rounded-2xl bg-muted/20 border-2 border-transparent focus:border-primary focus:bg-background transition-all font-bold pl-12'
											/>
										</div>
									</div>
								)}
							/>
						</div>

						<form.Subscribe
							selector={state => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									type='submit'
									disabled={!canSubmit || isSubmitting}
									className='w-full md:w-auto rounded-2xl h-14 px-10 font-black text-lg gap-3 shadow-xl shadow-primary/20 transition-all active:scale-95'
								>
									{isSubmitting ? (
										<Loader2 className='animate-spin' size={20} />
									) : (
										<>
											<Save size={20} /> Save Changes
										</>
									)}
								</Button>
							)}
						/>
					</form>

					{/* SECURITY SECTION */}
					<div className='bg-card border-2 border-muted p-8 rounded-[3rem] shadow-sm space-y-8'>
						<div className='flex items-center gap-3 border-b border-muted pb-6'>
							<div className='p-2.5 bg-orange-500/10 rounded-2xl text-orange-500'>
								<Lock size={22} />
							</div>
							<h2 className='text-2xl font-black italic tracking-tight uppercase'>Security</h2>
						</div>
						<p className='text-sm text-muted-foreground font-medium'>
							Password updates are managed through your primary login provider.
						</p>
						<Button variant='outline' className='rounded-2xl h-12 px-8 font-black border-2'>
							Request Password Reset
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
