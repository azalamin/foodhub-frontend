"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
	href: string;
	label: string;
}

export function SidebarLink({ href, label }: SidebarLinkProps) {
	const pathname = usePathname();
	const active = pathname === href || pathname.startsWith(`${href}/`);

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all",
				active
					? "bg-primary text-primary-foreground shadow"
					: "text-muted-foreground hover:bg-muted",
			)}
		>
			{label}
		</Link>
	);
}
