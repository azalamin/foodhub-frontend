import { RegisterForm } from "@/components/modules/authentication/RegisterForm";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
	const { data } = await userService.getSession();

	if (data) {
		redirect("/");
	}
	return (
		<div>
			<RegisterForm />
		</div>
	);
}
