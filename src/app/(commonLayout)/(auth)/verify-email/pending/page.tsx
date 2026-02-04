"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Inbox, MailOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PendingContent() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email");

	return (
		<div className='min-h-screen bg-muted/30 flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-background rounded-[3rem] p-10 shadow-2xl text-center space-y-8'>
				{/* --- ICON --- */}
				<div className='bg-emerald-500/10 w-fit p-4 rounded-3xl text-emerald-600 mx-auto'>
					<MailOpen size={48} strokeWidth={2.5} />
				</div>

				{/* --- MAIN TEXT --- */}
				<div className='space-y-2'>
					<h1 className='text-3xl font-black italic uppercase'>
						Check Your <span className='text-emerald-500'>Inbox</span>
					</h1>
					<p className='text-muted-foreground font-medium'>
						We sent a verification link to <br />
						<span className='text-foreground font-bold italic'>
							{email || "your registered email"}
						</span>
					</p>
				</div>

				{/* --- HELP BOX --- */}
				<div className='bg-muted/50 p-6 rounded-2xl text-[12px] font-medium text-muted-foreground leading-relaxed text-left flex gap-4 items-start'>
					<Inbox className='shrink-0 text-emerald-600' size={18} />
					<p>
						Don&apos;t see the email? Please check your <strong>Spam</strong> or{" "}
						<strong>Promotions</strong> folder. The link is valid for 1 hour.
					</p>
				</div>

				{/* --- ACTIONS --- */}
				<div className='pt-4 border-t-2 border-dashed border-muted'>
					<Button
						variant='link'
						asChild
						className='text-xs font-black uppercase tracking-widest text-emerald-600'
					>
						<Link href='/login' className='flex items-center gap-2'>
							<ArrowLeft size={14} /> Back to Login
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default function VerifyEmailPending() {
	return (
		<Suspense
			fallback={
				<div className='min-h-screen flex items-center justify-center font-black uppercase italic text-muted-foreground'>
					Loading...
				</div>
			}
		>
			<PendingContent />
		</Suspense>
	);
}
