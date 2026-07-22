import { NextRequest, NextResponse } from "next/server";

const BACKEND_AUTH_URL = process.env.AUTH_URL ?? "https://food-hub-server-lime.vercel.app/api/auth";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// 1. Bypass public routes
	if (pathname.startsWith("/verify-email")) {
		return NextResponse.next();
	}

	// 2. Support both standard and HTTPS secure cookie names
	const sessionToken =
		request.cookies.get("better-auth.session_token")?.value ??
		request.cookies.get("__Secure-better-auth.session_token")?.value;

	// Unauthenticated -> send to login
	if (!sessionToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	try {
		// 3. Forward full request cookie header to backend
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
			return NextResponse.redirect(new URL("/login", request.url));
		}

		const session = await res.json();
		const user = session?.user;

		if (!user?.id) {
			console.error("[Proxy Auth] Invalid user in session payload");
			return NextResponse.redirect(new URL("/login", request.url));
		}

		const role = user.role ?? "CUSTOMER";

		// 4. Role-Based Access Control
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

		// 5. Inject verified user context into headers
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("x-user-id", user.id);
		requestHeaders.set("x-user-role", role);
		requestHeaders.set("x-user-email", user.email ?? "");
		requestHeaders.set("x-user-name", user.name ?? "");

		return NextResponse.next({
			request: { headers: requestHeaders },
		});
	} catch (error) {
		// Log error to server console to debug failed requests easily
		console.error("[Proxy Auth Failure]:", error);
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/dashboard/:path*", "/provider-dashboard/:path*", "/admin-dashboard/:path*"],
};
