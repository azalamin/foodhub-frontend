import { env } from "@/env";

export const providerService = {
	getPublicProviders: async () => {
		try {
			const res = await fetch(`${env.API_URL}/api/providers`, {
				cache: "no-store",
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				return { data: [], error: { message: "Failed" } };
			}

			return { data: data, error: null };
		} catch {
			return { data: [], error: { message: "Something went wrong" } };
		}
	},
};
