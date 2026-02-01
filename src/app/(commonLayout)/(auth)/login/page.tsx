import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default async function LoginPage() {
	const { data } = await userService.getSession();

	if (data) {
		redirect("/");
	}

	return (
		<div>
			<LoginForm />
		</div>
	);
}
