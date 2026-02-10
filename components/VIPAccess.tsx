
import React, { useState } from 'react';
import { sendVIPSignup, isValidEmail } from '../utils/emailService';
import { supabase } from '../utils/supabaseClient';

const VIPAccess: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setStatus({ type: null, message: '' });

    // Validate email
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }

    if (!isValidEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    // Submit
    setIsSubmitting(true);

    // Save to Supabase
    try {
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          {
            email,
            source: 'vip_access'
          }
        ]);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
      }
    } catch (err) {
      console.error('Error saving to database:', err);
    }

    const result = await sendVIPSignup(email);
    setIsSubmitting(false);

    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setEmail(''); // Clear form on success
    } else {
      setStatus({ type: 'error', message: result.message });
    }
  };

  return (
    <section id="vip" className="py-40 bg-neutral-950 relative overflow-hidden">
      {/* Decorative Text Stroke */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter uppercase italic">
        Elite
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gold uppercase tracking-[1.5em] text-[10px] font-black mb-12 italic">The Inner Circle</h2>
          <h3 className="text-5xl md:text-8xl font-serif text-white mb-10 tracking-tighter leading-none">
            Invitation <br />Only Access
          </h3>
          <p className="text-neutral-400 text-lg md:text-xl mb-16 font-light max-w-2xl mx-auto leading-relaxed">
            Join the collective of global taste-makers. Receive priority invitations to secret pop-ups, luxury edits, and the Urban Glam private archive.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={isSubmitting}
              className="flex-grow bg-white/5 border border-white/10 px-8 py-6 focus:outline-none focus:border-gold transition-all duration-700 text-white placeholder-white/20 text-sm tracking-widest rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold hover:bg-white text-black font-black py-6 px-12 transition-all duration-700 uppercase tracking-[0.5em] text-[10px] whitespace-nowrap shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
            >
              <span className="relative z-10">
                {isSubmitting ? 'Processing...' : 'Secure Invite'}
              </span>
              {!isSubmitting && (
                <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover/btn:translate-x-full transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
              )}
            </button>
          </form>

          {/* Status Messages */}
          {status.type && (
            <div className={`mt-8 p-6 border ${status.type === 'success' ? 'border-gold/30 bg-gold/5' : 'border-red-500/30 bg-red-500/5'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <p className={`${status.type === 'success' ? 'text-gold' : 'text-red-400'} text-sm tracking-wider uppercase font-bold`}>
                {status.message}
              </p>
            </div>
          )}

          <div className="mt-12 flex justify-center gap-10 opacity-30 text-[9px] uppercase tracking-[0.4em] font-black">
            <span>Encrypted Access</span>
            <div className="w-px h-4 bg-white/20"></div>
            <span>No Solicitation</span>
            <div className="w-px h-4 bg-white/20"></div>
            <span>Limited Spots</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VIPAccess;
