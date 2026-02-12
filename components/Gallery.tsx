
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { X, LayoutGrid, Film, ArrowUpRight } from 'lucide-react';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
}

const GalleryCard: React.FC<{
  img: GalleryImage;
  index: number;
  isCinematic: boolean;
  onSelect: (img: GalleryImage) => void;
  activeCategory: string;
}> = ({ img, index, isCinematic, onSelect, activeCategory }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({ x: glowX, y: glowY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div
      key={`${activeCategory}-${img.title}`}
      className="group relative animate-in fade-in zoom-in-95 duration-1000 fill-mode-both"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        ref={cardRef}
        onClick={() => onSelect(img)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'none' : 'all 1200ms cubic-bezier(0.23, 1, 0.32, 1)',
          transformStyle: 'preserve-3d'
        }}
        className={`relative overflow-hidden rounded-3xl cursor-pointer bg-neutral-950
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:-translate-y-4 hover:scale-105
        shadow-2xl hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.5)] 
        ${isCinematic ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}
      >
        {/* IMAGE WITH 5% ZOOM */}
        <img
          src={img.url}
          alt={img.title}
          className="w-full h-full object-cover will-change-transform transition-all duration-[2400ms] ease-[cubic-bezier(0.23,1,0.32,1)] opacity-100 group-hover:opacity-60"
        />

        {/* METALLIC GLINT SWEEP */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-500 overflow-hidden">
          <div
            className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-[1800ms] ease-in-out"
            style={{
              background: 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 50%, rgba(212,175,55,0.3) 52%, rgba(255,255,255,0) 60%, transparent 100%)'
            }}
          ></div>
        </div>

        {/* LUXURY GOLD OVERLAY WITH BACKDROP BLUR */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-0 group-hover:backdrop-blur-[12px] transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-end p-10 md:p-14 z-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 delay-[100ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
              <span className="text-gold text-[10px] uppercase tracking-[1.2em] font-black italic">{img.category}</span>
              <div className="h-px bg-gold/30 flex-grow group-hover:flex-grow transition-all duration-1000"></div>
            </div>

            <div className="overflow-hidden">
              <h4 className="text-4xl md:text-6xl font-serif text-white italic leading-[0.9] tracking-tighter
                translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                transition-all duration-[1200ms] delay-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
                {img.title}
              </h4>
            </div>

            <div className="flex items-center justify-between pt-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-1000 delay-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
              <div className="flex items-center gap-6">
                <span className="text-[10px] text-white/50 uppercase tracking-[0.6em] font-black group-hover:text-white transition-colors duration-700">
                  Full Archive
                </span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MICRO GOLD BORDER ACCENT */}
        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 rounded-3xl transition-all duration-1000 pointer-events-none z-30"></div>
      </div>

      {/* RESTING STATE CAPTIONS */}
      <div className="mt-12 px-2 flex flex-col items-start transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 group-hover:translate-y-4">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-black italic">{img.category}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-gold/20"></div>
        </div>
        <h5 className="text-3xl font-serif text-white/80 italic tracking-tighter transition-colors duration-500 group-hover:text-gold">
          {img.title}
        </h5>
        <div className="mt-6 w-12 h-[1px] bg-white/10"></div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCinematic, setIsCinematic] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | GalleryImage>(null);

  const categories = ['All', 'Fashion', 'Travel', 'Nightlife'];

  const images: GalleryImage[] = useMemo(() => [
    { url: 'https://i.imgur.com/gMeVCKs.jpg', title: 'Couture Nights', category: 'Fashion' },
    { url: 'https://i.imgur.com/bLnJK4n.jpg', title: 'Private Ascent', category: 'Travel' },
    { url: 'https://i.imgur.com/pFpLtb9.jpg', title: 'Elite Lounge', category: 'Nightlife' },
    { url: '/images/ai_character_face_1.jpg', title: 'Gala Presence', category: 'Fashion' },
    { url: 'https://i.imgur.com/zVzNj7W.jpg', title: 'Monaco Stay', category: 'Travel' },
    { url: 'https://i.imgur.com/AAsS2HM.jpg', title: 'Velvet Access', category: 'Nightlife' },
  ], []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: images.length };
    images.forEach(img => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, [images]);

  const filteredImages = useMemo(() => {
    return activeCategory === 'All' ? images : images.filter(img => img.category === activeCategory);
  }, [activeCategory, images]);

  return (
    <section id="gallery" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-1/2 bg-gold/5 blur-[180px] -rotate-12 pointer-events-none transition-opacity duration-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-gold uppercase tracking-[1.2em] text-[10px] font-black mb-8 italic text-center animate-in fade-in slide-in-from-bottom duration-1000">
            Curated Visual Archive
          </h2>
          <h3 className="text-6xl md:text-[10rem] font-serif mb-20 text-center tracking-tighter text-white leading-none italic">
            The Portfolio
          </h3>

          <nav className="flex flex-wrap justify-center gap-x-10 md:gap-x-20 gap-y-6 mb-16 border-b border-white/5 pb-12 w-full max-w-5xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`group relative py-2 transition-all duration-700 ${activeCategory === cat ? 'text-gold' : 'text-neutral-500 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[12px] md:text-[14px] uppercase tracking-[0.8em] font-black transition-all duration-500 group-hover:tracking-[1em]">
                    {cat}
                  </span>
                  <span className={`text-[8px] font-black opacity-30 group-hover:opacity-60 transition-opacity ${activeCategory === cat ? 'text-gold opacity-100' : ''}`}>
                    / 0{categoryCounts[cat] || 0}
                  </span>
                </div>
                <span className={`absolute -bottom-[49px] left-0 w-full h-[2px] bg-gold transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${activeCategory === cat ? 'opacity-100 scale-x-100 shadow-[0_0_20px_rgba(212,175,55,1)]' : 'opacity-0 scale-x-0'
                  }`}></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-10 mb-12">
            <button
              onClick={() => setIsCinematic(false)}
              className={`flex items-center gap-4 text-[10px] tracking-[0.5em] font-black uppercase transition-all duration-700 ${!isCinematic ? 'text-gold' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              <LayoutGrid size={16} className={!isCinematic ? 'text-gold' : 'text-neutral-600'} />
              Portrait
            </button>
            <div className="w-px h-5 bg-white/10"></div>
            <button
              onClick={() => setIsCinematic(true)}
              className={`flex items-center gap-4 text-[10px] tracking-[0.5em] font-black uppercase transition-all duration-700 ${isCinematic ? 'text-gold' : 'text-neutral-600 hover:text-neutral-400'}`}
            >
              <Film size={16} className={isCinematic ? 'text-gold' : 'text-neutral-600'} />
              Cinematic
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10 lg:gap-x-16 min-h-[800px]">
          {filteredImages.map((img, index) => (
            <GalleryCard
              key={`${activeCategory}-${img.title}-${index}`}
              img={img}
              index={index}
              isCinematic={isCinematic}
              onSelect={setSelectedImage}
              activeCategory={activeCategory}
            />
          ))}
        </div>

        <div className="mt-40 flex justify-center">
          <button className="group relative py-12 px-28 border border-white/5 hover:border-gold transition-all duration-[1500ms] overflow-hidden rounded-full">
            <span className="relative z-10 text-[13px] uppercase tracking-[1.5em] font-black group-hover:text-gold transition-colors duration-700">
              Enter The Archive
            </span>
            <div className="absolute inset-0 bg-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-1200ms ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-700">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setSelectedImage(null)}></div>
          <button className="absolute top-12 right-12 z-[110] text-white/40 hover:text-gold transition-colors p-6" onClick={() => setSelectedImage(null)}>
            <X size={48} strokeWidth={1} />
          </button>
          <div className="relative z-[105] max-w-7xl w-full flex flex-col items-center animate-in zoom-in-95 duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
            <div className="relative w-full max-h-[75vh] flex justify-center group/lb">
              <img src={selectedImage.url} alt={selectedImage.title} className="max-h-[75vh] w-auto object-contain rounded-3xl shadow-2xl border border-white/5" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 border-r border-b border-gold/10 pointer-events-none"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 border-l border-t border-gold/10 pointer-events-none"></div>
            </div>
            <div className="mt-24 text-center">
              <p className="text-gold text-[14px] uppercase tracking-[2em] font-black mb-8 italic">{selectedImage.category}</p>
              <h2 className="text-6xl md:text-[10rem] font-serif text-white tracking-tighter italic leading-none mb-12">{selectedImage.title}</h2>
              <div className="w-24 h-px bg-white/10 mx-auto mb-12"></div>
              <p className="text-neutral-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light tracking-[0.5em] uppercase">
                Exclusive archival documentation from the Urban Glam lifestyle circuit.
                Documenting the intersection of global culture and high luxury.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
