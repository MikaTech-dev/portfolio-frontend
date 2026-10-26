"use client";

interface TooltipProps {
	text: string;
	active?: boolean;
	className?: string;
}

export default function Tooltip({
	text,
	active = false,
	className = "-top-10",
}: TooltipProps) {
	return (
		<span
			className={`absolute ${className} left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-slate-300 text-xs rounded-lg whitespace-nowrap pointer-events-none border border-white/10 backdrop-blur-md shadow-lg z-50 transition-opacity duration-300
				${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
			`}
		>
			{text}
		</span>
	);
}
