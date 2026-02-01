"use client";

import ForgotPasswordForm from "@/components/modules/authentication/ForgotPasswordForm";
import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
	const { data } = await userService.getSession();

	if (data) {
		redirect("/");
	}
	return (
		<div>
			<ForgotPasswordForm />
		</div>
	);
}
