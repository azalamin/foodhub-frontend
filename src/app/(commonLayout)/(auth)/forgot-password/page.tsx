"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-bold text-center'>Reset password</h1>

			<form className='space-y-4'>
				<div className='space-y-2'>
					<Label>Email</Label>
					<Input type='email' placeholder='you@example.com' />
				</div>

				<Button className='w-full'>Send reset link</Button>
			</form>
		</div>
	);
}
