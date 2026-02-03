import { CategoryForm } from "@/components/modules/admin/category-form";
import { CategoryTable } from "@/components/modules/admin/category-table";
import { categoryService } from "@/service/category.service";

export default async function AdminCategoriesPage() {
	const { data } = await categoryService.getAll();

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Categories</h1>
				<p className='text-muted-foreground'>Manage food categories shown across the platform</p>
			</div>

			<CategoryForm />

			<CategoryTable categories={data} />
		</div>
	);
}
