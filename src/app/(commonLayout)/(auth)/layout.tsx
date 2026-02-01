import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen flex items-center justify-center bg-muted/40 px-4'>
			<div className='w-full max-w-md rounded-xl border bg-background p-6 shadow-sm'>
				{children}
			</div>
		</div>
	);
}
