import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    let element: Element | null = null;
    
    if (sectionId === 'contact') {
      // For contact, scroll to the contact card which is more specific
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
    { id: 'hero', label: 'About me' },
    { id: 'backend', label: 'Projects' },
    { id: 'freelance', label: 'Freelance stuff' },
    { id: 'contact', label: 'Contact me' },
  ];

  const customEase = [0.2, 0, 0, 1] as const
  const navVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: customEase } },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold text-gradient hover:scale-105 transition-transform cursor-pointer"
          >
            Mikatech.dev
          </button>

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-purple-400 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-electric-violet scale-110'
                    : 'text-frosted-silver'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-frosted-silver hover:text-electric-violet transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 glass-card rounded-2xl p-4 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-3 px-4 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'text-electric-violet bg-white/10'
                    : 'text-frosted-silver hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.nav>
  );
}
