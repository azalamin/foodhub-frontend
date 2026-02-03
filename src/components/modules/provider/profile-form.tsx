"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateProviderProfileAction } from "@/actions/provider.action";

interface ProviderProfile {
	restaurantName: string;
	description?: string | null;
	address: string;
	phone: string;
	isOpen: boolean;
}

export function ProviderProfileForm({ profile }: { profile: ProviderProfile }) {
	const form = useForm({
		defaultValues: {
			restaurantName: profile?.restaurantName || "",
			description: profile?.description || "",
			address: profile?.address || "",
			phone: profile?.phone || "",
			isOpen: profile?.isOpen ?? true,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Updating restaurant profile...");
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
				form.handleSubmit();
			}}
			className='space-y-6'
		>
			<FieldGroup>
				{/* RESTAURANT NAME */}
				<form.Field
					name='restaurantName'
					children={field => (
						<Field>
							<FieldLabel htmlFor={field.name}>Restaurant Name</FieldLabel>
							<Input
								id={field.name}
								value={field.state.value}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='Enter restaurant name'
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				/>

				{/* PHONE */}
				<form.Field
					name='phone'
					children={field => (
						<Field>
							<FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
							<Input
								id={field.name}
								value={field.state.value}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='e.g. 01700000000'
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				/>

				{/* ADDRESS */}
				<form.Field
					name='address'
					children={field => (
						<Field>
							<FieldLabel htmlFor={field.name}>Address</FieldLabel>
							<Input
								id={field.name}
								value={field.state.value}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='e.g. Dhaka, Bangladesh'
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				/>

				{/* DESCRIPTION */}
				<form.Field
					name='description'
					children={field => (
						<Field>
							<FieldLabel htmlFor={field.name}>Description</FieldLabel>
							<Textarea
								id={field.name}
								value={field.state.value || ""}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='Briefly describe your kitchen...'
								className='min-h-[100px]'
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				/>

				{/* IS OPEN STATUS */}
				<form.Field
					name='isOpen'
					children={field => (
						<div className='flex items-center justify-between rounded-lg border p-4 bg-muted/30'>
							<div className='space-y-0.5'>
								<FieldLabel>Store Status</FieldLabel>
								<p className='text-xs text-muted-foreground'>
									Toggling this will show your shop as {field.state.value ? "Open" : "Closed"} to
									customers.
								</p>
							</div>
							<Switch checked={field.state.value} onCheckedChange={field.handleChange} />
						</div>
					)}
				/>
			</FieldGroup>

			<Button type='submit' className='w-full' disabled={form.state.isSubmitting}>
				{form.state.isSubmitting ? "Updating..." : "Update Profile"}
			</Button>
		</form>
	);
}
