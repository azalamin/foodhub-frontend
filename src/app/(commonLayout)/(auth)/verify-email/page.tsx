import { userService } from "@/service/user.service";
import { MailCheck } from "lucide-react";
import { redirect } from "next/navigation";

export default async function VerifyEmailPage() {
	const { data } = await userService.getSession();

	if (data) {
		redirect("/");
	}
	return (
		<div className='space-y-6 text-center'>
			<div className='flex justify-center'>
				<MailCheck className='h-10 w-10 text-primary' />
			</div>

			<h1 className='text-2xl font-bold'>Verify your email</h1>
			<p className='text-sm text-muted-foreground'>
				We’ve sent a verification link to your email address. Please verify your email to continue.
			</p>
		</div>
	);
}
