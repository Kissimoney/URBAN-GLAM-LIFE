
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Calendar, Star, LogOut, Heart, ArrowRight, X } from 'lucide-react';
import SEO from '../components/SEO';

interface RSVP {
    id: string;
    event_id: string;
    status: string;
    created_at: string;
    events: {
        title: string;
        date: string;
        city: string;
        image_url: string;
    };
}

interface WishlistItem {
    id: string; // wishlist item id
    product_id: string;
    products: {
        id: string;
        name: string;
        price: string;
        image_url: string;
        category: string;
    };
}

const DashboardPage: React.FC = () => {
    const { user, signOut } = useAuth();
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchUserData();
        }
    }, [user]);

    const fetchUserData = async () => {
        setLoading(true);
        await Promise.all([fetchUserRSVPs(), fetchUserWishlist()]);
        setLoading(false);
    };

    const fetchUserRSVPs = async () => {
        try {
            const { data, error } = await supabase
                .from('rsvps')
                .select(`
                    id,
                    event_id,
                    status,
                    created_at,
                    events (
                        title,
                        date,
                        city,
                        image_url
                    )
                `)
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRsvps(data || []);
        } catch (error) {
            console.error('Error fetching RSVPs:', error);
        }
    };

    const fetchUserWishlist = async () => {
        try {
            const { data, error } = await supabase
                .from('wishlist_items')
                .select(`
                    id,
                    product_id,
                    products (
                        id,
                        name,
                        price,
                        image_url,
                        category
                    )
                `)
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            // Filter out any items where product might have been deleted (products is null)
            const validItems = data?.filter(item => item.products) || [];
            // Cast to simpler type if needed, but the structure matches interface
            setWishlist(validItems as any);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const removeFromWishlist = async (id: string) => {
        try {
            const { error } = await supabase
                .from('wishlist_items')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setWishlist(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing wishlist item:', error);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="bg-neutral-950 min-h-screen text-white flex flex-col selection:bg-gold selection:text-black">
            <SEO title="VIP Dashboard" description="Manage your RSVPs, wishlist, and member privileges." />
            <Header />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">

                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 border-b border-white/5 pb-10">
                        <div>
                            <h1 className="text-gold uppercase tracking-[0.3em] text-xs font-black mb-4">VIP Dashboard</h1>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                                Welcome, <span className="italic text-white/50">{user.email?.split('@')[0]}</span>
                            </h2>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="group flex items-center gap-3 px-6 py-3 border border-white/10 hover:border-gold/50 rounded-full transition-all duration-300"
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-gold transition-colors">Sign Out</span>
                            <LogOut size={14} className="text-neutral-500 group-hover:text-gold transition-colors" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* MY EVENTS SECTION */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-neutral-900 rounded-full border border-white/5">
                                        <Calendar className="text-gold" size={20} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-white">My Guest List</h3>
                                </div>

                                {loading ? (
                                    <div className="text-white/40 italic pl-4 border-l-2 border-gold/20">Loading your events...</div>
                                ) : rsvps.length === 0 ? (
                                    <div className="bg-neutral-900/30 border border-white/5 rounded-2xl p-10 text-center hover:border-gold/20 transition-colors">
                                        <p className="text-white/40 mb-6 font-light">You haven't RSVP'd to any events yet.</p>
                                        <button
                                            onClick={() => navigate('/events')}
                                            className="text-gold border-b border-gold/30 hover:border-gold pb-1 text-xs uppercase tracking-widest font-bold transition-all"
                                        >
                                            Browse Upcoming Events
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {rsvps.map((rsvp) => (
                                            <div key={rsvp.id} className="group bg-neutral-900/40 border border-white/5 hover:border-gold/30 rounded-xl p-5 flex gap-6 items-center transition-all duration-500">
                                                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative">
                                                    <img
                                                        src={rsvp.events?.image_url}
                                                        alt={rsvp.events?.title}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-gold text-[9px] uppercase tracking-[0.2em] font-black border border-gold/20 px-2 py-1 rounded">
                                                            {rsvp.events?.city}
                                                        </span>
                                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold ${rsvp.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-white/40'
                                                            }`}>
                                                            {rsvp.status === 'confirmed' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>}
                                                            {rsvp.status}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-xl font-serif font-bold mb-1 text-white group-hover:text-gold transition-colors">{rsvp.events?.title}</h4>
                                                    <p className="text-white/40 text-xs font-serif italic">
                                                        {new Date(rsvp.events?.date).toLocaleDateString(undefined, {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* WISHLIST SECTION */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-neutral-900 rounded-full border border-white/5">
                                        <Heart className="text-gold" size={20} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-white">My Wishlist</h3>
                                </div>

                                {loading ? (
                                    <div className="text-white/40 italic pl-4 border-l-2 border-gold/20">Loading your wishlist...</div>
                                ) : wishlist.length === 0 ? (
                                    <div className="bg-neutral-900/30 border border-white/5 rounded-2xl p-10 text-center hover:border-gold/20 transition-colors">
                                        <p className="text-white/40 mb-6 font-light">Your wishlist is empty.</p>
                                        <button
                                            onClick={() => navigate('/collection')}
                                            className="text-gold border-b border-gold/30 hover:border-gold pb-1 text-xs uppercase tracking-widest font-bold transition-all"
                                        >
                                            Explore The Collection
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {wishlist.map((item) => (
                                            <div key={item.id} className="group relative bg-neutral-900/40 border border-white/5 hover:border-gold/30 rounded-xl overflow-hidden transition-all duration-500">
                                                <div className="aspect-square relative overflow-hidden">
                                                    <img
                                                        src={item.products.image_url}
                                                        alt={item.products.name}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="absolute top-3 right-3 p-2 bg-black/50 text-white/50 hover:bg-red-500/20 hover:text-red-500 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                                                        title="Remove from wishlist"
                                                    >
                                                        <X size={14} />
                                                    </button>

                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <span className="text-gold text-[9px] uppercase tracking-widest font-black mb-1 block">
                                                            {item.products.category}
                                                        </span>
                                                        <h4 className="text-white font-serif text-lg mb-1 leading-tight">{item.products.name}</h4>
                                                        <p className="text-white/60 text-sm font-light">{item.products.price}</p>
                                                    </div>
                                                </div>
                                                <div className="p-4 border-t border-white/5">
                                                    <button className="w-full py-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gold hover:text-white transition-colors">
                                                        Inquire <ArrowRight size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                        </div>

                        {/* Sidebar / Exclusive Content */}
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-neutral-900 to-black border border-gold/20 rounded-2xl p-8 relative overflow-hidden sticky top-32">
                                <div className="absolute -top-10 -right-10 p-6 opacity-5 rotate-12">
                                    <Star size={150} className="text-gold" />
                                </div>
                                <h3 className="text-gold font-black uppercase tracking-[0.2em] text-xs mb-6 flex items-center gap-2">
                                    <Star size={12} className="fill-gold" /> Member Privileges
                                </h3>
                                <ul className="space-y-6">
                                    {[
                                        "Priority Access to Fashion Week After-Parties",
                                        "Complimentary 5-Star Hotel Upgrades",
                                        "Private Jet Charter Rates",
                                        "Dedicated Lifestyle Concierge"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-sm font-light text-white/80 leading-relaxed group">
                                            <span className="block w-1.5 h-1.5 rounded-full bg-gold/50 mt-2 shrink-0 group-hover:bg-gold group-hover:shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-10 bg-gold text-black py-4 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                                    Contact Concierge
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DashboardPage;
