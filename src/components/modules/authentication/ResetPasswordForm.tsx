"use client";
import { useForm } from "@tanstack/react-form";
import { Mail, ArrowLeft, Loader2, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
	const form = useForm({
		defaultValues: { email: "" },
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Sending link...");
			try {
				const { error } = await authClient.requestPasswordReset({
					email: value.email,
					redirectTo: "/reset-password",
				});
				if (error) throw new Error(error.message);
				toast.success("Reset link sent! Check your inbox.", { id: toastId });
			} catch (err: any) {
				toast.error(err.message || "Failed to send link", { id: toastId });
			}
		},
	});

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className='space-y-5'
		>
			<form.Field
				name='email'
				children={field => (
					<div className='space-y-2'>
						<Label className='ml-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground'>
							Email
						</Label>
						<div className='relative'>
							<Mail
								className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'
								size={18}
							/>
							<Input
								type='email'
								required
								className='h-14 pl-12 rounded-2xl border-2 bg-muted/20 focus:border-primary font-bold transition-all'
								value={field.state.value}
								onChange={e => field.handleChange(e.target.value)}
							/>
						</div>
					</div>
				)}
			/>
			<form.Subscribe
				selector={s => [s.isSubmitting]}
				children={([isSubmitting]) => (
					<Button
						type='submit'
						disabled={isSubmitting}
						className='w-full h-14 rounded-2xl font-black text-lg gap-2 shadow-xl shadow-primary/20'
					>
						{isSubmitting ? (
							<Loader2 className='animate-spin' />
						) : (
							<>
								Send Link <SendHorizontal size={18} />
							</>
						)}
					</Button>
				)}
			/>
			<div className='text-center'>
				<Button
					variant='link'
					asChild
					className='text-[10px] font-black text-muted-foreground uppercase'
				>
					<Link href='/login' className='flex items-center gap-1'>
						<ArrowLeft size={12} /> Back to Login
					</Link>
				</Button>
			</div>
		</form>
	);
}
