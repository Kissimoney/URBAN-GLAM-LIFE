import React from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            id="back-to-top"
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gold hover:bg-white text-black rounded-full shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_50px_rgba(255,255,255,0.2)] transition-all duration-500 opacity-0 pointer-events-none flex items-center justify-center group hover:scale-110"
            aria-label="Back to top"
        >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
    );
};

export default BackToTop;
