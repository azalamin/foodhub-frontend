"use client";

import { updateProviderProfileAction } from "@/actions/provider.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { AlignLeft, CheckCircle2, Loader2, MapPin, Phone, Power, Store } from "lucide-react";
import { toast } from "sonner";

export function ProviderProfileForm({ profile }: { profile: any }) {
	const form = useForm({
		defaultValues: {
			restaurantName: profile?.restaurantName || "",
			description: profile?.description || "",
			address: profile?.address || "",
			phone: profile?.phone || "",
			isOpen: profile?.isOpen ?? true,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Saving changes...");
			try {
				await updateProviderProfileAction(value);
				toast.success("Profile updated successfully!", { id: toastId });
			} catch (err: any) {
				toast.error(err.message || "Failed to update profile", { id: toastId });
			}
		},
	});

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className='bg-card border-2 border-muted p-8 md:p-10 rounded-[2.5rem] shadow-sm space-y-8'
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* RESTAURANT NAME */}
				<form.Field
					name='restaurantName'
					children={field => (
						<div className='space-y-2'>
							<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Restaurant Name
							</Label>
							<div className='relative'>
								<Store
									className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
									size={16}
								/>
								<Input
									className='h-12 pl-12 rounded-xl border-2 bg-muted/20 font-bold focus:border-emerald-500 transition-all'
									value={field.state.value}
									onChange={e => field.handleChange(e.target.value)}
									placeholder='The Royal Kitchen'
								/>
							</div>
						</div>
					)}
				/>

				{/* PHONE */}
				<form.Field
					name='phone'
					children={field => (
						<div className='space-y-2'>
							<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Contact Phone
							</Label>
							<div className='relative'>
								<Phone
									className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
									size={16}
								/>
								<Input
									className='h-12 pl-12 rounded-xl border-2 bg-muted/20 font-bold focus:border-emerald-500 transition-all'
									value={field.state.value}
									onChange={e => field.handleChange(e.target.value)}
									placeholder='017XXXXXXXX'
								/>
							</div>
						</div>
					)}
				/>
			</div>

			{/* ADDRESS */}
			<form.Field
				name='address'
				children={field => (
					<div className='space-y-2'>
						<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
							Business Address
						</Label>
						<div className='relative'>
							<MapPin
								className='absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600'
								size={16}
							/>
							<Input
								className='h-12 pl-12 rounded-xl border-2 bg-muted/20 font-bold focus:border-emerald-500 transition-all'
								value={field.state.value}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='Dhaka, Bangladesh'
							/>
						</div>
					</div>
				)}
			/>

			{/* DESCRIPTION */}
			<form.Field
				name='description'
				children={field => (
					<div className='space-y-2'>
						<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
							Kitchen Story (Bio)
						</Label>
						<div className='relative'>
							<AlignLeft className='absolute left-4 top-4 text-muted-foreground' size={16} />
							<Textarea
								className='min-h-[120px] pl-12 py-4 rounded-xl border-2 bg-muted/20 font-bold focus:border-emerald-500 transition-all'
								value={field.state.value || ""}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='Tell your customers about your specialty dishes...'
							/>
						</div>
					</div>
				)}
			/>

			{/* STORE STATUS TOGGLE */}
			<form.Field
				name='isOpen'
				children={field => (
					<div
						className={`flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all ${
							field.state.value
								? "bg-emerald-500/5 border-emerald-500/20"
								: "bg-red-500/5 border-red-500/20"
						}`}
					>
						<div className='flex items-center gap-4'>
							<div
								className={`p-3 rounded-2xl ${field.state.value ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
							>
								<Power size={20} strokeWidth={3} />
							</div>
							<div className='space-y-0.5'>
								<Label className='text-sm font-black uppercase italic'>
									Kitchen is {field.state.value ? "Open" : "Closed"}
								</Label>
								<p className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>
									{field.state.value
										? "Customers can place orders now"
										: "Hidden from search & orders"}
								</p>
							</div>
						</div>
						<Switch
							checked={field.state.value}
							onCheckedChange={field.handleChange}
							className='data-[state=checked]:bg-emerald-500'
						/>
					</div>
				)}
			/>

			<form.Subscribe
				selector={s => [s.isSubmitting]}
				children={([isSubmitting]) => (
					<Button
						type='submit'
						disabled={isSubmitting}
						className='w-full h-14 rounded-2xl font-black text-lg gap-3 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all active:scale-95 text-white'
					>
						{isSubmitting ? (
							<Loader2 className='animate-spin' size={20} />
						) : (
							<>
								<CheckCircle2 size={20} /> Update Restaurant
							</>
						)}
					</Button>
				)}
			/>
		</form>
	);
}
