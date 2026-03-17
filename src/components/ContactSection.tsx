import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { useState } from 'react';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('verasamoma@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative px-6 py-32 flex flex-col items-center overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="space-y-10"
          >
            <div className="space-y-6 text-left">
              <h3 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-frosted-silver to-royal-purple leading-[1.1] tracking-tight hover:text-white transition-colors">
                Let's Build<br />Something<br />Amazing.
              </h3>
              <p className="text-frosted-silver/80 text-xl max-w-lg leading-relaxed">
                Whether you have a project in mind or just want to chat, I'm always open to discussing new opportunities and creative ideas.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-royal-purple border border-royal-purple/20 group-hover:bg-royal-purple group-hover:text-white transition-all duration-300">
                  {copied ? <Check size={24} className="text-green-400 group-hover:text-white" /> : <Mail size={24} />}
                </div>
                <div>
                  <p className="text-sm text-frosted-silver/60 font-medium uppercase tracking-wider mb-1">Email Me</p>
                  <button onClick={handleCopyEmail} className="text-lg font-medium text-white hover:text-royal-purple transition-colors cursor-pointer">
                    {copied ? <span className="text-green-400">Copied!</span> : "verasamoma@gmail.com"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
