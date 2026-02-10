import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Smooth scroll to anchor links
 */
export const useSmoothScroll = () => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');

            if (anchor) {
                const href = anchor.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();

                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });

                        // Update URL without jumping
                        window.history.pushState({}, '', href);
                    }
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);
};

/**
 * Scroll to top on route change
 */
export const useScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [pathname]);
};

/**
 * Scroll progress indicator
 */
export const useScrollProgress = () => {
    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;

            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial call

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);
};

/**
 * Show/hide element based on scroll position
 */
export const useScrollVisibility = (threshold: number = 300) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const backToTop = document.getElementById('back-to-top');

            if (backToTop) {
                if (scrollTop > threshold) {
                    backToTop.classList.remove('opacity-0', 'pointer-events-none');
                    backToTop.classList.add('opacity-100');
                } else {
                    backToTop.classList.add('opacity-0', 'pointer-events-none');
                    backToTop.classList.remove('opacity-100');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);
};
