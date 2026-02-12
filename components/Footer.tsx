
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      href: '#',
      hoverBorder: 'group-hover:border-gold',
      hoverShadow: 'group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]',
      hoverText: 'group-hover:text-gold'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      href: '#',
      hoverBorder: 'group-hover:border-gold',
      hoverShadow: 'group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]',
      hoverText: 'group-hover:text-gold'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={24} />,
      href: '#',
      hoverBorder: 'group-hover:border-gold',
      hoverShadow: 'group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]',
      hoverText: 'group-hover:text-gold'
    },
    {
      name: 'Youtube',
      icon: <Youtube size={24} />,
      href: '#',
      hoverBorder: 'group-hover:border-gold',
      hoverShadow: 'group-hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]',
      hoverText: 'group-hover:text-gold'
    },
  ];

  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 tracking-tighter">
          URBAN <span className="text-gold">GLAM</span> LIFE
        </h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20 w-full max-w-4xl">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="group flex flex-col items-center gap-4 text-neutral-500 transition-all duration-500 min-w-[100px]"
            >
              <div
                className={`p-6 border border-white/5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:text-white bg-transparent group-hover:bg-gold/5 ${social.hoverBorder} ${social.hoverShadow}`}
              >
                <div className="transition-colors duration-300">
                  {social.icon}
                </div>
              </div>
              <span className={`text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-500 ${social.hoverText}`}>
                {social.name}
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
          <p className="text-neutral-600 text-[10px] uppercase tracking-widest font-bold">
            &copy; 2024 Urban Glam Life. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-gold hover:text-white transition-colors group"
          >
            Back to top
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>

          <div className="flex gap-8 text-neutral-600 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
