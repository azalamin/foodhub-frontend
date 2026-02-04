"use client";

import { AlertCircle, ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/schemas/login.schema";
import { useForm } from "@tanstack/react-form";

export function LoginForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: loginSchema,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Verifying your identity...");

			try {
				const { error } = await authClient.signIn.email({
					email: value.email,
					password: value.password,
				});

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				toast.success("Welcome back!", { id: toastId });
				router.push("/");
				router.refresh();
			} catch (err) {
				toast.error("An unexpected error occurred.", { id: toastId });
			}
		},
	});

	const handleGoogleLogin = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: window.location.origin,
		});
	};

	return (
		<div className='space-y-6'>
			<form
				onSubmit={e => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className='space-y-5'
			>
				{/* EMAIL FIELD */}
				<form.Field
					name='email'
					children={field => (
						<div className='space-y-2'>
							<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
								Email Address
							</Label>
							<div className='relative'>
								<Mail
									className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
									size={18}
								/>
								<Input
									type='email'
									placeholder='name@example.com'
									className='h-14 pl-12 rounded-2xl border-2 border-muted bg-muted/20 focus-visible:ring-primary focus:bg-background transition-all font-bold'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={e => field.handleChange(e.target.value)}
								/>
							</div>
							{field.state.meta.errors.length > 0 && (
								<p className='text-[10px] font-bold text-red-500 ml-2 uppercase italic flex items-center gap-1'>
									<AlertCircle size={10} />
									{field.state.meta.errors[0]?.toString()}
								</p>
							)}
						</div>
					)}
				/>

				{/* PASSWORD FIELD */}
				<form.Field
					name='password'
					children={field => (
						<div className='space-y-2'>
							<div className='flex items-center justify-between px-2'>
								<Label className='text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
									Password
								</Label>
								<Button
									variant='link'
									size='sm'
									asChild
									className='h-auto p-0 text-[10px] font-black text-primary uppercase'
								>
									<Link href='/forgot-password'>Forgot?</Link>
								</Button>
							</div>
							<div className='relative'>
								<Lock
									className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
									size={18}
								/>
								<Input
									type='password'
									placeholder='••••••••'
									className='h-14 pl-12 rounded-2xl border-2 border-muted bg-muted/20 focus-visible:ring-primary focus:bg-background transition-all font-bold'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={e => field.handleChange(e.target.value)}
								/>
							</div>
							{field.state.meta.errors.length > 0 && (
								<p className='text-[10px] font-bold text-red-500 ml-2 uppercase italic flex items-center gap-1'>
									<AlertCircle size={10} />
									{field.state.meta.errors[0]?.toString()}
								</p>
							)}
						</div>
					)}
				/>

				<form.Subscribe
					selector={state => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<Button
							type='submit'
							className='w-full h-14 rounded-2xl font-black text-lg gap-2 shadow-xl shadow-primary/20 transition-all active:scale-95'
							disabled={!canSubmit || isSubmitting}
						>
							{isSubmitting ? (
								<Loader2 className='animate-spin' />
							) : (
								<>
									Log In <ArrowRight size={20} />
								</>
							)}
						</Button>
					)}
				/>
			</form>

			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t border-muted' />
				</div>
				<div className='relative flex justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
					<span className='bg-background px-3'>Or continue with</span>
				</div>
			</div>

			<Button
				onClick={handleGoogleLogin}
				variant='outline'
				type='button'
				className='w-full h-14 rounded-2xl border-2 font-black gap-3 hover:bg-muted transition-all active:scale-95'
			>
				<FcGoogle className='h-6 w-6' />
				Google Account
			</Button>

			<p className='text-center text-sm font-bold text-muted-foreground'>
				New here?{" "}
				<Link href='/register' className='text-primary hover:underline italic font-black'>
					Create an account
				</Link>
			</p>
		</div>
	);
}
