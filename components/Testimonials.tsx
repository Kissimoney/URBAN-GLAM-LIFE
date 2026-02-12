import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
    quote: string;
    rating: number;
}

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Isabella Chen',
            role: 'Creative Director',
            company: 'Vogue International',
            image: 'https://i.imgur.com/Bb4KgFn.jpg',
            quote: 'Working with Urban Glam Life elevated our Paris Fashion Week coverage to unprecedented levels. Their understanding of luxury aesthetics and authentic storytelling is unmatched in the industry.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Marcus Sterling',
            role: 'CEO',
            company: 'Sterling Luxury Group',
            image: 'https://i.imgur.com/xMLk3mc.jpg',
            quote: 'The collaboration brought a fresh, sophisticated perspective to our brand campaign. Urban Glam Life doesn\'t just understand luxury—they embody it. The results exceeded all expectations.',
            rating: 5,
        },
        {
            id: 3,
            name: 'Sophia Laurent',
            role: 'Brand Ambassador',
            company: 'Cartier',
            image: '/images/ai_character_face_1.jpg',
            quote: 'Authenticity meets elegance. Every project is executed with meticulous attention to detail and an innate sense of what resonates with the elite audience. Simply exceptional.',
            rating: 5,
        },
    ];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-[150px]"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-gold uppercase tracking-[1.5em] text-[10px] font-black mb-8 italic">
                        Trusted Partnerships
                    </h2>
                    <h3 className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-tighter">
                        What They Say
                    </h3>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light">
                        Collaborations with global brands, publications, and industry leaders.
                    </p>
                </div>

                {/* Testimonial Carousel */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Image Side */}
                        <div className="relative group/card">
                            {/* Premium Glow Effect */}
                            <div className="absolute inset-0 bg-gold/20 blur-[100px] opacity-0 group-hover/card:opacity-30 transition-opacity duration-1000 -z-10"></div>

                            <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative">
                                <img
                                    src={activeTestimonial.image}
                                    alt={activeTestimonial.name}
                                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover/card:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                                {/* Floating Quote Decoration */}
                                <div className="absolute bottom-10 right-10 w-24 h-24 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 group-hover/card:border-gold/30 transition-all duration-700">
                                    <Quote size={32} className="text-gold/40 group-hover/card:text-gold group-hover/card:scale-110 transition-all duration-700" />
                                </div>
                            </div>

                            {/* Luxury Border Frame */}
                            <div className="absolute -inset-4 border border-gold/10 rounded-[3rem] -z-10 group-hover:border-gold/30 transition-all duration-1000"></div>
                        </div>

                        {/* Content Side */}
                        <div className="relative">
                            {/* Quote with Luxury Styling */}
                            <div className="mb-16 relative">
                                <div className="absolute -top-10 -left-10 text-[120px] font-serif text-gold/5 leading-none select-none">“</div>
                                <p className="text-2xl md:text-4xl font-serif font-light text-white leading-[1.6] italic relative z-10 transition-all duration-700">
                                    {activeTestimonial.quote}
                                </p>
                            </div>

                            {/* Author & Rating Group */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-white/5 pt-12">
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                                            <Star key={i} size={14} className="text-gold fill-gold" />
                                        ))}
                                    </div>
                                    <h4 className="text-3xl font-serif text-white mb-2 tracking-tight">
                                        {activeTestimonial.name}
                                    </h4>
                                    <p className="flex items-center gap-3">
                                        <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">{activeTestimonial.role}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                                        <span className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-bold">{activeTestimonial.company}</span>
                                    </p>
                                </div>

                                {/* Inline Navigation */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={prevTestimonial}
                                        className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-500"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-500"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Indicators */}
                            <div className="flex gap-3 mt-16">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-1000 ${index === activeIndex
                                            ? 'w-16 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                                            : 'w-4 bg-white/10 hover:bg-white/30'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Logos: The Elite Network */}
                <div className="mt-40 pt-24 border-t border-white/5 relative">
                    {/* Floating Glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

                    <p className="text-center text-neutral-600 uppercase tracking-[0.6em] text-[10px] font-black mb-20 italic">
                        The Elite Influence Network
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
                        {['Vogue', 'Cartier', 'Louis Vuitton', 'Hermès'].map((brand, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center justify-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 cursor-default"
                            >
                                <span className="text-3xl font-serif text-white group-hover:text-gold transition-colors italic tracking-widest">{brand}</span>
                                <div className="w-0 h-px bg-gold group-hover:w-12 transition-all duration-1000"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
