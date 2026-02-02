export interface SearchParams {
	search?: string;
	isAvailable?: boolean;
	providerId?: string;
	dietaryType?: string;
}

export type DietaryType = "NONE" | "VEGETARIAN" | "VEGAN" | "HALAL" | "GLUTEN_FREE";

export interface Meal {
	id: string;
	name: string;
	description?: string | null;
	price: number;
	imageUrl?: string | null;
	dietaryType: DietaryType;
	isAvailable: boolean;

	providerId: string;
	categoryId: string;

	createdAt: string;
	updatedAt: string;
}
