import { CategoriesSection } from "@/components/modules/home/CategoriesSection";
import { FeaturedProviders } from "@/components/modules/home/FeaturedProvider";
import { Footer } from "@/components/modules/home/Footer";
import { Hero } from "@/components/modules/home/Hero";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { categoryService } from "@/service/category.service";
import { providerService } from "@/service/provider.service";

export default async function HomePage() {
	const categoriesRes = await categoryService.getAll();
	const providersRes = await providerService.getPublicProviders();

	console.log(providersRes);
	return (
		<div>
			<Hero />
			<CategoriesSection categories={categoriesRes.data} />
			<FeaturedProviders providers={providersRes.data} />
			<HowItWorks />
			<Footer />
		</div>
	);
}
