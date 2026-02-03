"use client";

import { createMealAction } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export function MealForm({ categories }: { categories: Category[] }) {
	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			imageUrl: "",
			dietaryType: "NONE",
			categoryId: "",
			isAvailable: true,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Adding meal to menu...");
			try {
				await createMealAction(value);
				toast.success("Meal added successfully!", { id: toastId });
				form.reset();
			} catch (err: any) {
				toast.error(err.message || "Failed to add meal", { id: toastId });
			}
		},
	});

	return (
		<form
			className='rounded-lg border p-6 bg-card space-y-6'
			onSubmit={e => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{/* NAME */}
				<form.Field
					name='name'
					children={field => (
						<Field>
							<FieldLabel>Meal Name</FieldLabel>
							<Input
								value={field.state.value}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='e.g. Cheese Burger'
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				/>

				{/* PRICE */}
				<form.Field
					name='price'
					children={field => (
						<Field>
							<FieldLabel>Price (BDT)</FieldLabel>
							<Input
								type='number'
								value={field.state.value}
								onChange={e => field.handleChange(Number(e.target.value))}
								placeholder='0.00'
							/>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				/>

				{/* DIETARY TYPE */}
				<form.Field
					name='dietaryType'
					children={field => (
						<Field>
							<FieldLabel>Dietary Type</FieldLabel>
							<Select value={field.state.value} onValueChange={field.handleChange}>
								<SelectTrigger>
									<SelectValue placeholder='Select type' />
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

				{/* CATEGORY */}
				<form.Field
					name='categoryId'
					children={field => (
						<Field>
							<FieldLabel>Category</FieldLabel>
							<Select value={field.state.value} onValueChange={field.handleChange}>
								<SelectTrigger>
									<SelectValue placeholder='Select a category' />
								</SelectTrigger>
								<SelectContent>
									{categories?.map(category => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FieldError errors={field.state.meta.errors} />
						</Field>
					)}
				/>
			</FieldGroup>

			{/* DESCRIPTION */}
			<form.Field
				name='description'
				children={field => (
					<Field>
						<FieldLabel>Description</FieldLabel>
						<Input
							value={field.state.value}
							onChange={e => field.handleChange(e.target.value)}
							placeholder='Describe the meal...'
						/>
					</Field>
				)}
			/>

			{/* IMAGE URL */}
			<form.Field
				name='imageUrl'
				children={field => (
					<Field>
						<FieldLabel>Meal Image URL</FieldLabel>
						<Input
							value={field.state.value}
							onChange={e => field.handleChange(e.target.value)}
							placeholder='https://example.com/image.jpg'
						/>
					</Field>
				)}
			/>

			{/* AVAILABILITY */}
			<form.Field
				name='isAvailable'
				children={field => (
					<div className='flex items-center gap-2'>
						<Checkbox
							id='isAvailable'
							checked={field.state.value}
							onCheckedChange={(val: any) => field.handleChange(!!val)}
						/>
						<label htmlFor='isAvailable' className='text-sm font-medium'>
							Available for order
						</label>
					</div>
				)}
			/>

			<Button type='submit' className='w-full md:w-auto' disabled={form.state.isSubmitting}>
				{form.state.isSubmitting ? "Processing..." : "Add Meal to Menu"}
			</Button>
		</form>
	);
}
