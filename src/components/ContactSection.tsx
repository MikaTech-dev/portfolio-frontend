import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <section className="relative px-6 py-32 flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="relative"
          id="contact-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-electric-violet/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative glass-card rounded-[2.5rem] p-12 md:p-16 overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal-purple/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-fuchsia-glow/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                Wanna talk business?
              </h3>

              <p className="text-frosted-silver text-xl max-w-xl mx-auto leading-relaxed opacity-90">
                Hit the button below, fill out the form, and I'll get back to you within 12 hours :3
              </p>

              <button
                onClick={() => setIsContactFormOpen(true)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 font-bold text-lg btn-glow cursor-pointer shadow-xl shadow-royal-purple/10 hover:shadow-electric-violet/20"
              >
                <span>Contact me!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </section>
  );
}
