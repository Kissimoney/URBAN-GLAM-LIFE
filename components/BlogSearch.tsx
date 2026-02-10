
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Filter } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';

interface BlogPost {
    id: string;
    slug: string;
    category: string;
    title: string;
    date: string;
    image: string;
    excerpt: string;
    tags: string[];
}

const BlogSearch: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('id, slug, category, title, date, image, excerpt, tags')
                .order('date', { ascending: false });

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                // Format dates if needed, seeing as I stored them as YYYY-MM-DD
                // I might want to format them to "MARCH 12, 2024" style to match design
                const formattedPosts = data?.map(post => ({
                    ...post,
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

    // Get unique categories
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(posts.map(post => post.category))];
        return cats;
    }, [posts]);

    // Filter posts based on search and category
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

            const matchesCategory =
                selectedCategory === 'All' || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, posts]);

    const clearSearch = () => {
        setSearchQuery('');
        setSelectedCategory('All');
    };

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-6xl md:text-7xl font-serif text-white mb-6 tracking-tight">
                        Explore Our <span className="text-gold italic">Stories</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Search through our collection of luxury lifestyle narratives
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search articles, tags, or keywords..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-12 py-5 bg-neutral-900 border border-white/10 text-white placeholder-neutral-500 focus:border-gold focus:outline-none transition-all duration-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-gold transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        {/* Filter Button */}
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-3 px-8 py-5 border transition-all duration-500 ${isFilterOpen || selectedCategory !== 'All'
                                ? 'bg-gold text-black border-gold'
                                : 'bg-neutral-900 text-white border-white/10 hover:border-gold'
                                }`}
                        >
                            <Filter size={20} />
                            <span className="font-bold uppercase tracking-wider text-xs">
                                Filter
                            </span>
                        </button>
                    </div>

                    {/* Category Filters */}
                    {isFilterOpen && (
                        <div className="mt-6 p-6 bg-neutral-900 border border-white/10 animate-in slide-in-from-top duration-500">
                            <p className="text-neutral-400 text-xs uppercase tracking-wider font-bold mb-4">
                                Filter by Category
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-500 ${selectedCategory === category
                                            ? 'bg-gold text-black'
                                            : 'bg-neutral-800 text-white hover:bg-neutral-700'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Active Filters */}
                    {(searchQuery || selectedCategory !== 'All') && (
                        <div className="mt-6 flex items-center gap-4 flex-wrap">
                            <span className="text-neutral-500 text-sm">Active filters:</span>
                            {searchQuery && (
                                <span className="px-4 py-2 bg-neutral-900 border border-white/10 text-white text-sm flex items-center gap-2">
                                    Search: "{searchQuery}"
                                    <button onClick={() => setSearchQuery('')} className="text-gold hover:text-white">
                                        <X size={14} />
                                    </button>
                                </span>
                            )}
                            {selectedCategory !== 'All' && (
                                <span className="px-4 py-2 bg-neutral-900 border border-white/10 text-white text-sm flex items-center gap-2">
                                    Category: {selectedCategory}
                                    <button onClick={() => setSelectedCategory('All')} className="text-gold hover:text-white">
                                        <X size={14} />
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={clearSearch}
                                className="text-gold hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="max-w-4xl mx-auto mb-8">
                    <p className="text-neutral-500 text-sm">
                        Showing <span className="text-gold font-bold">{filteredPosts.length}</span> of{' '}
                        <span className="text-white font-bold">{posts.length}</span> articles
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Blog Grid */}
                        {filteredPosts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                                {filteredPosts.map((post, index) => (
                                    <Link
                                        key={post.id}
                                        to={`/blog/${post.slug}`}
                                        className="group block animate-in fade-in slide-in-from-bottom duration-700"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <article className="flex flex-col h-full">
                                            {/* Image */}
                                            <div className="relative overflow-hidden mb-10 aspect-[4/5]">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                            </div>

                                            {/* Meta */}
                                            <div className="flex gap-6 mb-6 text-[10px] uppercase tracking-[0.5em] font-black text-neutral-500">
                                                <span className="text-gold">{post.category}</span>
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-3xl font-serif text-white mb-6 leading-tight group-hover:text-gold transition-colors duration-500">
                                                {post.title}
                                            </h3>

                                            {/* Excerpt */}
                                            <p className="text-neutral-400 leading-relaxed mb-8 line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {post.tags?.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-neutral-900 border border-white/10 text-neutral-400 text-xs uppercase tracking-wider"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Read More */}
                                            <div className="mt-auto pt-8 border-t border-white/10">
                                                <span className="text-gold text-xs uppercase tracking-[0.5em] font-black group-hover:tracking-[0.6em] transition-all duration-500">
                                                    Read Article →
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            // No Results
                            <div className="text-center py-20">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
                                    <Search className="text-neutral-600" size={32} />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-4">No Articles Found</h3>
                                <p className="text-neutral-400 mb-8 max-w-md mx-auto">
                                    We couldn't find any articles matching your search. Try different keywords or clear your filters.
                                </p>
                                <button
                                    onClick={clearSearch}
                                    className="px-8 py-4 bg-gold text-black font-black uppercase tracking-[0.5em] text-xs hover:bg-white transition-all duration-500"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default BlogSearch;
