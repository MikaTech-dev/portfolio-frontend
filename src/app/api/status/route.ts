import { NextResponse } from "next/server";

export async function GET() {
	try {
		const targetUrl =
			process.env.API_URL ||
			process.env.NEXT_PUBLIC_API_URL ||
			"https://mail.mikatech.top";
		const apiKey = process.env.API_KEY || "";

		const response = await fetch(`${targetUrl}/api`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Origin: "mikatech.name.ng",
				authv1: apiKey,
			},
		});

		const rawText = await response.text();
		let data: Record<string, unknown>;
		try {
			data = JSON.parse(rawText);
		} catch {
			data = {
				error:
					rawText ||
					response.statusText ||
					`Upstream returned status ${response.status}`,
			};
		}

		if (!response.ok) {
			console.error(
				`[api/status] Upstream error from ${targetUrl}/api -> status ${response.status}:`,
				data.error || rawText,
			);
		}

		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Internal proxy error";
		console.error("[api/status] Proxy exception:", message);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
