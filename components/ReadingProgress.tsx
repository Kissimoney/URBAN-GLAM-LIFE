import React, { useState, useEffect } from 'react';

const ReadingProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            // Get the article element or fallback to document
            const article = document.querySelector('article') || document.documentElement;
            const articleTop = article.getBoundingClientRect().top + window.scrollY;
            const articleHeight = article.scrollHeight;
            const windowHeight = window.innerHeight;

            // Calculate scroll progress within the article
            const scrolled = window.scrollY - articleTop;
            const totalScrollable = articleHeight - windowHeight;

            // Calculate percentage (0-100)
            const percentage = Math.min(Math.max((scrolled / totalScrollable) * 100, 0), 100);

            setProgress(percentage);
        };

        // Update on scroll
        window.addEventListener('scroll', updateProgress, { passive: true });

        // Update on mount
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-neutral-900 z-50">
            <div
                className="h-full bg-gradient-to-r from-gold via-yellow-500 to-gold transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />

            {/* Percentage Indicator (optional) */}
            {progress > 0 && progress < 100 && (
                <div
                    className="absolute top-2 bg-gold text-black px-3 py-1 text-xs font-bold transition-all duration-150"
                    style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                >
                    {Math.round(progress)}%
                </div>
            )}
        </div>
    );
};

export default ReadingProgress;
