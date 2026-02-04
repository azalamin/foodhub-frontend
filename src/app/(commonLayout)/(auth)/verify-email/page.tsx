"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; // Ensure this points to your better-auth client
import { ArrowRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function VerifyContent() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

	useEffect(() => {
		const verify = async () => {
			if (!token) {
				setStatus("error");
				return;
			}

			const { error } = await authClient.verifyEmail({
				query: { token },
			});

			if (error) {
				console.error("Verification error:", error);
				setStatus("error");
			} else {
				setStatus("success");
			}
		};

		verify();
	}, [token]);

	return (
		<div className='min-h-screen bg-muted/30 flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-background rounded-[3rem] p-10 shadow-2xl text-center space-y-8'>
				{/* --- LOADING STATE --- */}
				{status === "loading" && (
					<div className='space-y-6'>
						<div className='bg-emerald-500/10 w-fit p-4 rounded-3xl text-emerald-600 mx-auto animate-spin'>
							<Loader2 size={48} strokeWidth={2.5} />
						</div>
						<h1 className='text-3xl font-black italic uppercase'>
							Verifying <span className='text-emerald-500'>Account</span>
						</h1>
						<p className='text-muted-foreground font-medium'>
							Please wait while we confirm your email...
						</p>
					</div>
				)}

				{/* --- SUCCESS STATE --- */}
				{status === "success" && (
					<div className='space-y-6'>
						<div className='bg-emerald-500/10 w-fit p-4 rounded-3xl text-emerald-600 mx-auto'>
							<CheckCircle2 size={48} strokeWidth={2.5} />
						</div>
						<h1 className='text-3xl font-black italic uppercase'>
							Email <span className='text-emerald-500'>Verified</span>
						</h1>
						<p className='text-muted-foreground font-medium'>
							Your account is now active. You can start ordering!
						</p>
						<Button asChild className='w-full rounded-2xl font-black uppercase italic h-12'>
							<Link href='/login'>
								Continue to Login <ArrowRight className='ml-2' size={18} />
							</Link>
						</Button>
					</div>
				)}

				{/* --- ERROR STATE --- */}
				{status === "error" && (
					<div className='space-y-6'>
						<div className='bg-red-500/10 w-fit p-4 rounded-3xl text-red-600 mx-auto'>
							<XCircle size={48} strokeWidth={2.5} />
						</div>
						<h1 className='text-3xl font-black italic uppercase'>
							Link <span className='text-red-500'>Expired</span>
						</h1>
						<p className='text-muted-foreground font-medium'>
							This link is invalid or has already been used.
						</p>
						<Button
							variant='outline'
							asChild
							className='w-full rounded-2xl font-black uppercase italic h-12 border-2'
						>
							<Link href='/login'>Back to Login</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default function VerifyEmailPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyContent />
		</Suspense>
	);
}
