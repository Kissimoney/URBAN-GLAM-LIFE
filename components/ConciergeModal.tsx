
import React, { useState } from 'react';
import { X, ShieldCheck, User, Globe, Star, Briefcase, ArrowRight, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { sendContactEmail } from '../utils/emailService';

interface ConciergeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail?: string;
}

const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose, userEmail = '' }) => {
    const [view, setView] = useState<'profile' | 'form' | 'success'>('profile');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: userEmail,
        request: '',
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Save to Supabase
            const { error: dbError } = await supabase
                .from('messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        engagement_type: 'Concierge Private Dialogue',
                        message: formData.request
                    }
                ]);

            if (dbError) throw dbError;

            // 2. Send Notification via EmailJS
            await sendContactEmail({
                user_name: formData.name,
                user_email: formData.email,
                engagement_type: 'Concierge Private Dialogue',
                message: formData.request,
                to_email: 'concierge@urbanglam.life'
            }).catch(err => console.error('EmailJS Error:', err));

            // 3. Move to Success View (which shows the Auto-Responder text)
            setView('success');
        } catch (error) {
            console.error('Error:', error);
            alert('Transmission failed. Please attempt again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500"
                onClick={onClose}
            ></div>

            <div className="relative w-full h-full max-w-7xl md:h-[90vh] bg-black md:rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] animate-in zoom-in-95 duration-500 flex flex-col md:flex-row">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 z-[210] w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left Side: Cinematic Portrait (Sticky or fixed in the flex) */}
                <div className="w-full md:w-5/12 h-1/2 md:h-full relative shrink-0">
                    <img
                        src="/images/ai_character_face_premium.jpg"
                        alt="Evelyn Vance"
                        className="w-full h-full object-cover animate-in fade-in zoom-in-110 duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r"></div>
                    <div className="absolute bottom-12 left-12">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="w-10 h-px bg-gold"></span>
                            <span className="text-gold text-[9px] uppercase tracking-[0.5em] font-black">Identity Verified</span>
                            <ShieldCheck size={14} className="text-gold" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tighter">Evelyn Vance</h2>
                        <p className="text-white/40 text-[11px] uppercase tracking-[0.6em] font-black mt-4">Inner Circle Concierge</p>
                    </div>
                </div>

                {/* Right Side: Dynamic Content */}
                <div className="w-full md:w-7/12 p-8 md:p-20 overflow-y-auto bg-neutral-950/30">

                    {view === 'profile' && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-right-10 duration-1000">
                            <div className="space-y-8">
                                <h3 className="text-gold text-[10px] uppercase tracking-[0.5em] font-black">Executive Intro</h3>
                                <p className="text-2xl md:text-4xl font-serif text-white/90 leading-tight italic font-light italic">
                                    "Your time is your most precious asset. My role is to protect it while curating a life of absolute seamless luxury."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {[
                                    { title: 'Response Time', val: '< 15 Mins', icon: <Globe size={18} /> },
                                    { title: 'Global Access', val: 'Level IV', icon: <Star size={18} /> },
                                    { title: 'Personalized', val: 'Couture Service', icon: <User size={18} /> },
                                    { title: 'Exclusivity', val: 'Member Only', icon: <Briefcase size={18} /> }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-4 p-8 bg-neutral-900/40 rounded-3xl border border-white/5 group hover:border-gold/20 transition-all">
                                        <div className="text-gold/40 group-hover:text-gold transition-colors">{item.icon}</div>
                                        <div>
                                            <p className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-black mb-1">{item.title}</p>
                                            <p className="text-white font-serif text-lg italic">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-12">
                                <div className="p-1 border-white/10 rounded-full bg-gradient-to-r from-gold/40 via-white/10 to-transparent">
                                    <button
                                        onClick={() => setView('form')}
                                        className="w-full bg-black py-8 rounded-full text-white text-[10px] uppercase tracking-[0.8em] font-black hover:bg-gold hover:text-black transition-all"
                                    >
                                        Initiate Private Dialogue
                                    </button>
                                </div>
                                <p className="text-center text-white/20 text-[9px] uppercase tracking-[0.3em] font-medium">Secured by Urban Glam Life Platinum encryption</p>
                            </div>
                        </div>
                    )}

                    {view === 'form' && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
                            <div className="space-y-4">
                                <button
                                    onClick={() => setView('profile')}
                                    className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-gold transition-colors flex items-center gap-2"
                                >
                                    <ArrowRight size={14} className="rotate-180" /> Back to Profile
                                </button>
                                <h3 className="text-3xl md:text-5xl font-serif text-white tracking-tighter italic">Secure Inquiry</h3>
                                <p className="text-neutral-500 text-sm font-light italic">Your journey to the elite circuit begins with a single, strategic conversation.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">Member Name</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-white font-serif text-xl focus:outline-none focus:border-gold transition-colors placeholder:text-white/5"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">Email Channel</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-white font-serif text-xl focus:outline-none focus:border-gold transition-colors placeholder:text-white/5"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">Request Details</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="How may the Inner Circle facilitate your vision?"
                                        value={formData.request}
                                        onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-white font-serif text-xl focus:outline-none focus:border-gold transition-colors placeholder:text-white/5 resize-none"
                                    />
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="w-full py-8 bg-gold text-black text-[11px] uppercase tracking-[0.8em] font-black hover:bg-white transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Transmitting...' : (
                                        <>
                                            Submit Secure Request <Send size={14} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    {view === 'success' && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in zoom-in-95 duration-700">
                            <div className="w-24 h-24 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold animate-bounce">
                                <CheckCircle size={40} />
                            </div>

                            <div className="space-y-8 bg-neutral-900/50 p-12 rounded-[3.5rem] border border-white/5 max-w-2xl shadow-2xl">
                                <div className="space-y-2 text-center pb-6 border-b border-white/5">
                                    <h3 className="text-gold text-[10px] uppercase tracking-[0.5em] font-black italic">Auto-Responder Activated</h3>
                                    <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest">Subject: Inquiry Received: Your Journey to the Elite Circuit Begins ✨</p>
                                </div>

                                <div className="text-left space-y-6">
                                    <p className="text-white text-lg font-serif italic border-l-2 border-gold/40 pl-6">
                                        "Dear {formData.name || 'Member'}, <br /><br />
                                        Thank you for reaching out to the Urban Glam Life Exclusive Concierge. We have successfully received your inquiry regarding your private request."
                                    </p>
                                    <div className="space-y-4 text-neutral-400 text-sm font-light leading-relaxed">
                                        <p>At Urban Glam Life, we believe that excellence is a lifestyle, not a singular act. Whether you are requesting access to The Social Calendar or seeking global lifestyle management, our team is dedicated to fulfilling your request with the highest level of discretion and style.</p>

                                        <div className="pt-6 space-y-4 border-t border-white/5">
                                            <p className="text-gold uppercase tracking-widest text-[9px] font-black">What Happens Next:</p>
                                            <ul className="space-y-4">
                                                <li><strong className="text-white uppercase tracking-tighter text-[11px]">01. Review Phase:</strong> Our concierge team typically responds to strategic inquiries within 48 business hours.</li>
                                                <li><strong className="text-white uppercase tracking-tighter text-[11px]">02. Dashboard Update:</strong> You can monitor the status of your request directly via 'Your Guest List' in the Member Portal.</li>
                                                <li><strong className="text-white uppercase tracking-tighter text-[11px]">03. Secure Invite:</strong> If approved, a secure, private invitation will be sent to this email address.</li>
                                            </ul>
                                        </div>

                                        <p className="pt-4 italic text-white/60">
                                            In the meantime, we invite you to explore the latest from <a href="/blog" className="text-gold hover:underline">The Archives</a> to stay inspired by the world of high fashion and elite travel.
                                        </p>
                                    </div>

                                    <div className="pt-8 text-center border-t border-white/5">
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black italic">Stay confident. Stay glamorous.</p>
                                        <p className="text-gold text-[9px] uppercase tracking-[0.5em] font-black mt-4">The Urban Glam Concierge Team</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="text-white/40 hover:text-white text-[10px] uppercase tracking-[0.5em] font-black transition-colors"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConciergeModal;
