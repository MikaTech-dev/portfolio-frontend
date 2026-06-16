import { Globe, FileText, Gamepad2, Gift, ArrowUpRight, Users, Book, ChevronDown, ChevronUp, Loader2, Tv, Mail } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TextMorph } from 'torph';

const projects = [
  {
    title: 'Edupeerhub API',
    description:
      'RESTful tutoring platform backend with JWT role-based authentication (Student/Tutor/Admin). Features complex session booking, tutor vetting, and review systems. Integrated Stream Chat and automated email notifications for seamless communication.',
    icon: Users,
    tech: ['Node.js', 'Express', 'PostgreSQL', 'Stream Chat', 'JWT', "Edu-Tech"],
    metrics: 'Role-Based Auth',
    link: 'https://edupeerhub.com',
  },
  {
    title: 'Mini Assessment Engine (MAE)',
    description:
      'A mini assessment engine/API made with DjangoRestFramework that allows students/users to take exams, and receive instant assessments (including granular and insightful feedback via AI integration)',
    icon: Book,
    tech: ['Python', 'Django', 'AI', "SQL", "Swagger", "Edu-Tech"],
    metrics: "<3s AI Feedback latency, Open API documentation",
    link: 'https://github.com/MikaTech-dev/mini-assessment-engine',
  },
  {
    title: 'Android TV Remote',
    description:
      'A locally-hosted web app to control Android TV devices over a local network. Features a sleek remote-inspired UI and handles secure connections via a cryptographic PIN-pairing handshake.',
    icon: Tv,
    tech: ['Node.js', 'Express', 'SocketIO', 'Log4js', 'Jest', 'Supertest'],
    link: 'https://github.com/MikaTech-dev/android-tv-remote',
    metrics: 'Works as expected, via cryptographic handshake'
  },
  {
    title: 'Mailing API',
    description:
      'A robust Node.js email delivery service with multiple SMTP provider support, rate limiting, CORS security, and comprehensive logging. Perfect for applications requiring reliable email notifications and transactional emails.',
    icon: Mail,
    tech: ['Node.js', 'Express', 'SMTP', 'Log4js', 'RateLimiting', 'Dockerfile', 'Custom Auth'],
    metrics: 'Reliable Email Delivery',
    link: 'https://github.com/MikaTech-dev/mailing-api',
  },
  {
    title: 'Multiplayer Number Guessing Game',
    description:
      'A real-time multiplayer guessing game with multi-role support (host and players). Features live socket connections and continuous session tracking via MongoDB.',
    icon: Gamepad2,
    tech: ['Node.js', 'Express', 'JWT', 'WebSockets', 'Socket.io', 'MongoDB', 'EJS'],
    metrics: 'Real-time WebSockets',
    link: 'https://github.com/MikaTech-dev/number-guessing-game-js',
  },
  {
    title: 'Blog API with EJS',
    description:
      "A secure blog API with auth, draft controls, and view tracking. Users can perform CRUD operations on their posts via a clean EJS template for direct interaction.",
    icon: FileText,
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Bcrypt', 'Jest', 'Supertest', 'EJS'],
    metrics: '< 50ms API Response',
    link: 'https://github.com/MikaTech-dev/blog-app',
  },
  {
    title: 'Automated Birthday Wisher',
    description:
      'An automated mailing system, sending personalized birthday wishes at 7 AM daily using cron jobs and idempotent logic, preventing duplicates.',
    icon: Gift,
    tech: ['Node.js', 'Nodemailer', 'Cron', 'MongoDB'],
    metrics: '99.9% Delivery Rate',
    link: 'https://github.com/MikaTech-dev/birthday-reminder-app',
  },
  {
    title: 'Portfolio Site',
    description:
      'A modern, responsive portfolio website showcasing my projects and skills. Built with React and TypeScript, featuring smooth animations and optimized performance.',
    icon: Globe,
    tech: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Motion'],
    metrics: '>80%+ Lighthouse Score',
    link: 'https://github.com/MikaTech-dev/portfolio-frontend',
  }
];

export default function BackendProjects() {
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
      morphInstance.current.update(visibleCount >= projects.length ? 'Show Less' : 'Load More');
    }
  });

  const isAllVisible = visibleCount >= projects.length;

  useEffect(() => {
    if (morphInstance.current) {
      if (isLoading) {
        morphInstance.current.update('Loading...');
      } else {
        morphInstance.current.update(isAllVisible ? 'Show Less' : 'Load More');
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
    // Simulate AJAX network request delay for UX polished feel
    setTimeout(() => {
      setVisibleCount(prev => prev + initialLimit);
      setIsLoading(false);
    }, 1000);
  };

  const handleShowLess = () => {
    setVisibleCount(initialLimit);
    if (sectionRef.current) {
      (sectionRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visibleProjects = projects.slice(0, visibleCount);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 20 } as const },
    exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } }
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
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Personal <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto opacity-80">
            Experimental builds, APIs, and tools engineered for performance.
          </p>
        </div>

        {/* Grid */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="h-full"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col h-full bg-[#0a0510]/80 backdrop-blur-md border border-white/3 rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-[#0f0919] hover:-translate-y-1"
                  >
                    {/* Background Decor Component */}
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300 pointer-events-none">
                      <Icon size={100} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 grow mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-white group-hover:text-electric-violet transition-colors">
                          {project.title}
                        </h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <ArrowUpRight className="text-electric-violet" size={18} />
                        </div>
                      </div>
                      <p className="text-slate-400/90 text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Footer: Tech Stack */}
                    <div className="relative z-10 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium uppercase tracking-wider rounded border border-white/5 bg-white/5 text-slate-400 group-hover:bg-white/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Pagination & Load Controls */}
        {projects.length > initialLimit && (
          <motion.div
            className="mt-16 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={isAllVisible ? handleShowLess : handleLoadMore}
              disabled={isLoading}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-electric-violet/30 hover:text-electric-violet cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span ref={morphRef} className="relative z-10 whitespace-nowrap">Load More</span>
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
