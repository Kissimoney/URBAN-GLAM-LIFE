import React, { useState, useEffect, useRef } from 'react';
import Skeleton from './Skeleton';

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    skeletonHeight?: string;
    skeletonVariant?: 'rectangular' | 'card';
    onLoad?: () => void;
    onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
    src,
    alt,
    className = '',
    skeletonHeight = '400px',
    skeletonVariant = 'rectangular',
    onLoad,
    onError,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(img);
                }
            },
            {
                rootMargin: '50px', // Start loading 50px before entering viewport
            }
        );

        observer.observe(img);

        return () => {
            if (img) {
                observer.unobserve(img);
            }
        };
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    return (
        <div className="relative w-full h-full">
            {/* Skeleton Loader */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0">
                    <Skeleton variant={skeletonVariant} height={skeletonHeight} width="100%" />
                </div>
            )}

            {/* Error State */}
            {hasError && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-neutral-900 border border-white/10"
                    style={{ height: skeletonHeight }}
                >
                    <div className="text-center">
                        <div className="text-neutral-600 mb-2">
                            <svg
                                className="w-12 h-12 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <p className="text-neutral-500 text-sm">Failed to load image</p>
                    </div>
                </div>
            )}

            {/* Actual Image */}
            <img
                ref={imgRef}
                src={isInView ? src : undefined}
                alt={alt}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                onLoad={handleLoad}
                onError={handleError}
                loading="lazy"
            />
        </div>
    );
};

export default LazyImage;
