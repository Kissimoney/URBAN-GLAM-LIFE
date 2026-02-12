
import React, { useState, useEffect } from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  city: string;
  description: string;
  image_url: string;
  date: string;
}

const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Event[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .limit(3)
        .order('date', { ascending: true });

      if (data) setExperiences(data);
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experiences" className="py-32 bg-black relative overflow-hidden">
      {/* Globe background remains the same */}
      <div className="absolute top-0 right-0 p-20 opacity-5 select-none pointer-events-none">
        <Globe size={600} strokeWidth={0.5} className="text-white" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row justify-between md:items-end gap-8">
          <div>
            <h2 className="text-gold uppercase tracking-[1em] text-[10px] font-black mb-6 italic">The Global Circuit</h2>
            <h3 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none italic">Elite <br />Experiences</h3>
          </div>
          <Link to="/events" className="hidden md:flex items-center gap-4 text-white hover:text-gold transition-colors group self-end mb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">View Full Calendar</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="space-y-12">
          {experiences.length === 0 ? (
            <div className="text-white/50 text-center py-10 font-light italic">Loading upcoming experiences...</div>
          ) : (
            experiences.map((exp, idx) => (
              <div key={exp.id} className="group relative flex flex-col md:flex-row items-center border-t border-white/10 pt-12 pb-12 transition-all duration-700 hover:bg-white/[0.02] px-4 md:px-12 rounded-3xl">
                <span className="hidden md:block text-8xl font-serif text-white/5 absolute left-4 group-hover:text-gold/10 transition-colors duration-700">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>

                <div className="w-full md:w-1/3 mb-10 md:mb-0 relative overflow-hidden rounded-2xl aspect-square md:aspect-square lg:aspect-[4/3] luxury-shadow">
                  <img
                    src={exp.image_url}
                    alt={exp.title}
                    className="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                <div className="w-full md:w-2/3 md:pl-24 text-left">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-px bg-gold"></div>
                    <span className="text-gold uppercase tracking-[0.6em] text-[11px] font-black italic">{exp.city}</span>
                  </div>
                  <h4 className="text-4xl md:text-6xl font-serif text-white mb-6 group-hover:text-gold transition-colors duration-700 tracking-tighter">
                    {exp.title}
                  </h4>
                  <p className="text-neutral-500 text-lg md:text-xl font-light max-w-xl mb-10 leading-relaxed">
                    {exp.description}
                  </p>
                  <Link to="/events" className="flex items-center gap-6 group/btn">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40 group-hover/btn:text-white transition-colors">RSVP Now</span>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-gold group-hover/btn:bg-gold group-hover/btn:text-black transition-all duration-500">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </div>
              </div>
            )))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 md:hidden flex justify-center">
          <Link to="/events" className="flex items-center gap-4 text-white hover:text-gold transition-colors group">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black">View Full Calendar</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="mt-24 border-b border-white/10 pb-12 flex justify-between items-end">
          <div className="max-w-md">
            <p className="text-neutral-500 text-sm font-light italic leading-relaxed">
              Urban Glam Life curates more than visuals; we architect moments that define the standard for global high-society engagement.
            </p>
          </div>
          <p className="text-[10px] tracking-[1em] uppercase font-black text-white/20">Upcoming Season</p>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
