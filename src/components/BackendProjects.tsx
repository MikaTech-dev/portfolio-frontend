import { Globe, FileText, Gamepad2, Gift } from 'lucide-react';
import { motion, useInView, easeIn } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Portfolio Site',
    description:
      'A modern, responsive portfolio website showcasing projects and skills. Built with React and TypeScript, featuring smooth animations, a glassmorphism based design, optimized for performance via Vite.',
    icon: Globe,
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design', 'Modern UI'],
    metrics: 'Fast load times, mobile-optimized, smooth animations, SEO-friendly',
    link: 'https://github.com/MikaTech-dev/portfolio-frontend',
  },
  {
    title: 'Blog App',
    description:
      "A secure, full-featured blogging platform with user authentication, draft/publish controls, reading time estimation, and view tracking. Users can create, edit, and delete their own posts via a clean EJS-based frontend.",
    icon: FileText,
    tech: ['Node.js', 'Express', 'MongoDB', 'EJS', 'JWT', 'REST API', 'CRUD', 'Authentication', 'CSS'],
    metrics: 'Fast local response, simple CRUD flows, low latency for typical requests',
    link: 'https://github.com/MikaTech-dev/blog-app',
  },
  {
    title: 'Number Guessing Game',
    description:
      'An interactive browser-based game where players guess a randomly generated number within a limited number of attempts. Built with vanilla JavaScript for DOM manipulation and game logic, offering real-time feedback and replayability.',
    icon: Gamepad2,
    tech: ['HTML', 'CSS', 'JavaScript', 'DOM API', 'Frontend', 'Game Logic'],
    metrics: 'Instant client-side feedback, lightweight assets, fast load times',
    link: 'https://github.com/MikaTech-dev/number-guessing-game-js',
  },
  {
    title: 'Birthday Reminder App',
    description:
      'An automated email system that sends personalized birthday wishes at 7 AM daily. Features a simple UI to manage contacts, tracks sent emails to avoid duplicates, and uses a cron job to trigger daily checks.',
    icon: Gift,
    tech: ['Node.js', 'Express', 'MongoDB', 'Gmail API', 'Nodemailer', 'Cron Jobs', 'REST API', 'dotenv'],
    metrics: 'Daily scheduled jobs, reliable delivery via SMTP, idempotent sends to avoid duplicates',
    link: 'https://github.com/MikaTech-dev/birthday-reminder-app',
  },
];

export default function BackendProjects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0, ease: easeIn } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.3,0.09,0,1] as const } },
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
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Personal <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto">
            Projects I've worked on; Sites, APIs, automations, and other services built for performance and functiionality.
          </p>
        </div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.a
                key={index}
                variants={itemVariants}
                whileHover={{ y: -20 }}
                transition={{ duration: 0.1, ease: easeIn }}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass-card-hover rounded-2xl p-8 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 relative">
                  <div className="glass-card w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-royal-purple" />
                  </div>
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-2xl blur-xl group-hover:blur-2xl transition-all" style={{ backgroundColor: 'rgba(94,58,255,0.14)' }} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-royal-purple transition-colors">
                  {project.title}
                </h3>

                <p className="text-frosted-silver mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-royal-purple border"
                        style={{ borderColor: 'rgba(94,58,255,0.12)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-slate-400 font-medium">
                      {project.metrics}
                    </p>
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