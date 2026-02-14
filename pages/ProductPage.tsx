
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft, ShoppingBag, Heart, Shield, Sparkles, Globe } from 'lucide-react';
import SEO from '../components/SEO';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    image_url: string;
    affiliate_url?: string;
}

// Fallback products if DB fails or doesn't have the product
const CURATED_PRODUCTS_INTERNAL: Product[] = [
    {
        id: 'ali-1',
        name: "Oil-Wax Leather Tote",
        description: "Genuine Cowhide top-handle bag. A sophisticated messenger piece for the modern elite.",
        price: "$85.00",
        category: "Accessories",
        image_url: "https://ae01.alicdn.com/kf/S0ff1eb226d314a72965d7eac8aae33000.jpg_800x800.jpg",
        affiliate_url: "https://s.click.aliexpress.com/e/_c3KjTCyR"
    },
    {
        id: 'ali-2',
        name: "KNOBSPIN Moissanite Tennis",
        description: "D VVS1 Moissanite set in S925 Sterling Silver. Certified 18K White Gold plating.",
        price: "$120.00",
        category: "Jewelry",
        image_url: "https://ae01.alicdn.com/kf/S22b5a16f21db453e9e121c693bf380f0l.jpg_800x800.jpg",
        affiliate_url: "https://s.click.aliexpress.com/e/_c3kwBSVt"
    },
    {
        id: 'ali-3',
        name: "Office Couture Blazer",
        description: "Korean-inspired sharp tailoring for the high-performing professional.",
        price: "$75.00",
        category: "Apparel",
        image_url: "https://ae01.alicdn.com/kf/S6e02a5c4e0484032a6283890332abeeeo.jpg_800x800.jpg",
        affiliate_url: "https://s.click.aliexpress.com/e/_c2xqYI3l"
    },
    {
        id: 'ali-4',
        name: 'Aero-Magnesium Carry-on',
        description: 'Full aluminum-alloy hardshell with TSA locks and silent glide wheels.',
        price: '$185.00',
        category: 'Travel',
        image_url: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800',
        affiliate_url: 'https://s.click.aliexpress.com/e/_c3KjTCyR'
    },
    {
        id: 'ali-5',
        name: 'Herringbone Essence Necklace',
        description: '18k gold-pressed stainless steel, PVD coated for water resistance.',
        price: '$24.00',
        category: 'Jewelry',
        image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800',
        affiliate_url: 'https://s.click.aliexpress.com/e/_c3kwBSVt'
    },
    {
        id: 'ali-6',
        name: 'Editorial Mulberry Silk Scarf',
        description: '100% genuine silk with hand-rolled edges and high-fashion prints.',
        price: '$38.00',
        category: 'Accessories',
        image_url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800',
        affiliate_url: 'https://s.click.aliexpress.com/e/_c3KjTCyR'
    },
    {
        id: 'ali-7',
        name: 'The Sovereign Long Trench',
        description: 'Floor-length cashmere-wool blend in a refined camel tone.',
        price: '$155.00',
        category: 'Apparel',
        image_url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800',
        affiliate_url: 'https://s.click.aliexpress.com/e/_c2xqYI3l'
    },
    {
        id: 'ali-8',
        name: 'Signature Gold-Detail Pumps',
        description: 'Genuine leather with bespoke hardware and custom stiletto profile.',
        price: '$72.00',
        category: 'Accessories',
        image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800',
        affiliate_url: 'https://s.click.aliexpress.com/e/_c3KjTCyR'
    }
];

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        if (!id) return;

        // Try curated first
        const curated = CURATED_PRODUCTS_INTERNAL.find(p => p.id === id);
        if (curated) {
            setProduct(curated);
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            // If not found in DB either, navigate back
            navigate('/collection');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-gold animate-pulse italic">Retrieving bespoke item...</div>
            </div>
        );
    }

    if (!product) return null;

    const acquisitionUrl = product.affiliate_url || 'https://www.aliexpress.com/w/wholesale-affiliate-program.html';

    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-gold selection:text-black">
            <SEO
                title={`${product.name} | The Boutique`}
                description={product.description}
            />
            <Header />

            <div className="container mx-auto max-w-7xl px-6 pt-32 pb-20">
                <button
                    onClick={() => navigate('/collection')}
                    className="flex items-center gap-2 text-neutral-400 hover:text-gold transition-colors mb-12 uppercase tracking-widest text-[10px] font-bold"
                >
                    <ArrowLeft size={14} /> Back to Collection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Product Image */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-transparent blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/5 bg-neutral-900/40">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <div className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 italic">{product.category}</div>
                            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight italic">{product.name}</h1>
                            <div className="text-3xl font-light text-white/90 mb-8">{product.price}</div>
                        </div>

                        <div className="space-y-8 mb-12">
                            <div>
                                <h3 className="text-gold uppercase tracking-widest text-[10px] font-black mb-4 flex items-center gap-2">
                                    <Sparkles size={12} /> The Narrative
                                </h3>
                                <p className="text-neutral-400 text-lg leading-relaxed font-light">
                                    {product.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-sm border border-white/5 bg-neutral-950/50 flex flex-col gap-2">
                                    <Shield size={16} className="text-gold opacity-60" />
                                    <span className="text-[10px] uppercase tracking-tighter text-neutral-500 font-bold">Secure Acquisition</span>
                                    <span className="text-xs text-white/80">Verified sourcing from global curated collections.</span>
                                </div>
                                <div className="p-4 rounded-sm border border-white/5 bg-neutral-950/50 flex flex-col gap-2">
                                    <Globe size={16} className="text-gold opacity-60" />
                                    <span className="text-[10px] uppercase tracking-tighter text-neutral-500 font-bold">Elite Logistics</span>
                                    <span className="text-xs text-white/80">Discreet and premium international fulfillment.</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={acquisitionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-gold text-black py-5 px-8 rounded-sm font-black uppercase tracking-[0.3em] text-[12px] text-center hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.2)]"
                            >
                                Secure Access
                            </a>
                            <button
                                className="p-5 rounded-sm border border-white/10 hover:border-gold transition-all duration-500"
                            >
                                <Heart size={20} className="hover:text-red-500 transition-colors" />
                            </button>
                        </div>

                        <div className="mt-8 text-neutral-500 text-[9px] uppercase tracking-[0.2em] italic font-medium">
                            *This item is part of our curated digital showcase. Links may direct to global affiliate partners.
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductPage;
