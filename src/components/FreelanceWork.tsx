import { NotebookPen, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import caseImage from '../assets/CASE PROPERTIES LOGO.jpg'

const websites = [
  {
    title: 'Case Properties - Blog',
    description: 'A monetized community platform with Google Adsense, social funnels, and interactive user feedback systems.',
    icon: NotebookPen,
    image: caseImage,
    category: 'Blog & Community',
    link: 'https://frantic-case.vercel.app',
    color: 'from-orange-500/20 to-orange-900/20',
    accent: 'text-orange-400'
  },
];

export default function FreelanceWork() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } as const,
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative px-6 pt-32"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Freelance <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto">
            Selected works delivering high-performance web solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {websites.map((site, index) => {
            const Icon = site.icon;
            return (
              <motion.a
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                variants={cardVariants}
                className="group relative flex flex-col h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden border border-white/5 bg-[#0f0919] hover:border-white/10 transition-all duration-500 shadow-2xl shadow-black/50"
              >
                {/* Clean Image Background */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0514] via-[#0a0514]/60 to-transparent" />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col h-full p-8 justify-between">
                  {/* Top Bar */}
                  <div className="flex items-start">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-md shadow-sm">
                      <Icon size={14} className={site.accent} />
                      <span className="text-xs font-semibold text-slate-200 uppercase tracking-widest">
                        {site.category}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="mt-auto flex flex-col gap-3 transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {site.title}
                    </h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
                      {site.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300 pt-2">
                      <span>Visit Site</span>
                      <ArrowRight size={16} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
