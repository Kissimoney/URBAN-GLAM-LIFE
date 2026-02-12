
import React from 'react';

const About: React.FC = () => {
  const partners = [
    "Maison de Couture", "Elite Traveler", "Vanguard Nightlife",
    "Luxe Magazine", "Platinum Club", "Urban Runway", "Velvet Access"
  ];

  return (
    <section id="about" className="py-32 bg-neutral-950 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">

          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            <div className="relative w-[90%] aspect-square max-w-[550px]">
              <div className="absolute inset-0 border border-gold/30 rounded-full scale-110 animate-[spin_30s_linear_infinite] pointer-events-none"></div>
              <div className="absolute -inset-12 border-[0.5px] border-white/10 rounded-full scale-105 animate-[spin_45s_linear_infinite_reverse] pointer-events-none"></div>

              <div className="relative w-full h-full rounded-full overflow-hidden border-[16px] border-white/5 shadow-2xl group transition-transform duration-1000">
                <img
                  src="/images/ai_character_face_1.jpg"
                  alt="The Woman Behind the Vibe"
                  className="w-full h-full object-cover transition-all duration-[3000ms] ease-out group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent group-hover:from-transparent transition-all duration-1000"></div>
              </div>

              <div className="absolute bottom-[5%] -right-12 z-20 bg-gold p-10 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-1000 transform hover:scale-105 transition-transform">
                <p className="font-serif text-5xl text-black font-bold italic leading-none">01</p>
                <p className="text-[10px] tracking-[0.5em] font-black text-black/70 uppercase mt-5">The Muse</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-gold uppercase tracking-[0.8em] text-[10px] font-black mb-8 italic">Strategic Vision</h2>
            <h3 className="text-6xl md:text-8xl font-serif mb-12 leading-[1] text-white tracking-tighter">
              The Curator <br />Of Confidence
            </h3>
            <div className="space-y-10 text-neutral-400 text-xl leading-relaxed font-light">
              <p>
                Urban Glam Life is more than a brand—it's an unapologetic movement of presence. Born from the desire to see more high-fashion inclusion on the global stage, our founder has redefined luxury for the modern era.
              </p>
              <p>
                By bridging the gap between urban edge and elite couture, she creates a space where every curve is celebrated and every journey is taken with platinum-tier style.
              </p>
              <p className="text-white font-serif text-2xl italic border-l-4 border-gold pl-10 py-4 bg-white/5 rounded-r-2xl">
                "Glamour isn't just about what you wear—it's about the energy you bring into the room."
              </p>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/10 pt-20">
              <div className="group">
                <p className="text-5xl font-serif text-gold group-hover:scale-110 transition-transform origin-left">50K+</p>
                <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-black mt-4">Followers</p>
              </div>
              <div className="group">
                <p className="text-5xl font-serif text-gold group-hover:scale-110 transition-transform origin-left">12+</p>
                <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-black mt-4">Global Hubs</p>
              </div>
              <div className="group">
                <p className="text-5xl font-serif text-gold group-hover:scale-110 transition-transform origin-left">100+</p>
                <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-black mt-4">Live Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL PROOF: BRAND MARQUEE */}
        <div className="mt-32 pt-16 border-t border-white/5 relative">
          <div className="flex flex-col items-center mb-12">
            <h4 className="text-[9px] uppercase tracking-[1em] font-black text-white/20 mb-2">Featured In & Collaborations</h4>
            <div className="w-12 h-px bg-gold/30"></div>
          </div>

          <div className="relative overflow-hidden w-full group">
            {/* Mask gradients for smooth entry/exit */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10"></div>

            <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap gap-24 py-8 items-center">
              {[...partners, ...partners].map((partner, i) => (
                <span
                  key={i}
                  className="text-2xl md:text-3xl font-serif text-white/30 hover:text-gold hover:scale-110 transition-all duration-500 cursor-default tracking-tight italic"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default About;
