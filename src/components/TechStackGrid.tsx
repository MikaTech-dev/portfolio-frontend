"use client";

import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";

interface Skill {
	name: string;
	logo: string;
}

const SKILLS: Skill[] = [
	{ name: "TypeScript", logo: "/logos/typescript.svg" },
	{ name: "Python", logo: "/logos/python.svg" },
	{ name: "Node.js", logo: "/logos/nodedotjs.svg" },
	{ name: "NestJS", logo: "/logos/nestjs.svg" },
	{ name: "Next.js", logo: "/logos/nextdotjs.svg" },
	{ name: "React", logo: "/logos/react.svg" },
	{ name: "PostgreSQL", logo: "/logos/postgresql.svg" },
	{ name: "Redis", logo: "/logos/redis.svg" },
	{ name: "Docker", logo: "/logos/docker.svg" },
	{ name: "AWS", logo: "/logos/aws.svg" },
	{ name: "Cloudflare", logo: "/logos/cloudflare.svg" },
	{ name: "Express.js", logo: "/logos/express.svg" },
	{ name: "Django", logo: "/logos/django.svg" },
	{ name: "MongoDB", logo: "/logos/mongodb.svg" },
	{ name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
	{ name: "Linux", logo: "/logos/linux.svg" },
	{ name: "Git", logo: "/logos/git.svg" },
	{ name: "Socket.IO", logo: "/logos/socketdotio.svg" },
	{ name: "Drizzle ORM", logo: "/logos/drizzle.svg" },
	{ name: "Solidity", logo: "/logos/solidity.svg" },
	{ name: "Google Gemini", logo: "/logos/googlegemini.svg" },
	{ name: "Vue.js", logo: "/logos/vuedotjs.svg" },
	{ name: "Postman", logo: "/logos/postman.svg" },
	{ name: "Swagger", logo: "/logos/swagger.svg" },
];

export default function TechStackGrid() {
	const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
	const gridRef = useRef<HTMLDivElement>(null);

	// Close mobile tooltip on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
				setActiveTooltip(null);
			}
		};
		document.addEventListener("pointerdown", handleClickOutside);
		return () =>
			document.removeEventListener("pointerdown", handleClickOutside);
	}, []);

	const handleCellClick = (name: string) => {
		setActiveTooltip((prev) => (prev === name ? null : name));
	};

	return (
		<div className="w-full pt-4">
			<div className="text-center mb-7">
				<h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
					Technologies I <span className="text-royal-purple">build with</span>.
				</h3>
				<p className="text-xs sm:text-sm text-slate-400/90 mt-1.5">
					Core languages, frameworks, cloud infrastructure, and databases.
				</p>
			</div>

			<div
				ref={gridRef}
				className="relative border border-white/10 bg-[#080412]/50 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.3)] w-full"
			>
				<div className="grid grid-cols-2 sm:grid-cols-4">
					{SKILLS.map((skill, index) => {
						const isMobileCol1 = index % 2 === 0;
						const isDesktopLastCol = (index + 1) % 4 === 0;
						const isMobileLastRow = index >= SKILLS.length - 2;
						const isDesktopLastRow = index >= SKILLS.length - 4;
						const isActive = activeTooltip === skill.name;

						return (
							<button
								type="button"
								key={skill.name}
								onClick={() => handleCellClick(skill.name)}
								aria-label={skill.name}
								className={`group relative h-20 sm:h-24 flex items-center justify-center p-4 cursor-pointer transition-colors duration-300 focus:outline-none
									${!isMobileLastRow ? "border-b border-white/10" : "max-sm:border-b-0"}
									${!isDesktopLastRow ? "sm:border-b sm:border-white/10" : "sm:border-b-0"}
									${isMobileCol1 ? "border-r border-white/10 sm:border-r-0" : ""}
									${!isDesktopLastCol ? "sm:border-r sm:border-white/10" : ""}
									${isActive ? "z-30 bg-white/[0.08]" : "z-0 hover:z-30 bg-white/[0.02] hover:bg-white/[0.06]"}
								`}
							>
								{/* Crosshair "+" marker at intersection for desktop */}
								{!isDesktopLastCol && !isDesktopLastRow && (
									<span
										aria-hidden="true"
										className="hidden sm:flex absolute -bottom-2.5 -right-2.5 w-5 h-5 items-center justify-center text-slate-500/80 font-mono text-xs select-none pointer-events-none z-10"
									>
										+
									</span>
								)}

								{/* Crosshair "+" marker at intersection for mobile */}
								{isMobileCol1 && !isMobileLastRow && (
									<span
										aria-hidden="true"
										className="flex sm:hidden absolute -bottom-2.5 -right-2.5 w-5 h-5 items-center justify-center text-slate-500/80 font-mono text-xs select-none pointer-events-none z-10"
									>
										+
									</span>
								)}

								{/* Logo image evenly sized and visible */}
								<div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center pointer-events-none transition-transform duration-200 group-hover:-translate-y-1.5">
									<img
										src={skill.logo}
										alt={skill.name}
										className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
										loading="lazy"
									/>
								</div>

								{/* Standardized Tooltip */}
								<Tooltip
									text={skill.name}
									active={isActive}
									className="bottom-1.5"
								/>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
