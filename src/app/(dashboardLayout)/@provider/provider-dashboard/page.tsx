import { redirect } from "next/navigation";

export default function ProviderDashboardPage() {
	return redirect("/provider-dashboard/orders");
}
