import { CategoriesSection } from "@/components/modules/home/CategoriesSection";
import { FeaturedProviders } from "@/components/modules/home/FeaturedProvider";
import { Footer } from "@/components/modules/home/Footer";
import { Hero } from "@/components/modules/home/Hero";
import { HowItWorks } from "@/components/modules/home/HowItWorks";

export default function HomePage() {
	return (
		<div>
			<Hero />
			<CategoriesSection />
			<FeaturedProviders />
			<HowItWorks />
			<Footer />
		</div>
	);
}
