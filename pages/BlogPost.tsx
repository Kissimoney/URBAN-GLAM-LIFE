
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import ReadingProgress from '../components/ReadingProgress';
import SocialShare from '../components/SocialShare';
import SEO from '../components/SEO';

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
                <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-serif text-white mb-6">404</h1>
                    <p className="text-neutral-400 mb-8">Blog post not found</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
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
                    className="flex items-center gap-2 text-white/60 hover:text-gold transition-all duration-500 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-widest font-bold">Back</span>
                </button>
            </div>

            {/* Hero Image */}
            <div className="relative h-[70vh] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-gold text-xs uppercase tracking-[0.3em] font-black">
                                {post.category}
                            </span>
                            <div className="w-px h-4 bg-white/20"></div>
                            <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider">
                                <Calendar size={14} />
                                {post.date}
                            </div>
                            <div className="w-px h-4 bg-white/20"></div>
                            <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider">
                                <Clock size={14} />
                                {post.readTime}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-neutral-300 font-light max-w-3xl leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Author Info & Share */}
                    <div className="flex items-center gap-4 mb-16 pb-12 border-b border-white/10">
                        <img
                            src={post.author?.image || 'https://via.placeholder.com/100'}
                            alt={post.author?.name || 'Author'}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gold/30"
                        />
                        <div>
                            <p className="text-white font-bold">{post.author?.name || 'Urban Glam'}</p>
                            <p className="text-neutral-500 text-sm">Contributing Editor</p>
                        </div>

                        <div className="ml-auto">
                            <SocialShare
                                title={post.title}
                                url={window.location.href}
                                description={post.excerpt}
                            />
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="prose prose-invert prose-lg max-w-none mb-16">
                        <p className="text-xl text-neutral-300 leading-relaxed font-light first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                            {post.content?.intro}
                        </p>
                    </div>

                    {/* Content Sections */}
                    {post.content?.sections?.map((section, index) => (
                        <div key={index} className="mb-16">
                            <h2 className="text-3xl font-serif text-white mb-6 flex items-center gap-4">
                                <span className="text-gold/30 text-2xl font-black">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {section.heading}
                            </h2>
                            <p className="text-neutral-300 text-lg leading-relaxed font-light">
                                {section.content}
                            </p>
                        </div>
                    ))}

                    {/* Conclusion */}
                    <div className="mt-20 p-10 bg-neutral-900/50 border border-white/10 backdrop-blur-sm">
                        <p className="text-xl text-neutral-300 leading-relaxed font-light italic">
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

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-20 px-6 bg-neutral-950">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-gold uppercase tracking-[0.5em] text-[10px] font-black mb-12 text-center">
                            Continue Reading
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative overflow-hidden mb-6 aspect-[4/3]">
                                        <img
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-black">
                                            {relatedPost.category}
                                        </span>
                                        <div className="w-px h-3 bg-white/20"></div>
                                        <span className="text-white/40 text-[10px] uppercase tracking-wider">
                                            {relatedPost.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-gold transition-colors">
                                        {relatedPost.title}
                                    </h3>

                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {relatedPost.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-32 px-6 bg-black border-t border-white/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-gold uppercase tracking-[0.5em] text-[10px] font-black mb-8">
                        Join the Inner Circle
                    </h2>
                    <h3 className="text-5xl md:text-6xl font-serif text-white mb-8">
                        Never Miss a Story
                    </h3>
                    <p className="text-neutral-400 text-lg mb-12 max-w-2xl mx-auto">
                        Get exclusive insights, style guides, and luxury lifestyle content delivered to your inbox.
                    </p>
                    <Link
                        to="/access"
                        className="inline-block bg-gold hover:bg-white text-black font-black py-6 px-16 uppercase tracking-[0.5em] text-[10px] transition-all duration-700 shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                    >
                        Subscribe Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default BlogPost;
