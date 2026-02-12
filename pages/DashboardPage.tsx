
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabaseClient';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Calendar, Star, LogOut, Heart, ArrowRight, X } from 'lucide-react';
import SEO from '../components/SEO';
import { EventCardSkeleton, WishlistCardSkeleton } from '../components/Skeleton';

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

                    {/* Member Impact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        {[
                            { label: 'Inner Circle Status', value: 'Prime', icon: <Star size={20} className="text-gold" /> },
                            { label: 'Curated RSVP Credits', value: '08', icon: <Calendar size={20} className="text-gold" /> },
                            { label: 'Privilege Level', value: 'Platinum', icon: <Star size={20} className="text-gold" /> }
                        ].map((stat, i) => (
                            <div key={i} className="bg-neutral-900/40 border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-gold/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    {stat.icon}
                                </div>
                                <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-black mb-2">{stat.label}</p>
                                <p className="text-4xl font-serif text-white group-hover:text-gold transition-colors">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-20">

                            {/* MY EVENTS SECTION */}
                            <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-full">
                                            <Calendar className="text-gold" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-serif font-bold text-white">Your Guest List</h3>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Confirmed & Pending Access</p>
                                        </div>
                                    </div>
                                    {rsvps.length > 0 && (
                                        <Link to="/events" className="text-gold text-[10px] uppercase tracking-widest font-black border-b border-gold/20 hover:border-gold pb-1 transition-all">
                                            Request More Access
                                        </Link>
                                    )}
                                </div>

                                {loading ? (
                                    <div className="grid gap-6">
                                        {[1, 2].map(i => (
                                            <EventCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : rsvps.length === 0 ? (
                                    <div className="bg-neutral-900/20 border border-dashed border-white/10 rounded-2xl p-16 text-center group hover:border-gold/20 transition-colors">
                                        <div className="w-20 h-20 bg-neutral-900 flex items-center justify-center rounded-full mx-auto mb-8 text-white/10 group-hover:text-gold transition-colors">
                                            <Calendar size={32} />
                                        </div>
                                        <h4 className="text-white text-xl font-serif mb-4">No Active Inquiries</h4>
                                        <p className="text-white/30 mb-10 font-light max-w-sm mx-auto">You currently have no active event requests. Explore our upcoming curated experiences.</p>
                                        <button
                                            onClick={() => navigate('/events')}
                                            className="bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/5 text-white py-4 px-10 text-[10px] uppercase tracking-[0.3em] font-black transition-all"
                                        >
                                            View Social Calendar
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {rsvps.map((rsvp) => (
                                            <div key={rsvp.id} className="group bg-[#080808] border border-white/5 hover:border-gold/20 rounded-2xl p-6 flex gap-8 items-center transition-all duration-700">
                                                <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0 relative">
                                                    <img
                                                        src={rsvp.events?.image_url}
                                                        alt={rsvp.events?.title}
                                                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-black italic">
                                                            {rsvp.events?.city}
                                                        </span>
                                                        <div className={`px-4 py-1 rounded-full text-[9px] uppercase tracking-[0.3em] font-black border ${rsvp.status === 'confirmed' ? 'bg-gold/5 text-gold border-gold/20' : 'bg-white/5 text-white/30 border-white/5'
                                                            }`}>
                                                            {rsvp.status}
                                                        </div>
                                                    </div>
                                                    <h4 className="text-2xl font-serif font-bold mb-2 text-white group-hover:text-gold transition-all">{rsvp.events?.title}</h4>
                                                    <div className="flex items-center gap-3 text-white/30 text-[10px] uppercase tracking-widest font-bold">
                                                        <Calendar size={12} className="text-gold/50" />
                                                        {new Date(rsvp.events?.date).toLocaleDateString(undefined, {
                                                            month: 'long', day: 'numeric', year: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* CLUB ARCHIVES SECTION (NEW) */}
                            <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-full">
                                        <Star className="text-gold" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-serif font-bold text-white">The Archives</h3>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Member-Only Narratives</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { title: 'The Monaco Manifesto', category: 'LIFESTYLE', image: 'https://i.imgur.com/KPAkrhe.jpg' },
                                        { title: 'Haute Couture Private View', category: 'FASHION', image: 'https://i.imgur.com/Bb4KgFn.jpg' }
                                    ].map((article, i) => (
                                        <div key={i} className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-700">
                                            <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-black mb-2 block">{article.category}</span>
                                                <h4 className="text-xl font-serif text-white group-hover:text-gold transition-colors">{article.title}</h4>
                                            </div>
                                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black">
                                                    <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* WISHLIST SECTION */}
                            <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-full">
                                        <Heart className="text-gold" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-serif font-bold text-white">Acquisition Wishlist</h3>
                                        <p className="text-white/30 text-xs uppercase tracking-widest mt-1">Curated Selections</p>
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[1, 2].map(i => (
                                            <WishlistCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : wishlist.length === 0 ? (
                                    <div className="bg-neutral-900/20 border border-dashed border-white/10 rounded-2xl p-16 text-center group hover:border-gold/20 transition-colors">
                                        <p className="text-white/30 mb-8 font-light">Your repository of desired items is empty.</p>
                                        <button
                                            onClick={() => navigate('/collection')}
                                            className="text-gold border-b border-gold/20 hover:border-gold pb-1 text-[10px] uppercase tracking-[0.3em] font-black transition-all"
                                        >
                                            Explore The Collection
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {wishlist.map((item) => (
                                            <div key={item.id} className="group relative bg-[#080808] border border-white/5 hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-700">
                                                <div className="aspect-square relative overflow-hidden bg-neutral-900">
                                                    <img
                                                        src={item.products.image_url}
                                                        alt={item.products.name}
                                                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white/50 hover:bg-red-500/20 hover:text-red-500 rounded-full backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <X size={16} />
                                                    </button>

                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-black mb-2 block">
                                                            {item.products.category}
                                                        </span>
                                                        <h4 className="text-white font-serif text-2xl mb-2">{item.products.name}</h4>
                                                        <p className="text-white/40 text-sm font-light tracking-widest">{item.products.price}</p>
                                                    </div>
                                                </div>
                                                <div className="p-6 border-t border-white/5">
                                                    <button className="w-full py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-gold hover:text-white hover:bg-white/5 transition-all">
                                                        Initiate Inquiry <ArrowRight size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                        </div>

                        {/* Sidebar / Exclusive Content */}
                        <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-1000 delay-400">
                            {/* AI Concierge Box */}
                            <div className="bg-gradient-to-br from-[#0c0c0c] to-black border border-gold/20 rounded-3xl p-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-gold/20 transition-all duration-1000"></div>

                                <h3 className="text-gold font-black uppercase tracking-[0.4em] text-[10px] mb-8 flex items-center gap-3">
                                    <Star size={14} className="fill-gold" /> Inner Circle Concierge
                                </h3>

                                <p className="text-white/60 text-sm font-light leading-relaxed mb-10 italic">
                                    "Excellence is not a singular act, but a lifestyle. Your dedicated concierge is standing by to fulfill any request."
                                </p>

                                <ul className="space-y-6 mb-12">
                                    {[
                                        "Priority Private Viewings",
                                        "Global Lifestyle Management",
                                        "Curated Travel Itineraries",
                                        "Exclusive Brand Collaborations"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-[11px] font-bold text-white uppercase tracking-widest group/item">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover/item:bg-gold group-hover/item:shadow-[0_0_10px_rgba(212,175,55,1)] transition-all"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full relative overflow-hidden group/btn bg-gold text-black py-6 font-black text-[11px] uppercase tracking-[0.4em] transition-all hover:bg-white shadow-[0_20px_40px_rgba(212,175,55,0.15)]">
                                    <span className="relative z-10 font-black">Contact Concierge</span>
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                                </button>
                            </div>

                            {/* Stats/Badge Area */}
                            <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-10 text-center">
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-gold/10 flex items-center justify-center relative">
                                    <div className="absolute inset-2 border border-gold/20 rounded-full animate-spin-slow"></div>
                                    <span className="text-gold text-3xl font-serif">UG</span>
                                </div>
                                <h4 className="text-white font-serif text-xl mb-2">Authenticated Member</h4>
                                <p className="text-white/30 text-[10px] uppercase tracking-widest">Since Feb 2026</p>
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
