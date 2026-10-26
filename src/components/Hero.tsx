"use client";

import { motion } from "framer-motion";
import { ArrowDown, Check, Mail } from "lucide-react";
import { useState } from "react";
import TechStackGrid from "./TechStackGrid";
import Tooltip from "./Tooltip";

function Github({
	size = 24,
	className = "",
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<title>GitHub</title>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
}

function Twitter({
	size = 24,
	className = "",
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<title>Twitter</title>
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
		</svg>
	);
}

function Quora({
	size = 24,
	className = "",
}: {
	size?: number;
	className?: string;
}) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 448 512"
			fill="currentColor"
			className={className}
		>
			<title>Quora</title>
			<path d="M440.5 386.7h-29.3c-1.5 13.5-10.5 30.8-33 30.8-20.5 0-35.3-14.2-49.5-35.8 44.2-34.2 74.7-87.5 74.7-153C403.5 111.2 306.8 32 205 32 105.3 32 7.3 111.7 7.3 228.7c0 134.1 131.3 221.6 249 189C276 451.3 302 480 351.5 480c81.8 0 90.8-75.3 89-93.3zM297 329.2C277.5 300 253.3 277 205.5 277c-30.5 0-54.3 10-69 22.8l12.2 24.3c6.2-3 13-4 19.8-4 35.5 0 53.7 30.8 69.2 61.3-10 3-20.7 4.2-32.7 4.2-75 0-107.5-53-107.5-156.7C97.5 124.5 130 71 205 71c76.2 0 108.7 53.5 108.7 157.7.1 41.8-5.4 75.6-16.7 100.5z" />
		</svg>
	);
}

export default function Hero() {
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = (e: React.MouseEvent) => {
		e.preventDefault();
		navigator.clipboard.writeText("kendoestech01@gmail.com");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};
	const scrollToNext = () => {
		const element = document.getElementById("backend");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.3 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 15 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 110,
				damping: 15,
				duration: 0.7,
			} as const,
		},
	};

	return (
		<section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden">
			<div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-royal-purple/20 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-electric-violet/10 rounded-full blur-[100px] pointer-events-none" />

			<motion.div
				className="max-w-5xl mx-auto w-full relative z-10"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemVariants} className="space-y-2 mb-8">
					<h2 className="text-xl md:text-2xl text-electric-violet font-medium">
						Hi, I'm
					</h2>
					<h1 className="text-6xl md:text-8xl lg:text-7xl font-bold text-white tracking-tight leading-[0.9]">
						Sam-Lebechukwu <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-white via-frosted-silver to-slate-500">
							Ikenna
						</span>
					</h1>
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex flex-col gap-8 mb-16"
				>
					<div className="w-full">
						<h3 className="text-2xl md:text-3xl font-bold mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
							<span className="text-gradient">Backend Engineer</span>
							<span className="text-slate-600">/</span>
							<span className="text-frosted-silver">FullStack Developer</span>
						</h3>

						{/* Bio & Links */}
						<div className="space-y-6">
							<p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
								I am a Software Engineering undergrad and backend engineer with
								full stack experience. I build web applications, APIs, and AI
								integrations using Node.js, NestJS, and Next.js. Outside
								software development, I troubleshoot computer hardware and
								systems issues for people on Quora, reaching over 270k views
								across 180+ answers.
							</p>

							{/* Action Links */}
							<div className="flex flex-wrap items-center gap-4 pt-4 pb-2">
								<button
									type="button"
									onClick={handleCopyEmail}
									className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none"
								>
									{copied ? (
										<Check size={18} className="text-green-500" />
									) : (
										<Mail
											size={18}
											className="text-slate-400 group-hover:text-electric-violet transition-colors"
										/>
									)}
									<span
										className={`text-sm tracking-wide font-medium transition-colors ${copied ? "text-green-400" : "text-slate-300 group-hover:text-white"}`}
									>
										{copied ? "Copied!" : "Copy Email"}
									</span>

									{/* Tooltip */}
									<Tooltip
										text={
											copied ? "Copied to clipboard!" : "Click to copy my email"
										}
									/>
								</button>
								<a
									href="https://github.com/MikaTech-dev"
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none"
								>
									<Github
										size={18}
										className="text-slate-400 group-hover:text-white transition-colors"
									/>
									<span className="text-sm tracking-wide font-medium text-slate-300 group-hover:text-white transition-colors">
										GitHub
									</span>
								</a>
								<a
									href="https://x.com/Rockarmy321"
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none"
								>
									<Twitter
										size={18}
										className="text-slate-400 group-hover:text-[#1DA1F2] transition-colors"
									/>
									<span className="text-sm tracking-wide font-medium text-slate-300 group-hover:text-white transition-colors">
										Twitter
									</span>
								</a>
								<a
									href="https://www.quora.com/profile/Crescent-136"
									target="_blank"
									rel="noopener noreferrer"
									className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none"
								>
									<Quora
										size={18}
										className="text-slate-400 group-hover:text-[#B92B27] transition-colors"
									/>
									<span className="text-sm tracking-wide font-medium text-slate-300 group-hover:text-white transition-colors">
										Quora
									</span>
									<Tooltip text="271k+ views helping people troubleshoot tech" />
								</a>
							</div>

							<div className="w-full mt-6">
								<TechStackGrid />
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>

			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8, duration: 0.5 }}
				onClick={scrollToNext}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
			>
				<ArrowDown size={24} className="animate-bounce" />
			</motion.button>
		</section>
	);
}
