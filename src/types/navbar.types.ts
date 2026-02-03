import { UserRole } from "./user.types";

export interface UserType {
	id?: string;
	name: string;
	email?: string;
	image?: string;
	role: UserRole | string;
}

export interface NavbarProps {
	user: UserType | null;
}
