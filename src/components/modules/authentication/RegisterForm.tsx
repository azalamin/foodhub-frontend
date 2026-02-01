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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { registerSchema } from "@/schemas/register.schema";
import { upgradeToProvider } from "@/service/user.service";
import { FcGoogle } from "react-icons/fc";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: "CUSTOMER" as "CUSTOMER" | "PROVIDER",
		},
		validators: {
			onSubmit: registerSchema,
		},
		onSubmit: async ({ value }) => {
			const toastId = toast.loading("Creating account...");

			try {
				const { error, data } = await authClient.signUp.email({
					name: value.name,
					email: value.email,
					password: value.password,
				});

				console.log(value);

				if (value.role === "PROVIDER" && data?.user.id) {
					await upgradeToProvider(data.user.id);
				}

				if (error) {
					toast.error(error.message, { id: toastId });
					return;
				}

				toast.success("Account created! Please check your email to verify.", { id: toastId });
			} catch {
				toast.error("Something went wrong, please try again.", {
					id: toastId,
				});
			}
		},
	});

	const handleGoogleSignup = async () => {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: "http://localhost:3000",
		});
	};

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>Join FoodHub and start ordering delicious meals</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id='register-form'
					onSubmit={e => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						{/* NAME */}
						<form.Field
							name='name'
							children={field => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Name</FieldLabel>
										<Input
											id={field.name}
											value={field.state.value}
											onChange={e => field.handleChange(e.target.value)}
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>

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
											onChange={e => field.handleChange(e.target.value)}
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>

						{/* ROLE */}
						<form.Field
							name='role'
							children={field => (
								<Field>
									<FieldLabel>Account Type</FieldLabel>
									<Select
										value={field.state.value}
										onValueChange={value => field.handleChange(value as "CUSTOMER" | "PROVIDER")}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select role' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='CUSTOMER'>Customer</SelectItem>
											<SelectItem value='PROVIDER'>Provider</SelectItem>
										</SelectContent>
									</Select>
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter className='flex flex-col gap-5'>
				<Button form='register-form' type='submit' className='w-full'>
					Create account
				</Button>

				<Button
					onClick={handleGoogleSignup}
					variant='outline'
					type='button'
					className='w-full flex items-center gap-2'
				>
					<FcGoogle className='h-5 w-5' />
					Continue with Google
				</Button>

				<FieldDescription className='text-center'>
					Already have an account?{" "}
					<Link href='/login' className='text-primary hover:underline'>
						Login
					</Link>
				</FieldDescription>
			</CardFooter>
		</Card>
	);
}
