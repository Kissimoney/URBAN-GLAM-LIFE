import React, { useState } from 'react';
import MembershipForm from './MembershipForm';
import CustomCursor from './CustomCursor';
import { motion } from 'framer-motion';

const EliteExperience: React.FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } // Custom "Elite" Cubic Bezier
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 }
        }
    };

    const pillars = [
        { title: "Surgical Precision", desc: "Every detail of your workflow optimized by our senior architects." },
        { title: "Global Infrastructure", desc: "Redundant systems across 40+ regions for zero-latency performance." },
        { title: "Executive Support", desc: "A dedicated liaison for your account, available on-demand 24/7." }
    ];

    return (
        <section className="elite-container relative flex flex-col md:flex-row min-h-screen bg-[#020617] text-white overflow-hidden font-sans">
            <CustomCursor />
            <div className="noise-overlay" />

            <MembershipForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

            {/* --- Left Content Area --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center relative z-40"
            >
                {/* Small Tagline Reveal */}
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                    <div className="h-[1px] w-8 bg-slate-600"></div>
                    <span className="text-[10px] uppercase tracking-[0.6em] text-slate-500 font-medium">
                        Tier One Access
                    </span>
                </motion.div>

                {/* --- THE SILVER FOIL HEADLINE REVEAL --- */}
                <motion.h2
                    variants={fadeInUp}
                    className="font-serif text-7xl md:text-9xl mb-8 tracking-tighter leading-none select-none"
                >
                    Elite <br />
                    <span className="silver-foil font-light italic">Experience</span>
                </motion.h2>

                <motion.p variants={fadeInUp} className="text-slate-400 text-lg mb-12 max-w-md font-light leading-relaxed">
                    The standard for those who understand that true luxury is not found in the noise,
                    but in the silence of perfect execution.
                </motion.p>

                {/* --- STAGGERED PILLARS REVEAL --- */}
                <motion.div variants={staggerContainer} className="space-y-4 mb-14">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="group relative p-6 bg-white/[0.01] border border-white/5 transition-all duration-500 hover:bg-white/[0.04]"
                        >
                            <div className="absolute top-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-1000 bg-[#E2E8F0]" />
                            <h3 className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold text-[#E2E8F0]">{p.title}</h3>
                            <p className="text-slate-500 group-hover:text-slate-300 transition-colors text-sm">{p.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Reveal */}
                <motion.button
                    variants={fadeInUp}
                    onClick={() => setIsFormOpen(true)}
                    className="group relative w-full md:w-max px-14 py-5 border border-slate-700 overflow-hidden transition-all duration-500"
                >
                    <span className="relative z-10 text-xs uppercase tracking-[0.4em] font-bold group-hover:text-black transition-colors duration-500">
                        Request an Invitation
                    </span>
                    <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-[#E2E8F0]" />
                </motion.button>
            </motion.div>

            {/* --- Right Visual Area (Static or Slow Zoom) --- */}
            <div className="w-full md:w-1/2 relative h-[60vh] md:h-auto overflow-hidden bg-[#010409]">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020617] via-transparent to-transparent" />
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070"
                    className="h-full w-full object-cover grayscale"
                    alt="Elite Professional Context"
                />
            </div>
        </section>
    );
};

export default EliteExperience;
