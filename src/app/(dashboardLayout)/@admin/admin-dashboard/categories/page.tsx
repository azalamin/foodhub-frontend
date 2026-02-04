import { CategoryForm } from "@/components/modules/admin/category-form";
import { CategoryTable } from "@/components/modules/admin/category-table";
import { categoryService } from "@/service/category.service";
import { Layers, PlusCircle, Sparkles } from "lucide-react";
import { Suspense } from "react";
import Loading from "../../loading"; // Path to your admin-level loading component

export default function AdminCategoriesPage() {
	return (
		<div className='space-y-10 pb-12 px-2'>
			{/* --- BRANDED HEADER (Renders Instantly) --- */}
			<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-muted pb-8'>
				<div className='space-y-2'>
					<div className='flex items-center gap-2 text-emerald-600'>
						<Layers size={20} />
						<span className='text-[10px] font-black uppercase tracking-[0.3em]'>
							Taxonomy Control
						</span>
					</div>
					<h1 className='text-4xl font-black tracking-tight italic uppercase'>
						Food <span className='text-emerald-500'>Categories</span>
					</h1>
					<p className='text-muted-foreground font-medium italic text-sm'>
						Organize the marketplace menu structure and filters.
					</p>
				</div>
			</div>

			<div className='grid grid-cols-1 xl:grid-cols-12 gap-10'>
				{/* --- CREATE SECTION (Sticky Column - Renders Instantly) --- */}
				<div className='xl:col-span-4'>
					<div className='sticky top-6 space-y-6'>
						<div className='flex items-center gap-2 ml-2 text-emerald-600'>
							<PlusCircle size={18} />
							<h2 className='text-xl font-black italic uppercase text-foreground'>
								Create <span className='text-emerald-500'>New</span>
							</h2>
						</div>
						<CategoryForm />
					</div>
				</div>

				{/* --- LIST SECTION (Wrapped in Suspense) --- */}
				<div className='xl:col-span-8 space-y-6'>
					<h2 className='text-xl font-black italic uppercase ml-2 text-foreground'>
						Management <span className='text-emerald-500'>List</span>
					</h2>

					<Suspense fallback={<Loading />}>
						<CategoryListContainer />
					</Suspense>
				</div>
			</div>
		</div>
	);
}

// Data Fetching Component for Admin Categories
async function CategoryListContainer() {
	const { data } = await categoryService.getAll();
	const categories = data || [];

	return (
		<>
			{/* Branded Stats Badge (Streams in with data) */}
			<div className='absolute top-24 right-8 hidden xl:flex bg-emerald-500/10 px-5 py-3 rounded-[2rem] border-2 border-emerald-500/20 items-center gap-4'>
				<Sparkles className='text-emerald-600' size={20} />
				<div className='flex flex-col'>
					<span className='text-[10px] font-black uppercase text-muted-foreground leading-none'>
						Global
					</span>
					<span className='text-sm font-black uppercase italic text-emerald-700 leading-tight'>
						{categories.length} Active Labels
					</span>
				</div>
			</div>

			<CategoryTable categories={categories} />
		</>
	);
}
