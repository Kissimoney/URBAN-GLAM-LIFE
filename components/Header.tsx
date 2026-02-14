import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Collection', href: '/collection' },
    { name: 'Events', href: '/events' },
    { name: 'Lifestyle', href: '/#blogs' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-xl md:text-3xl font-serif font-bold tracking-tighter hover:text-white/80 transition-colors">
          URBAN <span className="text-gold">GLAM</span> LIFE
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-12 items-center">
          <div className="flex items-center gap-4 border-r border-white/10 pr-8 mr-4">
            <Globe size={14} className="text-gold/60" />
            <div className="flex gap-3">
              {[
                { code: 'en', label: 'EN' },
                { code: 'fr', label: 'FR' },
                { code: 'ar', label: 'AR' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`text-[9px] font-black tracking-widest transition-colors ${language === lang.code ? 'text-gold' : 'text-white/40 hover:text-white'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/80 hover:text-gold transition-all duration-300 hover:scale-105"
            >
              {link.name}
            </a>
          ))}
          <a
            href={user ? "/dashboard" : "/access"}
            className="bg-gold text-black px-8 py-3 rounded-none font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            {user ? "Dashboard" : "Member Access"}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : language === 'fr' ? 'ar' : 'en')}
            className="text-[10px] font-black text-gold border border-gold/20 px-3 py-1 uppercase tracking-widest"
          >
            {language}
          </button>
          <button
            className="text-white p-2 hover:text-gold transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-900 border-b border-white/10 flex flex-col items-center py-10 space-y-8 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-serif hover:text-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href={user ? "/dashboard" : "/access"}
            className="text-xl font-serif text-gold font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            {user ? "My Dashboard" : "Member Access"}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
