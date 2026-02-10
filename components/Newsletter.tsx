import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { sendVIPSignup, isValidEmail } from '../utils/emailService';
import { supabase } from '../utils/supabaseClient';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [preferences, setPreferences] = useState({
        fashion: true,
        travel: true,
        lifestyle: true,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus({ type: null, message: '' });

        if (!email.trim()) {
            setStatus({ type: 'error', message: 'Please enter your email address' });
            return;
        }

        if (!isValidEmail(email)) {
            setStatus({ type: 'error', message: 'Please enter a valid email address' });
            return;
        }

        // Check if at least one preference is selected
        const hasPreference = Object.values(preferences).some(val => val);
        if (!hasPreference) {
            setStatus({ type: 'error', message: 'Please select at least one content preference' });
            return;
        }

        setIsSubmitting(true);

        // Save to Supabase
        try {
            const { error: supabaseError } = await supabase
                .from('leads')
                .insert([
                    {
                        email,
                        source: 'newsletter',
                        preferences
                    }
                ]);

            if (supabaseError) {
                console.error('Supabase error:', supabaseError);
            }
        } catch (err) {
            console.error('Error saving to database:', err);
        }

        // Using VIP signup for now - can be customized with different template
        const result = await sendVIPSignup({
            user_email: email,
            source: 'newsletter',
            preferences_fashion: preferences.fashion,
            preferences_travel: preferences.travel,
            preferences_lifestyle: preferences.lifestyle
        });
        setIsSubmitting(false);

        if (result && result.status === 200) {
            setStatus({
                type: 'success',
                message: 'Welcome to the newsletter! Check your inbox for confirmation.'
            });
            setEmail('');
            setPreferences({ fashion: true, travel: true, lifestyle: true });
        } else {
            setStatus({ type: 'error', message: 'Subscription failed. Please try again.' });
        }
    };

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <section className="py-32 bg-neutral-900 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gold rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                            <Mail size={32} className="text-gold" />
                        </div>

                        <h2 className="text-gold uppercase tracking-[1.5em] text-[10px] font-black mb-8 italic">
                            Stay Connected
                        </h2>
                        <h3 className="text-5xl md:text-6xl font-serif text-white mb-6 tracking-tighter">
                            The Weekly Edit
                        </h3>
                        <p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                            Curated insights, style guides, and exclusive content delivered every week.
                            Customize your preferences to receive only what matters to you.
                        </p>
                    </div>

                    {/* Newsletter Form */}
                    <div className="bg-black/40 border border-white/10 p-10 md:p-16 backdrop-blur-xl">
                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="mb-10">
                                <label className="block text-neutral-500 text-xs uppercase tracking-[0.5em] font-black mb-4">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    disabled={isSubmitting}
                                    className="w-full bg-white/5 border border-white/10 px-6 py-5 focus:outline-none focus:border-gold transition-all duration-500 text-white placeholder-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Content Preferences */}
                            <div className="mb-12">
                                <label className="block text-neutral-500 text-xs uppercase tracking-[0.5em] font-black mb-6">
                                    Content Preferences
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Fashion */}
                                    <button
                                        type="button"
                                        onClick={() => togglePreference('fashion')}
                                        disabled={isSubmitting}
                                        className={`p-6 border transition-all duration-500 text-left group ${preferences.fashion
                                            ? 'border-gold bg-gold/5'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-lg font-serif text-white">Fashion</span>
                                            <CheckCircle
                                                size={20}
                                                className={`transition-all ${preferences.fashion ? 'text-gold' : 'text-white/20'
                                                    }`}
                                            />
                                        </div>
                                        <p className="text-neutral-400 text-xs leading-relaxed">
                                            Style guides, trends, and couture insights
                                        </p>
                                    </button>

                                    {/* Travel */}
                                    <button
                                        type="button"
                                        onClick={() => togglePreference('travel')}
                                        disabled={isSubmitting}
                                        className={`p-6 border transition-all duration-500 text-left group ${preferences.travel
                                            ? 'border-gold bg-gold/5'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-lg font-serif text-white">Travel</span>
                                            <CheckCircle
                                                size={20}
                                                className={`transition-all ${preferences.travel ? 'text-gold' : 'text-white/20'
                                                    }`}
                                            />
                                        </div>
                                        <p className="text-neutral-400 text-xs leading-relaxed">
                                            Luxury destinations and elite experiences
                                        </p>
                                    </button>

                                    {/* Lifestyle */}
                                    <button
                                        type="button"
                                        onClick={() => togglePreference('lifestyle')}
                                        disabled={isSubmitting}
                                        className={`p-6 border transition-all duration-500 text-left group ${preferences.lifestyle
                                            ? 'border-gold bg-gold/5'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="text-lg font-serif text-white">Lifestyle</span>
                                            <CheckCircle
                                                size={20}
                                                className={`transition-all ${preferences.lifestyle ? 'text-gold' : 'text-white/20'
                                                    }`}
                                            />
                                        </div>
                                        <p className="text-neutral-400 text-xs leading-relaxed">
                                            Entertainment, dining, and culture
                                        </p>
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col items-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full md:w-auto bg-gold hover:bg-white text-black font-black py-6 px-16 uppercase tracking-[0.6em] text-[10px] transition-all duration-700 shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                                    </span>
                                    {!isSubmitting && (
                                        <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {status.type && (
                                    <div className={`mt-8 p-6 border w-full ${status.type === 'success' ? 'border-gold/30 bg-gold/5' : 'border-red-500/30 bg-red-500/5'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                        <p className={`${status.type === 'success' ? 'text-gold' : 'text-red-400'} text-sm tracking-wider uppercase font-bold text-center`}>
                                            {status.message}
                                        </p>
                                    </div>
                                )}

                                <p className="text-neutral-500 text-xs mt-8 text-center max-w-md">
                                    By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
                                    We respect your privacy and never share your data.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Benefits */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-gold text-2xl font-serif mb-2">Weekly</p>
                            <p className="text-neutral-500 text-xs uppercase tracking-wider">Delivery Schedule</p>
                        </div>
                        <div>
                            <p className="text-gold text-2xl font-serif mb-2">Curated</p>
                            <p className="text-neutral-500 text-xs uppercase tracking-wider">Premium Content</p>
                        </div>
                        <div>
                            <p className="text-gold text-2xl font-serif mb-2">Exclusive</p>
                            <p className="text-neutral-500 text-xs uppercase tracking-wider">Subscriber Perks</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
