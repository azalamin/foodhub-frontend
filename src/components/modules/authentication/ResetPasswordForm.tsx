"use client";

import { AlertCircle, ArrowRight, KeyRound, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";

export default function ResetPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const form = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		onSubmit: async ({ value }) => {
			if (!token) {
				toast.error("Invalid or missing reset token. Please request a new password reset link.");
				return;
			}

			if (value.password !== value.confirmPassword) {
				toast.error("Passwords do not match.");
				return;
			}

			if (value.password.length < 8) {
				toast.error("Password must be at least 8 characters long.");
				return;
			}

			const toastId = toast.loading("Updating your password...");

			try {
				const { error } = await authClient.resetPassword({
					newPassword: value.password,
					token,
				});

				if (error) {
					toast.error(error.message || "Failed to reset password", { id: toastId });
					return;
				}

				toast.success("Password reset successfully! Redirecting to login...", { id: toastId });
				setTimeout(() => {
					router.push("/login");
				}, 1500);
			} catch (err: any) {
				toast.error(err?.message || "An unexpected error occurred", { id: toastId });
			}
		},
	});

	if (!token) {
		return (
			<div className='space-y-4 text-center py-4'>
				<div className='bg-red-500/10 text-red-500 p-4 rounded-2xl flex flex-col items-center gap-2'>
					<AlertCircle size={32} />
					<p className='font-bold text-sm'>Missing Reset Token</p>
					<p className='text-xs opacity-90 leading-relaxed'>
						The password reset link appears to be invalid or incomplete. Please request a new recovery link.
					</p>
				</div>
				<Button asChild className='w-full h-12 rounded-2xl font-black'>
					<Link href='/forgot-password'>Request New Link</Link>
				</Button>
			</div>
		);
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className='space-y-5'
		>
			{/* NEW PASSWORD FIELD */}
			<form.Field
				name='password'
				children={field => (
					<div className='space-y-2'>
						<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
							New Password
						</Label>
						<div className='relative'>
							<Lock
								className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
								size={18}
							/>
							<Input
								type='password'
								placeholder='••••••••'
								required
								className='h-14 pl-12 rounded-2xl border-2 border-muted bg-muted/20 focus-visible:ring-primary focus:bg-background transition-all font-bold'
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={e => field.handleChange(e.target.value)}
							/>
						</div>
					</div>
				)}
			/>

			{/* CONFIRM PASSWORD FIELD */}
			<form.Field
				name='confirmPassword'
				children={field => (
					<div className='space-y-2'>
						<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
							Confirm New Password
						</Label>
						<div className='relative'>
							<KeyRound
								className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
								size={18}
							/>
							<Input
								type='password'
								placeholder='••••••••'
								required
								className='h-14 pl-12 rounded-2xl border-2 border-muted bg-muted/20 focus-visible:ring-primary focus:bg-background transition-all font-bold'
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={e => field.handleChange(e.target.value)}
							/>
						</div>
					</div>
				)}
			/>

			<form.Subscribe
				selector={state => [state.isSubmitting]}
				children={([isSubmitting]) => (
					<Button
						type='submit'
						disabled={isSubmitting}
						className='w-full h-14 rounded-2xl font-black text-lg gap-2 shadow-xl shadow-primary/20 transition-all active:scale-95'
					>
						{isSubmitting ? (
							<Loader2 className='animate-spin' />
						) : (
							<>
								Reset Password <ArrowRight size={20} />
							</>
						)}
					</Button>
				)}
			/>
		</form>
	);
}
