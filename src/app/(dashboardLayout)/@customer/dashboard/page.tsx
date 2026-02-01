import { redirect } from "next/navigation";

export default function CustomerDashboardPage() {
	return redirect("/dashboard/orders");
}
