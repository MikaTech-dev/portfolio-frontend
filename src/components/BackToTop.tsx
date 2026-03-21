import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal the button after user has scrolled past 80% of the first screen
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0a0510]/80 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl group hover:border-white/20 cursor-pointer focus:outline-none overflow-hidden"
          aria-label="Back to top"
        >
          {/* Neon hover flare effect */}
          <div className="absolute inset-0 bg-linear-to-tr from-electric-violet/0 via-electric-violet/30 to-royal-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <ArrowUp
            size={24}
            className="text-slate-400 group-hover:text-white group-hover:-translate-y-1 relative z-10"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
