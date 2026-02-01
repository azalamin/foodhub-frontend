import { redirect } from "next/navigation";

export default function AdminDashboardPage() {
	return redirect("/admin-dashboard/users");
}
