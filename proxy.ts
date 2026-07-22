import { NextRequest, NextResponse } from "next/server";

const BACKEND_AUTH_URL = process.env.AUTH_URL ?? "https://food-hub-server-lime.vercel.app/api/auth";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// 1. Bypass check for public/verification routes
	if (pathname.startsWith("/verify-email")) {
		return NextResponse.next();
	}

	const sessionToken = request.cookies.get("better-auth.session_token");

	// 2. Unauthenticated check
	if (!sessionToken?.value) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	try {
		// 3. Single authoritative session verification with backend
		const res = await fetch(`${BACKEND_AUTH_URL}/get-session`, {
			method: "GET",
			headers: {
				Cookie: `better-auth.session_token=${sessionToken.value}`,
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		if (!res.ok) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		const session = await res.json();
		const user = session?.user;

		if (!user?.id) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		const role = user.role ?? "CUSTOMER";

		// 4. Role-Based Access Control & Redirection
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

		// 5. Pass validated context to Server Components/Route Handlers via headers
		const requestHeaders = new Headers(request.headers);
		requestHeaders.set("x-user-id", user.id);
		requestHeaders.set("x-user-role", role);
		requestHeaders.set("x-user-email", user.email ?? "");
		requestHeaders.set("x-user-name", user.name ?? "");

		return NextResponse.next({
			request: { headers: requestHeaders },
		});
	} catch {
		// Fail closed on unreachable backend or network failure
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/dashboard/:path*", "/provider-dashboard/:path*", "/admin-dashboard/:path*"],
};
