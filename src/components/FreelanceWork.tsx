import { ExternalLink, NotebookPen, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { easeIn, motion, useInView } from 'framer-motion';
import ContactForm from './ContactForm';
import caseImage from '../assets/CASE PROPERTIES LOGO.jpg'

const websites = [
  {
    title: 'Case Properties - Blog',
    description: 'A monetized community platform with Google Adsense, social funnels, and interactive user feedback systems.',
    icon: NotebookPen,
    image: caseImage,
    category: 'Blog & Community',
    link: 'https://frantic-case.vercel.app',
    color: 'from-orange-500/20 to-orange-900/20',
    accent: 'text-orange-400'
  },
];

export default function FreelanceWork() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, ease: easeIn } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.2, 0, 0, 1] } } as const,
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
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Freelance <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto">
            Selected works delivering high-performance web solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-32">
          {websites.map((site, index) => {
            const Icon = site.icon;
            return (
              <motion.a
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                variants={cardVariants}
                className="group relative h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-deep-midnight cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${site.color} mix-blend-overlay opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C102E] via-[#1C102E]/80 to-transparent opacity-90" />
                </div>

                <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                  <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 border border-white/5 backdrop-blur-xl">
                    <Icon size={14} className={site.accent} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{site.category}</span>
                  </div>

                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center border border-white/5 group-hover:text-deep-midnight transition-all duration-300">
                    <ExternalLink size={20} className="transition-transform group-hover:rotate-45" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="glass-card p-6 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md">
                    <h3 className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
                      {site.title}
                    </h3>
                    <p className="text-frosted-silver text-lg leading-relaxed opacity-90">
                      {site.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-bold text-electric-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>Visit Website</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div 
          className="mt-50 relative" 
          id="contact-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-electric-violet/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative glass-card rounded-[2.5rem] p-12 md:p-16 overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal-purple/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-fuchsia-glow/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <Sparkles size={16} className="text-electric-violet" />
                <span className="text-sm font-medium text-frosted-silver tracking-wide uppercase">Open for Commissions</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Wanna talk <br />
                <span className="text-electric-violet">business?</span>
              </h3>
              
              <p className="text-frosted-silver text-xl max-w-xl mx-auto leading-relaxed opacity-90">
                Click the button below, fill out the form, and I'll get back to you within 12 hours :3
              </p>

              <button
                onClick={() => setIsContactFormOpen(true)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-royal-purple/30 font-bold text-lg btn-glow cursor-pointer"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <ContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </motion.section>
  );
}