import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = await cookies();
	const all = cookieStore.getAll();
	return NextResponse.json({
		count: all.length,
		names: all.map(c => c.name),
	});
}
