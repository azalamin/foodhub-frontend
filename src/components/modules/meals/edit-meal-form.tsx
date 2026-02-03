"use client";

import { updateMealAction } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { Meal } from "@/types/meal.types";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export function EditMealForm({
	meal,
	categories,
	onSuccess,
}: {
	meal: Meal;
	categories: Category[];
	onSuccess: () => void;
}) {
	const form = useForm({
		defaultValues: {
			name: meal.name,
			description: meal.description || "",
			price: meal.price,
			dietaryType: meal.dietaryType,
			categoryId: meal.categoryId,
			isAvailable: meal.isAvailable,
			imageUrl: meal.imageUrl || "",
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Saving changes...");
			try {
				// Hits your PUT /api/provider/meals/:id endpoint
				await updateMealAction(meal.id, value);
				toast.success("Meal updated!", { id: toastId });
				onSuccess(); // Closes the Dialog modal
			} catch (err: any) {
				toast.error(err.message || "Update failed", { id: toastId });
			}
		},
	});

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className='space-y-6 pt-4'
		>
			<FieldGroup className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<form.Field
					name='name'
					children={field => (
						<Field>
							<FieldLabel>Meal Name</FieldLabel>
							<Input value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
						</Field>
					)}
				/>

				<form.Field
					name='price'
					children={field => (
						<Field>
							<FieldLabel>Price (BDT)</FieldLabel>
							<Input
								type='number'
								value={field.state.value}
								onChange={e => field.handleChange(Number(e.target.value))}
							/>
						</Field>
					)}
				/>

				<form.Field
					name='dietaryType'
					children={field => (
						<Field>
							<FieldLabel>Dietary Type</FieldLabel>
							<Select
								value={field.state.value}
								onValueChange={val => field.handleChange(val as any)}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='NONE'>None</SelectItem>
									<SelectItem value='VEGETARIAN'>Vegetarian</SelectItem>
									<SelectItem value='HALAL'>Halal</SelectItem>
									<SelectItem value='VEGAN'>Vegan</SelectItem>
									<SelectItem value='GLUTEN_FREE'>Gluten Free</SelectItem>
								</SelectContent>
							</Select>
						</Field>
					)}
				/>

				<form.Field
					name='categoryId'
					children={field => (
						<Field>
							<FieldLabel>Category</FieldLabel>
							<Select value={field.state.value} onValueChange={val => field.handleChange(val)}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{categories?.map(c => (
										<SelectItem key={c.id} value={c.id}>
											{c.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</Field>
					)}
				/>
			</FieldGroup>

			<form.Field
				name='imageUrl'
				children={field => (
					<Field>
						<FieldLabel>Image URL</FieldLabel>
						<Input value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
					</Field>
				)}
			/>

			<form.Field
				name='isAvailable'
				children={field => (
					<div className='flex items-center gap-2'>
						<Checkbox
							id='edit-available'
							checked={field.state.value}
							onCheckedChange={val => field.handleChange(!!val)}
						/>
						<label htmlFor='edit-available' className='text-sm font-medium'>
							Available for order
						</label>
					</div>
				)}
			/>

			<Button type='submit' className='w-full' disabled={form.state.isSubmitting}>
				{form.state.isSubmitting ? "Updating..." : "Save Changes"}
			</Button>
		</form>
	);
}
