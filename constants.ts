/**
 * Application constants and configuration
 */

// Brand colors
export const COLORS = {
    gold: '#D4AF37',
    black: '#000000',
    white: '#FFFFFF',
    neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
    },
} as const;

// Navigation links
export const NAV_LINKS = [
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Lifestyle', href: '#blogs' },
    { name: 'Contact', href: '#contact' },
] as const;

// Social media links
export const SOCIAL_LINKS = {
    instagram: 'https://instagram.com/urbanglamlife',
    twitter: 'https://twitter.com/urbanglamlife',
    tiktok: 'https://tiktok.com/@urbanglamlife',
    youtube: 'https://youtube.com/@urbanglamlife',
} as const;

// Gallery categories
export const GALLERY_CATEGORIES = ['All', 'Fashion', 'Travel', 'Nightlife'] as const;

// Animation durations (in ms)
export const ANIMATION_DURATION = {
    fast: 300,
    normal: 700,
    slow: 1000,
    verySlow: 1200,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

// App metadata
export const APP_METADATA = {
    title: 'Urban Glam Life | Confidence is Glamour',
    description: 'Where urban edge meets elite couture. Elevating the standard for high-fashion inclusion and luxury travel.',
    tagline: 'Confidence is the New Glamour',
    established: '2024',
} as const;

// API configuration
export const API_CONFIG = {
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
} as const;
