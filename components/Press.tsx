import React from 'react';
import { ExternalLink, Award, Newspaper, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PressItem {
    id: number;
    publication: string;
    logo: string;
    title: string;
    date: string;
    excerpt: string;
    url: string;
    category: 'Feature' | 'Interview' | 'Award' | 'Mention';
}

const Press: React.FC = () => {
    const pressItems: PressItem[] = [
        {
            id: 1,
            publication: 'Vogue',
            logo: 'Vogue',
            title: 'The New Face of Luxury: Urban Glam Life Redefines Elite Fashion',
            date: 'March 2024',
            excerpt: 'An in-depth look at how Urban Glam Life is reshaping the conversation around high fashion and inclusive luxury.',
            url: '/blog/vogue-feature-new-face-of-luxury',
            category: 'Feature',
        },
        {
            id: 2,
            publication: 'Forbes',
            logo: 'Forbes',
            title: 'Rising Influencer Disrupts Traditional Luxury Marketing',
            date: 'February 2024',
            excerpt: 'How authenticity and confidence are becoming the new currencies in the luxury lifestyle space.',
            url: '/blog/forbes-interview-disrupting-luxury',
            category: 'Interview',
        },
        {
            id: 3,
            publication: 'Harper\'s Bazaar',
            logo: 'Harper\'s Bazaar',
            title: 'Style Icon: The Urban Glam Aesthetic',
            date: 'January 2024',
            excerpt: 'Breaking down the signature look that\'s captivating fashion capitals worldwide.',
            url: '/blog/harpers-bazaar-style-icon-aesthetic',
            category: 'Feature',
        },
        {
            id: 4,
            publication: 'The New York Times',
            logo: 'NYT',
            title: 'Luxury Lifestyle Influencer Makes Waves at Fashion Week',
            date: 'December 2023',
            excerpt: 'Front row presence and exclusive collaborations mark a breakthrough year.',
            url: '/blog/nyt-mention-fashion-week-waves',
            category: 'Mention',
        },
    ];

    const awards = [
        {
            title: 'Influencer of the Year',
            organization: 'Luxury Lifestyle Awards',
            year: '2024',
            icon: Award,
        },
        {
            title: 'Best Fashion Content',
            organization: 'Digital Fashion Awards',
            year: '2023',
            icon: TrendingUp,
        },
        {
            title: 'Rising Star',
            organization: 'Fashion Media Awards',
            year: '2023',
            icon: Award,
        },
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Feature':
                return <Newspaper size={16} className="text-gold" />;
            case 'Interview':
                return <ExternalLink size={16} className="text-gold" />;
            case 'Award':
                return <Award size={16} className="text-gold" />;
            default:
                return <TrendingUp size={16} className="text-gold" />;
        }
    };

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold rounded-full blur-[200px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-gold uppercase tracking-[1.5em] text-[10px] font-black mb-8 italic">
                        Press & Recognition
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tighter">
                        As Seen In
                    </h3>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light">
                        Featured in leading publications and recognized by industry authorities.
                    </p>
                </div>

                {/* Press Coverage Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto">
                    {pressItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.url}
                            className="group relative bg-[#050505] border border-white/5 p-10 transition-all duration-700 hover:border-gold/40 overflow-hidden shadow-2xl"
                        >
                            {/* Premium Shimmer Overlay */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>

                            {/* Publication & Category */}
                            <div className="flex items-center justify-between mb-10 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-0.5 w-8 bg-gold/30 group-hover:w-12 transition-all duration-700"></div>
                                    <span className="text-3xl font-serif text-white group-hover:text-gold transition-colors italic tracking-tighter">
                                        {item.logo}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 px-4 py-1 rounded-full bg-white/5 border border-white/5 text-neutral-500 text-[9px] uppercase tracking-[0.3em] font-black group-hover:text-gold group-hover:border-gold/20 transition-all duration-500">
                                    {getCategoryIcon(item.category)}
                                    <span>{item.category}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h4 className="text-2xl md:text-3xl font-serif text-white mb-6 group-hover:text-gold transition-all duration-500 leading-tight tracking-tight">
                                "{item.title}"
                            </h4>

                            {/* Excerpt */}
                            <p className="text-neutral-500 text-lg leading-relaxed mb-10 font-light italic">
                                {item.excerpt}
                            </p>

                            {/* Date & Link */}
                            <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
                                <span className="text-neutral-600 text-[10px] uppercase tracking-[0.4em] font-black">
                                    {item.date}
                                </span>
                                <div className="flex items-center gap-3 text-gold text-[10px] uppercase tracking-[0.5em] font-black group-hover:gap-6 transition-all duration-700">
                                    Full Feature
                                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-700" />
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/0 group-hover:border-gold/30 transition-all duration-700 m-2"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gold/0 group-hover:border-gold/30 transition-all duration-700 m-2"></div>
                        </Link>
                    ))}
                </div>

                {/* Awards Section: The Pedigree */}
                <div className="max-w-6xl mx-auto pt-32 border-t border-white/5 relative">
                    <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-gold/20 to-transparent"></div>

                    <h3 className="text-center text-4xl md:text-5xl font-serif text-white mb-20 tracking-tighter">
                        Pedigree & Distinction
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {awards.map((award, index) => {
                            const Icon = award.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-12 bg-neutral-900/10 border border-white/5 hover:border-gold/30 transition-all duration-1000 group relative rounded-3xl"
                                >
                                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl -z-10"></div>

                                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-black border border-gold/10 flex items-center justify-center relative overflow-hidden group-hover:border-gold/40 transition-all duration-700">
                                        <div className="absolute inset-0 bg-gold/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                                        <Icon size={32} className="text-gold/40 group-hover:text-gold group-hover:scale-125 transition-all duration-700 relative z-10" />
                                    </div>

                                    <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-gold transition-colors tracking-tight">
                                        {award.title}
                                    </h4>
                                    <p className="text-neutral-500 text-sm mb-4 font-light uppercase tracking-widest">{award.organization}</p>
                                    <div className="inline-block px-6 py-1 border border-gold/20 rounded-full">
                                        <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-black italic">
                                            {award.year}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Press Kit CTA: The Access */}
                <div className="mt-32 text-center">
                    <div className="inline-block p-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent w-full max-w-sm mb-12"></div>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-[1em] mb-10 font-black">
                        Exclusive Media Access
                    </p>
                    <a
                        href="#contact"
                        className="group relative inline-flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gold translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
                        <span className="relative z-10 border border-gold text-gold group-hover:text-black font-black py-8 px-20 uppercase tracking-[0.6em] text-[11px] transition-colors duration-700 block whitespace-nowrap">
                            Download VIP Press Kit
                        </span>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Press;
