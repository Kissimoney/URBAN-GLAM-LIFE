
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, ShoppingBag, Filter, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    image_url: string;
}

const CollectionPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [wishlist, setWishlist] = useState<string[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProducts();
    }, []);

    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlist([]);
        }
    }, [user]);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('name');

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWishlist = async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('wishlist_items')
                .select('product_id')
                .eq('user_id', user.id);

            if (error) throw error;
            setWishlist(data.map(item => item.product_id));
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const toggleWishlist = async (productId: string, e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a link
        e.stopPropagation();

        if (!user) {
            navigate('/access');
            return;
        }

        const isProductInWishlist = wishlist.includes(productId);

        try {
            if (isProductInWishlist) {
                // Remove
                const { error } = await supabase
                    .from('wishlist_items')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('product_id', productId);

                if (error) throw error;
                setWishlist(prev => prev.filter(id => id !== productId));
            } else {
                // Add
                const { error } = await supabase
                    .from('wishlist_items')
                    .insert([{ user_id: user.id, product_id: productId }]);

                if (error) throw error;
                setWishlist(prev => [...prev, productId]);
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="bg-black min-h-screen text-white selection:bg-gold selection:text-black font-sans">
            <SEO
                title="The Boutique"
                description="Curated selection of bespoke items, bringing the Urban Glam aesthetic into your personal collection."
            />
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold rounded-full blur-[150px] opacity-20"></div>
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold mb-6 italic animate-in fade-in slide-in-from-bottom duration-700">The Boutique</h2>
                        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom duration-1000 delay-100 italic">
                            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold">Excellence</span>
                        </h1>
                        <p className="text-neutral-400 text-lg leading-relaxed font-light animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                            Discover our hand-picked selection of bespoke items, bringing the Urban Glam aesthetic into your personal collection.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-4 mb-20">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-500 border ${selectedCategory === category
                                    ? 'bg-gold text-black border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                    : 'bg-transparent text-neutral-400 border-white/10 hover:border-gold hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="group relative bg-neutral-900/40 rounded-sm overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-700 animate-in fade-in slide-in-from-bottom"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                                        {/* Wishlist Button */}
                                        <button
                                            onClick={(e) => toggleWishlist(product.id, e)}
                                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300"
                                        >
                                            <Heart
                                                size={18}
                                                className={wishlist.includes(product.id) ? "fill-current text-red-500" : ""}
                                                strokeWidth={wishlist.includes(product.id) ? 0 : 2}
                                            />
                                            {/* Show transparent fill if not active, or implement toggle logic UI properly */}
                                            {/* Actually, if active: fill-current text-gold (or red). If not: stroke-current text-white. */}
                                        </button>

                                        {/* Tag */}
                                        <div className="absolute top-4 left-4 bg-gold/90 text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                                            {product.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 relative">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-gold transition-colors duration-500">{product.name}</h3>
                                            <p className="text-neutral-400 text-sm line-clamp-2 font-light">{product.description}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                            <span className="text-xl font-light text-white">{product.price}</span>
                                            <button
                                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gold hover:text-white transition-colors"
                                            >
                                                Inquire <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CollectionPage;
