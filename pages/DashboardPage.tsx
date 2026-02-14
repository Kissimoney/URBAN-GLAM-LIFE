
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../utils/supabaseClient';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { Calendar, Star, LogOut, Heart, ArrowRight, X, ShieldCheck, User, Globe, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';
import { EventCardSkeleton, WishlistCardSkeleton } from '../components/Skeleton';
import BrandIntro from '../components/BrandIntro';
import ConciergeModal from '../components/ConciergeModal';
import MagneticButton from '../components/MagneticButton';

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
    const { t, isRTL } = useLanguage();
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showIntro, setShowIntro] = useState(false);
    const [showConcierge, setShowConcierge] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('ugl_dash_intro');
        if (!hasSeenIntro) {
            setShowIntro(true);
        }
    }, []);

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
        <div className="bg-neutral-950 min-h-screen text-white flex flex-col selection:bg-gold selection:text-black relative">
            <SEO title="VIP Dashboard" description="Manage your RSVPs, wishlist, and member privileges." />

            {showIntro && (
                <BrandIntro onComplete={() => {
                    setShowIntro(false);
                    sessionStorage.setItem('ugl_dash_intro', 'true');
                }} />
            )}

            <Header />

            <main className="flex-grow pt-24 md:pt-40 pb-20 px-4 md:px-12">
                <div className="container mx-auto max-w-7xl">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8 border-b border-white/5 pb-12">
                        <div>
                            <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-black mb-4">{t('common.dashboard')}</p>
                            <h1 className="text-4xl md:text-7xl font-serif font-light tracking-tight text-white leading-tight">
                                {t('common.welcome')}, <span className="italic text-gold/80 font-normal">{user.email?.split('@')[0]}</span>
                            </h1>
                        </div>
                        <MagneticButton onClick={handleSignOut}>
                            <div className="group flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 hover:border-gold/30 rounded-full transition-all duration-500 hover:bg-gold/5">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black group-hover:text-gold transition-colors">{t('common.signOut')}</span>
                                <LogOut size={14} className={`text-white/40 group-hover:text-gold transition-all ${isRTL ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                            </div>
                        </MagneticButton>
                    </div>

                    {/* Member Impact Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24 md:mb-32">
                        {[
                            { label: t('dashboard.innerCircleStatus'), value: 'Prime', icon: <Star size={16} /> },
                            { label: t('dashboard.curatedRSVPs'), value: rsvps.length.toString().padStart(2, '0'), icon: <Calendar size={16} /> },
                            { label: t('dashboard.glamourCredits'), value: (rsvps.length * 125 + 500).toString(), icon: <ShieldCheck size={16} /> },
                            { label: t('dashboard.privilegeLevel'), value: 'Platinum', icon: <Star size={16} /> }
                        ].map((stat, i) => (
                            <div key={i} className="bg-neutral-900/40 border border-white/5 p-10 rounded-3xl relative overflow-hidden group hover:border-gold/20 transition-all duration-700 hover:-translate-y-2">
                                <div className="absolute top-6 right-6 text-gold/20 group-hover:text-gold/40 transition-colors">
                                    {stat.icon}
                                </div>
                                <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-black mb-4">{stat.label}</p>
                                <p className="text-5xl font-serif font-light text-white group-hover:text-gold transition-all duration-1000 tracking-tight">{stat.value}</p>
                                {/* Subtle inner glow on hover */}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gold/0 group-hover:via-gold/20 to-transparent transition-all duration-1000"></div>
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
                                            <h3 className="text-3xl font-serif font-bold text-white">{t('dashboard.guestList')}</h3>
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
                                    <div className="grid gap-8">
                                        {[1, 2].map(i => (
                                            <EventCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : rsvps.length === 0 ? (
                                    <div className="bg-[#0c0c0c]/40 border border-white/5 rounded-[40px] p-12 md:p-24 text-center group hover:border-gold/10 transition-all duration-700 relative overflow-hidden flex flex-col items-center justify-center">
                                        {/* Subtle background pattern/grid */}
                                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                                        <div className="w-24 h-24 bg-neutral-900/80 border border-white/5 flex items-center justify-center rounded-3xl mb-10 text-white/5 group-hover:text-gold/40 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-6 relative z-10">
                                            <Calendar size={40} strokeWidth={1} />
                                        </div>
                                        <h4 className="text-white text-2xl md:text-3xl font-serif font-light mb-4 relative z-10 italic">No Active Inquiries</h4>
                                        <p className="text-white/30 mb-12 font-light max-w-sm mx-auto leading-relaxed text-sm italic relative z-10">"Your repository of curated experiences awaits colonization. The calendar is open for your selection."</p>
                                        <button
                                            onClick={() => navigate('/events')}
                                            className="relative overflow-hidden group/btn bg-gradient-to-br from-[#D4AF37] via-[#C5A028] to-[#8A6D3B] text-black py-5 px-14 text-[11px] uppercase tracking-[0.5em] font-black transition-all duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 shadow-2xl z-10"
                                        >
                                            <span className="relative z-10">View Social Calendar</span>
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
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

                            {/* PRIVATE MEDIA VAULT SECTION */}
                            <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-2xl rotate-3 group-hover:rotate-0 transition-transform">
                                            <Globe className="text-gold" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight">{t('dashboard.mediaVault')}</h3>
                                            <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mt-2 font-black">High-Res Editorial Downloads</p>
                                        </div>
                                    </div>
                                    <button className="text-[9px] uppercase tracking-[0.3em] font-black text-white/40 hover:text-gold transition-colors">Access Full Archive</button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                                    {[
                                        { title: 'The Monaco Manifesto', category: '8K EDITORIAL', image: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?auto=format&fit=crop&q=80&w=2070', size: '24.5 MB' },
                                        { title: 'Haute Couture Private View', category: 'UNWATERMARKED', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=2070', size: '18.2 MB' }
                                    ].map((article, i) => (
                                        <div key={i} className="group relative aspect-[4/5] sm:aspect-[16/11] overflow-hidden rounded-3xl border border-white/5 hover:border-gold/40 transition-all duration-1000 cursor-pointer">
                                            <img src={article.image} alt={article.title} className="w-full h-full object-cover grayscale opacity-30 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                                            <div className="absolute top-8 left-8">
                                                <span className="inline-block bg-gold text-black text-[8px] font-black px-3 py-1 tracking-[0.3em] mb-2">{article.category}</span>
                                                <div className="text-white/40 text-[8px] font-black uppercase tracking-widest">{article.size}</div>
                                            </div>

                                            <div className="absolute bottom-10 left-10 right-10">
                                                <h4 className="text-2xl md:text-3xl font-serif text-white group-hover:text-gold transition-colors leading-tight italic">{article.title}</h4>
                                            </div>

                                            <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-gold group-hover:text-black group-hover:border-gold transition-all duration-700">
                                                <ArrowRight size={20} className="group-hover:rotate-90 transition-transform" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* WISHLIST SECTION */}
                            <section className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600 pb-20">
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-14 h-14 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-2xl -rotate-3 group-hover:rotate-0 transition-transform">
                                        <Heart className="text-gold" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-serif font-light text-white tracking-tight">{t('dashboard.wishlist')}</h3>
                                        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mt-2 font-black">Curated Selections</p>
                                    </div>
                                </div>

                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {[1, 2].map(i => (
                                            <WishlistCardSkeleton key={i} />
                                        ))}
                                    </div>
                                ) : wishlist.length === 0 ? (
                                    <div className="bg-[#0c0c0c]/40 border border-white/5 rounded-[40px] p-16 md:p-32 text-center group hover:border-gold/10 transition-all duration-700">
                                        <p className="text-white/30 mb-12 font-light italic leading-relaxed text-sm max-w-sm mx-auto">"Your repository of desired items is currently empty. Curate your collection of excellence."</p>
                                        <button
                                            onClick={() => navigate('/collection')}
                                            className="text-gold border-b border-gold/20 hover:border-gold pb-2 text-[10px] uppercase tracking-[0.5em] font-black transition-all hover:tracking-[0.7em] hover:text-white"
                                        >
                                            Explore The Collection
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {wishlist.map((item) => (
                                            <div key={item.id} className="group relative bg-[#080808] border border-white/5 hover:border-gold/30 rounded-[40px] overflow-hidden transition-all duration-1000">
                                                <div className="aspect-[4/5] relative overflow-hidden bg-neutral-900">
                                                    <img
                                                        src={item.products.image_url}
                                                        alt={item.products.name}
                                                        className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                                                    <button
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        className="absolute top-8 right-8 w-14 h-14 bg-black/80 text-white/30 hover:bg-red-500/20 hover:text-red-500 rounded-full backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                                                    >
                                                        <X size={20} />
                                                    </button>

                                                    <div className="absolute bottom-12 left-12 right-12">
                                                        <span className="text-gold text-[9px] uppercase tracking-[0.5em] font-black mb-4 block">
                                                            {item.products.category}
                                                        </span>
                                                        <h4 className="text-white font-serif text-3xl md:text-4xl mb-4 italic font-light tracking-tight">{item.products.name}</h4>
                                                        <p className="text-gold/60 text-lg font-serif">Price Upon Request</p>
                                                    </div>
                                                </div>
                                                <div className="p-8 border-t border-white/5">
                                                    <button className="w-full py-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.5em] font-black text-gold hover:text-white hover:bg-gold transition-all duration-500 rounded-2xl group/btn overflow-hidden relative">
                                                        <span className="relative z-10">Initiate Inquiry</span>
                                                        <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
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
                            <div className="bg-gradient-to-br from-[#0c0c0c] to-black border border-gold/20 rounded-[40px] p-12 relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-gold/10 transition-all duration-1000"></div>

                                <h3 className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-12 flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center">
                                        <Star size={14} className="fill-gold" />
                                    </div>
                                    Inner Circle Concierge
                                </h3>

                                <p className="text-white/60 text-sm font-light leading-relaxed mb-12 italic border-l-2 border-gold/20 pl-6">
                                    "Excellence is not a singular act, but a lifestyle. Your dedicated concierge is standing by to fulfill any request."
                                </p>

                                <ul className="space-y-8 mb-16">
                                    {[
                                        "PRIORITY PRIVATE VIEWINGS",
                                        "GLOBAL LIFESTYLE MANAGEMENT",
                                        "CURATED TRAVEL ITINERARIES",
                                        "EXCLUSIVE BRAND COLLABORATIONS"
                                    ].map((item, i) => (
                                        <li key={i} className="flex flex-col gap-2 group/item">
                                            <div className="flex items-center gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover/item:bg-gold group-hover/item:shadow-[0_0_15px_rgba(212,175,55,1)] transition-all"></div>
                                                <span className="text-[11px] font-black text-white uppercase tracking-[0.3em] group-hover/item:translate-x-2 transition-transform duration-500">{item}</span>
                                            </div>
                                            <div className="h-px w-full bg-white/5 group-hover/item:bg-gold/10 transition-colors"></div>
                                        </li>
                                    ))}
                                </ul>

                                <MagneticButton className="w-full" onClick={() => setShowConcierge(true)}>
                                    <div className="w-full relative overflow-hidden group/btn bg-gradient-to-br from-[#D4AF37] via-[#C5A028] to-[#8A6D3B] text-black py-8 font-black text-[11px] uppercase tracking-[0.5em] transition-all duration-300 ease-in-out hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-95 shadow-2xl flex items-center justify-center">
                                        <span className="relative z-10">{t('common.contactConcierge')}</span>
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                                    </div>
                                </MagneticButton>
                            </div>

                            {/* Digital Membership Card */}
                            <div className="relative aspect-[1.58/1] w-full bg-gradient-to-br from-neutral-800 to-neutral-950 rounded-[2rem] border border-white/10 p-8 overflow-hidden group hover:border-gold/30 transition-all duration-1000 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                                {/* Magnetic Chip Placeholder */}
                                <div className="w-12 h-10 bg-gradient-to-br from-gold/60 to-gold/20 rounded-lg mb-12 opacity-80 border border-gold/30 relative">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-black mb-1">{t('dashboard.memberIdentity')}</p>
                                            <p className="text-white font-serif text-xl italic tracking-tighter">{user.email?.split('@')[0].toUpperCase()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-black mb-1">{t('dashboard.privilegeAccess')}</p>
                                            <p className="text-gold font-black text-[10px] tracking-[0.2em]">PLATINUM TIER</p>
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] font-black mb-1">{t('dashboard.accessToken')}</p>
                                        <p className="text-white/60 font-mono text-[10px] tracking-[0.5em]">UG-VIP-{user.id.substring(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>

                                {/* Decorative Background Elements */}
                                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_70%)]"></div>
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-1000"></div>
                                <div className="absolute top-8 right-8">
                                    <span className="text-gold/20 text-4xl font-serif italic select-none">UG</span>
                                </div>
                            </div>

                            {/* Stats/Badge Area */}
                            <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-12 text-center group hover:border-gold/20 transition-all duration-700">
                                <div className="w-28 h-28 mx-auto mb-8 rounded-full border border-gold/10 flex items-center justify-center relative bg-gradient-to-br from-neutral-900 to-black">
                                    <div className="absolute inset-3 border border-gold/20 rounded-full animate-spin-slow"></div>
                                    <span className="text-gold text-3xl font-serif italic relative z-10 group-hover:scale-110 transition-transform duration-1000">UG</span>
                                </div>
                                <h4 className="text-white font-serif text-2xl mb-2 font-light tracking-tight italic">Authenticated Member</h4>
                                <p className="text-gold/40 text-[10px] uppercase tracking-[0.4em] font-black group-hover:text-gold transition-colors duration-700">Since Feb 2026</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* CONCIERGE IDENTITY PORTAL */}
            <ConciergeModal
                isOpen={showConcierge}
                onClose={() => setShowConcierge(false)}
                userEmail={user.email}
            />

            <Footer />
        </div>
    );
};

export default DashboardPage;
