import { Github, Mail, ArrowDown, Twitter } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  const scrollToNext = () => {
    const element = document.getElementById('backend');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="max-w-6xl my-15 mx-auto w-full flex-grow">
        <div className="grid md:grid-cols-1 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4">
              <div className="text-electric-violet text-xl font-semibold mb-2">Hi, I'm</div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Sam-Lebechukwu Ikenna
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Backend Engineer & Freelance Developer
              </h2>
                <p className="text-xl text-frosted-silver leading-relaxed">
                Crafting APIs and delivering seamless digital experiences with real-world
                applications.
                </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:verasamoma@gmail.com"
                className="glass-card-hover px-6 py-3 rounded-full flex items-center gap-2 text-frosted-silver"
              >
                <Mail size={20} />
                <span>Get in Touch</span>
              </a>
              <a
                href="https://github.com/MikaTech-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover px-6 py-3 rounded-full flex items-center gap-2 text-frosted-silver"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/Rockarmy321"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover px-6 py-3 rounded-full flex items-center gap-2 text-frosted-silver"
              >
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
            </div>

            <div className="glass-card rounded-2xl p-6 space-y-3">
              <h3 className="text-electric-violet font-semibold text-2xl">About Me</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                So far, with over 2 years of experience building backend systems and delivering
                pixel-perfect websites that actually convert. One of many of my goals is to bridge the gap between 
                technological applications and creative vision, all while maintaining affordability and accessibility 
                in markets that otherwise aren't. 
                My approach combines system design thinking and efficiency with attention to detail,
                ensuring every project is both powerful and polished.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <button
        onClick={scrollToNext}
        className="mt-10 mb-5 -translate-x-1/2 text-frosted-silver hover:text-electric-violet transition-colors animate-bounce cursor-pointer"
      >
        <ArrowDown size={32} />
      </button>
    </motion.section>
  );
}
