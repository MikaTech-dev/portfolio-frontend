import { Globe, FileText, Gamepad2, Gift, ArrowUpRight, Cpu, Zap } from 'lucide-react';
import { motion, useInView, easeIn } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Portfolio Site',
    description:
      'A modern, responsive portfolio website showcasing projects and skills. Built with React and TypeScript, featuring smooth animations and optimized performance.',
    icon: Globe,
    tech: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Motion'],
    metrics: '100% Lighthouse Score',
    link: 'https://github.com/MikaTech-dev/portfolio-frontend',
  },
  {
    title: 'Blog App',
    description:
      "A secure blogging platform with auth, draft controls, and view tracking. Users can manage posts via a clean EJS-based frontend.",
    icon: FileText,
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'EJS'],
    metrics: '< 50ms API Response',
    link: 'https://github.com/MikaTech-dev/blog-app',
  },
  {
    title: 'Number Game',
    description:
      'Browser-based game with vanilla JS logic. Features DOM manipulation for real-time feedback and high replayability.',
    icon: Gamepad2,
    tech: ['JavaScript', 'DOM API', 'HTML5', 'CSS3'],
    metrics: 'Zero Dependencies',
    link: 'https://github.com/MikaTech-dev/number-guessing-game-js',
  },
  {
    title: 'Birthday Reminder',
    description:
      'Automated email system sending personalized wishes at 7 AM daily using cron jobs and idempotent logic to prevent duplicates.',
    icon: Gift,
    tech: ['Node.js', 'Nodemailer', 'Cron', 'MongoDB'],
    metrics: '99.9% Delivery Rate',
    link: 'https://github.com/MikaTech-dev/birthday-reminder-app',
  },
];

export default function BackendProjects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, ease: easeIn } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } as const },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen px-6 py-32"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-4">
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md"
          >
            <Cpu size={16} className="text-electric-violet" />
            <span className="text-sm font-medium text-frosted-silver tracking-wide uppercase">Lab & Experiments</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Personal <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto opacity-80">
            Experimental builds, APIs, and tools engineered for performance.
          </p>
        </div>

        {/* Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.a
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col h-full bg-[#0f0919]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:border-electric-violet/30 hover:shadow-lg hover:shadow-electric-violet/10"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <Icon size={120} />
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-royal-purple/20 blur-3xl rounded-full group-hover:bg-electric-violet/20 transition-colors duration-500" />

                {/* Top Row: Icon & External Link */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-electric-violet/50 transition-all duration-300">
                    <Icon size={24} className="text-frosted-silver group-hover:text-white transition-colors" />
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="text-electric-violet" size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-electric-violet transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Footer: Tech & Metrics */}
                <div className="relative z-10 space-y-4 mt-auto">
                  {/* Tech Stack Pill Grid */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/5 text-slate-400 border border-white/5 group-hover:border-white/10 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Line */}
                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    <Zap size={14} className="text-electric-violet" />
                    <span className="text-xs font-medium text-frosted-silver">
                      {project.metrics}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}