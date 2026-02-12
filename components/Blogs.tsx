
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  readTime: string; // mapped from read_time
}

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, slug, category, title, date, image, read_time')
        .order('date', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        const formattedPosts = data?.map(post => ({
          ...post,
          readTime: post.read_time, // map snake_case to camelCase
          // Format date to "MARCH 12, 2024"
          date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
        })) || [];
        setPosts(formattedPosts);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="blogs" className="py-32 bg-neutral-900 relative min-h-[800px] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section id="blogs" className="py-32 bg-neutral-900 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-gold uppercase tracking-[0.8em] text-[10px] font-black mb-6 italic">The Journal</h2>
            <h3 className="text-5xl md:text-7xl font-serif leading-tight text-white tracking-tighter italic">Lifestyle <br />Archives</h3>
          </div>
          <div className="md:text-right">
            <p className="text-neutral-500 max-w-sm mb-10 text-sm leading-relaxed font-light">
              Deep dives into the curated experiences of high-fashion and international elite travel.
            </p>
            <Link
              to="/blog"
              className="text-[11px] uppercase tracking-[0.6em] font-black text-gold border-b border-gold/20 pb-4 hover:border-gold transition-all duration-500"
            >
              View All Narratives
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group cursor-pointer flex flex-col h-full animate-in fade-in-up slide-in-from-bottom-10 duration-1000 fill-mode-both"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <article className="flex flex-col h-full relative">
                {/* IMAGE CONTAINER WITH PREMIUM REFINEMENTS */}
                <div className="overflow-hidden mb-10 relative aspect-[4/5] bg-neutral-950 rounded-3xl luxury-shadow transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">

                  {/* 5% ZOOM & OPACITY EFFECT */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover will-change-transform transition-all duration-[2400ms] ease-[cubic-bezier(0.23,1,0.32,1)] opacity-75 group-hover:opacity-100 group-hover:scale-105"
                  />

                  {/* HIGH-FIDELITY GLINT SWEEP */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-20 transition-opacity duration-700 overflow-hidden">
                    <div
                      className="absolute inset-0 w-[400%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out"
                      style={{
                        background: 'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 50%, rgba(212,175,55,0.3) 52%, rgba(255,255,255,0) 60%, transparent 100%)'
                      }}
                    ></div>
                  </div>

                  {/* CATEGORY TAG */}
                  <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md px-6 py-2 text-[10px] tracking-[0.6em] uppercase font-black text-gold border border-gold/30 group-hover:bg-gold group-hover:text-black transition-all duration-700 z-30 shadow-lg">
                    {post.category}
                  </div>

                  {/* HOVER BORDER ACCENT */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 rounded-3xl transition-all duration-1000 pointer-events-none z-40"></div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-grow px-2">
                  <div className="flex items-center gap-6 mb-6">
                    <p className="text-[10px] text-neutral-500 tracking-[0.4em] font-black">{post.date}</p>
                    <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                    <p className="text-[10px] text-gold/60 tracking-[0.4em] font-black">{post.readTime}</p>
                  </div>

                  <h4 className="text-3xl lg:text-4xl font-serif mb-8 group-hover:text-gold transition-colors duration-700 leading-none italic text-white tracking-tighter">
                    {post.title}
                  </h4>

                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between group-hover:border-gold/30 transition-colors duration-700">
                    <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.8em] text-white/30 group-hover:text-white transition-all duration-700">
                      Discover
                      <div className="w-10 h-px bg-gold/30 group-hover:w-20 group-hover:bg-gold transition-all duration-1000"></div>
                    </button>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
