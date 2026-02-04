"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Loader2, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function MealsFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

	const handleFilterChange = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value && value !== "all") {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		params.set("page", "1");

		startTransition(() => {
			router.push(`/meals?${params.toString()}`, { scroll: false });
		});
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm !== (searchParams.get("search") || "")) {
				handleFilterChange("search", searchTerm);
			}
		}, 400);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	return (
		<div className='sticky top-20 z-30 bg-background/60 backdrop-blur-xl border border-muted p-2 rounded-2xl shadow-xl'>
			<div className='flex flex-col md:flex-row items-center gap-3'>
				{/* Search Input */}
				<div className='relative w-full md:flex-1'>
					{isPending ? (
						<Loader2 className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-primary' />
					) : (
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
					)}
					<Input
						placeholder='Search for biryani, burger...'
						className='pl-10 h-12 bg-transparent border-none focus-visible:ring-0 text-base'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					{searchTerm && (
						<button
							onClick={() => setSearchTerm("")}
							className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
						>
							<X size={16} />
						</button>
					)}
				</div>

				{/* Filter Actions */}
				<div className='flex w-full md:w-auto items-center gap-2 border-t md:border-t-0 md:border-l pt-2 md:pt-0 md:pl-2'>
					{/* --- PRICE SORT (NEW) --- */}
					<Select
						value={searchParams.get("sort") || "all"}
						onValueChange={val => handleFilterChange("sort", val)}
					>
						<SelectTrigger className='h-10 w-full md:w-[150px] border-none bg-transparent font-bold hover:bg-muted/50 rounded-xl'>
							<SelectValue placeholder='Sort Price' />
						</SelectTrigger>
						<SelectContent className='rounded-xl font-medium'>
							<SelectItem value='all'>Newest First</SelectItem>
							<SelectItem value='price_asc'>Price: Low to High</SelectItem>
							<SelectItem value='price_desc'>Price: High to Low</SelectItem>
						</SelectContent>
					</Select>

					{/* Dietary Type */}
					<Select
						value={searchParams.get("dietaryType") || "all"}
						onValueChange={val => handleFilterChange("dietaryType", val)}
					>
						<SelectTrigger className='h-10 w-full md:w-[150px] border-none bg-transparent font-bold hover:bg-muted/50 rounded-xl'>
							<SelectValue placeholder='Dietary' />
						</SelectTrigger>
						<SelectContent className='rounded-xl font-medium'>
							<SelectItem value='all'>All Dietary</SelectItem>
							<SelectItem value='HALAL'>Halal</SelectItem>
							<SelectItem value='VEGETARIAN'>Vegetarian</SelectItem>
							<SelectItem value='VEGAN'>Vegan</SelectItem>
						</SelectContent>
					</Select>

					{/* Available Toggle */}
					<button
						onClick={() =>
							handleFilterChange(
								"isAvailable",
								searchParams.get("isAvailable") === "true" ? "false" : "true",
							)
						}
						className={cn(
							"px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border",
							searchParams.get("isAvailable") === "true"
								? "bg-primary/10 text-primary border-primary/20"
								: "text-muted-foreground border-transparent hover:bg-muted",
						)}
					>
						In Stock
					</button>
				</div>
			</div>
		</div>
	);
}
