// Blog post data structure
export interface BlogPost {
    id: string;
    slug: string;
    category: string;
    title: string;
    date: string;
    image: string;
    readTime: string;
    excerpt: string;
    author: {
        name: string;
        image: string;
    };
    content: {
        intro: string;
        sections: {
            heading: string;
            content: string;
        }[];
        conclusion: string;
    };
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'monochrome-magic-styling-for-the-night',
        category: 'Fashion',
        title: 'Monochrome Magic: Styling for the Night',
        date: 'MARCH 12, 2024',
        image: 'https://i.imgur.com/fBXEVvt.jpg',
        readTime: '4 MIN READ',
        excerpt: 'Discover the art of monochromatic dressing and how to make a statement with a single color palette for evening events.',
        author: {
            name: 'Urban Glam',
            image: 'https://i.imgur.com/oKwOd93.jpg',
        },
        content: {
            intro: 'There\'s something undeniably powerful about a monochromatic outfit. When executed correctly, it creates a sleek, sophisticated silhouette that commands attention without saying a word. Tonight, we\'re exploring the art of single-color dressing for the urban elite.',
            sections: [
                {
                    heading: 'The Power of One',
                    content: 'Monochromatic dressing isn\'t about being boring—it\'s about being bold. By limiting your palette to variations of a single hue, you create visual harmony that elongates your silhouette and projects confidence. Black, white, and neutrals are classics, but don\'t shy away from all-burgundy, navy, or even emerald ensembles for the truly daring.',
                },
                {
                    heading: 'Texture is Everything',
                    content: 'The secret to avoiding a flat, one-dimensional look? Layer different textures. Pair silk with leather, velvet with satin, or matte with metallic finishes. This creates depth and visual interest while maintaining that cohesive, monochrome aesthetic. Think leather pants with a silk blouse, or a velvet blazer over a satin camisole.',
                },
                {
                    heading: 'Accessorize with Intent',
                    content: 'Your accessories should complement, not compete. Stick to the same color family but play with metallics—gold jewelry with warm tones, silver with cool. A statement bag or bold shoe in your chosen hue can serve as your focal point. Remember: less is more when your outfit already makes a statement.',
                },
                {
                    heading: 'The Rooftop Test',
                    content: 'Before you step out, ask yourself: "Would this photograph well on a rooftop at golden hour?" If the answer is yes, you\'ve nailed it. Monochrome looks are incredibly photogenic, especially against urban backdrops. The clean lines and unified color story make you the undeniable focal point of any frame.',
                },
            ],
            conclusion: 'Monochromatic dressing is the ultimate expression of refined taste. It shows you understand the fundamentals of style and have the confidence to let your presence—not your outfit—do the talking. Master this approach, and you\'ll never struggle with "what to wear" again.',
        },
        tags: ['Fashion', 'Styling', 'Monochrome', 'Evening Wear', 'Urban Style'],
    },
    {
        id: '2',
        slug: 'top-5-secret-lounges-manhattan',
        category: 'Entertainment',
        title: 'Top 5 Secret Lounges in Manhattan',
        date: 'MARCH 08, 2024',
        image: 'https://i.imgur.com/a5pMBQJ.jpg',
        readTime: '6 MIN READ',
        excerpt: 'Unlock access to Manhattan\'s most exclusive hidden lounges where the elite gather after hours.',
        author: {
            name: 'Urban Glam',
            image: 'https://i.imgur.com/oKwOd93.jpg',
        },
        content: {
            intro: 'Manhattan\'s nightlife isn\'t just about the clubs you can Google. The real magic happens behind unmarked doors, in speakeasy-style lounges where discretion is currency and exclusivity is the standard. Here are five venues that define elite entertainment.',
            sections: [
                {
                    heading: '1. The Velvet Archive',
                    content: 'Hidden behind a vintage bookstore in Tribeca, The Velvet Archive requires a password that changes weekly. Once inside, you\'re transported to a 1920s Parisian salon with live jazz, craft cocktails, and a clientele that includes fashion designers, artists, and old-money socialites. Dress code: Black tie encouraged, creativity required.',
                },
                {
                    heading: '2. Skyline Sanctum',
                    content: 'This rooftop haven in Midtown isn\'t listed on any map. Access is by invitation only, typically extended to members and their guests. The 360-degree views are matched only by the caliber of conversation. Expect to rub shoulders with tech moguls, international creatives, and the occasional A-list celebrity seeking refuge from the spotlight.',
                },
                {
                    heading: '3. The Gold Room',
                    content: 'Located beneath a Michelin-starred restaurant in SoHo, The Gold Room is exactly what it sounds like—opulent, intimate, and dripping in luxury. The cocktail menu is curated by a world-renowned mixologist, and the small plates are works of art. Membership waitlist: 6-12 months.',
                },
                {
                    heading: '4. Noir Collective',
                    content: 'This members-only club in the Financial District caters to the after-work elite. Think leather Chesterfields, rare whiskeys, and networking that actually matters. The vibe is sophisticated, the conversations are substantive, and the connections you make here can change your trajectory. Business casual after 6 PM, but make it fashion.',
                },
                {
                    heading: '5. The Midnight Garden',
                    content: 'A hidden gem in the West Village, this botanical-themed lounge feels like stepping into a secret garden. Lush greenery, ambient lighting, and a soundtrack curated by underground DJs create an atmosphere that\'s both energizing and intimate. The crowd? Creative professionals, influencers, and those who appreciate beauty in all its forms.',
                },
            ],
            conclusion: 'These aren\'t just places to drink—they\'re experiences, communities, and gateways to a world most people don\'t know exists. The key to accessing them? Be someone worth knowing, dress like you belong, and always respect the unspoken rules of discretion.',
        },
        tags: ['Entertainment', 'Nightlife', 'Manhattan', 'Exclusive', 'Lounges'],
    },
    {
        id: '3',
        slug: 'flying-private-101-platinum-way',
        category: 'Travel',
        title: 'The Platinum Way: Flying Private 101',
        date: 'FEB 28, 2024',
        image: 'https://i.imgur.com/GyusZaV.jpg',
        readTime: '5 MIN READ',
        excerpt: 'Everything you need to know about private aviation, from booking your first charter to understanding membership programs.',
        author: {
            name: 'Urban Glam',
            image: 'https://i.imgur.com/oKwOd93.jpg',
        },
        content: {
            intro: 'Commercial first class is comfortable. Private aviation is transformative. Once you experience the freedom of bypassing security lines, customizing your departure time, and landing closer to your final destination, there\'s no going back. Here\'s your guide to entering the world of private flight.',
            sections: [
                {
                    heading: 'Understanding Your Options',
                    content: 'Private aviation isn\'t one-size-fits-all. You can charter on-demand (book per flight), purchase a jet card (prepaid hours), join a fractional ownership program (buy a share of an aircraft), or go all-in with full ownership. For most, jet cards offer the best balance of flexibility and value. Expect to invest $100K-$200K for 25-50 hours of flight time.',
                },
                {
                    heading: 'Choosing the Right Aircraft',
                    content: 'Light jets (6-8 passengers) are perfect for short hops—think NYC to Miami. Midsize jets (8-9 passengers) handle cross-country flights comfortably. Heavy jets (10-16 passengers) are for international travel or when you need a flying office. Ultra-long-range jets can take you from LA to Dubai nonstop. Match the aircraft to your mission, not your ego.',
                },
                {
                    heading: 'The Real Cost Breakdown',
                    content: 'Beyond the hourly rate, factor in positioning fees (getting the aircraft to you), landing fees, overnight crew expenses, and catering. A "cheap" charter can balloon quickly. Reputable operators are transparent about all costs upfront. Budget 20-30% above the quoted hourly rate for a realistic total.',
                },
                {
                    heading: 'Maximizing the Experience',
                    content: 'Arrive 15 minutes before departure—not 2 hours. Customize your catering (champagne, specific meals, dietary preferences). Request ground transportation on both ends. Use the time productively: private jets have excellent Wi-Fi, and the cabin is your mobile office or sanctuary. Some operators even offer in-flight spa services.',
                },
                {
                    heading: 'Etiquette & Insider Tips',
                    content: 'Tip your crew (10-20% of the charter cost, split between pilots and attendants). Be ready on time—delays cost money. Dress well but comfortably; this isn\'t commercial where you\'re trying to impress strangers. Build relationships with your account manager; they can secure last-minute availability and upgrades.',
                },
            ],
            conclusion: 'Private aviation isn\'t just about luxury—it\'s about time, the most valuable commodity. When you can leave on your schedule, work uninterrupted at 40,000 feet, and arrive refreshed, you\'re not just traveling differently. You\'re operating at a different level entirely.',
        },
        tags: ['Travel', 'Private Aviation', 'Luxury', 'Lifestyle', 'Jets'],
    },
];

// Helper function to get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
};

// Helper function to get related posts
export const getRelatedPosts = (currentPostId: string, limit: number = 2): BlogPost[] => {
    return blogPosts
        .filter(post => post.id !== currentPostId)
        .slice(0, limit);
};
