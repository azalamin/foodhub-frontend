"use client";

import { authClient } from "@/lib/auth-client";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext(authClient.useSession());

export function AuthProvider({ children }: { children: ReactNode }) {
	const session = authClient.useSession();

	return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
