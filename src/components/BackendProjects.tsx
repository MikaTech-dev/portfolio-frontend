import { Code } from 'lucide-react';

const projects = [
  {
    title: 'Blog App',
    description:
      "A secure, full-featured blogging platform with user authentication, draft/publish controls, reading time estimation, and view tracking. Users can create, edit, and delete their own posts via a clean EJS-based frontend.",
    icon: Code,
    tech: ['Node.js', 'Express', 'MongoDB', 'EJS', 'JWT', 'REST API', 'CRUD', 'Authentication', 'CSS'],
    metrics: 'Fast local response, simple CRUD flows, low latency for typical requests',
    link: 'https://github.com/MikaTech-dev/blog-app',
  },
  {
    title: 'Number Guessing Game',
    description:
      'An interactive browser-based game where players guess a randomly generated number within a limited number of attempts. Built with vanilla JavaScript for DOM manipulation and game logic, offering real-time feedback and replayability.',
    icon: Code,
    tech: ['HTML', 'CSS', 'JavaScript', 'DOM API', 'Frontend', 'Game Logic'],
    metrics: 'Instant client-side feedback, lightweight assets, fast load times',
    link: 'https://github.com/MikaTech-dev/number-guessing-game-js',
  },
  {
    title: 'Birthday Reminder App',
    description:
      'An automated email system that sends personalized birthday wishes at 7 AM daily. Features a simple UI to manage contacts, tracks sent emails to avoid duplicates, and uses a cron job to trigger daily checks.',
    icon: Code,
    tech: ['Node.js', 'Express', 'MongoDB', 'Gmail API', 'Nodemailer', 'Cron Jobs', 'REST API', 'dotenv'],
    metrics: 'Daily scheduled jobs, reliable delivery via SMTP, idempotent sends to avoid duplicates',
    link: 'https://github.com/MikaTech-dev/birthday-reminder-app',
  },
];

export default function BackendProjects() {
  return (
    <section className="relative min-h-screen px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Backend <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto">
            Projects I've worked on; APIs, automations, and other services built for performance and functiionality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <a
                key={index}
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
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
