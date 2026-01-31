import { Navbar } from "@/components/layout/Navbar";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='mx-auto'>
			<Navbar />
			{children}
		</div>
	);
}
