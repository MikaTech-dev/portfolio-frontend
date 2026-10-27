"use client";

import { useEffect, useState } from "react";
import DotGrid from "./DotGrid";

export default function InteractiveBackground() {
	const [webglSupported, setWebglSupported] = useState(true);

	useEffect(() => {
		try {
			const canvas = document.createElement("canvas");
			const gl = canvas.getContext("webgl2");
			if (!gl) {
				setWebglSupported(false);
			}
		} catch {
			setWebglSupported(false);
		}
	}, []);

	return (
		<div className="fixed inset-x-0 top-0 -bottom-36 z-0 pointer-events-none bg-[#0a0514]">
			{/* Static Vignette / Corner Accents */}
			<div
				className="absolute top-0 right-0 w-[800px] h-[800px] opacity-40 pointer-events-none"
				style={{
					background:
						"radial-gradient(circle at top right, rgba(142, 61, 255, 0.15) 0%, transparent 60%)",
				}}
			/>
			<div
				className="absolute bottom-0 left-0 w-[800px] h-[800px] opacity-30 pointer-events-none"
				style={{
					background:
						"radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.15) 0%, transparent 60%)",
				}}
			/>

			{/* Hardware-Accelerated Film Grain Noise overlay */}
			<div className="absolute inset-0 pointer-events-none noise-overlay" />

			{/* Interactive WebGL DotGrid or Static Dot Grid Fallback */}
			{webglSupported ? (
				<DotGrid
					dotSize={2.5}
					gap={32}
					baseColor="#3d1d68"
					activeColor="#c084fc"
					proximity={130}
					strength={1.2}
					shockRadius={320}
					shockStrength={4.5}
					glow={0.6}
					opacity={0.7}
					dpr={1}
					onUnavailable={() => setWebglSupported(false)}
					className="absolute inset-0 pointer-events-none"
				/>
			) : (
				<div
					className="absolute inset-0 opacity-[0.4] md:opacity-[0.2]"
					style={{
						backgroundImage:
							"radial-gradient(#b26ef7 1.5px, transparent 1.5px)",
						backgroundSize: "32px 32px",
					}}
				/>
			)}
		</div>
	);
}
