import { Loader2, CheckCircle2, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../services/api';
import { useSnackbar } from 'notistack';
import { TextMorph } from 'torph';

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const morphRef = useRef<HTMLSpanElement>(null);
  const morphInstance = useRef<TextMorph | null>(null);

  useEffect(() => {
    if (morphRef.current && !morphInstance.current) {
      morphInstance.current = new TextMorph({
        element: morphRef.current,
        duration: 800,
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      });
    }
  }, []);

  useEffect(() => {
    if (morphInstance.current) {
      let nextText = 'Send Message';
      if (status === 'submitting') nextText = 'Sending...';
      else if (status === 'success') nextText = 'Sent!';

      morphInstance.current.update(nextText);
    }
  }, [status]);

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

    if (validateForm()) {
      setStatus('submitting');
      try {
        await submitContactForm({
          ...formData,
          website: window.location.href,
          recipient: import.meta.env.VITE_RECIPIENT
        });
        setStatus('success');
        enqueueSnackbar('Message sent! I will be in touch shortly.', { variant: 'success' });
        // Reset after 3 seconds
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
      } catch (error) {
        setStatus('idle');
        enqueueSnackbar(error instanceof Error ? error.message : 'Failed to connect to API. Please try again.', { variant: 'error' });
        console.log(error);
      }
    }
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-xl bg-[#0a0510]/50 border border-white/5 text-white text-base placeholder-slate-500 focus:border-electric-violet/50 focus:bg-[#0f0919] outline-none transition-colors duration-300";
  const labelClasses = "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <div className="w-full relative p-6 md:p-8 rounded-2xl border border-white/3 bg-[#0a0510]/80 backdrop-blur-md shadow-2xl overflow-hidden hover:border-white/10 transition-colors duration-300">      <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
          className="flex flex-col items-center justify-center py-20 text-center h-full relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
            <CheckCircle2 size={40} className="text-green-400" />
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
          <p className="text-slate-400/90 text-sm">Thank you! I'll be in touch with you shortly.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
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
                placeholder="Tung Tung Sahur"
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
                placeholder="+2348067420987"
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
              placeholder="mcfartson01@proton.me"
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
              placeholder="What's on your mind?"
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-xs text-red-400 mt-2 ml-1">
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3.5 mt-4 rounded-xl font-medium text-base text-white bg-white/5 border border-white/5 hover:bg-white/10 hover:text-electric-violet hover:border-electric-violet/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group cursor-pointer"
          >
            {status === 'submitting' && <Loader2 size={20} className="animate-spin" />}
            <span ref={morphRef}>Send Message</span>
            {status !== 'submitting' && <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
    </div>
  );
}