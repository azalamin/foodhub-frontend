"use client";

import { deleteCategoryAction, updateCategoryAction } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function CategoryTable({ categories }: { categories: Category[] }) {
	const [data, setData] = useState<Category[]>(categories);

	return (
		<div className='rounded-lg border overflow-hidden'>
			<table className='w-full text-sm'>
				<thead className='bg-muted'>
					<tr>
						<th className='px-4 py-3 text-left'>Name</th>
						<th className='px-4 py-3 text-left'>Slug</th>
						<th className='px-4 py-3 text-right'>Actions</th>
					</tr>
				</thead>

				<tbody>
					{data.length === 0 ? (
						<tr>
							<td colSpan={3} className='px-4 py-6 text-center text-muted-foreground'>
								No categories found
							</td>
						</tr>
					) : (
						data.map(cat => (
							<CategoryRow
								key={cat.id}
								category={cat}
								onDelete={() => setData(prev => prev.filter(c => c.id !== cat.id))}
								onUpdate={updated =>
									setData(prev => prev.map(c => (c.id === updated.id ? updated : c)))
								}
							/>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

function CategoryRow({
	category,
	onDelete,
	onUpdate,
}: {
	category: Category;
	onDelete: () => void;
	onUpdate: (cat: Category) => void;
}) {
	const [name, setName] = useState(category.name);
	const [pending, startTransition] = useTransition();

	const handleUpdate = () =>
		startTransition(async () => {
			try {
				const res = await updateCategoryAction(category.id, name);
				onUpdate(res.data);
				toast.success("Category updated");
			} catch (err: any) {
				toast.error(err.message);
			}
		});

	const handleDelete = () =>
		startTransition(async () => {
			// 🔥 optimistic UI
			onDelete();

			try {
				await deleteCategoryAction(category.id);
				toast.success("Category deleted");
			} catch (err: any) {
				toast.error(err.message);
			}
		});

	return (
		<tr className='border-t'>
			<td className='px-4 py-3'>
				<Input value={name} onChange={e => setName(e.target.value)} />
			</td>

			<td className='px-4 py-3 text-muted-foreground'>{category.slug}</td>

			<td className='px-4 py-3 text-right space-x-2'>
				<Button size='sm' variant='outline' onClick={handleUpdate} disabled={pending}>
					Save
				</Button>
				<Button size='sm' variant='destructive' onClick={handleDelete} disabled={pending}>
					Delete
				</Button>
			</td>
		</tr>
	);
}
