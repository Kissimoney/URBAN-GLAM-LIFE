import React from 'react';

const ScrollProgress: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-900">
            <div
                id="scroll-progress"
                className="h-full bg-gradient-to-r from-gold via-gold to-white transition-all duration-150 ease-out"
                style={{ width: '0%' }}
            ></div>
        </div>
    );
};

export default ScrollProgress;
