"use client";

import { deleteMealAction } from "@/actions/meal.action";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@/types";
import { Meal } from "@/types/meal.types";
import { Edit, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { EditMealForm } from "../meals/edit-meal-form";

interface Props {
	meal: Meal;
	categories: Category[];
}

export function MealActions({ meal, categories }: Props) {
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);

	const handleDelete = () => {
		if (!confirm("Are you sure? This meal will be permanently removed.")) return;

		startTransition(async () => {
			try {
				await deleteMealAction(meal.id);
				toast.success("Meal deleted successfully");
			} catch (err: any) {
				toast.error(err.message || "Failed to delete meal");
			}
		});
	};

	return (
		<div className='flex justify-end gap-2'>
			{/* EDIT DIALOG */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button size='sm' variant='outline'>
						<Edit className='h-4 w-4' />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[600px]'>
					<DialogHeader>
						<DialogTitle>Edit Meal</DialogTitle>
						<DialogDescription>
							Make changes to your meal here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					{/* Reuse the form logic in a separate component for editing */}
					<EditMealForm meal={meal} categories={categories} onSuccess={() => setOpen(false)} />
				</DialogContent>
			</Dialog>

			{/* DELETE BUTTON */}
			<Button size='sm' variant='destructive' onClick={handleDelete} disabled={isPending}>
				<Trash2 className='h-4 w-4' />
			</Button>
		</div>
	);
}
