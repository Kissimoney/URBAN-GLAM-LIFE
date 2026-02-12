
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

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
        <button
          className="md:hidden text-white p-2 hover:text-gold transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
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
