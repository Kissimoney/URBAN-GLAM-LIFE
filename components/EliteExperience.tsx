
import React from 'react';
import { ShieldCheck, Zap, PhoneCall, ArrowRight } from 'lucide-react';

const EliteExperience: React.FC = () => {
    // 1. PLUG YOUR BRAND COLORS HERE
    const brand = {
        primary: '#121212',   // Urban Glam Dark
        accent: '#D4AF37',    // Urban Glam Gold
        text: '#FFFFFF',      // Main Text
        muted: '#9CA3AF',     // Secondary Text (Gray)
    };

    const pillars = [
        {
            icon: <ShieldCheck size={20} />,
            title: "White-Glove Integration",
            desc: "Hands-on onboarding designed for high-stakes environments and seamless lifestyle transition."
        },
        {
            icon: <Zap size={20} />,
            title: "Exclusive Insights",
            desc: "Proprietary market data and cultural analytics you won't find in public whitepapers."
        },
        {
            icon: <PhoneCall size={20} />,
            title: "Direct Line",
            desc: "Skip the support tickets. You have our senior strategy team's priority mobile access."
        }
    ];

    return (
        <section
            style={{ backgroundColor: brand.primary }}
            className="flex flex-col md:flex-row min-h-screen text-white overflow-hidden selection:bg-gold selection:text-black"
        >
            {/* Left Column: Content */}
            <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center relative z-20">
                {/* Subtle Radial Glow */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 20% 30%, ${brand.accent} 0%, transparent 70%)` }}></div>

                <div className="animate-in fade-in slide-in-from-left duration-1000">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="h-[1px] w-12" style={{ backgroundColor: brand.accent }}></div>
                        <span className="text-[10px] uppercase tracking-[0.5em] font-black" style={{ color: brand.accent }}>
                            Established Excellence
                        </span>
                    </div>

                    <h2 className="font-serif text-6xl md:text-[8rem] mb-12 tracking-tighter leading-none font-bold">
                        Elite <br />
                        <span className="italic font-light opacity-40 block mt-2">Experience</span>
                    </h2>

                    <p className="text-neutral-400 text-lg mb-16 max-w-lg font-light leading-[1.8] italic border-l-2 border-gold/20 pl-8">
                        "Access a tier of service reserved for those who prioritize time and precision above all else. Our elite system provides the invisible keys to the city’s most guarded doors."
                    </p>

                    {/* Pillars with Shimmer Effect */}
                    <div className="space-y-6 mb-16">
                        {pillars.map((p, i) => (
                            <div
                                key={i}
                                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-500 hover:bg-white/[0.05] backdrop-blur-xl"
                            >
                                {/* Shimmer Line (Top Border Expansion) */}
                                <div
                                    className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-1000 ease-in-out"
                                    style={{ backgroundColor: brand.accent }}
                                />

                                <div className="flex items-start gap-6">
                                    <div className="mt-1 text-gold/60 group-hover:text-gold transition-colors duration-500 group-hover:scale-110 transition-transform">
                                        {p.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] uppercase tracking-[0.4em] font-black mb-2 opacity-50 group-hover:opacity-100 transition-all" style={{ color: brand.accent }}>{p.title}</h3>
                                        <p className="text-neutral-500 group-hover:text-neutral-300 transition-colors text-sm font-light leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* High-End "Fill-Up" CTA */}
                    <button className="group relative w-full md:w-max px-16 py-6 border border-white/10 overflow-hidden bg-transparent transition-all hover:border-gold">
                        <span className="relative z-10 text-[10px] uppercase tracking-[0.5em] font-black group-hover:text-black transition-colors duration-500 flex items-center gap-4">
                            Request an Invitation <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </span>
                        <div
                            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-in-out"
                            style={{ backgroundColor: brand.accent }}
                        />
                    </button>
                </div>
            </div>

            {/* Right Column: Cinematic Dual-Grid */}
            <div className="w-full md:w-1/2 flex flex-col min-h-[80vh] md:h-screen relative overflow-hidden">

                {/* Top Image: Art Exhibition */}
                <div className="flex-1 relative group overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-transparent z-10 pointer-events-none" />
                    <img
                        src="https://i.imgur.com/BSzxLiq.jpg"
                        alt="Elite Art & Culture"
                        className="h-full w-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[3000ms] ease-out"
                    />
                    <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <span className="text-gold text-[8px] uppercase tracking-[0.4em] font-black bg-black/80 px-4 py-2 rounded-full border border-gold/20 shadow-2xl">Cultural Access // Q4</span>
                    </div>
                </div>

                {/* Bottom Image: Secure Node */}
                <div className="flex-1 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-transparent z-10 pointer-events-none" />
                    <img
                        src="https://i.imgur.com/C8ibsEd.jpg"
                        alt="Elite Tech Infrastructure"
                        className="h-full w-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[3000ms] ease-out"
                    />

                    {/* Frame Label */}
                    <div className="absolute bottom-12 right-12 z-20 border-l border-gold/40 pl-6 animate-in fade-in duration-1000 delay-1000">
                        <p className="text-gold text-[9px] uppercase tracking-[0.8em] font-black">Secure Node</p>
                        <p className="text-white/40 text-[8px] uppercase tracking-[0.4em] mt-1 italic">V1.0.8 // INFRASTRUCTURE</p>
                    </div>
                </div>

                {/* Global Accent Glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[180px] rounded-full opacity-10 pointer-events-none animate-pulse"
                    style={{ backgroundColor: brand.accent }}
                />
            </div>
        </section>
    );
};

export default EliteExperience;
