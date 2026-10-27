"use client";

import { useEffect, useState } from "react";
import BackToTop from "@/components/BackToTop";
import ContactSection from "@/components/ContactSection";
import FreelanceWork from "@/components/FreelanceWork";
import Hero from "@/components/Hero";
import InteractiveBackground from "@/components/InteractiveBackground";
import KeepAndroidOpenPopup from "@/components/KeepAndroidOpenPopup";
import Navigation from "@/components/Navigation";
import PersonalProjects from "@/components/PersonalProjects";
import StatusIndicator from "@/components/StatusIndicator";
import TechStackGrid from "@/components/TechStackGrid";

export default function Home() {
	const [activeSection, setActiveSection] = useState("hero");

	useEffect(() => {
		const handleScroll = () => {
			// Check if we hit the bottom of the page
			const isAtBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 50;
			if (isAtBottom) {
				setActiveSection("contact");
				return;
			}

			// Check sections from bottom to top order for overlapping cases
			const sections = ["contact", "freelance", "backend", "skills", "hero"];
			const scrollPosition = window.scrollY + window.innerHeight / 2;

			for (const section of sections) {
				const elementId = section === "contact" ? "contact-card" : section;
				const element = document.getElementById(elementId);

				if (element) {
					const rect = element.getBoundingClientRect();
					const top = rect.top + window.scrollY;
					const bottom = top + rect.height;

					if (scrollPosition >= top && scrollPosition < bottom) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="relative min-h-screen bg-[#0a0514] overflow-x-hidden">
			<InteractiveBackground />
			<Navigation activeSection={activeSection} />
			<StatusIndicator />

			<div id="hero">
				<Hero />
			</div>

			<section
				id="skills"
				className="relative w-full pt-8 pb-16 md:pt-10 md:pb-20"
			>
				<TechStackGrid />
			</section>

			<div id="backend">
				<PersonalProjects />
			</div>

			<div id="freelance">
				<FreelanceWork />
			</div>

			<ContactSection />

			<footer className="relative z-10 text-center text-slate-400 text-sm">
				<div className="glass-card mx-auto py-4">
					Made with 💜 by Mikatech
					<p>© {new Date().getFullYear()} All rights reserved.</p>
				</div>
			</footer>

			<BackToTop />
			<KeepAndroidOpenPopup />
		</div>
	);
}
