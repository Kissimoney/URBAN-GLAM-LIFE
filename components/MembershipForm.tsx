import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MembershipFormProps {
    isOpen: boolean;
    onClose: () => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mobile vs Desktop Animation variants
    const modalVariants = {
        hidden: { y: "100%", opacity: 0 }, // Starts off-screen (bottom)
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', damping: 25, stiffness: 200 }
        },
        exit: { y: "100%", opacity: 0 }
    };

    const desktopVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-[#020617]/95 backdrop-blur-md"
                >
                    <motion.div
                        variants={isMobile ? modalVariants : desktopVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-2xl bg-[#0a1120] border-t md:border border-white/10 p-6 md:p-16 
                       rounded-t-[2rem] md:rounded-sm h-[90vh] md:h-auto overflow-y-auto shadow-2xl"
                    >
                        {/* Mobile Grab Handle */}
                        <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8 md:hidden" />

                        {/* Close Button - Optimized for touch */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
                        >
                            <span className="text-[10px] uppercase tracking-widest font-bold">[ Close ]</span>
                        </button>

                        {!submitted ? (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);

                                // Honeypot Check
                                if (formData.get('bot_check')) {
                                    console.log("Bot detected");
                                    return;
                                }

                                const data = {
                                    name: formData.get('name'),
                                    email: formData.get('email'),
                                    organization: formData.get('organization'),
                                    objective: formData.get('objective'),
                                    vision: formData.get('vision')
                                };

                                setIsSubmitting(true);
                                try {
                                    const response = await fetch('http://localhost:5000/api/apply', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(data),
                                    });

                                    if (response.ok) {
                                        setSubmitted(true);
                                    } else {
                                        throw new Error('Submission failed');
                                    }
                                } catch (error) {
                                    console.error("Submission failed", error);
                                    // Professional Error Handling
                                    alert("Secure connection interrupted. Please ensure you are not behind a corporate firewall and try again.");
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }} className="space-y-8 pb-10">
                                <header>
                                    <h2 className="font-serif text-3xl md:text-5xl mb-3 text-white">
                                        Membership <span className="silver-foil italic">Inquiry</span>
                                    </h2>
                                    <p className="text-slate-500 text-sm font-light">
                                        Complete the brief below. Our partners review all inquiries personally.
                                    </p>
                                </header>

                                {/* Honeypot Field - Hidden from real users */}
                                <input type="text" name="bot_check" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                                <div className="space-y-6">
                                    {/* Name Input */}
                                    <div className="group border-b border-white/10 focus-within:border-white/50 transition-all py-2">
                                        <label className="block text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-2">Legal Name</label>
                                        <input type="text" name="name" required className="w-full bg-transparent outline-none text-white text-lg font-light placeholder:text-slate-800 focus:placeholder:text-slate-600 transition-colors" placeholder="E.g. Alexander Sterling" />
                                    </div>

                                    {/* Organization Input - RESTORED */}
                                    <div className="group border-b border-white/10 focus-within:border-white/50 transition-all py-2">
                                        <label className="block text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-2">Organization</label>
                                        <input type="text" name="organization" required className="w-full bg-transparent outline-none text-white text-lg font-light placeholder:text-slate-800 focus:placeholder:text-slate-600 transition-colors" placeholder="Global Corp" />
                                    </div>

                                    {/* Email Input */}
                                    <div className="group border-b border-white/10 focus-within:border-white/50 transition-all py-2">
                                        <label className="block text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-2">Secure Email</label>
                                        <input type="email" name="email" inputMode="email" required className="w-full bg-transparent outline-none text-white text-lg font-light placeholder:text-slate-800 focus:placeholder:text-slate-600 transition-colors" placeholder="name@domain.com" />
                                    </div>

                                    {/* Objective Dropdown */}
                                    <div className="group border-b border-white/10 py-2">
                                        <label className="block text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-2">Area of Interest</label>
                                        <div className="relative">
                                            <select name="objective" className="w-full bg-transparent outline-none text-white text-lg font-light appearance-none rounded-none cursor-pointer">
                                                <option className="bg-[#0a1120]">Strategic Consulting</option>
                                                <option className="bg-[#0a1120]">Capital Management</option>
                                                <option className="bg-[#0a1120]">Private Access</option>
                                            </select>
                                            {/* Custom Arrow */}
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px] uppercase tracking-widest">
                                                [ Select ]
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vision Textarea - RESTORED */}
                                    <div className="group border-b border-white/10 focus-within:border-white/50 transition-all py-2">
                                        <label className="block text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-2">Project Vision</label>
                                        <textarea name="vision" rows={2} className="w-full bg-transparent outline-none text-white text-lg font-light resize-none placeholder:text-slate-800 focus:placeholder:text-slate-600 transition-colors" placeholder="Briefly describe your objectives..." />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" disabled={isSubmitting} className="relative w-full py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold active:scale-[0.98] transition-transform hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {isSubmitting ? 'Processing...' : 'Submit Application'}
                                    </button>
                                    <p className="text-center mt-4 text-[9px] text-slate-600 uppercase tracking-widest">
                                        Your data is encrypted. <span className="underline cursor-pointer hover:text-slate-400">Privacy Policy</span>.
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center text-center py-20">
                                <div className="w-12 h-[1px] bg-slate-700 mb-8" />
                                <h3 className="silver-foil font-serif text-5xl italic mb-6">Acknowledged.</h3>
                                <p className="text-slate-500 font-light max-w-xs leading-relaxed text-sm mx-auto">
                                    Your profile is being reviewed. Expect a secure correspondence within 24 hours.
                                </p>
                                <button
                                    onClick={onClose}
                                    className="mt-12 text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-slate-500 pb-1"
                                >
                                    Return to Site
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MembershipForm;
