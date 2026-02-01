"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='text-center'>
				<h1 className='text-2xl font-bold'>Welcome back</h1>
				<p className='text-sm text-muted-foreground'>Login to continue ordering delicious meals</p>
			</div>

			{/* Form */}
			<form className='space-y-4'>
				<div className='space-y-2'>
					<Label>Email</Label>
					<Input type='email' placeholder='you@example.com' />
				</div>

				<div className='space-y-2'>
					<Label>Password</Label>
					<Input type='password' placeholder='••••••••' />
				</div>

				<div className='flex justify-end text-sm'>
					<Link href='/forgot-password' className='text-primary hover:underline'>
						Forgot password?
					</Link>
				</div>

				<Button className='w-full'>Login</Button>
			</form>

			{/* Footer */}
			<p className='text-center text-sm text-muted-foreground'>
				Don’t have an account?{" "}
				<Link href='/register' className='text-primary hover:underline'>
					Sign up
				</Link>
			</p>
		</div>
	);
}
