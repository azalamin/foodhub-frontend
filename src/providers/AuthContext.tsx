"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<ReturnType<typeof authClient.useSession> | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const session = authClient.useSession();

	return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
