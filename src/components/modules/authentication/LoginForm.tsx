"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/schemas/login.schema";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
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
			const toastId = toast.loading("Logging in...");

			try {
				const { error } = await authClient.signIn.email({
					email: value.email,
					password: value.password,
				});

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				toast.success("Logged in successfully!", { id: toastId });

				// SPA Navigation - No full page reload
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
			callbackURL: "http://localhost:3000", // Ensure this matches your local dev URL
		});
	};

	return (
		<Card {...props} className='mx-auto max-w-sm'>
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>Enter your email below to login to your account</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id='login-form'
					onSubmit={e => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup className='space-y-4'>
						<form.Field
							name='email'
							children={field => (
								<Field>
									<FieldLabel>Email</FieldLabel>
									<Input
										type='email'
										value={field.state.value}
										onChange={e => field.handleChange(e.target.value)}
										placeholder='m@example.com'
									/>
									<FieldError errors={field.state.meta.errors} />
								</Field>
							)}
						/>

						<form.Field
							name='password'
							children={field => (
								<Field>
									<FieldLabel>Password</FieldLabel>
									<Input
										type='password'
										value={field.state.value}
										onChange={e => field.handleChange(e.target.value)}
									/>
									<FieldError errors={field.state.meta.errors} />
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter className='flex flex-col gap-4'>
				<Button
					form='login-form'
					type='submit'
					className='w-full'
					disabled={form.state.isSubmitting}
				>
					{form.state.isSubmitting ? "Please wait..." : "Login"}
				</Button>

				<Button
					onClick={handleGoogleLogin}
					variant='outline'
					type='button'
					className='w-full flex items-center gap-2'
				>
					<FcGoogle className='h-5 w-5' />
					Continue with Google
				</Button>

				<div className='text-center text-sm'>
					Don’t have an account?{" "}
					<Link href='/register' className='text-primary hover:underline'>
						Sign up
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
