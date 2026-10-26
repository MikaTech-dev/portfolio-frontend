"use client";

import { SnackbarProvider } from "notistack";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			autoHideDuration={5000}
		>
			{children}
		</SnackbarProvider>
	);
}
