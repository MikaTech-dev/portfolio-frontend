import { ExternalLink, ShoppingCart, NotebookPen } from 'lucide-react';
import { useState, useRef } from 'react';
import { easeIn, easeInOut, motion, useInView } from 'framer-motion';
import ContactForm from './ContactForm';
import caseImage from '../assets/CASE PROPERTIES LOGO.jpg'

const websites = [
  {
    title: 'Naturecare - Store',
    description: 'High-end e-commerce site with modern designs, SEO optimization, and a seamless checkout experience with paystack integration.',
    icon: ShoppingCart,
    image: 'https://naturecaresands.com.ng/wp-content/uploads/2025/10/nature-care-logo-photopea.png',
    category: 'E-Commerce',
    link: 'https://naturecaresands.com.ng',
  },
  {
    title: 'Case Properties - Blog',
    description: 'Designing to build a monetized blog/community website for Case Properties with Google Adsense integration, community feedback (comments), social media funnels and later a merch store.',
    icon: NotebookPen,
    image: caseImage,
    category: 'Blog',
    link: 'https://frantic-case.vercel.app',
  },
];

export default function FreelanceWork() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.4, delayChildren: 0, ease: easeIn } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0, 0, 1] as const } },
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
            Freelance <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-frosted-silver max-w-2xl mx-auto">
            All the stunning websites I've built for all my clients worldwide
          </p>
        </div>

        <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
          {websites.map((site, index) => {
            const Icon = site.icon;
            return (
              <motion.a
                href={site.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.1, ease: easeInOut }}
                className="glass-card-hover rounded-3xl overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,16,46,1), rgba(28,16,46,0.5), rgba(28,16,46,0))' }} />

                  <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full flex items-center gap-2">
                    <Icon size={16} className="text-royal-purple" />
                    <span className="text-sm text-frosted-silver font-medium">{site.category}</span>
                  </div>

                  <div className="absolute top-4 left-4 glass-card w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ExternalLink size={20} className="text-royal-purple" />
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-royal-purple transition-colors">
                    {site.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed">
                    {site.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        <div className="mt-16 text-center" id="contact-card">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to contact me?
            </h3>
            <p className="text-slate-300 mb-6">
              Click the button below, fill and submit the form and I'll get back to you within 12 Hours :3
            </p>
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="inline-block glass-card-hover px-8 py-4 rounded-full text-lg font-medium text-royal-purple border-2 border-royal-purple/30 cursor-pointer"
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </div>

      <ContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </motion.section>
  );
}
