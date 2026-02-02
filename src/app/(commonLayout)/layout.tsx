export const dynamic = "force-dynamic";

import { Navbar } from "@/components/layout/Navbar";
import { userService } from "@/service/user.service";

export default async function CommonLayout({ children }: { children: React.ReactNode }) {
	const { data } = await userService.getSession();

	return (
		<div className='mx-auto'>
			<Navbar user={data?.user ?? null} />
			{children}
		</div>
	);
}
