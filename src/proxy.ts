import { NextRequest, NextResponse } from "next/server";

const BACKEND_AUTH_URL =
	process.env.AUTH_URL ??
	process.env.NEXT_PUBLIC_AUTH_URL ??
	"https://food-hub-server-lime.vercel.app/api/auth";

const PROTECTED_ROUTES = ["/dashboard", "/provider-dashboard", "/admin-dashboard"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	const isProtectedRoute = PROTECTED_ROUTES.some(
		route => pathname === route || pathname.startsWith(`${route}/`),
	);
	const isAuthRoute = AUTH_ROUTES.some(
		route => pathname === route || pathname.startsWith(`${route}/`),
	);

	// Extract session token (supporting both standard and HTTPS secure cookies)
	const sessionToken =
		request.cookies.get("better-auth.session_token")?.value ??
		request.cookies.get("__Secure-better-auth.session_token")?.value;

	// Unauthenticated user attempting to access a protected route
	if (!sessionToken && isProtectedRoute) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Unauthenticated user attempting to access an auth route (login/register)
	if (!sessionToken && isAuthRoute) {
		return NextResponse.next();
	}

	try {
		// Forward request cookies to backend get-session endpoint
		const cookieHeader = request.headers.get("cookie") ?? "";

		const res = await fetch(`${BACKEND_AUTH_URL}/get-session`, {
			method: "GET",
			headers: {
				Cookie: cookieHeader,
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		if (!res.ok) {
			console.error(`[Proxy Auth] Backend returned status ${res.status}`);
			if (isProtectedRoute) {
				return NextResponse.redirect(new URL("/login", request.url));
			}
			return NextResponse.next();
		}

		const session = await res.json();
		const user = session?.user;

		if (!user?.id) {
			console.error("[Proxy Auth] Invalid user in session payload");
			if (isProtectedRoute) {
				return NextResponse.redirect(new URL("/login", request.url));
			}
			return NextResponse.next();
		}

		const role: "ADMIN" | "PROVIDER" | "CUSTOMER" = user.role ?? "CUSTOMER";

		// Role-based target dashboard mapping
		const getRoleDashboard = (userRole: string) => {
			if (userRole === "ADMIN") return "/admin-dashboard";
			if (userRole === "PROVIDER") return "/provider-dashboard";
			return "/dashboard";
		};

		const roleDashboard = getRoleDashboard(role);

		// 1. If authenticated user visits an auth route (/login, /register), redirect to their role dashboard
		if (isAuthRoute) {
			return NextResponse.redirect(new URL(roleDashboard, request.url));
		}

		// 2. Role-Based Access Control for protected routes
		if (role === "ADMIN") {
			if (pathname.startsWith("/dashboard") || pathname.startsWith("/provider-dashboard")) {
				return NextResponse.redirect(new URL("/admin-dashboard", request.url));
			}
		} else if (role === "PROVIDER") {
			if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin-dashboard")) {
				return NextResponse.redirect(new URL("/provider-dashboard", request.url));
			}
		} else if (role === "CUSTOMER") {
			if (pathname.startsWith("/provider-dashboard") || pathname.startsWith("/admin-dashboard")) {
				return NextResponse.redirect(new URL("/dashboard", request.url));
			}
		}

		// 3. Inject verified user details into headers for Server Components
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("x-user-id", user.id);
		requestHeaders.set("x-user-role", role);
		requestHeaders.set("x-user-email", user.email ?? "");
		requestHeaders.set("x-user-name", user.name ?? "");

		return NextResponse.next({
			request: { headers: requestHeaders },
		});
	} catch (error) {
		console.error("[Proxy Auth Failure]:", error);
		if (isProtectedRoute) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
		return NextResponse.next();
	}
}

export const config = {
	matcher: [
		"/dashboard",
		"/dashboard/:path*",
		"/provider-dashboard",
		"/provider-dashboard/:path*",
		"/admin-dashboard",
		"/admin-dashboard/:path*",
		"/login",
		"/register",
		"/forgot-password",
		"/reset-password",
	],
};
