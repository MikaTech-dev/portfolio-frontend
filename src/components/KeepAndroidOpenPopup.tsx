import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone } from 'lucide-react';

export default function KeepAndroidOpenPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    // Check if previously dismissed
    const isDismissed = localStorage.getItem('kao-banner-dismissed');
    if (!isDismissed) {
      // Delay entrance to not overwhelm page load
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    // Approximating date shown in screenshot (+149 days from early April 2026)
    const targetDate = new Date('2026-09-01T00:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) return;

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ d, h, m, s });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('kao-banner-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 pointer-events-auto group"
        >
          <div className="relative flex items-center bg-[#0f0919]/80 hover:bg-[#150d23] transition-all backdrop-blur-xl border border-white/10 shadow-2xl shadow-electric-violet/20 rounded-full overflow-hidden">
            {/* Clickable Area */}
            <a
              href="https://keepandroidopen.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-4 py-3 px-5 pr-14 sm:py-3.5 sm:px-6 sm:pr-16"
            >
              <div className="relative flex items-center justify-center shrink-0">
                <Smartphone size={18} className="text-slate-300 group-hover:text-electric-violet transition-colors sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-sm font-semibold text-slate-200 tracking-wide">
                  Google will <br className='sm:hidden' />
                  lock Android in:
                </span>
                <span className="font-mono text-sm sm:text-[15px] font-medium text-white shadow-sm">
                  {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                </span>
              </div>

              <div className="w-px h-4 bg-white/20 ml-1 hidden sm:block"></div>

              <span className="hidden sm:inline-flex text-[11px] uppercase tracking-[0.2em] font-bold text-electric-violet group-hover:text-white transition-colors ml-1 items-center gap-1">
                Details &rarr;
              </span>
            </a>

            {/* Close Button positioned independently from the link */}
            <button
              onClick={handleDismiss}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
