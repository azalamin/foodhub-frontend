"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
		<div className='flex justify-center items-center gap-6 mt-16 bg-muted/30 w-fit mx-auto px-6 py-3 rounded-2xl border border-muted'>
			<Button
				variant='ghost'
				size='sm'
				className='rounded-xl font-bold hover:bg-background'
				disabled={page === 1}
				onClick={() => goToPage(page - 1)}
			>
				<ChevronLeft className='h-4 w-4 mr-2' />
				Prev
			</Button>

			<div className='flex items-center gap-2'>
				<span className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
					Page
				</span>
				<span className='text-sm font-black bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center rounded-lg shadow-lg shadow-primary/20'>
					{page}
				</span>
				<span className='text-xs font-bold text-muted-foreground uppercase tracking-widest'>
					of {totalPages}
				</span>
			</div>

			<Button
				variant='ghost'
				size='sm'
				className='rounded-xl font-bold hover:bg-background'
				disabled={page === totalPages}
				onClick={() => goToPage(page + 1)}
			>
				Next
				<ChevronRight className='h-4 w-4 ml-2' />
			</Button>
		</div>
	);
}
