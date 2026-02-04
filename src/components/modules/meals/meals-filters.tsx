"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function MealsFilters() {
	const router = useRouter();
	const params = useSearchParams();

	const updateFilter = (key: string, value: string) => {
		const query = new URLSearchParams(params.toString());
		if (value && value !== "all") {
			query.set(key, value);
		} else {
			query.delete(key);
		}
		query.set("page", "1"); // Reset to page 1 on filter
		router.push(`/meals?${query.toString()}`);
	};

	return (
		<div className='sticky top-20 z-30 bg-background/60 backdrop-blur-xl border border-muted p-2 rounded-2xl shadow-xl shadow-black/5'>
			<div className='flex flex-col md:flex-row items-center gap-3'>
				{/* Search Input */}
				<div className='relative w-full md:flex-1'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search for dishes...'
						className='pl-10 h-12 bg-transparent border-none focus-visible:ring-0 text-base'
						defaultValue={params.get("search") ?? ""}
						onChange={e => updateFilter("search", e.target.value)}
					/>
				</div>

				<div className='flex w-full md:w-auto items-center gap-2 border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-2'>
					{/* Dietary Filter */}
					<Select
						defaultValue={params.get("dietaryType") ?? "all"}
						onValueChange={val => updateFilter("dietaryType", val)}
					>
						<SelectTrigger className='h-10 w-full md:w-[140px] border-none bg-transparent font-medium hover:bg-muted/50 rounded-xl'>
							<SelectValue placeholder='Dietary' />
						</SelectTrigger>
						<SelectContent className='rounded-xl'>
							<SelectItem value='all'>All Diets</SelectItem>
							<SelectItem value='HALAL'>Halal</SelectItem>
							<SelectItem value='VEGETARIAN'>Vegetarian</SelectItem>
							<SelectItem value='VEGAN'>Vegan</SelectItem>
						</SelectContent>
					</Select>

					{/* Quick Clear or Apply Button */}
					<Button
						onClick={() => router.push("/meals")}
						variant='ghost'
						size='sm'
						className='rounded-xl text-muted-foreground hover:text-primary'
					>
						Clear
					</Button>
				</div>
			</div>
		</div>
	);
}
