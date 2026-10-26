"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TextMorph } from "torph";
import kdkImage from "../assets/kdk-logo.png";
import klaroImage from "../assets/klaro-logo.png";
import SpotlightBorder from "./SpotlightBorder";

const websites = [
	{
		title: "KDK Phones & Gadgets",
		description:
			"Built and maintain the full-stack web storefront, device trade-in valuation flow, and administrative inventory management system with Paystack checkout and Cloudflare protection.",
		image: kdkImage,
		tags: ["E-Commerce", "Retail"],
		link: "https://kdkphones.com",
	},
	{
		title: "Klaro.ng",
		description:
			"Built the frontend and backend for an AI platform that simplifies legal documents. Designed the document processing workflow and manage the CI/CD pipeline and deployment strategy.",
		image: klaroImage,
		tags: ["Legal", "SaaS", "AI"],
		link: "https://klaro.ng",
		imageClassName: "scale-90 sm:scale-95 group-hover:scale-105",
	},
];

export default function FreelanceWork() {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, {
		once: true,
		margin: "0px 0px -100px 0px",
	});

	const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
	const [initialLimit, setInitialLimit] = useState(isMobile ? 3 : 6);
	const [visibleCount, setVisibleCount] = useState(isMobile ? 3 : 6);
	const [isLoading, setIsLoading] = useState(false);
	const morphRef = useRef<HTMLSpanElement>(null);
	const morphInstance = useRef<TextMorph | null>(null);

	useEffect(() => {
		if (morphRef.current && !morphInstance.current) {
			morphInstance.current = new TextMorph({
				element: morphRef.current,
				duration: 400,
				ease: "cubic-bezier(0.4, 0, 0.2, 1)",
			});
			// Force sync initial text just in case
			morphInstance.current.update(
				visibleCount >= websites.length ? "Show Less" : "Load More Works",
			);
		}
	});

	const isAllVisible = visibleCount >= websites.length;

	useEffect(() => {
		if (morphInstance.current) {
			if (isLoading) {
				morphInstance.current.update("Loading...");
			} else {
				morphInstance.current.update(
					isAllVisible ? "Show Less" : "Load More Works",
				);
			}
		}
	}, [isLoading, isAllVisible]);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 1024;
			setInitialLimit(mobile ? 3 : 6);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleLoadMore = () => {
		setIsLoading(true);
		setTimeout(() => {
			setVisibleCount((prev) => prev + initialLimit);
			setIsLoading(false);
		}, 1000); // Ajax simulation
	};

	const handleShowLess = () => {
		setVisibleCount(initialLimit);
		if (sectionRef.current) {
			(sectionRef.current as HTMLElement).scrollIntoView({
				behavior: "smooth",
			});
		}
	};

	const visibleWebsites = websites.slice(0, visibleCount);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.98 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { type: "spring", stiffness: 100, damping: 15 },
		} as const,
	};

	return (
		<motion.section
			ref={sectionRef}
			className="relative px-6 pt-32"
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={containerVariants}
		>
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-24 space-y-4">
					<h2 className="text-5xl md:text-6xl font-bold text-white">
						Freelance <span className="text-gradient">Work</span>
					</h2>
					<p className="text-xl text-frosted-silver max-w-2xl mx-auto">
						Production web platforms and commercial client applications
					</p>
				</div>

				<motion.div
					className="grid sm:grid-cols-2 max-w-4xl lg:max-w-5xl mx-auto gap-6 lg:gap-8"
					layout
				>
					<AnimatePresence mode="popLayout">
						{visibleWebsites.map((site) => (
							<motion.a
								href={site.link}
								target="_blank"
								rel="noopener noreferrer"
								key={site.title}
								variants={cardVariants}
								initial="hidden"
								animate="visible"
								exit={{
									opacity: 0,
									y: 20,
									scale: 0.98,
									transition: { duration: 0.2 },
								}}
								layout
								className="group relative flex flex-col w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0510]/60 backdrop-blur-md hover:border-white/20 hover:bg-[#0f0919]/70 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/40"
							>
								<SpotlightBorder />

								{/* Image / Logo Container */}
								<div className="relative w-full h-44 sm:h-48 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#140b24]/50 to-[#070310]/80 flex items-center justify-center p-2">
									<img
										src={
											typeof site.image === "string"
												? site.image
												: (site.image as { src?: string }).src || ""
										}
										alt={site.title}
										className={`w-full h-full object-contain transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100 drop-shadow-md ${
											site.imageClassName ||
											"scale-110 sm:scale-115 group-hover:scale-125"
										}`}
									/>

									{/* Brief Tags inside the image container, bottom-left */}
									<div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
										{site.tags.map((tag) => (
											<span
												key={tag}
												className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/90 bg-black/65 backdrop-blur-md border border-white/10 shadow-sm"
											>
												{tag}
											</span>
										))}
									</div>
								</div>

								{/* Content Area */}
								<div className="flex flex-col grow p-6 md:p-7 space-y-3">
									<div className="flex justify-between items-center gap-2">
										<h3 className="text-xl font-semibold text-white group-hover:text-electric-violet transition-colors duration-300 tracking-tight">
											{site.title}
										</h3>
										<ArrowRight
											size={18}
											className="-rotate-45 text-slate-400 group-hover:text-electric-violet transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
										/>
									</div>
									<p className="text-sm md:text-base text-slate-400/90 leading-relaxed">
										{site.description}
									</p>
								</div>
							</motion.a>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Pagination & Load Controls */}
				{websites.length > initialLimit && (
					<motion.div
						className="mt-16 flex justify-center gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						<button
							type="button"
							onClick={isAllVisible ? handleShowLess : handleLoadMore}
							disabled={isLoading}
							className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
						>
							<SpotlightBorder radius={100} />
							<span ref={morphRef} className="relative z-10 whitespace-nowrap">
								Load More Works
							</span>
							{isLoading ? (
								<Loader2 size={18} className="relative z-10 animate-spin" />
							) : isAllVisible ? (
								<ChevronUp
									size={18}
									className="relative z-10 transition-transform group-hover:-translate-y-1"
								/>
							) : (
								<ChevronDown
									size={18}
									className="relative z-10 transition-transform group-hover:translate-y-1"
								/>
							)}
						</button>
					</motion.div>
				)}
			</div>
		</motion.section>
	);
}
