"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function RegisterPage() {
	return (
		<div className='space-y-6'>
			<div className='text-center'>
				<h1 className='text-2xl font-bold'>Create an account</h1>
				<p className='text-sm text-muted-foreground'>Join FoodHub and start ordering today</p>
			</div>

			<form className='space-y-4'>
				<div className='space-y-2'>
					<Label>Name</Label>
					<Input placeholder='Your name' />
				</div>

				<div className='space-y-2'>
					<Label>Email</Label>
					<Input type='email' placeholder='you@example.com' />
				</div>

				<div className='space-y-2'>
					<Label>Password</Label>
					<Input type='password' />
				</div>

				<div className='space-y-2'>
					<Label>Account Type</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder='Select role' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='CUSTOMER'>Customer</SelectItem>
							<SelectItem value='PROVIDER'>Provider</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button className='w-full'>Create account</Button>
			</form>

			<p className='text-center text-sm text-muted-foreground'>
				Already have an account?{" "}
				<Link href='/login' className='text-primary hover:underline'>
					Login
				</Link>
			</p>
		</div>
	);
}
