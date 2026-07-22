export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
	admin,
	provider,
	customer,
}: {
	admin: React.ReactNode;
	provider: React.ReactNode;
	customer: React.ReactNode;
}) {
	// The middleware has already validated the session and injected the role.
	// Reading from headers is instant — no extra HTTP round-trip.
	const headersList = await headers();
	const role = headersList.get("x-user-role");

	if (!role) {
		// Middleware should have already blocked this — belt-and-suspenders
		redirect("/login");
	}

	switch (role) {
		case "ADMIN":
			return <>{admin}</>;
		case "PROVIDER":
			return <>{provider}</>;
		case "CUSTOMER":
			return <>{customer}</>;
		default:
			redirect("/login");
	}
}
