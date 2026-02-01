"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
	page: number;
	totalPages: number;
}

export function MealsPagination({ page, totalPages }: Props) {
	const router = useRouter();
	const params = useSearchParams();

	const goToPage = (pageNumber: number) => {
		const query = new URLSearchParams(params.toString());
		query.set("page", pageNumber.toString());
		router.push(`/meals?${query.toString()}`);
	};

	if (totalPages <= 1) return null;

	return (
		<div className='flex justify-center items-center gap-2 mt-10'>
			<Button variant='outline' size='sm' disabled={page === 1} onClick={() => goToPage(page - 1)}>
				Previous
			</Button>

			<span className='text-sm text-muted-foreground'>
				Page {page} of {totalPages}
			</span>

			<Button
				variant='outline'
				size='sm'
				disabled={page === totalPages}
				onClick={() => goToPage(page + 1)}
			>
				Next
			</Button>
		</div>
	);
}
