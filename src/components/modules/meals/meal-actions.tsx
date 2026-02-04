"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit, Trash2, Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react";
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditMealForm } from "./edit-meal-form";

interface MealActionsProps {
	meal: Meal;
	categories: Category[];
}

export function MealActions({ meal, categories }: MealActionsProps) {
	const [isPending, startTransition] = useTransition();
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleToggleVisibility = () => {
		const nextState = !meal.isAvailable;
		startTransition(async () => {
			try {
				await updateMealAction(meal.id, { isAvailable: nextState });
				toast.success(nextState ? "Dish is now Live" : "Dish is Hidden", {
					icon: nextState ? (
						<Eye className='text-emerald-500' />
					) : (
						<EyeOff className='text-orange-500' />
					),
				});
			} catch (err: any) {
				toast.error(err.message || "Failed to update dish");
			}
		});
	};

	const handleDelete = () => {
		startTransition(async () => {
			try {
				await deleteMealAction(meal.id);
				toast.success("Dish removed from kitchen");
			} catch (err: any) {
				toast.error(err.message || "Failed to delete dish");
			}
		});
	};

	return (
		<div className='flex justify-end gap-2 px-2'>
			{/* TOGGLE VISIBILITY */}
			<Button
				size='icon'
				variant='ghost'
				className={`h-9 w-9 rounded-xl border-2 transition-all ${
					meal.isAvailable
						? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20"
						: "bg-orange-500/10 border-orange-500/20 text-orange-600 hover:bg-orange-500/20"
				}`}
				onClick={handleToggleVisibility}
				disabled={isPending}
			>
				{isPending ? (
					<Loader2 className='h-4 w-4 animate-spin' />
				) : meal.isAvailable ? (
					<Eye size={16} strokeWidth={2.5} />
				) : (
					<EyeOff size={16} strokeWidth={2.5} />
				)}
			</Button>

			{/* EDIT DIALOG */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogTrigger asChild>
					<Button
						size='icon'
						variant='ghost'
						className='h-9 w-9 rounded-xl border-2 border-muted hover:border-emerald-500 hover:text-emerald-600 transition-all'
					>
						<Edit size={16} strokeWidth={2.5} />
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[550px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden'>
					<div className='bg-emerald-600 p-6 text-white'>
						<DialogHeader>
							<DialogTitle className='text-2xl font-black italic uppercase tracking-tight'>
								Edit <span className='opacity-70'>Dish:</span> {meal.name}
							</DialogTitle>
						</DialogHeader>
					</div>
					<div className='p-8'>
						<EditMealForm
							meal={meal}
							categories={categories}
							onSuccess={() => setIsEditDialogOpen(false)}
						/>
					</div>
				</DialogContent>
			</Dialog>

			{/* DELETE ALERT (Replaces browser confirm) */}
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						size='icon'
						variant='ghost'
						className='h-9 w-9 rounded-xl border-2 border-muted hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all'
					>
						<Trash2 size={16} strokeWidth={2.5} />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className='rounded-[2.5rem] border-none p-8'>
					<AlertDialogHeader className='flex flex-col items-center text-center space-y-4'>
						<div className='bg-red-100 p-4 rounded-3xl text-red-600'>
							<AlertTriangle size={40} strokeWidth={2.5} />
						</div>
						<AlertDialogTitle className='text-2xl font-black italic uppercase tracking-tight'>
							Permanent <span className='text-red-600'>Delete?</span>
						</AlertDialogTitle>
						<AlertDialogDescription className='font-medium'>
							This will remove <span className='font-bold text-foreground'>"{meal.name}"</span> from
							your menu forever. This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className='mt-6 sm:justify-center gap-3'>
						<AlertDialogCancel className='h-12 rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest'>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className='h-12 rounded-2xl bg-red-600 hover:bg-red-700 font-black uppercase text-[10px] tracking-widest text-white shadow-lg shadow-red-500/20'
						>
							Yes, Remove it
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
