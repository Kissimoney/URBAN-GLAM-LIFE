import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
            image: 'https://i.imgur.com/KPAkrhe.jpg',
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Side */}
                        <div className="relative">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative group">
                                <img
                                    src={activeTestimonial.image}
                                    alt={activeTestimonial.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Quote Icon Overlay */}
                                <div className="absolute top-8 right-8 w-20 h-20 bg-gold/10 backdrop-blur-md rounded-full flex items-center justify-center border border-gold/30">
                                    <Quote size={32} className="text-gold" />
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-gold/20 rounded-3xl -z-10"></div>
                        </div>

                        {/* Content Side */}
                        <div className="relative">
                            {/* Quote */}
                            <div className="mb-12">
                                <p className="text-2xl md:text-3xl font-light text-white leading-relaxed italic">
                                    "{activeTestimonial.quote}"
                                </p>
                            </div>

                            {/* Rating Stars */}
                            <div className="flex gap-2 mb-8">
                                {[...Array(activeTestimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-gold fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Author Info */}
                            <div className="border-t border-white/10 pt-8">
                                <h4 className="text-2xl font-serif text-white mb-2">
                                    {activeTestimonial.name}
                                </h4>
                                <p className="text-gold text-sm uppercase tracking-widest font-bold mb-1">
                                    {activeTestimonial.role}
                                </p>
                                <p className="text-neutral-500 text-sm tracking-wide">
                                    {activeTestimonial.company}
                                </p>
                            </div>

                            {/* Navigation Controls */}
                            <div className="flex items-center gap-6 mt-12">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all duration-500 hover:scale-110"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft size={24} />
                                </button>

                                <div className="flex gap-3">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`h-2 rounded-full transition-all duration-500 ${index === activeIndex
                                                    ? 'w-12 bg-gold'
                                                    : 'w-2 bg-white/20 hover:bg-white/40'
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextTestimonial}
                                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all duration-500 hover:scale-110"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brand Logos Section */}
                <div className="mt-32 pt-20 border-t border-white/10">
                    <p className="text-center text-neutral-500 uppercase tracking-[0.5em] text-[10px] font-black mb-16">
                        Trusted By Industry Leaders
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40">
                        {/* Logo Placeholders - Replace with actual brand logos */}
                        {['Vogue', 'Cartier', 'Louis Vuitton', 'Hermès'].map((brand, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center h-20 text-white/60 hover:text-gold transition-colors duration-500"
                            >
                                <span className="text-2xl font-serif italic tracking-wider">{brand}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
