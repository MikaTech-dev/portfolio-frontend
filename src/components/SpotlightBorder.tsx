"use client";

import { useEffect, useRef } from "react";

interface SpotlightBorderProps {
	color?: string;
	radius?: number;
	className?: string;
}

export default function SpotlightBorder({
	color = "rgba(255, 255, 255, 0.4)",
	radius = 240,
	className = "",
}: SpotlightBorderProps) {
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const overlay = overlayRef.current;
		if (!overlay) return;
		const parent = overlay.parentElement;
		if (!parent) return;

		let ticking = false;

		const handleMouseMove = (e: MouseEvent) => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					const rect = parent.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					overlay.style.setProperty("--mouse-x", `${x}px`);
					overlay.style.setProperty("--mouse-y", `${y}px`);
					overlay.style.setProperty("--mouse-opacity", "1");
					ticking = false;
				});
				ticking = true;
			}
		};

		const handleMouseLeave = () => {
			overlay.style.setProperty("--mouse-opacity", "0");
		};

		parent.addEventListener("mousemove", handleMouseMove, { passive: true });
		parent.addEventListener("mouseleave", handleMouseLeave, { passive: true });

		return () => {
			parent.removeEventListener("mousemove", handleMouseMove);
			parent.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<div
			ref={overlayRef}
			className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-20 ${className}`}
			style={{
				opacity: "var(--mouse-opacity, 0)",
				padding: "1px",
				borderRadius: "inherit",
				background: `radial-gradient(${radius}px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${color}, transparent 80%)`,
				WebkitMask:
					"linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
				WebkitMaskComposite: "xor",
				mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
				maskComposite: "exclude",
			}}
		/>
	);
}
