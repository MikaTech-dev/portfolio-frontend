import { NotebookPen, ArrowRight, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TextMorph } from 'torph';
import caseImage from '../assets/CASE PROPERTIES LOGO.jpg'
import klaroImage from '../assets/klaro-logo.png'

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
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
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
          ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        });
        // Force sync initial text just in case
        morphInstance.current.update(visibleCount >= websites.length ? 'Show Less' : 'Load More Works');
      }
    });

    const isAllVisible = visibleCount >= websites.length;

    useEffect(() => {
      if (morphInstance.current) {
        if (isLoading) {
          morphInstance.current.update('Loading...');
        } else {
          morphInstance.current.update(isAllVisible ? 'Show Less' : 'Load More Works');
        }
      }
    }, [isLoading, isAllVisible]);

    useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        setInitialLimit(mobile ? 3 : 6);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLoadMore = () => {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount(prev => prev + initialLimit);
        setIsLoading(false);
      }, 1000); // Ajax simulation
    };

    const handleShowLess = () => {
      setVisibleCount(initialLimit);
      if (sectionRef.current) {
          (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    };

    const visibleWebsites = websites.slice(0, visibleCount);

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

                <motion.div className="grid lg:grid-cols-2 gap-10" layout>
                    <AnimatePresence mode="popLayout">
                    {visibleWebsites.map((site) => {
                        const Icon = site.icon;
                        return (
                            <motion.a
                                href={site.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={site.title}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } }}
                                layout
                                className="group relative flex flex-col w-full rounded-2xl overflow-hidden border border-white/5 bg-[#0a0510]/80 backdrop-blur-md hover:border-white/10 hover:bg-[#0f0919] hover:-translate-y-1 transition-all duration-300 shadow-2xl shadow-black/50"
                            >
                                {/* Image Container */}
                                <div className="relative w-full h-[240px] md:h-[280px] overflow-hidden border-b border-white/5 bg-[#05020a]">
                                    <img
                                        src={site.image}
                                        alt={site.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    {/* Category Tag */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#0a0510]/80 backdrop-blur-md shadow-sm">
                                        <Icon size={14} className={site.accent} />
                                        <span className="text-xs font-semibold text-slate-200 uppercase tracking-widest">
                                            {site.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Wrapper */}
                                <div className="flex flex-col grow p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-semibold text-white group-hover:text-electric-violet transition-colors duration-300 tracking-tight">
                                            {site.title}
                                        </h3>
                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-electric-violet">
                                            <ArrowRight size={20} className="-rotate-45" />
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                                        {site.description}
                                    </p>
                                </div>
                            </motion.a>
                        );
                    })}
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
                      onClick={isAllVisible ? handleShowLess : handleLoadMore}
                      disabled={isLoading}
                      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-electric-violet/30 hover:text-electric-violet cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span ref={morphRef} className="relative z-10 whitespace-nowrap">Load More Works</span>
                      {isLoading ? (
                        <Loader2 size={18} className="relative z-10 animate-spin" />
                      ) : isAllVisible ? (
                        <ChevronUp size={18} className="relative z-10 transition-transform group-hover:-translate-y-1" />
                      ) : (
                        <ChevronDown size={18} className="relative z-10 transition-transform group-hover:translate-y-1" />
                      )}
                    </button>
                  </motion.div>
                )}
            </div>
        </motion.section>
    );
}
