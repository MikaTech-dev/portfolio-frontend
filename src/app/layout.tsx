import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://mikatech.name.ng"),
	title: "Sam-Lebechukwu Ikenna's Portfolio",
	description:
		"Sam-Lebechukwu Ikenna is a junior software engineer, freelance web developer and backend engineer. Specializing in clean, scalable, and secure code.",
	icons: {
		icon: [{ url: "/favicon.png" }, { url: "/icon.png" }],
		shortcut: "/favicon.png",
		apple: "/favicon.png",
	},
	openGraph: {
		title: "Sam-Lebechukwu Ikenna's Portfolio",
		description:
			"Sam-Lebechukwu Ikenna is a junior software engineer, freelance web developer and backend engineer. Specializing in...",
		url: "https://mikatech.name.ng",
		images: [
			{
				url: "https://64.media.tumblr.com/22e6a0b0169ec5b862cabb5af60279d0/ea35ccda43be97cd-f7/s540x810/f66c3a04dd9529405cb76ea804947aab1ca7efb3.png",
				width: 768,
				height: 413,
				alt: "Sam-Lebechukwu Ikenna's Portfolio",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Sam-Lebechukwu Ikenna's Portfolio",
		description:
			"Sam-Lebechukwu Ikenna is a junior software engineer, freelance web developer and backend engineer.",
		images: [
			"https://64.media.tumblr.com/22e6a0b0169ec5b862cabb5af60279d0/ea35ccda43be97cd-f7/s540x810/f66c3a04dd9529405cb76ea804947aab1ca7efb3.png",
		],
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#0a0514",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Sam-Lebechukwu Ikenna",
	url: "https://mikatech.name.ng",
	jobTitle: ["Backend Engineer", "Full Stack Developer", "Software Engineer"],
	description:
		"Sam-Lebechukwu Ikenna is a Software Engineering undergraduate at Miva Open University, backend engineer, and full stack developer.",
	image:
		"https://64.media.tumblr.com/22e6a0b0169ec5b862cabb5af60279d0/ea35ccda43be97cd-f7/s540x810/f66c3a04dd9529405cb76ea804947aab1ca7efb3.png",
	email: "kendoestech01@gmail.com",
	sameAs: [
		"https://github.com/MikaTech-dev",
		"https://x.com/Rockarmy321",
		"https://www.quora.com/profile/Crescent-136",
	],
};

const isVercel = Boolean(
	process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV,
);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${spaceGrotesk.variable} scroll-smooth bg-[#0a0514]`}
		>
			<head>
				<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
			</head>
			<body className="antialiased bg-[#0a0514] text-[#e4e4e7] overflow-x-hidden">
				<Providers>{children}</Providers>
				{isVercel && (
					<>
						<Analytics />
						<SpeedInsights />
					</>
				)}
			</body>
		</html>
	);
}
