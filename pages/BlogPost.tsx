
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Quote, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import ReadingProgress from '../components/ReadingProgress';
import SocialShare from '../components/SocialShare';
import SEO from '../components/SEO';
import { BlogPostSkeleton } from '../components/Skeleton';

interface BlogPostContent {
    intro: string;
    sections: {
        heading: string;
        content: string;
    }[];
    conclusion: string;
}

interface BlogPostAuthor {
    name: string;
    image: string;
}

interface BlogPost {
    id: string;
    slug: string;
    category: string;
    title: string;
    date: string;
    image: string;
    readTime: string; // mapped from read_time
    excerpt: string;
    author: BlogPostAuthor;
    content: BlogPostContent;
    tags: string[];
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (slug) {
            fetchPost(slug);
        }
    }, [slug]);

    const fetchPost = async (slug: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;

            if (data) {
                const formattedPost: BlogPost = {
                    ...data,
                    readTime: data.read_time,
                    // Format date
                    date: new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
                };
                setPost(formattedPost);
                fetchRelatedPosts(formattedPost.id, formattedPost.category);
            } else {
                setPost(null);
            }
        } catch (err) {
            console.error('Error fetching post:', err);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedPosts = async (currentPostId: string, category: string) => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('id, slug, category, title, date, image, read_time, excerpt')
                .neq('id', currentPostId)
                .eq('category', category)
                .limit(2);

            if (error) {
                console.error('Error fetching related posts:', error);
            } else {
                const formattedRelated = data?.map(p => ({
                    ...p,
                    readTime: p.read_time,
                    date: new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
                    // Provide defaults for missing fields in related posts view
                    author: { name: '', image: '' },
                    content: { intro: '', sections: [], conclusion: '' },
                    tags: []
                })) || [];
                setRelatedPosts(formattedRelated);
            }
        } catch (err) {
            console.error('Error fetching related posts:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center animate-in fade-in zoom-in-95 duration-700">
                    <h1 className="text-8xl font-serif text-gold mb-6 opacity-20">404</h1>
                    <p className="text-neutral-400 mb-8 tracking-[0.3em] uppercase text-xs font-black">Archive Disconnected</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-4 text-white hover:text-gold transition-all duration-500 group border border-white/10 px-8 py-4 rounded-full"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black overflow-x-hidden">
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.image}
                url={window.location.href}
            />
            {/* Reading Progress Bar */}
            <ReadingProgress />

            {/* Back Button */}
            <div className="fixed top-8 left-8 z-50">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 text-white/40 hover:text-gold transition-all duration-700 group bg-black/50 backdrop-blur-md border border-white/5 px-6 py-3 rounded-full"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-700" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black">Vault</span>
                </button>
            </div>

            {/* Hero Image Section with Parallax */}
            <div className="relative h-[85vh] overflow-hidden">
                <div
                    className="absolute inset-0 w-full h-full will-change-transform"
                    style={{
                        transform: `scale(1.1) translateY(${scrollY * 0.4}px)`,
                    }}
                >
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale-[0.3] brightness-[0.7]"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                    <div className="w-px h-12 bg-gradient-to-t from-gold to-transparent"></div>
                </div>

                {/* Hero Content */}
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-24 md:pb-32">
                        <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-20 duration-1000">
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
                                <span className="bg-gold/20 backdrop-blur-md text-gold text-[10px] uppercase tracking-[0.4em] font-black border border-gold/30 px-5 py-2 rounded-full">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <Calendar size={12} className="text-gold/50" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <Clock size={12} className="text-gold/50" />
                                    {post.readTime} reading
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tighter">
                                {post.title}
                            </h1>

                            <div className="w-24 h-1 bg-gold/50 mb-8"></div>

                            <p className="text-xl md:text-2xl text-neutral-300 font-light max-w-3xl leading-relaxed italic opacity-80">
                                "{post.excerpt}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="py-32 px-6 relative">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] -z-10 rounded-full"></div>

                <div className="max-w-3xl mx-auto">
                    {/* Author Info & Share */}
                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-20 pb-12 border-b border-white/5">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <img
                                    src={post.author?.image || 'https://i.imgur.com/eK99vS2.jpg'}
                                    alt={post.author?.name || 'Curator'}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-gold/20 p-1 bg-black"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full border-4 border-black flex items-center justify-center">
                                    <div className="w-1 h-1 bg-black rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <p className="text-white text-lg font-serif italic">{post.author?.name || 'The Curator'}</p>
                                <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-black opacity-60">Global Luxury Editor</p>
                            </div>
                        </div>

                        <div className="md:ml-auto flex items-center gap-4">
                            <span className="text-white/20 text-[9px] uppercase tracking-widest font-black mr-2">Disseminate</span>
                            <SocialShare
                                title={post.title}
                                url={window.location.href}
                                description={post.excerpt}
                            />
                        </div>
                    </div>

                    {/* Introduction with Luxury Drop Cap */}
                    <div className="prose prose-invert prose-2xl max-w-none mb-20">
                        <p className="text-2xl md:text-3xl text-neutral-200 leading-[1.6] font-light
                            first-letter:text-8xl first-letter:font-serif first-letter:font-bold first-letter:text-gold 
                            first-letter:float-left first-letter:mr-6 first-letter:mt-2 first-letter:leading-[0.8]
                            selection:bg-gold/30">
                            {post.content?.intro}
                        </p>
                    </div>

                    {/* Content Sections with Premium Numbering */}
                    {post.content?.sections?.map((section, index) => (
                        <div key={index} className="mb-24 group">
                            <div className="flex items-center gap-6 mb-8 overflow-hidden">
                                <span className="text-gold/10 text-7xl md:text-9xl font-serif font-black transition-all duration-700 group-hover:text-gold/20 leading-none -ml-4 md:-ml-8">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight leading-tight">
                                    {section.heading}
                                </h2>
                            </div>
                            <div className="w-full h-px bg-gradient-to-r from-gold/30 via-gold/5 to-transparent mb-10 translate-y-[-1rem]"></div>
                            <p className="text-neutral-400 text-lg md:text-xl leading-[1.8] font-light tracking-wide">
                                {section.content}
                            </p>
                        </div>
                    ))}

                    {/* Conclusion with Premium Polish */}
                    <div className="mt-32 p-12 md:p-16 bg-[#050505] border border-gold/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-gold/20 transition-all duration-700"></div>
                        <Quote size={40} className="text-gold/20 mb-8" />
                        <p className="text-2xl md:text-3xl text-neutral-200 leading-relaxed font-light italic font-serif">
                            {post.content?.conclusion}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="mt-16 pt-12 border-t border-white/10">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Tag size={18} className="text-gold" />
                            {post.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white/5 border border-white/10 text-neutral-400 text-xs uppercase tracking-wider hover:border-gold/30 hover:text-gold transition-all cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Posts: Continue the Journey */}
            {relatedPosts.length > 0 && (
                <section className="py-32 px-6 bg-[#030303] border-t border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-gold/20 via-transparent to-transparent"></div>

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
                            <div>
                                <h2 className="text-gold uppercase tracking-[0.5em] text-[10px] font-black mb-6">
                                    Deepen the Experience
                                </h2>
                                <h3 className="text-5xl md:text-6xl font-serif text-white tracking-tighter">
                                    Continue the Journey
                                </h3>
                            </div>
                            <div className="mt-8 md:mt-0">
                                <Link to="/blog" className="text-white/40 hover:text-gold text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 transition-all">
                                    Explore the Archives <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="group relative"
                                >
                                    <div className="relative overflow-hidden mb-10 aspect-[16/10] bg-neutral-900">
                                        <img
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>

                                        {/* Hover Overlay Decorations */}
                                        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-700 m-4"></div>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">
                                            {relatedPost.category}
                                        </span>
                                        <div className="w-8 h-px bg-white/20"></div>
                                        <span className="text-white/40 text-[10px] uppercase tracking-widest">
                                            {relatedPost.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 group-hover:text-gold transition-colors duration-500 leading-tight">
                                        {relatedPost.title}
                                    </h3>

                                    <p className="text-neutral-500 text-lg leading-relaxed font-light line-clamp-2 italic">
                                        "{relatedPost.excerpt}"
                                    </p>

                                    <div className="mt-8 overflow-hidden">
                                        <div className="h-px bg-white/10 w-full group-hover:bg-gold/30 transition-colors duration-500"></div>
                                        <div className="h-0.5 bg-gold w-0 group-hover:w-full transition-all duration-700"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Premium CTA: The Membership */}
            <section className="py-40 px-6 bg-black relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[150px] -z-10 rounded-full animate-pulse"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-block mb-10 p-4 border border-gold/20 rounded-full bg-gold/5 backdrop-blur-sm">
                        <Quote size={24} className="text-gold opacity-50" />
                    </div>

                    <h2 className="text-gold uppercase tracking-[0.6em] text-[10px] font-black mb-10">
                        Transcend the Ordinary
                    </h2>
                    <h3 className="text-6xl md:text-8xl font-serif text-white mb-10 tracking-tighter">
                        Join the Inner Circle
                    </h3>
                    <p className="text-neutral-400 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                        Access exclusive narratives, prioritized VIP event access, and curated luxury experiences available only to our members.
                    </p>

                    <Link
                        to="/access"
                        className="group relative inline-flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gold translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-out"></div>
                        <span className="relative z-10 bg-transparent border border-gold text-gold group-hover:text-black font-black py-8 px-20 uppercase tracking-[0.6em] text-[11px] transition-colors duration-700">
                            Apply for Access
                        </span>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default BlogPost;
