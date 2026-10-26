"use client";

import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import ContactForm from "./ContactForm";
import SpotlightBorder from "./SpotlightBorder";
import Tooltip from "./Tooltip";

export default function ContactSection() {
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = (e: React.MouseEvent) => {
		e.preventDefault();
		navigator.clipboard.writeText("kendoestech01@gmail.com");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section
			className="relative px-6 py-32 flex flex-col items-center overflow-hidden"
			id="contact"
		>
			<div className="max-w-7xl mx-auto w-full relative">
				<div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{
							type: "spring",
							stiffness: 90,
							damping: 25,
							delay: 0.2,
						}}
						className="space-y-10"
					>
						<div className="space-y-6 text-left">
							<h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-royal-purple/80 leading-[1.15] tracking-tight hover:text-white transition-colors">
								Want to Build
								<br />
								Something
								<br />
								Together?
							</h3>
							<p className="text-slate-400/90 text-[15px] md:text-base max-w-lg leading-relaxed">
								Whether you have a project in mind, an engineering role, or just
								want to talk tech, my inbox is open.
							</p>
						</div>

						<div className="space-y-6 pt-2">
							<div className="relative group inline-block">
								<button
									type="button"
									onClick={handleCopyEmail}
									className="group relative flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/5 bg-[#0a0510]/50 hover:bg-white/5 hover:border-white/10 transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none overflow-hidden"
								>
									<SpotlightBorder radius={90} />
									{copied ? (
										<Check size={18} className="text-green-500 relative z-10" />
									) : (
										<Copy
											size={18}
											className="text-slate-400 group-hover:text-white transition-colors relative z-10"
										/>
									)}
									<span
										className={`text-base tracking-wide font-medium transition-colors relative z-10 ${copied ? "text-green-400" : "text-slate-300 group-hover:text-white"}`}
									>
										{copied
											? "kendoestech01@gmail.com copied!"
											: "kendoestech01@gmail.com"}
									</span>
								</button>

								{/* Tooltip */}
								{!copied && <Tooltip text="Click to copy" />}
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{
							type: "spring",
							stiffness: 90,
							damping: 25,
							delay: 0.4,
						}}
					>
						<ContactForm />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
