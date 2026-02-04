import Loading from "@/app/loading";
import ForgotPasswordForm from "@/components/modules/authentication/ForgotPasswordForm";
import { MailCheck, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
	return (
		<div className='min-h-screen bg-muted/30 flex items-center justify-center py-6 px-4'>
			<div className='grid w-full max-w-5xl min-h-[550px] lg:grid-cols-2 bg-background rounded-[2.5rem] overflow-hidden shadow-2xl border-none'>
				{/* LEFT SIDE: THE EMAIL FORM */}
				<div className='flex flex-col justify-center px-8 py-10 lg:px-12'>
					<div className='mx-auto w-full max-w-[320px] space-y-8'>
						<Link href='/' className='flex items-center gap-2 w-fit group'>
							<div className='bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform'>
								<UtensilsCrossed className='text-white' size={20} />
							</div>
							<span className='text-xl font-black tracking-tighter italic uppercase'>
								Food<span className='text-primary'>Hub</span>
							</span>
						</Link>

						<div className='space-y-2'>
							<div className='bg-primary/10 w-fit p-3 rounded-2xl text-primary mb-2'>
								<MailCheck size={24} />
							</div>
							<h1 className='text-3xl font-black tracking-tight italic uppercase leading-none'>
								Recovery <span className='text-primary'>Link</span>
							</h1>
							<p className='text-muted-foreground font-medium text-[13px] leading-relaxed'>
								Enter your email and we&apos;ll send you a secure link to get back into your
								account.
							</p>
						</div>

						<Suspense
							fallback={
								<div className='font-black animate-pulse text-primary italic'>
									<Loading />
								</div>
							}
						>
							<ForgotPasswordForm />
						</Suspense>
					</div>
				</div>

				{/* RIGHT SIDE: THE VISUAL */}
				<div className='relative hidden lg:block overflow-hidden'>
					<img
						src='https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974'
						alt='Security'
						className='absolute inset-0 h-full w-full object-cover'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-10'>
						<div className='text-white space-y-2'>
							<h2 className='text-4xl font-black leading-tight italic uppercase'>
								Quick Access, <br />
								<span className='text-primary'>Total Security.</span>
							</h2>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
