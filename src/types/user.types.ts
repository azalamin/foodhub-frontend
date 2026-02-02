export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
	createdAt: string;
}
