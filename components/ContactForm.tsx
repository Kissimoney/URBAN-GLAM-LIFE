
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { sendContactEmail } from '../utils/emailService';

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    engagementType: 'Brand Ambassadorship',
    message: '',
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setStatus({ type: null, message: '' });

    // Validate
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name' });
      return;
    }

    if (!formData.email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email' });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please enter your project brief' });
      return;
    }

    // Submit to Supabase
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            engagement_type: formData.engagementType,
            message: formData.message
          }
        ]);

      if (error) throw error;

      // Send Email Notification
      await sendContactEmail({
        user_name: formData.name,
        user_email: formData.email,
        engagement_type: formData.engagementType,
        message: formData.message,
        to_email: 'hello@urbanglam.life' // Admin email (or configured in template)
      }).catch(err => console.error('Email notification failed:', err));

      setStatus({ type: 'success', message: 'Inquiry Transmitted Successfully' });
      // Clear form on success
      setFormData({
        name: '',
        email: '',
        engagementType: 'Brand Ambassadorship',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ type: 'error', message: 'Transmission Failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-900/40 -skew-x-12 transform origin-top-right"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start max-w-6xl mx-auto">

          {/* LEFT SIDE: Info */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold mb-4 italic">Strategic Partnerships</h2>
            <h3 className="text-5xl md:text-6xl font-serif mb-10 leading-tight">Exclusive <br />Concierge</h3>

            <div className="space-y-10">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black mb-4">Availability</p>
                <p className="text-neutral-400 text-sm leading-relaxed">Currently accepting high-fashion collaborations and select international event appearances for Q3 & Q4 2024.</p>
              </div>

              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black mb-4">Response Time</p>
                <p className="text-neutral-400 text-sm leading-relaxed">Our concierge team typically responds to strategic inquiries within 48 business hours.</p>
              </div>

              <div className="pt-10 border-t border-white/5">
                <p className="text-[10px] text-gold tracking-[0.5em] font-black uppercase mb-2 italic">Direct Inquiry</p>
                <p className="text-2xl font-serif text-white">hello@urbanglam.life</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-neutral-900/80 p-10 md:p-16 border border-white/10 backdrop-blur-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="group space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-500 group-focus-within:text-gold transition-colors">Client Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border-b border-white/10 px-0 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/0 transition-all duration-500 text-white placeholder-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="E.g. Alexander McQueen PR"
                  />
                </div>
                <div className="group space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-500 group-focus-within:text-gold transition-colors">Email Channel</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border-b border-white/10 px-0 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/0 transition-all duration-500 text-white placeholder-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="contact@brand.com"
                  />
                </div>
              </div>

              <div className="group mb-10 space-y-3">
                <label className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-500 group-focus-within:text-gold transition-colors">Engagement Type</label>
                <div className="relative">
                  <select
                    name="engagementType"
                    value={formData.engagementType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-black/40 border-b border-white/10 px-0 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/0 transition-all duration-500 text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option className="bg-neutral-900">Brand Ambassadorship</option>
                    <option className="bg-neutral-900">High-Fashion Editorial</option>
                    <option className="bg-neutral-900">Global Event Appearance</option>
                    <option className="bg-neutral-900">Lifestyle Strategic Partnership</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold/40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  </div>
                </div>
              </div>

              <div className="group mb-12 space-y-3">
                <label className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-500 group-focus-within:text-gold transition-colors">Project Brief</label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full bg-black/40 border-b border-white/10 px-0 py-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/0 transition-all duration-500 text-white resize-none placeholder-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Outline your vision for the collaboration..."
                ></textarea>
              </div>

              <div className="flex flex-col items-center">
                <button
                  disabled={isSubmitting}
                  className={`group relative overflow-hidden bg-gold text-black font-black py-6 px-16 uppercase tracking-[0.6em] text-[10px] transition-all duration-700 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? 'Transmitting...' : 'Initiate Inquiry'}
                  </span>

                  {/* BUTTON GLINT */}
                  <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full animate-[shimmer_3s_infinite] transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"></div>
                </button>


                {/* Status Messages */}
                {status.type && (
                  <div className={`mt-8 p-6 border ${status.type === 'success' ? 'border-gold/30 bg-gold/5' : 'border-red-500/30 bg-red-500/5'} animate-in fade-in slide-in-from-bottom-4 duration-500 w-full text-center rounded-lg`}>
                    <p className={`${status.type === 'success' ? 'text-gold' : 'text-red-400'} text-xs tracking-[0.2em] uppercase font-bold`}>
                      {status.message}
                    </p>
                    {status.type === 'success' && (
                      <p className="text-neutral-500 text-[10px] mt-2 tracking-wide uppercase">
                        We'll respond within 48 business hours.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
