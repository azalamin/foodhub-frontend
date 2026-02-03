"use client";

import { createCategoryAction } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function CategoryForm() {
	const [name, setName] = useState("");
	const [pending, startTransition] = useTransition();

	const handleCreate = () => {
		if (!name.trim()) {
			toast.error("Category name is required");
			return;
		}

		startTransition(async () => {
			try {
				await createCategoryAction(name);
				toast.success("Category created");
				setName("");
			} catch (err: any) {
				toast.error(err.message);
			}
		});
	};

	return (
		<div className='flex gap-3 max-w-md'>
			<Input placeholder='Category name' value={name} onChange={e => setName(e.target.value)} />
			<Button onClick={handleCreate} disabled={pending}>
				Add
			</Button>
		</div>
	);
}
