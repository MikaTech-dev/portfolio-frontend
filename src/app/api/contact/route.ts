import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const targetUrl =
			process.env.API_URL ||
			process.env.NEXT_PUBLIC_API_URL ||
			"https://mail.mikatech.top";
		const apiKey = process.env.API_KEY || "";

		const response = await fetch(`${targetUrl}/api/mail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authv1: apiKey,
			},
			body: JSON.stringify(body),
		});

		const data = await response.json().catch(() => ({}));

		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Internal proxy error";
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
