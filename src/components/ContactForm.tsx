import { Loader2, CheckCircle2, Send } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../services/api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (validateForm()) {
      setStatus('submitting');
      try {
        await submitContactForm({
          ...formData,
          website: window.location.href,
          recipient: import.meta.env.VITE_RECIPIENT
        });
        setStatus('success');
        // Reset after 3 seconds
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
      } catch (error) {
        setStatus('error');
        setErrorMessage('Failed to connect to API. Please try again.');
        setTimeout(() => setStatus('idle'), 3000);
        console.log(error);
      }
    }
  };

  const inputClasses = "w-full px-5 py-4 rounded-xl bg-metallic-slate/30 border border-white/10 text-white placeholder-slate-400 focus:border-royal-purple/70 focus:bg-metallic-slate/50 outline-none transition-all duration-300 shadow-inner";
  const labelClasses = "block text-xs font-bold text-frosted-silver/80 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="w-full relative glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
      {/* Subtle inner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-royal-purple/10 rounded-full blur-[80px] pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-violet/10 rounded-full blur-[80px] pointer-events-none -ml-32 -mb-32" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-20 text-center h-full relative z-10"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] border border-green-500/30">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h4 className="text-3xl font-bold text-gradient mb-3">Message Sent!</h4>
            <p className="text-frosted-silver text-lg">Thank you! I'll be in touch with you shortly.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className={labelClasses}>Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${inputClasses} ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone <span className="text-slate-500 lowercase font-normal">(optional)</span></label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`${inputClasses} ${errors.phone ? 'border-red-500/50 focus:border-red-500' : ''}`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`${inputClasses} ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
                placeholder="john@example.com"
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-xs text-red-400 mt-2 ml-1">
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClasses} min-h-[140px] resize-y`}
                placeholder="Tell me about your project idea..."
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-xs text-red-400 mt-2 ml-1">
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm xl:text-base text-center">
                {errorMessage}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 mt-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-royal-purple to-electric-violet hover:from-electric-violet hover:to-neon-fuchsia-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}