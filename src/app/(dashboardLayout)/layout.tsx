type Role = "ADMIN" | "PROVIDER" | "CUSTOMER";

function getUserRole(): Role {
	// later comes from auth/session
	return "CUSTOMER";
}

export default function DashboardLayout({
	admin,
	provider,
	customer,
}: {
	admin: React.ReactNode;
	provider: React.ReactNode;
	customer: React.ReactNode;
}) {
	const role = getUserRole();

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
