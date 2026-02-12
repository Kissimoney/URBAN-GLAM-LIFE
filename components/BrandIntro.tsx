
import React, { useState, useEffect } from 'react';
import { Shield, Star, Globe, Ticket, X } from 'lucide-react';

interface BrandIntroProps {
    onComplete: () => void;
}

const BrandIntro: React.FC<BrandIntroProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Storyboard timeline (seconds)
    // 0-3: Hook
    // 3-8: Reveal
    // 8-12: Features
    // 12-16: Action
    // 16-20: CTA

    useEffect(() => {
        const timeline = [
            { time: 0, step: 0 },
            { time: 3000, step: 1 },
            { time: 8000, step: 2 },
            { time: 12000, step: 3 },
            { time: 16000, step: 4 },
            { time: 20000, step: 5 }
        ];

        const timers = timeline.map(({ time, step }) =>
            setTimeout(() => {
                if (step === 5) {
                    handleComplete();
                } else {
                    setStep(step);
                }
            }, time)
        );

        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    const handleComplete = () => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
    };

    if (!isVisible && step === 5) return null;

    return (
        <div className={`fixed inset-0 z-[100] bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Skip Button */}
            <button
                onClick={handleComplete}
                className="absolute top-8 right-8 z-[110] text-white/30 hover:text-gold text-[10px] uppercase tracking-[0.4em] font-black transition-all flex items-center gap-2"
            >
                Skip Intro <X size={14} />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-gold/20 w-full z-[110]">
                <div
                    className="h-full bg-gold shadow-[0_0_15px_rgba(212,175,55,1)] transition-all duration-[20s] ease-linear"
                    style={{ width: isVisible ? '100%' : '0%' }}
                ></div>
            </div>

            <div className="relative h-full w-full overflow-hidden">

                {/* SCENE 0: HOOK (0-3s) */}
                {step === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in-95 duration-700">
                        <div className="absolute inset-0 overflow-hidden">
                            <img
                                src="/images/ai_character_face_1.jpg"
                                className="w-full h-full object-cover scale-110 animate-pulse-slow opacity-60"
                                alt="Urban Glam Face"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-gold/5 mix-blend-overlay"></div>
                        </div>
                        <div className="relative text-center">
                            <h2 className="text-gold font-black uppercase tracking-[1.2em] text-[10px] mb-6 animate-in slide-in-from-bottom duration-1000">Access Granted</h2>
                            <h1 className="text-6xl md:text-[8rem] font-serif font-light text-white italic tracking-tighter shimmer-text leading-none">Stop scrolling <br /> & start living.</h1>
                        </div>
                    </div>
                )}

                {/* SCENE 1: THE REVEAL (3-8s) */}
                {step === 1 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
                        <div className="container max-w-4xl mx-auto px-6 text-center animate-in fade-in slide-in-from-right duration-1000">
                            <div className="w-24 h-24 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-10 animate-bounce-slow">
                                <Shield className="text-gold" size={40} />
                            </div>
                            <h2 className="text-gold font-black uppercase tracking-[0.5em] text-xs mb-6">Your Private Member Portal</h2>
                            <h1 className="text-4xl md:text-6xl font-serif text-white mb-8 italic">Welcome to your personal guest list.</h1>

                            {/* Mock UI Reveal */}
                            <div className="mt-12 p-8 border border-white/5 bg-neutral-900/40 rounded-3xl opacity-40 scale-95 blur-sm">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-12 h-4 bg-white/10 rounded"></div>
                                    <div className="w-24 h-4 bg-white/10 rounded"></div>
                                </div>
                                <div className="h-40 bg-white/5 rounded-2xl"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SCENE 2: FEATURE HIGHLIGHT (8-12s) */}
                {step === 2 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center container max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                            <div className="animate-in slide-in-from-left duration-1000">
                                <h2 className="text-gold font-black uppercase tracking-[0.5em] text-xs mb-6 flex items-center gap-3">
                                    <Globe size={16} /> Global Lifestyle Management
                                </h2>
                                <h1 className="text-4xl md:text-7xl font-serif text-white italic leading-tight">From private viewings to global travel...</h1>
                            </div>
                            <div className="space-y-4 animate-in slide-in-from-right duration-1000 delay-300">
                                {['Priority Access', 'Elite Concierge', 'Luxury Travel'].map((item, i) => (
                                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                                        <Star className="text-gold" size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SCENE 3: THE ACTION (12-16s) */}
                {step === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center animate-in zoom-in-95 duration-1000">
                            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(212,175,55,0.4)] animate-pulse">
                                <Ticket className="text-black" size={32} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-gold font-black uppercase tracking-[0.5em] text-xs mb-8">Secure Your Invite</h2>
                            <h1 className="text-5xl md:text-7xl font-serif text-white italic mb-12">...your concierge is standing by.</h1>
                            <div className="inline-block p-1 border border-gold/30 rounded-full">
                                <div className="bg-gold text-black font-black uppercase tracking-[0.4em] text-[10px] px-12 py-5 rounded-full">
                                    View Social Calendar
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SCENE 4: CTA (16-20s) */}
                {step === 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="text-center animate-in fade-in duration-2000">
                            <div className="mb-12">
                                <h1 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-white">
                                    URBAN <span className="text-gold">GLAM</span> LIFE
                                </h1>
                                <div className="h-px w-24 bg-gold mx-auto mt-6"></div>
                            </div>
                            <h2 className="text-white/40 font-black uppercase tracking-[1em] text-[10px] mb-16">Join the Movement</h2>

                            <div className="space-y-8">
                                <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md max-w-md mx-auto transform hover:scale-105 transition-transform">
                                    <p className="text-gold font-serif text-xl italic">Link in Bio to join today.</p>
                                </div>
                                <button
                                    onClick={handleComplete}
                                    className="text-white/20 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] transition-colors"
                                >
                                    Enter Member Portal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <style>{`
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #D4AF37 50%, #fff 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          to { background-position: 200% center; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
        </div>
    );
};

export default BrandIntro;
