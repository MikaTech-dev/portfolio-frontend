import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BackendProjects from './components/BackendProjects';
import FreelanceWork from './components/FreelanceWork';
import Navigation from './components/Navigation';
import FloatingShapes from './components/FloatingShapes';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'backend', 'freelance'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      <FloatingShapes />
      <Navigation activeSection={activeSection} />

      <div id="hero">
        <Hero />
      </div>

      <div id="backend">
        <BackendProjects />
      </div>

      <div id="freelance">
        <FreelanceWork />
      </div>

      <footer className="relative z-10 text-center text-slate-400 text-sm">
        <div className="glass-card mx-auto py-4">
          Made with 💜 by Mikatech
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
