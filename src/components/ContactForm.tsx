import { X, Loader2, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '../services/api';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const modalRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (status !== 'submitting') onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, status]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen && status === 'success') {
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 500);
    }
  }, [isOpen]);

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (validateForm()) {
      setStatus('submitting');
      try {
        await submitContactForm(formData);
        setStatus('success');
        // Auto close after success animation
        setTimeout(() => {
          onClose();
        }, 2500);
      } catch (error) {
        setStatus('error');
        setErrorMessage('Failed to connect to API. Please check your internet or try again later.');
        setTimeout(() => setStatus('idle'), 3000);
        console.log(error);
        
      }
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-[#0f0919]/60 border border-white/10 text-white placeholder-slate-500 focus:border-electric-violet/50 focus:ring-1 focus:ring-electric-violet/50 focus:bg-[#0f0919]/80 outline-none transition-all duration-300";
  const labelClasses = "block text-xs font-bold text-frosted-silver uppercase tracking-wider mb-2 ml-1";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 backdrop-blur-md bg-[#0f0919]/60 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="w-full max-w-lg relative"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          >
            {/* Glow Effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-electric-violet/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-royal-purple/30 rounded-full blur-3xl pointer-events-none" />

            <div className="glass-card relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#1C102E]/80">
              {/* Decorative Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-purple via-electric-violet to-neon-fuchsia-glow" />

              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                      Let's Connect<Sparkles size={20} className="text-electric-violet" />
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">There's no rush... If the message doesn't go through, you can reach out to me at <a href="mailto:verasamoma@gmail.com" className='underline'>verasamoma@gmail.com</a></p>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={status === 'submitting'}
                    className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 flex flex-col items-center text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} className="text-green-400" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                      <p className="text-slate-300">I'll get back to you within 12 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                    >
                      <div className="grid md:grid-cols-2 gap-5">
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
                          <label htmlFor="phone" className={labelClasses}>Phone <span className="text-slate-600 lowercase font-normal">(optional)</span></label>
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
                            <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="text-xs text-red-400 mt-1 ml-1">
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
                          className={`${inputClasses} min-h-[120px] resize-y`}
                          placeholder="Tell me about your project idea..."
                        />
                      </div>

                      {status === 'error' && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
                          {errorMessage}
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-royal-purple to-electric-violet btn-glow shadow-lg shadow-royal-purple/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-2 cursor-pointer"
                      >
                        {status === 'submitting' ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}