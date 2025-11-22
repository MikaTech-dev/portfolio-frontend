Hero
import { Github, Mail, ArrowDown, Twitter, Terminal, Minus, Square, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Hero() {
  const scrollToNext = () => {
    const element = document.getElementById('backend');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // The actual data object - easier to edit now
  const codeString = `{
  "experience": "2+ years",
  "stack": [
    "MERN",
    "PERN", 
    "WordPress"
  ],
  "mission": "Committed to continuous learning and creating a tangible impact 
  on society through technology."
}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0, 0, 1] } as const
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-20 overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-royal-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-electric-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-5xl mx-auto w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-frosted-silver tracking-wide">Online & Available</span>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2 mb-8">
          <h2 className="text-xl md:text-2xl text-electric-violet font-medium">
            Hi, I'm
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-7xl font-bold text-white tracking-tight leading-[0.9]">
            Sam-Lebechukwu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-frosted-silver to-slate-500">
              Ikenna
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 md:items-end justify-between mb-16">
          <div className="max-w-2xl w-full">
            <h3 className="text-2xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <span className="text-gradient">Backend Engineer</span>
              <span className="text-slate-600">/</span>
              <span className="text-frosted-silver">Freelancer</span>
            </h3>
            
            {/* Windows-style Terminal Window */}
            <div className="glass-card rounded-lg border border-white/10 overflow-hidden bg-[#1e1e1e] backdrop-blur-xl shadow-2xl w-full">
              {/* Windows Title Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-[#252526]">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-blue-400" />
                  <div className="text-xs text-slate-300 font-mono select-none">bio.json - Visual Studio Code</div>
                </div>
                <div className="flex items-center -mr-3">
                  <div className="px-4 py-2 hover:bg-white/10 text-slate-400 transition-colors cursor-default">
                    <Minus size={14} />
                  </div>
                  <div className="px-4 py-2 hover:bg-white/10 text-slate-400 transition-colors cursor-default">
                    <Square size={12} />
                  </div>
                  <div className="px-4 py-2 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-default">
                    <X size={14} />
                  </div>
                </div>
              </div>
              
              {/* Syntax Highlighter Content */}
              <div className="text-sm md:text-base">
                <SyntaxHighlighter 
                  language="json" 
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'transparent',
                    padding: '1.5rem',
                    margin: 0,
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 min-w-[200px]">
            <a
              href="mailto:verasamoma@gmail.com"
              className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
            >
              <span className="text-frosted-silver font-medium">Email Me</span>
              <Mail className="text-royal-purple group-hover:scale-110 transition-transform" size={20} />
            </a>
            <a
              href="https://github.com/MikaTech-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
            >
              <span className="text-frosted-silver font-medium">GitHub</span>
              <Github className="group-hover:scale-110 transition-transform" size={20} />
            </a>
            <a
              href="https://x.com/Rockarmy321"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
            >
              <span className="text-frosted-silver font-medium">Twitter</span>
              <Twitter className="group-hover:scale-110 transition-transform" size={20} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowDown size={24} className="animate-bounce" />
      </motion.button>
    </section>
  );
}