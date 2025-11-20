import { X, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await submitContactForm(formData);
        setFormData({ name: '', email: '', phone: '', message: '' });
        onClose();
      } catch (error) {
        setSubmitError('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12 }}
    >
      <motion.div
        ref={modalRef}
        className="w-full max-w-lg mx-4 glass-card rounded-2xl p-8"
        initial={{ opacity: 0, y: 18, backgroundColor: 'rgba(227,224,255,0.03)' }}
        animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(201,78,255,0.08)' }}
        transition={{ duration: 0.18 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Contact Me</h3>
          <button
            onClick={onClose}
            className="text-frosted-silver hover:text-royal-purple transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-frosted-silver mb-2">
              Name <span className="text-royal-purple">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full glass-card px-4 py-2 rounded-lg text-frosted-silver bg-white/5 border border-white/10 focus:border-royal-purple focus:outline-none transition-colors"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-sm text-red-400 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-frosted-silver mb-2">
              Email <span className="text-royal-purple">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full glass-card px-4 py-2 rounded-lg text-frosted-silver bg-white/5 border border-white/10 focus:border-royal-purple focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-frosted-silver mb-2">
              Phone Number <span className="text-metallic-slate">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full glass-card px-4 py-2 rounded-lg text-frosted-silver bg-white/5 border border-white/10 focus:border-royal-purple focus:outline-none transition-colors"
              placeholder="+1 (234) 567-8900"
            />
            {errors.phone && (
              <p className="text-sm text-red-400 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-frosted-silver mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full glass-card px-4 py-2 rounded-lg text-frosted-silver bg-white/5 border border-white/10 focus:border-royal-purple focus:outline-none transition-colors min-h-[120px] resize-y"
              placeholder="What would you like to discuss?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full glass-card-hover px-6 py-3 rounded-lg text-lg font-medium text-royal-purple border-2 
              ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'border-royal-purple/30 hover:border-royal-purple/50'} 
              transition-colors flex items-center justify-center gap-2 cursor-pointer`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
          {submitError && (
            <p className="text-red-400 text-sm text-center mt-4">{submitError}</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}