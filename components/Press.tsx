import React from 'react';
import { ExternalLink, Award, Newspaper, TrendingUp } from 'lucide-react';

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
            url: '#',
            category: 'Feature',
        },
        {
            id: 2,
            publication: 'Forbes',
            logo: 'Forbes',
            title: 'Rising Influencer Disrupts Traditional Luxury Marketing',
            date: 'February 2024',
            excerpt: 'How authenticity and confidence are becoming the new currencies in the luxury lifestyle space.',
            url: '#',
            category: 'Interview',
        },
        {
            id: 3,
            publication: 'Harper\'s Bazaar',
            logo: 'Harper\'s Bazaar',
            title: 'Style Icon: The Urban Glam Aesthetic',
            date: 'January 2024',
            excerpt: 'Breaking down the signature look that\'s captivating fashion capitals worldwide.',
            url: '#',
            category: 'Feature',
        },
        {
            id: 4,
            publication: 'The New York Times',
            logo: 'NYT',
            title: 'Luxury Lifestyle Influencer Makes Waves at Fashion Week',
            date: 'December 2023',
            excerpt: 'Front row presence and exclusive collaborations mark a breakthrough year.',
            url: '#',
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
                    {pressItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-neutral-900/50 border border-white/10 p-8 hover:border-gold/30 transition-all duration-500 backdrop-blur-sm"
                        >
                            {/* Publication & Category */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-serif text-white/80 italic">
                                        {item.logo}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-500 text-xs uppercase tracking-wider">
                                    {getCategoryIcon(item.category)}
                                    <span>{item.category}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h4 className="text-xl font-serif text-white mb-4 group-hover:text-gold transition-colors leading-tight">
                                {item.title}
                            </h4>

                            {/* Excerpt */}
                            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                                {item.excerpt}
                            </p>

                            {/* Date & Link */}
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <span className="text-neutral-500 text-xs uppercase tracking-wider">
                                    {item.date}
                                </span>
                                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-wider font-bold group-hover:gap-4 transition-all">
                                    Read Article
                                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Awards Section */}
                <div className="max-w-6xl mx-auto pt-20 border-t border-white/10">
                    <h3 className="text-center text-3xl font-serif text-white mb-16">
                        Awards & Recognition
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {awards.map((award, index) => {
                            const Icon = award.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-8 bg-neutral-900/30 border border-white/5 hover:border-gold/20 transition-all duration-500 group"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 group-hover:bg-gold/20 transition-all">
                                        <Icon size={28} className="text-gold" />
                                    </div>
                                    <h4 className="text-xl font-serif text-white mb-2 group-hover:text-gold transition-colors">
                                        {award.title}
                                    </h4>
                                    <p className="text-neutral-400 text-sm mb-2">{award.organization}</p>
                                    <p className="text-gold text-xs uppercase tracking-widest font-bold">
                                        {award.year}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Press Kit CTA */}
                <div className="mt-20 text-center">
                    <p className="text-neutral-500 text-sm uppercase tracking-wider mb-6">
                        Media Inquiries
                    </p>
                    <a
                        href="#contact"
                        className="inline-block bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/5 text-white px-12 py-4 text-xs uppercase tracking-[0.5em] font-black transition-all duration-500"
                    >
                        Download Press Kit
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Press;
