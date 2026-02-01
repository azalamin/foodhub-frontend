"use client";

import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen'>
			<Sidebar role='CUSTOMER' />

			{/* CONTENT */}
			<div className='md:ml-64'>
				{/* Mobile top bar */}
				<div className='sticky top-0 z-30 flex items-center gap-2 border-b bg-background p-4 md:hidden'>
					<MobileSidebar role='CUSTOMER' />
					<h1 className='font-semibold'>Dashboard</h1>
				</div>

				<main className='p-6'>{children}</main>
			</div>
		</div>
	);
}
