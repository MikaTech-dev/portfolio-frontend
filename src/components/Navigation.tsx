import { Menu, User, Code, Briefcase, Mail, X, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to adjust transparency/padding if needed
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    let element: Element | null = null;
    if (sectionId === 'contact') {
      element = document.getElementById('contact-card');
    } else {
      element = document.getElementById(sectionId);
    }
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'About', icon: User },
    { id: 'backend', label: 'Projects', icon: Code },
    { id: 'freelance', label: 'Freelance', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
    >
      <div className="pointer-events-auto w-full max-w-5xl relative">
        
        {/* Main Bar */}
        <div className={`
          relative flex items-center justify-between px-6 py-3 rounded-full 
          transition-all duration-500 ease-in-out border border-white/10
          ${scrolled || mobileMenuOpen ? 'bg-[#0f0919]/80 backdrop-blur-xl shadow-lg shadow-purple-900/10' : 'bg-[#0f0919]/40 backdrop-blur-md'}
        `}>
          
          {/* Logo - Switched to Mono font for "Backend/Dev" feel */}
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-electric-violet/50 transition-colors">
              <Terminal size={16} className="text-electric-violet" />
            </div>
            <span className="font-mono font-bold text-lg text-white tracking-tight">
              Mikatech<span className="text-electric-violet">.dev</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10
                    ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-frosted-silver hover:text-white transition-colors relative z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-[#0f0919]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                        ${isActive 
                          ? 'bg-electric-violet/10 text-electric-violet' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="mobile-dot" 
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-electric-violet" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}