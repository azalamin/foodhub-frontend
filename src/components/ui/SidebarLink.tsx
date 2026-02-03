import { cn } from "@/lib/utils";
import Link from "next/link";

export function SidebarLink({
	href,
	label,
	icon,
	active,
}: {
	href: string;
	label: string;
	icon?: React.ReactNode;
	active?: boolean;
}) {
	return (
		<Link
			href={href}
			className={cn(
				"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
				active
					? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
					: "text-muted-foreground hover:bg-muted hover:text-foreground",
			)}
		>
			{icon}
			{label}
		</Link>
	);
}
