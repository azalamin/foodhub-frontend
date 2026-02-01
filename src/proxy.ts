import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/Roles";
import { userService } from "./service/user.service";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	let isAuthenticated: boolean = false;
	let isAdmin: boolean = false;
	let isProvider: boolean = false;
	let isCustomer: boolean = false;

	const { data } = await userService.getSession();

	if (data) {
		isAuthenticated = true;
		isAdmin = data.user.role === Roles.admin;
		isProvider = data.user.role === Roles.provider;
		isCustomer = data.user.role === Roles.customer;
	}

	// User is not authenticated
	if (!isAuthenticated) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// ADMIN rules
	if (isAdmin) {
		if (pathname.startsWith("/dashboard") || pathname.startsWith("/provider-dashboard")) {
			return NextResponse.redirect(new URL("/admin-dashboard", request.url));
		}
	}

	// PROVIDER rules
	if (isProvider) {
		if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin-dashboard")) {
			return NextResponse.redirect(new URL("/provider-dashboard", request.url));
		}
	}

	// CUSTOMER rules
	if (isCustomer) {
		if (pathname.startsWith("/provider-dashboard") || pathname.startsWith("/admin-dashboard")) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard",
		"/dashboard/:path*",
		"/provider-dashboard",
		"/provider-dashboard/:path*",
		"/admin-dashboard",
		"/admin-dashboard/:path*",
	],
};
