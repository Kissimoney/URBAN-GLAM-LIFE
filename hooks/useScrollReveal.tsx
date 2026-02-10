import React, { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * Returns a ref to attach to the element and a boolean indicating visibility
 */
export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px',
        triggerOnce = true,
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
};

/**
 * Preset animation classes for common reveal effects
 */
export const revealAnimations = {
    fadeIn: {
        hidden: 'opacity-0',
        visible: 'opacity-100 transition-opacity duration-1000',
    },
    slideUp: {
        hidden: 'opacity-0 translate-y-12',
        visible: 'opacity-100 translate-y-0 transition-all duration-1000 ease-out',
    },
    slideDown: {
        hidden: 'opacity-0 -translate-y-12',
        visible: 'opacity-100 translate-y-0 transition-all duration-1000 ease-out',
    },
    slideLeft: {
        hidden: 'opacity-0 translate-x-12',
        visible: 'opacity-100 translate-x-0 transition-all duration-1000 ease-out',
    },
    slideRight: {
        hidden: 'opacity-0 -translate-x-12',
        visible: 'opacity-100 translate-x-0 transition-all duration-1000 ease-out',
    },
    scaleUp: {
        hidden: 'opacity-0 scale-95',
        visible: 'opacity-100 scale-100 transition-all duration-1000 ease-out',
    },
    scaleDown: {
        hidden: 'opacity-0 scale-105',
        visible: 'opacity-100 scale-100 transition-all duration-1000 ease-out',
    },
    rotateIn: {
        hidden: 'opacity-0 rotate-3',
        visible: 'opacity-100 rotate-0 transition-all duration-1000 ease-out',
    },
};

/**
 * Component wrapper for scroll reveal animations
 */
interface ScrollRevealProps {
    children: React.ReactNode;
    animation?: keyof typeof revealAnimations;
    delay?: number;
    className?: string;
    threshold?: number;
    triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    animation = 'fadeIn',
    delay = 0,
    className = '',
    threshold = 0.1,
    triggerOnce = true,
}) => {
    const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce });
    const animationClasses = revealAnimations[animation];

    return (
        <div
            ref={ref}
            className={`${isVisible ? animationClasses.visible : animationClasses.hidden} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
