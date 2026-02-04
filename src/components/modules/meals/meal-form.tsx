"use client";

import { createMealAction } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { useForm } from "@tanstack/react-form";
import { Banknote, Image as ImageIcon, Loader2, Plus } from "lucide-react";
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
			const toastId = toast.loading("Adding dish to your kitchen...");
			try {
				await createMealAction(value);
				toast.success("Dish is now live!", { id: toastId });
				form.reset();
			} catch (err: any) {
				toast.error(err.message || "Failed to add meal", { id: toastId });
			}
		},
	});

	return (
		<form
			className='bg-card border-2 border-muted p-8 rounded-[2.5rem] shadow-sm space-y-6'
			onSubmit={e => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className='space-y-4'>
				{/* NAME */}
				<form.Field
					name='name'
					children={field => (
						<div className='space-y-2'>
							<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Meal Name
							</Label>
							<Input
								className='h-12 rounded-xl border-2 bg-muted/20 font-bold'
								value={field.state.value}
								onChange={e => field.handleChange(e.target.value)}
								placeholder='e.g. Traditional Kacchi'
							/>
						</div>
					)}
				/>

				<div className='grid grid-cols-2 gap-4'>
					{/* PRICE */}
					<form.Field
						name='price'
						children={field => (
							<div className='space-y-2'>
								<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
									Price (BDT)
								</Label>
								<div className='relative'>
									<Banknote
										className='absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600'
										size={16}
									/>
									<Input
										type='number'
										className='h-12 pl-10 rounded-xl border-2 bg-muted/20 font-bold'
										value={field.state.value}
										onChange={e => field.handleChange(Number(e.target.value))}
									/>
								</div>
							</div>
						)}
					/>

					{/* CATEGORY */}
					<form.Field
						name='categoryId'
						children={field => (
							<div className='space-y-2'>
								<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
									Category
								</Label>
								<Select value={field.state.value} onValueChange={field.handleChange}>
									<SelectTrigger className='h-12 rounded-xl border-2 bg-muted/20 font-bold'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent className='rounded-xl border-2'>
										{categories?.map(c => (
											<SelectItem key={c.id} value={c.id} className='font-bold'>
												{c.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
					/>
				</div>

				{/* DIETARY & IMAGE */}
				<div className='grid grid-cols-1 gap-4'>
					<form.Field
						name='imageUrl'
						children={field => (
							<div className='space-y-2'>
								<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
									Image URL
								</Label>
								<div className='relative'>
									<ImageIcon
										className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
										size={16}
									/>
									<Input
										className='h-12 pl-10 rounded-xl border-2 bg-muted/20 font-bold'
										value={field.state.value}
										onChange={e => field.handleChange(e.target.value)}
										placeholder='https://...'
									/>
								</div>
							</div>
						)}
					/>
				</div>
			</div>

			<form.Field
				name='isAvailable'
				children={field => (
					<div className='flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border-2 border-emerald-500/10'>
						<div className='space-y-0.5'>
							<Label htmlFor='isAvailable' className='text-xs font-black uppercase italic'>
								Live on Menu
							</Label>
							<p className='text-[10px] text-muted-foreground font-medium'>
								Allow customers to order this now.
							</p>
						</div>
						<Checkbox
							id='isAvailable'
							className='h-6 w-6 rounded-lg border-2 border-emerald-500 data-[state=checked]:bg-emerald-500'
							checked={field.state.value}
							onCheckedChange={val => field.handleChange(!!val)}
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
						className='w-full h-14 rounded-2xl font-black text-lg gap-3 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all active:scale-95'
					>
						{isSubmitting ? (
							<Loader2 className='animate-spin' />
						) : (
							<>
								<Plus size={20} /> Launch Dish
							</>
						)}
					</Button>
				)}
			/>
		</form>
	);
}
