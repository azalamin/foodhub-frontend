"use client";

import { createCategoryAction } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Tag } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function CategoryForm() {
	const [name, setName] = useState("");
	const [pending, startTransition] = useTransition();

	const handleCreate = () => {
		if (!name.trim()) {
			toast.error("Please enter a category name");
			return;
		}

		startTransition(async () => {
			try {
				await createCategoryAction(name);
				toast.success("New category deployed!");
				setName("");
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	return (
		<div className='bg-card border-2 border-muted p-8 rounded-[2.5rem] shadow-sm space-y-6'>
			<div className='space-y-2'>
				<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
					Category Name
				</Label>
				<div className='relative'>
					<Tag
						className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
						size={16}
					/>
					<Input
						placeholder='e.g. Traditional, Fast Food'
						className='h-14 pl-12 rounded-2xl border-2 bg-muted/20 font-bold focus:border-emerald-500 transition-all'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
			</div>

			<Button
				onClick={handleCreate}
				disabled={pending}
				className='w-full h-14 rounded-2xl font-black text-lg gap-3 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-white'
			>
				{pending ? (
					<Loader2 className='animate-spin' />
				) : (
					<>
						<Plus size={20} /> Deploy Category
					</>
				)}
			</Button>
		</div>
	);
}
