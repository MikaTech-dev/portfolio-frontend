"use client";

import { Mail, ArrowDown, Check, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
			<path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10 1.936 0 3.735-.558 5.267-1.521l1.637 1.472a1 1 0 0 0 1.405-.074 1 1 0 0 0-.074-1.405l-1.42-1.277C20.306 17.585 22 14.995 22 12c0-5.514-4.486-10-10-10zm0 17.5c-4.136 0-7.5-3.364-7.5-7.5S7.864 4.5 12 4.5s7.5 3.364 7.5 7.5c0 2.222-.977 4.22-2.527 5.59l-.914-.822a1 1 0 0 0-1.365 1.462l.85.764C14.409 19.317 13.238 19.5 12 19.5z" />
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

	const techCategories = [
		{
			id: "backend",
			title: "Backend",
			skills: [
				"Node.js",
				"NestJS",
				"TypeScript",
				"Express.js",
				"Python",
				"Django REST",
				"Socket.IO",
				"Drizzle ORM",
				"Sequelize ORM",
			],
		},
		{
			id: "frontend",
			title: "Frontend",
			skills: [
				"Next.js",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"HTML5",
				"CSS3",
				"Framer Motion",
				"Vue.js",
			],
		},
		{
			id: "database",
			title: "Databases",
			skills: ["PostgreSQL", "Redis", "MongoDB", "SQL"],
		},
		{
			id: "cloud-devops",
			title: "Cloud & DevOps",
			skills: [
				"Cloudflare",
				"Linux",
				"Git & GitHub",
				"GitHub Actions",
				"Docker",
				"AWS",
				"Render",
				"Vercel",
				"Swagger",
				"Postman",
			],
		},
		{
			id: "ai-web3",
			title: "AI & Web3",
			skills: [
				"DeepSeek",
				"Google Gemini",
				"Solidity",
				"Foundry",
				"Ethers / Wagmi",
			],
		},
	];

	const [activeTab, setActiveTab] = useState(techCategories[0].id);
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
									<span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-slate-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10 backdrop-blur-md">
										{copied ? "Copied to clipboard!" : "Click to copy my email"}
									</span>
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
									<span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/80 text-slate-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-white/10 backdrop-blur-md">
										271k+ views helping people troubleshoot tech
									</span>
								</a>
							</div>

							<div className="w-full mt-2 lg:max-w-4xl bg-[#0a0510]/30 backdrop-blur-xl border border-white/5 rounded-2xl p-4 md:p-6 shadow-2xl relative">
								{/* Section Identifier */}
								<div className="flex items-center gap-2.5 mb-5 px-1">
									<Code className="text-electric-violet" size={16} />
									<span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
										Tech Stack & Tools
									</span>
								</div>
								{/* Material UI-style Floating Tab Navigation */}
								<div className="flex overflow-x-auto gap-2 mb-8 pb-2 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
									{techCategories.map((category) => {
										const isActive = activeTab === category.id;
										return (
											<button
												type="button"
												key={category.id}
												onClick={() => setActiveTab(category.id)}
												className={`relative px-5 py-2.5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none rounded-full flex items-center group
                          ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}
                        `}
											>
												{isActive && (
													<motion.div
														layoutId="heroMuiTabIndicator"
														className="absolute inset-0 bg-[#1e1136] border border-royal-purple/40 shadow-[0_4px_15px_rgba(124,58,237,0.15)] rounded-full z-0"
														initial={false}
														transition={{
															type: "spring",
															stiffness: 450,
															damping: 30,
														}}
													/>
												)}
												<span className="relative z-10">{category.title}</span>
											</button>
										);
									})}
								</div>

								{/* Active Tab Panel Content */}
								<motion.div layout className="px-2">
									<AnimatePresence mode="wait">
										{techCategories.map(
											(category) =>
												category.id === activeTab && (
													<motion.div
														key={category.id}
														initial={{ opacity: 0, scale: 0.95 }}
														animate={{ opacity: 1, scale: 1 }}
														exit={{ opacity: 0, scale: 0.95 }}
														transition={{ duration: 0.25, ease: "easeOut" }}
													>
														<div className="flex flex-wrap gap-2.5">
															{category.skills.map((tech) => (
																<span
																	key={tech}
																	className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-[#05020a]/80 text-slate-500 text-xs md:text-sm font-semibold hover:border-royal-purple/60 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-sm cursor-default hover:-translate-y-0.5"
																>
																	{tech}
																</span>
															))}
														</div>
													</motion.div>
												),
										)}
									</AnimatePresence>
								</motion.div>
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
