export const dynamic = "force-dynamic";

import { userService } from "@/service/user.service";

export default async function DashboardLayout({
	admin,
	provider,
	customer,
}: {
	admin: React.ReactNode;
	provider: React.ReactNode;
	customer: React.ReactNode;
}) {
	const { data } = await userService.getSession();

	const role = data.user.role;

	switch (role) {
		case "ADMIN":
			return <>{admin}</>;

		case "PROVIDER":
			return <>{provider}</>;

		case "CUSTOMER":
			return <>{customer}</>;

		default:
			return null;
	}
}
