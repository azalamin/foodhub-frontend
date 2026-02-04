"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, CheckCircle2, Loader2, UtensilsCrossed, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyEmailContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
	const [message, setMessage] = useState("Verifying your account...");

	useEffect(() => {
		if (!token) {
			setStatus("error");
			setMessage("Verification token is missing.");
			return;
		}

		const verify = async () => {
			try {
				const { error } = await authClient.verifyEmail({
					query: { token },
				});

				if (error) {
					setStatus("error");
					setMessage(error.message || "Verification failed.");
				} else {
					setStatus("success");
					setMessage("Your email has been verified successfully!");
				}
			} catch (err) {
				setStatus("error");
				setMessage("Something went wrong. Please try again.");
			}
		};

		verify();
	}, [token]);

	return (
		<div className='min-h-screen bg-muted/30 flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-background rounded-[3rem] p-10 shadow-2xl border-none text-center space-y-8'>
				{/* Brand Logo */}
				<div className='flex items-center gap-2 w-fit mx-auto'>
					<div className='bg-primary p-2 rounded-xl'>
						<UtensilsCrossed className='text-white' size={24} />
					</div>
					<span className='text-2xl font-black tracking-tighter italic uppercase'>
						Food<span className='text-primary'>Hub</span>
					</span>
				</div>

				<div className='space-y-4'>
					{status === "loading" && (
						<div className='flex flex-col items-center gap-4'>
							<Loader2 className='h-16 w-16 text-primary animate-spin' strokeWidth={3} />
							<h1 className='text-2xl font-black uppercase italic'>Verifying...</h1>
						</div>
					)}

					{status === "success" && (
						<div className='flex flex-col items-center gap-4 animate-in zoom-in duration-500'>
							<div className='bg-green-500/10 p-4 rounded-full text-green-500'>
								<CheckCircle2 size={64} strokeWidth={3} />
							</div>
							<h1 className='text-3xl font-black uppercase italic text-green-600'>Success!</h1>
							<p className='text-muted-foreground font-medium'>{message}</p>
							<Button
								asChild
								className='w-full h-14 rounded-2xl font-black text-lg gap-2 mt-4 shadow-xl shadow-primary/20'
							>
								<Link href='/login'>
									Go to Login <ArrowRight size={20} />
								</Link>
							</Button>
						</div>
					)}

					{status === "error" && (
						<div className='flex flex-col items-center gap-4 animate-in fade-in duration-500'>
							<div className='bg-red-500/10 p-4 rounded-full text-red-500'>
								<XCircle size={64} strokeWidth={3} />
							</div>
							<h1 className='text-3xl font-black uppercase italic text-red-600'>Failed</h1>
							<p className='text-muted-foreground font-medium'>{message}</p>
							<Button
								variant='outline'
								asChild
								className='w-full h-14 rounded-2xl font-black border-2 mt-4'
							>
								<Link href='/register'>Try Registering Again</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default function VerifyEmailPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyEmailContent />
		</Suspense>
	);
}
