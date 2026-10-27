"use client";

import { motion } from "framer-motion";
import { ArrowDown, Check, Mail } from "lucide-react";
import { useState } from "react";
import SpotlightBorder from "./SpotlightBorder";
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
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
		>
			<title>Quora</title>
			<path d="M12.738 18.701c-.831-1.635-1.805-3.287-3.708-3.287-.362 0-.727.061-1.059.209l-.646-1.289c.786-.678 2.058-1.214 3.693-1.214 2.544 0 3.851 1.229 4.888 2.792.613-1.335.904-3.14.904-5.375 0-5.582-1.744-8.447-5.822-8.447-4.018 0-5.757 2.865-5.757 8.447 0 5.553 1.739 8.389 5.757 8.389.64 0 1.22-.069 1.75-.225zm.996 1.947c-.881.237-1.817.366-2.743.366-5.352 0-10.59-4.269-10.59-10.478C.402 4.271 5.639 0 10.991 0c5.441 0 10.628 4.238 10.628 10.537 0 3.504-1.635 6.351-4.01 8.191.764 1.148 1.543 1.914 2.652 1.914 1.199 0 1.68-.915 1.77-1.649h1.557c.092.974-.402 5.007-4.766 5.007-2.652 0-4.047-1.528-5.096-3.328l.008-.024z" />
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
		const element =
			document.getElementById("skills") || document.getElementById("backend");
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
		<section className="relative min-h-svh min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-x-clip overflow-y-visible">
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
									className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none overflow-hidden"
								>
									<SpotlightBorder radius={80} />
									{copied ? (
										<Check size={18} className="text-green-500 relative z-10" />
									) : (
										<Mail
											size={18}
											className="text-slate-400 group-hover:text-white transition-colors relative z-10"
										/>
									)}
									<span
										className={`text-sm tracking-wide font-medium transition-colors relative z-10 ${copied ? "text-green-400" : "text-slate-300 group-hover:text-white"}`}
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
									className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none overflow-hidden"
								>
									<SpotlightBorder radius={80} />
									<Github
										size={18}
										className="text-slate-400 group-hover:text-white transition-colors relative z-10"
									/>
									<span className="text-sm tracking-wide font-medium text-slate-300 group-hover:text-white transition-colors relative z-10">
										GitHub
									</span>
								</a>
								<a
									href="https://x.com/Rockarmy321"
									target="_blank"
									rel="noopener noreferrer"
									className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none overflow-hidden"
								>
									<SpotlightBorder radius={80} />
									<Twitter
										size={18}
										className="text-slate-400 group-hover:text-white transition-colors relative z-10"
									/>
									<span className="text-sm tracking-wide font-medium text-slate-300 group-hover:text-white transition-colors relative z-10">
										Twitter
									</span>
								</a>
								<a
									href="https://www.quora.com/profile/Crescent-136"
									target="_blank"
									rel="noopener noreferrer"
									className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none overflow-hidden"
								>
									<SpotlightBorder radius={80} />
									<Quora
										size={18}
										className="text-slate-400 group-hover:text-white transition-colors relative z-10"
									/>
									<span className="text-sm tracking-wide font-medium text-slate-300 group-hover:text-white transition-colors relative z-10">
										Quora
									</span>
									<Tooltip text="271k+ views helping people troubleshoot tech" />
								</a>
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
