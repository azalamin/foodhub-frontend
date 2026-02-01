"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { loginSchema } from "@/schemas/login.schema";
import { FcGoogle } from "react-icons/fc";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
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
			} catch {
				toast.error("Something went wrong, please try again.", { id: toastId });
			}
		},
	});

	const handleGoogleLogin = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "http://localhost:3000",
		});
	};

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Enter your information below to login to your account</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id='login-form'
					onSubmit={e => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						{/* EMAIL */}
						<form.Field
							name='email'
							children={field => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Email</FieldLabel>
										<Input
											id={field.name}
											type='email'
											value={field.state.value}
											onChange={e => field.handleChange(e.target.value)}
											placeholder='Enter you email'
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>

						{/* PASSWORD */}
						<form.Field
							name='password'
							children={field => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Password</FieldLabel>
										<Input
											id={field.name}
											type='password'
											value={field.state.value}
											placeholder='Enter your password'
											onChange={e => field.handleChange(e.target.value)}
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter className='flex flex-col gap-5'>
				{/* LOGIN */}
				<Button form='login-form' type='submit' className='w-full'>
					Login
				</Button>

				{/* GOOGLE */}
				<Button
					onClick={handleGoogleLogin}
					variant='outline'
					type='button'
					className='w-full flex items-center gap-2'
				>
					<FcGoogle className='h-5 w-5' />
					Continue with Google
				</Button>

				<FieldDescription className='text-center'>
					Don’t have an account?{" "}
					<Link href='/register' className='text-primary hover:underline'>
						Sign up
					</Link>
				</FieldDescription>
			</CardFooter>
		</Card>
	);
}
