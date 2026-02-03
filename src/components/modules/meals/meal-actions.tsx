"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteMealAction, updateMealAction } from "@/actions/meal.action";
import { Meal } from "@/types/meal.types";
import { Category } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { EditMealForm } from "./edit-meal-form";

interface MealActionsProps {
	meal: Meal;
	categories: Category[];
}

export function MealActions({ meal, categories }: MealActionsProps) {
	const [isPending, startTransition] = useTransition();
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleToggleVisibility = () => {
		startTransition(async () => {
			try {
				await updateMealAction(meal.id, {
					isAvailable: !meal.isAvailable,
				});
				toast.success(`Meal is now ${!meal.isAvailable ? "visible" : "hidden"}`);
			} catch (err: any) {
				toast.error(err.message || "Failed to update meal");
			}
		});
	};

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
			<Button
				size='sm'
				variant='outline'
				onClick={handleToggleVisibility}
				disabled={isPending}
				title={meal.isAvailable ? "Hide from Menu" : "Show on Menu"}
			>
				{meal.isAvailable ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
			</Button>

			{/* 2. EDIT DIALOG IMPLEMENTATION */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogTrigger asChild>
					<Button size='sm' variant='outline' disabled={isPending}>
						<Edit className='h-4 w-4' />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[600px]'>
					<DialogHeader>
						<DialogTitle>Edit Meal: {meal.name}</DialogTitle>
					</DialogHeader>
					{/* The Edit Form component */}
					<EditMealForm
						meal={meal}
						categories={categories}
						onSuccess={() => setIsEditDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>

			<Button size='sm' variant='destructive' onClick={handleDelete} disabled={isPending}>
				<Trash2 className='h-4 w-4' />
			</Button>
		</div>
	);
}
