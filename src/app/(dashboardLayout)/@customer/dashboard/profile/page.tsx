"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
	return (
		<div className='container max-w-3xl py-10 space-y-10'>
			{/* HEADER */}
			<div>
				<h1 className='text-2xl font-bold'>My Profile</h1>
				<p className='text-muted-foreground text-sm'>
					Manage your personal information and security
				</p>
			</div>

			<Separator />

			{/* PROFILE INFO */}
			<section className='space-y-6'>
				<h2 className='text-lg font-semibold'>Profile Information</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<Label>Name</Label>
						<Input value='Al Amin Sheikh' disabled />
					</div>

					<div>
						<Label>Email</Label>
						<Input value='alamin@example.com' disabled />
					</div>

					<div>
						<Label>Role</Label>
						<Input value='Customer' disabled />
					</div>

					<div>
						<Label>Status</Label>
						<Input value='Active' disabled />
					</div>
				</div>
			</section>

			<Separator />

			{/* EDIT PROFILE */}
			<section className='space-y-6'>
				<h2 className='text-lg font-semibold'>Edit Profile</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<Label>Full Name</Label>
						<Input placeholder='Update your name' />
					</div>

					<div>
						<Label>Phone (optional)</Label>
						<Input placeholder='01XXXXXXXXX' />
					</div>
				</div>

				<Button>Save Changes</Button>
			</section>

			<Separator />

			{/* SECURITY */}
			<section className='space-y-6'>
				<h2 className='text-lg font-semibold'>Security</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
					<div>
						<Label>New Password</Label>
						<Input type='password' placeholder='••••••••' />
					</div>

					<div>
						<Label>Confirm Password</Label>
						<Input type='password' placeholder='••••••••' />
					</div>
				</div>

				<Button variant='outline'>Update Password</Button>
			</section>
		</div>
	);
}
