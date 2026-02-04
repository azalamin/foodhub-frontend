"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight, Loader2, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { upgradeToProviderAction } from "@/actions/user.action";
import { authClient } from "@/lib/auth-client";

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

export function RegisterForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: "CUSTOMER" as "CUSTOMER" | "PROVIDER",
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Creating profile...");
			try {
				const { error, data } = await authClient.signUp.email({
					name: value.name,
					email: value.email,
					password: value.password,
					callbackURL: `${window.location.origin}/verify-email`,
				});

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				if (value.role === "PROVIDER" && data?.user.id) {
					await upgradeToProviderAction(data.user.id);
				}

				toast.success("Account created!", { id: toastId });
				router.refresh();
				router.push(`/verify-email/pending?email=${value.email}`);
			} catch {
				toast.error("Error occurred. Try again.", { id: toastId });
			}
		},
	});

	const handleGoogleSignup = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: window.location.origin,
		});
	};

	return (
		<div className='space-y-4'>
			<form
				onSubmit={e => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className='space-y-3'
			>
				<form.Field
					name='name'
					children={field => (
						<div className='space-y-1'>
							<Label className='ml-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground'>
								Name
							</Label>
							<div className='relative'>
								<User
									className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
									size={14}
								/>
								<Input
									className='h-10 pl-9 rounded-xl border-2 bg-muted/20 font-bold text-sm'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={e => field.handleChange(e.target.value)}
								/>
							</div>
						</div>
					)}
				/>

				<form.Field
					name='email'
					children={field => (
						<div className='space-y-1'>
							<Label className='ml-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground'>
								Email
							</Label>
							<div className='relative'>
								<Mail
									className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
									size={14}
								/>
								<Input
									type='email'
									className='h-10 pl-9 rounded-xl border-2 bg-muted/20 font-bold text-sm'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={e => field.handleChange(e.target.value)}
								/>
							</div>
						</div>
					)}
				/>

				<div className='grid grid-cols-2 gap-2'>
					<form.Field
						name='password'
						children={field => (
							<div className='space-y-1'>
								<Label className='ml-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground'>
									Pass
								</Label>
								<Input
									type='password'
									className='h-10 rounded-xl border-2 bg-muted/20 font-bold text-sm'
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={e => field.handleChange(e.target.value)}
								/>
							</div>
						)}
					/>

					<form.Field
						name='role'
						children={field => (
							<div className='space-y-1'>
								<Label className='ml-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground'>
									Role
								</Label>
								{/* FIXED THE TYPE ERROR HERE */}
								<Select
									onValueChange={value => field.handleChange(value as "CUSTOMER" | "PROVIDER")}
									defaultValue={field.state.value}
								>
									<SelectTrigger className='h-10 rounded-xl border-2 bg-muted/20 font-bold text-xs'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='CUSTOMER'>User</SelectItem>
										<SelectItem value='PROVIDER'>Provider</SelectItem>
									</SelectContent>
								</Select>
							</div>
						)}
					/>
				</div>

				<form.Subscribe
					selector={s => [s.isSubmitting]}
					children={([isSubmitting]) => (
						<Button
							type='submit'
							disabled={isSubmitting}
							className='w-full h-12 rounded-xl font-black text-md gap-2 shadow-lg mt-2 transition-all active:scale-95'
						>
							{isSubmitting ? (
								<Loader2 className='animate-spin size={18}' />
							) : (
								<>
									Sign Up <ArrowRight size={16} />
								</>
							)}
						</Button>
					)}
				/>
			</form>

			<Button
				onClick={handleGoogleSignup}
				variant='outline'
				type='button'
				className='w-full h-10 rounded-xl border-2 font-black gap-2 text-xs transition-all active:scale-95'
			>
				<FcGoogle size={16} /> Google
			</Button>

			<p className='text-center text-[11px] font-bold text-muted-foreground uppercase tracking-tight'>
				Have an account?{" "}
				<Link href='/login' className='text-primary italic font-black hover:underline'>
					Login
				</Link>
			</p>
		</div>
	);
}
