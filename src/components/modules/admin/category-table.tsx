"use client";

import { deleteCategoryAction, updateCategoryAction } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types";
import { Link as LinkIcon, Loader2, Save, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function CategoryTable({ categories }: { categories: Category[] }) {
	// Sync with server data when it changes
	const [data, setData] = useState<Category[]>(categories);
	useEffect(() => {
		setData(categories);
	}, [categories]);

	return (
		<div className='bg-card border-2 border-muted rounded-[2.5rem] overflow-hidden shadow-sm'>
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='bg-muted/10 border-b-2 border-muted'>
							<th className='px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Label Name
							</th>
							<th className='px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								URL Slug
							</th>
							<th className='px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Command
							</th>
						</tr>
					</thead>
					<tbody className='divide-y-2 divide-muted/50'>
						{data.length === 0 ? (
							<tr>
								<td
									colSpan={3}
									className='px-8 py-20 text-center font-black uppercase italic text-muted-foreground'
								>
									No categories in database
								</td>
							</tr>
						) : (
							data.map(cat => (
								<CategoryRow
									key={cat.id}
									category={cat}
									onDelete={() => setData(prev => prev.filter(c => c.id !== cat.id))}
								/>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

function CategoryRow({ category, onDelete }: { category: Category; onDelete: () => void }) {
	const [name, setName] = useState(category.name);
	const [pending, startTransition] = useTransition();
	const hasChanged = name !== category.name;

	const handleUpdate = () =>
		startTransition(async () => {
			try {
				await updateCategoryAction(category.id, name);
				toast.success("Identity updated");
			} catch (err: any) {
				toast.error(err.message);
			}
		});

	const handleDelete = () => {
		if (!confirm("Are you sure? This may affect items in this category.")) return;
		startTransition(async () => {
			onDelete(); // Optimistic UI
			try {
				await deleteCategoryAction(category.id);
				toast.success("Category wiped");
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	return (
		<tr className='hover:bg-muted/10 transition-all group'>
			<td className='px-8 py-5'>
				<Input
					className={`h-10 rounded-xl border-2 font-bold transition-all ${hasChanged ? "border-emerald-500 bg-emerald-500/5" : "border-transparent bg-transparent hover:border-muted hover:bg-muted/20"}`}
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</td>

			<td className='px-8 py-5'>
				<div className='flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase italic tracking-tighter'>
					<LinkIcon size={12} className='text-emerald-500' />
					{category.slug}
				</div>
			</td>

			<td className='px-8 py-5 text-right'>
				<div className='flex justify-end gap-2'>
					{hasChanged && (
						<Button
							size='icon'
							className='h-9 w-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 active:scale-95 transition-all'
							onClick={handleUpdate}
							disabled={pending}
						>
							{pending ? <Loader2 className='h-4 w-4 animate-spin' /> : <Save size={16} />}
						</Button>
					)}
					<Button
						size='icon'
						variant='ghost'
						className='h-9 w-9 rounded-xl border-2 border-muted hover:bg-red-50 hover:text-red-600 hover:border-red-500/50 transition-all active:scale-95'
						onClick={handleDelete}
						disabled={pending}
					>
						<Trash2 size={16} />
					</Button>
				</div>
			</td>
		</tr>
	);
}
