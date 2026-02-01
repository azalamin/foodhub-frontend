"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function MealsFilters() {
	const router = useRouter();
	const params = useSearchParams();

	const handleSearch = (value: string) => {
		const query = new URLSearchParams(params.toString());
		query.set("search", value);
		query.set("page", "1");
		router.push(`/meals?${query.toString()}`);
	};

	return (
		<div className='sticky top-16 z-10 bg-background/90 backdrop-blur border rounded-xl p-4'>
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<Input
					placeholder='Search meals...'
					defaultValue={params.get("search") ?? ""}
					onChange={e => handleSearch(e.target.value)}
				/>

				{/* Later: Category Select */}
				<Button variant='outline'>Category</Button>

				{/* Later: Dietary */}
				<Button variant='outline'>Dietary</Button>

				<Button>Apply</Button>
			</div>
		</div>
	);
}
