"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Tooltip from "./Tooltip";

interface Skill {
	name: string;
	logo: string;
}

const SKILLS: Skill[] = [
	// Languages & Core Web
	{ name: "TypeScript", logo: "/logos/typescript.svg" },
	{ name: "JavaScript", logo: "/logos/javascript.svg" },
	{ name: "Python", logo: "/logos/python.svg" },
	{ name: "HTML5", logo: "/logos/html5.svg" },
	{ name: "CSS3", logo: "/logos/css3.svg" },
	{ name: "Node.js", logo: "/logos/nodedotjs.svg" },

	// Frameworks & Libraries
	{ name: "NestJS", logo: "/logos/nestjs.svg" },
	{ name: "Next.js", logo: "/logos/nextdotjs.svg" },
	{ name: "React", logo: "/logos/react.svg" },
	{ name: "Express.js", logo: "/logos/express.svg" },
	{ name: "Django", logo: "/logos/django.svg" },
	{ name: "Vue.js", logo: "/logos/vuedotjs.svg" },

	// Databases, ORM & Caching
	{ name: "PostgreSQL", logo: "/logos/postgresql.svg" },
	{ name: "MongoDB", logo: "/logos/mongodb.svg" },
	{ name: "Redis", logo: "/logos/redis.svg" },
	{ name: "Drizzle ORM", logo: "/logos/drizzle.svg" },
	{ name: "Vite", logo: "/logos/vite.svg" },
	{ name: "EJS", logo: "/logos/ejs.png" },

	// DevOps, Containers & Deployment
	{ name: "Docker", logo: "/logos/docker.svg" },
	{ name: "Dokploy", logo: "/logos/dokploy.svg" },
	{ name: "AWS", logo: "/logos/aws.svg" },
	{ name: "Cloudflare", logo: "/logos/cloudflare.svg" },
	{ name: "PipeOps", logo: "/logos/pipeops.svg" },
	{ name: "Linux", logo: "/logos/linux.svg" },

	// Platforms & Hosting
	{ name: "Vercel", logo: "/logos/vercel.svg" },
	{ name: "Railway", logo: "/logos/railway.svg" },
	{ name: "Render", logo: "/logos/render.svg" },
	{ name: "WordPress", logo: "/logos/wordpress.svg" },
	{ name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
	{ name: "Socket.IO", logo: "/logos/socketdotio.svg" },

	// Version Control & Developer Tooling
	{ name: "Git", logo: "/logos/git.svg" },
	{ name: "GitHub", logo: "/logos/github.svg" },
	{ name: "Codeberg", logo: "/logos/codeberg.svg" },
	{ name: "Postman", logo: "/logos/postman.svg" },
	{ name: "Swagger", logo: "/logos/swagger.svg" },
	{ name: "JWT", logo: "/logos/jwt.svg" },
];

export default function TechStackGrid() {
	const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
	const [columns, setColumns] = useState(12);
	const gridRef = useRef<HTMLDivElement>(null);

	// Dynamically track column count (3 on mobile, 4 on sm, 6 on md/lg, 12 on xl/2xl)
	// All cleanly divide 36 items with zero orphan or out-of-place cells
	useEffect(() => {
		const updateColumns = () => {
			if (window.innerWidth < 640) {
				setColumns(3);
			} else if (window.innerWidth < 768) {
				setColumns(4);
			} else if (window.innerWidth < 1280) {
				setColumns(6);
			} else {
				setColumns(12);
			}
		};
		updateColumns();
		window.addEventListener("resize", updateColumns);
		return () => window.removeEventListener("resize", updateColumns);
	}, []);

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

	const totalRows = Math.ceil(SKILLS.length / columns);

	return (
		<div className="w-full">
			{/* Section Header */}
			<div className="text-center mb-14 md:mb-16 space-y-4 px-6">
				<h2 className="text-5xl md:text-6xl font-bold text-white">
					Technologies I <span className="text-gradient">build with</span>
				</h2>
				<p className="text-xl text-frosted-silver max-w-2xl mx-auto opacity-80">
					Core languages, frameworks, cloud infrastructure, and databases.
				</p>
			</div>

			{/* Full-width edge-to-edge grid taking minimum vertical space */}
			<div
				ref={gridRef}
				className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-12 border-y border-white/10 w-full"
			>
				{SKILLS.map((skill, index) => {
					const row = Math.floor(index / columns);
					const col = index % columns;
					const isRightCol = col === columns - 1;
					const isBottomRow = row === totalRows - 1;
					const isDarkCell = (row + col) % 2 === 0;
					const isActive = activeTooltip === skill.name;

					return (
						<button
							type="button"
							key={skill.name}
							onClick={() => handleCellClick(skill.name)}
							aria-label={skill.name}
							className={`group relative h-20 sm:h-22 md:h-24 flex items-center justify-center p-3 sm:p-4 cursor-pointer transition-colors duration-300 focus:outline-none
								${!isRightCol ? "border-r border-white/10" : ""}
								${!isBottomRow ? "border-b border-white/10" : ""}
								${isDarkCell ? "bg-white/[0.04]" : "bg-transparent"}
								${isActive ? "z-30 bg-white/[0.1]" : "hover:z-30 hover:bg-white/[0.08]"}
							`}
						>
							{/* Sharp plus sign at internal cell intersections */}
							{!isBottomRow && !isRightCol && (
								<PlusIcon
									className="-right-[12.5px] -bottom-[12.5px] absolute z-20 size-6 text-slate-500/80 pointer-events-none"
									strokeWidth={1}
								/>
							)}

							{/* Logo image evenly sized and visible */}
							<div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center pointer-events-none transition-transform duration-200 group-hover:-translate-y-1">
								<img
									src={skill.logo}
									alt={skill.name}
									className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110"
									loading="lazy"
								/>
							</div>

							{/* Standardized Tooltip */}
							<Tooltip
								text={skill.name}
								active={isActive}
								className="-top-10"
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
}
