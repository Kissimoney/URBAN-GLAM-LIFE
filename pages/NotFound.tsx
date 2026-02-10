import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* 404 Number */}
                <div className="mb-12">
                    <h1 className="text-[12rem] md:text-[20rem] font-serif font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-gold via-gold to-white/20 tracking-tighter">
                        404
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                </div>

                {/* Message */}
                <div className="max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-neutral-400 leading-relaxed font-light">
                        The page you're looking for seems to have vanished into the night.
                        Perhaps it's at an exclusive event we haven't told you about yet.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 bg-gold hover:bg-white text-black font-black py-5 px-10 uppercase tracking-[0.5em] text-[10px] transition-all duration-700 shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                    >
                        <Home size={18} className="group-hover:scale-110 transition-transform" />
                        Return Home
                    </Link>

                    <Link
                        to="/#blogs"
                        className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold text-white font-black py-5 px-10 uppercase tracking-[0.5em] text-[10px] transition-all duration-700"
                    >
                        <Search size={18} className="group-hover:scale-110 transition-transform" />
                        Browse Content
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="max-w-4xl mx-auto">
                    <p className="text-neutral-500 text-xs uppercase tracking-[0.5em] font-black mb-8">
                        Quick Navigation
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Link
                            to="/#about"
                            className="group p-6 bg-neutral-900/50 border border-white/10 hover:border-gold/30 transition-all duration-500"
                        >
                            <div className="text-gold text-2xl font-serif mb-2 group-hover:scale-110 transition-transform">01</div>
                            <p className="text-white text-sm uppercase tracking-wider font-bold">About</p>
                        </Link>

                        <Link
                            to="/#gallery"
                            className="group p-6 bg-neutral-900/50 border border-white/10 hover:border-gold/30 transition-all duration-500"
                        >
                            <div className="text-gold text-2xl font-serif mb-2 group-hover:scale-110 transition-transform">02</div>
                            <p className="text-white text-sm uppercase tracking-wider font-bold">Gallery</p>
                        </Link>

                        <Link
                            to="/#blogs"
                            className="group p-6 bg-neutral-900/50 border border-white/10 hover:border-gold/30 transition-all duration-500"
                        >
                            <div className="text-gold text-2xl font-serif mb-2 group-hover:scale-110 transition-transform">03</div>
                            <p className="text-white text-sm uppercase tracking-wider font-bold">Blog</p>
                        </Link>

                        <Link
                            to="/#contact"
                            className="group p-6 bg-neutral-900/50 border border-white/10 hover:border-gold/30 transition-all duration-500"
                        >
                            <div className="text-gold text-2xl font-serif mb-2 group-hover:scale-110 transition-transform">04</div>
                            <p className="text-white text-sm uppercase tracking-wider font-bold">Contact</p>
                        </Link>
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-20 pt-12 border-t border-white/10 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-3 text-neutral-500 text-sm">
                        <Mail size={16} />
                        <p>
                            Need assistance?{' '}
                            <Link to="/#contact" className="text-gold hover:text-white transition-colors">
                                Contact us
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
        </div>
    );
};

export default NotFound;
