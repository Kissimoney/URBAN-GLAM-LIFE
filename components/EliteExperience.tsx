
import React from 'react';
import { ShieldCheck, Zap, PhoneCall, ArrowRight } from 'lucide-react';

const EliteExperience: React.FC = () => {
    // --- RESTORED URBAN GLAM THEME ---
    const theme = {
        bg: "bg-[#121212]",         // Deep Charcoal Background
        accent: "text-gold",        // Gold Icon & Title
        accentText: "text-gold/40", // Dimmed Gold
        accentBg: "bg-gold",        // Gold Button & Fill
        border: "border-white/5",   // Neutral Border
        hoverBorder: "hover:border-gold/30",
        btnBorder: "border-white/10"
    };

    const pillars = [
        {
            icon: <ShieldCheck size={20} className="text-gold/60" />,
            title: "White-Glove Integration",
            desc: "We handle the technical heavy lifting, ensuring a seamless transition into our elite ecosystem."
        },
        {
            icon: <Zap size={20} className="text-gold/60" />,
            title: "Exclusive Insights",
            desc: "Access monthly proprietary reports and data points curated specifically for your scaling needs."
        },
        {
            icon: <PhoneCall size={20} className="text-gold/60" />,
            title: "Direct Line",
            desc: "24/7 priority access to our senior strategy team. No bots, no queues, just solutions."
        }
    ];

    // Images for Gallery Grid
    // 1. Alpine Elite Retreat (Cultural)
    // 2. Midnight Gala (Event)
    // 3. Art Exhibition (Creative)
    const images = [
        {
            src: "https://i.imgur.com/3yKnhuG.jpg",
            label: "Alpine Retreat // Zermatt",
            sub: "Winter Q4"
        },
        {
            src: "https://i.imgur.com/JtOWCDK.jpg",
            label: "Midnight Gala // Paris",
            sub: "Exclusive Access"
        },
        {
            src: "https://i.imgur.com/BSzxLiq.jpg",
            label: "Art & Culture // Global",
            sub: "Curated Exhibition"
        }
    ];

    return (
        <section className={`flex flex-col md:flex-row min-h-screen ${theme.bg} text-white overflow-hidden selection:bg-gold selection:text-black`}>

            {/* --- Left Content Area --- */}
            <div className="w-full md:w-1/2 p-8 md:p-32 flex flex-col justify-center z-10 relative">
                {/* Subtle Radial Glow */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #D4AF37 0%, transparent 70%)' }}></div>

                <div className="animate-in fade-in slide-in-from-left duration-1000">
                    <h2 className="font-serif text-5xl md:text-7xl mb-10 tracking-tighter leading-tight font-bold">
                        Elite <span className={`italic font-light text-4xl md:text-6xl block mt-2 ${theme.accentText}`}>Experience</span>
                    </h2>

                    <p className="text-neutral-400 text-lg mb-16 max-w-lg leading-[1.8] font-light italic border-l-2 border-gold/20 pl-8">
                        "Luxury is not just a standard of living; it is a standard of being. Our elite tier provides members with the invisible keys to the city’s most guarded doors."
                    </p>

                    {/* --- Key Pillars (Glassmorphism Cards) --- */}
                    <div className="space-y-8 mb-16">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                className={`group p-8 rounded-2xl border ${theme.border} bg-white/[0.02] backdrop-blur-xl 
                             hover:bg-gold/5 transition-all duration-700 cursor-default
                             ${theme.hoverBorder} relative overflow-hidden`}
                            >
                                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-gold transition-all duration-700"></div>
                                <div className="flex items-start gap-6">
                                    <div className="mt-1 p-3 bg-neutral-900 rounded-xl group-hover:scale-110 transition-transform duration-500 border border-white/5 group-hover:border-gold/40 text-gold">
                                        {pillar.icon}
                                    </div>
                                    <div>
                                        <h3 className={`text-[11px] uppercase tracking-[0.4em] font-black opacity-40 mb-3 group-hover:text-gold group-hover:opacity-100 transition-all`}>
                                            {pillar.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-300 font-light transition-colors">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Animated "Fill-Up" Button --- */}
                    <button className={`relative w-max px-14 py-7 border ${theme.btnBorder} group overflow-hidden transition-all duration-700 hover:border-gold`}>
                        <span className="relative z-10 text-[10px] uppercase tracking-[0.6em] font-black text-white group-hover:text-black transition-colors duration-700 flex items-center gap-4">
                            Apply for Membership <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-700" />
                        </span>
                        <div className={`absolute inset-0 ${theme.accentBg} translate-y-[101%] group-hover:translate-y-0 transition-transform duration-1000 ease-in-out`} />
                    </button>
                </div>
            </div>

            {/* --- Right Visual Area: Cinematic Triple Grid --- */}
            <div className="w-full md:w-1/2 flex flex-col min-h-[80vh] md:h-screen relative overflow-hidden">
                {images.map((img, index) => (
                    <div key={index} className="flex-1 relative group overflow-hidden border-b border-white/5 last:border-b-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-transparent z-10 pointer-events-none" />
                        <img
                            src={img.src}
                            alt={img.label}
                            className="h-full w-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                        />

                        {/* Interactive Label on Hover */}
                        <div className="absolute bottom-8 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 flex flex-col items-end">
                            <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-black bg-black/80 px-4 py-2 mb-2 border-l border-gold/40">
                                {img.label}
                            </span>
                            <span className="text-white/60 text-[8px] uppercase tracking-[0.2em] italic">
                                {img.sub}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Global Accent Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 blur-[180px] rounded-full pointer-events-none animate-pulse" />
            </div>

        </section>
    );
};

export default EliteExperience;
