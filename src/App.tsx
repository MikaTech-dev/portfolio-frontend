import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BackendProjects from './components/BackendProjects';
import FreelanceWork from './components/FreelanceWork';
import ContactSection from './components/ContactSection';
import Navigation from './components/Navigation';
import InteractiveBackground from './components/InteractiveBackground';
import StatusIndicator from './components/StatusIndicator';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Check if we hit the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Check sections from bottom to top order for overlapping cases
      const sections = ['contact', 'freelance', 'backend', 'hero'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const elementId = section === 'contact' ? 'contact-card' : section;
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      <InteractiveBackground />
      <Navigation activeSection={activeSection} />
      <StatusIndicator />

      <div id="hero">
        <Hero />
      </div>

      <div id="backend">
        <BackendProjects />
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
      <Analytics />
    </div>
  );
}

export default App;
