import React from 'react';

interface SkeletonProps {
    variant?: 'text' | 'circular' | 'rectangular' | 'card';
    width?: string;
    height?: string;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    variant = 'rectangular',
    width = '100%',
    height = '20px',
    className = ''
}) => {
    const baseClasses = 'animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-[length:200%_100%]';

    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
        card: 'rounded-3xl',
    };

    const animationStyle = {
        animation: 'shimmer 2s infinite linear',
    };

    return (
        <>
            <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
            <div
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                style={{ width, height, ...animationStyle }}
                aria-label="Loading..."
            />
        </>
    );
};

// Preset skeleton components for common use cases
export const BlogPostSkeleton: React.FC = () => (
    <div className="bg-neutral-950 min-h-screen">
        <Skeleton variant="rectangular" height="85vh" />
        <div className="container mx-auto max-w-4xl px-6 py-20">
            <div className="flex gap-4 mb-8">
                <Skeleton variant="text" width="100px" height="12px" />
                <Skeleton variant="text" width="100px" height="12px" />
                <Skeleton variant="text" width="100px" height="12px" />
            </div>
            <Skeleton variant="text" height="64px" className="mb-12" />
            <div className="flex items-center gap-4 mb-20 pb-12 border-b border-white/5">
                <Skeleton variant="circular" width="64px" height="64px" />
                <div className="space-y-2">
                    <Skeleton variant="text" width="150px" height="20px" />
                    <Skeleton variant="text" width="100px" height="12px" />
                </div>
            </div>
            <div className="space-y-8">
                <Skeleton variant="text" height="100px" />
                <Skeleton variant="text" height="200px" />
                <Skeleton variant="text" height="200px" />
            </div>
        </div>
    </div>
);

export const BlogCardSkeleton: React.FC = () => (
    <div className="flex flex-col h-full">
        <Skeleton variant="card" height="400px" className="mb-10" />
        <div className="flex gap-6 mb-6 px-2">
            <Skeleton variant="text" width="80px" height="12px" />
            <Skeleton variant="circular" width="6px" height="6px" />
            <Skeleton variant="text" width="80px" height="12px" />
        </div>
        <Skeleton variant="text" height="40px" className="mb-4 px-2" />
        <Skeleton variant="text" height="40px" className="mb-8 px-2" width="80%" />
        <div className="mt-auto pt-8 px-2">
            <Skeleton variant="text" width="120px" height="16px" />
        </div>
    </div>
);

export const GalleryCardSkeleton: React.FC = () => (
    <div>
        <Skeleton variant="card" height="500px" className="mb-6" />
        <Skeleton variant="text" width="60%" height="24px" className="mb-3" />
        <Skeleton variant="text" width="40%" height="16px" />
    </div>
);

export const TestimonialSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Skeleton variant="card" height="600px" />
        <div className="flex flex-col justify-center">
            <Skeleton variant="text" height="120px" className="mb-12" />
            <div className="flex gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} variant="circular" width="20px" height="20px" />
                ))}
            </div>
            <div className="border-t border-white/10 pt-8">
                <Skeleton variant="text" width="200px" height="32px" className="mb-2" />
                <Skeleton variant="text" width="150px" height="16px" className="mb-1" />
                <Skeleton variant="text" width="180px" height="16px" />
            </div>
        </div>
    </div>
);

export const PressCardSkeleton: React.FC = () => (
    <div className="bg-neutral-900/50 border border-white/10 p-8">
        <div className="flex items-center justify-between mb-6">
            <Skeleton variant="text" width="120px" height="24px" />
            <Skeleton variant="text" width="80px" height="16px" />
        </div>
        <Skeleton variant="text" height="28px" className="mb-4" />
        <Skeleton variant="text" height="60px" className="mb-6" />
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <Skeleton variant="text" width="100px" height="12px" />
            <Skeleton variant="text" width="100px" height="12px" />
        </div>
    </div>
);

export const EventCardSkeleton: React.FC = () => (
    <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8 flex items-center gap-8">
        <Skeleton variant="card" width="120px" height="120px" className="shrink-0" />
        <div className="flex-grow space-y-4">
            <Skeleton variant="text" width="40%" height="10px" />
            <Skeleton variant="text" width="70%" height="24px" />
            <div className="flex gap-4">
                <Skeleton variant="text" width="100px" height="12px" />
                <Skeleton variant="text" width="100px" height="12px" />
            </div>
        </div>
    </div>
);

export const WishlistCardSkeleton: React.FC = () => (
    <div className="bg-[#080808] border border-white/5 rounded-2xl overflow-hidden">
        <Skeleton variant="rectangular" height="300px" />
        <div className="p-6 space-y-4">
            <Skeleton variant="text" width="30%" height="10px" />
            <Skeleton variant="text" width="80%" height="24px" />
            <Skeleton variant="text" width="40%" height="16px" />
        </div>
    </div>
);

export const ProductCardSkeleton: React.FC = () => (
    <div className="bg-neutral-900/40 border border-white/5 rounded-sm overflow-hidden flex flex-col">
        <Skeleton variant="card" height="400px" />
        <div className="p-8 space-y-4">
            <Skeleton variant="text" width="60%" height="24px" />
            <Skeleton variant="text" width="90%" height="14px" />
            <Skeleton variant="text" width="80%" height="14px" />
            <div className="pt-6 border-t border-white/10 flex justify-between">
                <Skeleton variant="text" width="80px" height="20px" />
                <Skeleton variant="text" width="100px" height="12px" />
            </div>
        </div>
    </div>
);

export const EventGridCardSkeleton: React.FC = () => (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
        <Skeleton variant="rectangular" height="400px" />
        <div className="p-8 space-y-4">
            <div className="flex justify-between">
                <Skeleton variant="text" width="100px" height="10px" />
                <Skeleton variant="circular" width="4px" height="4px" />
            </div>
            <Skeleton variant="text" width="80%" height="28px" />
            <Skeleton variant="text" width="90%" height="16px" />
            <Skeleton variant="rectangular" height="50px" className="mt-6" />
        </div>
    </div>
);

export default Skeleton;
