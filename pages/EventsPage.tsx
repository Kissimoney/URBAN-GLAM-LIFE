import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { sendVIPEmail } from '../utils/emailService';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, X, Calendar, MapPin, Star } from 'lucide-react';
import { EventGridCardSkeleton } from '../components/Skeleton';
import SEO from '../components/SEO';

interface Event {
    id: string;
    title: string;
    city: string;
    description: string;
    date: string;
    location: string;
    image_url: string;
    created_at: string;
}

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState<string>('All');
    const [cities, setCities] = useState<string[]>(['All']);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // RSVP Form State
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpEmail, setRsvpEmail] = useState('');
    const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetchEvents();
        if (user) {
            setRsvpEmail(user.email || '');
        }
    }, [user]);

    const fetchEvents = async () => {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: true });

            if (error) {
                console.error('Error fetching events:', error);
            } else {
                setEvents(data || []);
                const uniqueCities = Array.from(new Set(data?.map(event => event.city) || []));
                setCities(['All', ...uniqueCities]);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = selectedCity === 'All'
        ? events
        : events.filter(event => event.city === selectedCity);

    const handleRSVP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEvent) return;

        setRsvpStatus('submitting');

        try {
            const { error } = await supabase
                .from('rsvps')
                .insert([
                    {
                        event_id: selectedEvent.id,
                        full_name: rsvpName,
                        email: rsvpEmail,
                        status: 'pending',
                        user_id: user?.id
                    }
                ]);

            if (error) throw error;

            await sendVIPEmail({
                user_name: rsvpName,
                user_email: rsvpEmail,
                event_title: selectedEvent.title,
                event_date: new Date(selectedEvent.date).toLocaleDateString(),
                status: 'pending'
            }).catch(err => console.error('Email notification failed:', err));

            setRsvpStatus('success');
            setTimeout(() => {
                setSelectedEvent(null);
                setRsvpStatus('idle');
                setRsvpName('');
                setRsvpEmail('');
            }, 2000);
        } catch (err) {
            console.error('RSVP Error:', err);
            setRsvpStatus('error');
        }
    };

    const openRSVPModal = (event: Event) => {
        setSelectedEvent(event);
        setRsvpStatus('idle');
    };

    const closeRSVPModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="bg-black min-h-screen text-white selection:bg-gold selection:text-black">
            <SEO
                title="The Social Calendar"
                description="Access exclusive high-fashion events, private yacht viewings, and elite urban nightlife circuits with Urban Glam Life."
                image="/images/event_neon_night.jpg"
            />
            <Header />

            <main className="pb-20">
                {/* CINEMATIC HERO */}
                <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden mb-24">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] ease-out scale-110"
                        style={{
                            backgroundImage: `url('/images/event_neon_night.jpg')`,
                            transform: `translateY(${scrollY * 0.2}px)`
                        }}
                    >
                        <div className="absolute inset-0 bg-black/60"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                    </div>

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <div className="overflow-hidden mb-8">
                            <span className="inline-block text-gold uppercase tracking-[1em] text-[10px] font-black animate-in slide-in-from-bottom duration-1000">
                                The Social Calendar
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-[10rem] font-serif font-bold text-white tracking-tighter leading-none italic mb-12 drop-shadow-2xl">
                            Exclusive <br /> <span className="text-gold not-italic">Events</span>
                        </h1>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed tracking-wide animate-in fade-in duration-1000 delay-500">
                            Curated experiences for the elite. From Tokyo neon nights to Mediterranean sunsets, your presence is the final touch of glamour.
                        </p>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-px h-16 bg-gradient-to-t from-gold to-transparent"></div>
                    </div>
                </section>

                <div className="container mx-auto px-6">
                    {/* Filter */}
                    <div className="flex justify-center gap-6 mb-24 flex-wrap animate-in fade-in duration-1000 delay-300">
                        {cities.map(city => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-10 py-4 rounded-full border text-[10px] uppercase tracking-[0.4em] font-black transition-all duration-700 relative overflow-hidden group ${selectedCity === city
                                    ? 'bg-gold text-black border-gold shadow-[0_0_40px_rgba(212,175,55,0.2)]'
                                    : 'bg-transparent text-white/30 border-white/5 hover:border-gold/30 hover:text-white'
                                    }`}
                            >
                                <span className="relative z-10">{city}</span>
                                {selectedCity !== city && (
                                    <div className="absolute inset-0 bg-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Events Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[...Array(6)].map((_, i) => (
                                <EventGridCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="py-32 text-center border border-white/5 rounded-[3rem] bg-neutral-900/20 backdrop-blur-sm">
                            <Calendar size={48} className="text-gold/20 mx-auto mb-8" />
                            <h3 className="text-3xl font-serif text-white mb-4 italic">The Season is Currently Private</h3>
                            <p className="text-neutral-500 max-w-md mx-auto mb-10">Our upcoming calendar is visible to Platinum Members only. Apply for the inner circle to view private dates.</p>
                            <button
                                className="px-12 py-5 bg-gold text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white transition-colors"
                            >
                                Apply for Access
                            </button>
                        </div>
                    ) : (
                        <div
                            key={selectedCity}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-5 duration-700"
                        >
                            {filteredEvents.map((event, index) => (
                                <div
                                    key={event.id}
                                    className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-gold/30 hover:scale-[1.03] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="aspect-[4/5] overflow-hidden relative">
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60"></div>
                                        <div className="absolute top-6 left-6 flex items-center gap-2">
                                            <span className="bg-gold/10 backdrop-blur-md text-gold text-[9px] uppercase tracking-[0.3em] font-black border border-gold/20 px-4 py-2 rounded-full flex items-center gap-2">
                                                <MapPin size={10} /> {event.city}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                                            </span>
                                            <div className="w-1 h-1 bg-gold/50 rounded-full"></div>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-gold transition-colors duration-500 leading-tight">
                                            {event.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm font-light mb-8 leading-relaxed line-clamp-2 italic">
                                            "{event.description}"
                                        </p>
                                        <button
                                            onClick={() => openRSVPModal(event)}
                                            className="w-full py-5 bg-transparent border border-white/10 text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-700 flex items-center justify-center gap-3 group/btn relative overflow-hidden"
                                        >
                                            <span className="relative z-10">Request Access</span>
                                            <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover/btn:translate-x-1" />
                                            <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover/btn:translate-x-full animate-[shimmer_3s_infinite] transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* LIFESTYLE SPOTLIGHT */}
                    <section className="mt-40 pt-40 border-t border-white/5 relative">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="relative group overflow-hidden rounded-[3rem] aspect-[4/5] md:aspect-square">
                                <img
                                    src="/images/event_yacht_sunset.jpg"
                                    alt="Luxury Lifestyle"
                                    className="w-full h-full object-cover transition-all duration-[3s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-12 left-12">
                                    <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-black mb-4">The Mediterranean Circuit</p>
                                    <h4 className="text-4xl font-serif text-white italic">Platinum Summer Season</h4>
                                </div>
                                <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none"></div>
                            </div>
                            <div className="space-y-12">
                                <h3 className="text-5xl md:text-7xl font-serif text-white leading-tight tracking-tighter">
                                    More Than Just <br /><span className="text-gold italic">An RSVP.</span>
                                </h3>
                                <p className="text-neutral-500 text-xl font-light leading-relaxed">
                                    Membership at Urban Glam Life grants you more than entry—it grants you status. Every event on our calendar is an opportunity to network with global mues, creators, and elite visionaries.
                                </p>
                                <div className="flex flex-col gap-8">
                                    {[
                                        { label: 'Private Yacht Viewings', icon: '01' },
                                        { label: 'After-Hours Access', icon: '02' },
                                        { label: 'Concierge Support', icon: '03' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-8 group">
                                            <span className="text-3xl font-serif text-gold/20 group-hover:text-gold transition-colors">{item.icon}</span>
                                            <span className="text-[11px] uppercase tracking-[0.8em] text-white/40 group-hover:text-white transition-colors">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* INNER CIRCLE CONCIERGE */}
                    <section className="mt-40 py-32 bg-neutral-900/10 rounded-[4rem] border border-white/5 overflow-hidden relative group">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]"></div>

                        <div className="container mx-auto px-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div className="space-y-12 relative z-10 p-6 md:p-12">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                                            <Star size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-gold text-[10px] uppercase tracking-[0.6em] font-black">Inner Circle</h4>
                                            <h3 className="text-2xl font-serif text-white uppercase tracking-widest">Concierge</h3>
                                        </div>
                                    </div>

                                    <div className="pl-8 border-l border-gold/30">
                                        <p className="text-neutral-400 text-xl font-serif italic leading-relaxed max-w-lg">
                                            "Excellence is not a singular act, but a lifestyle. Your dedicated concierge is standing by to fulfill any request."
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            'Priority Private Viewings',
                                            'Global Lifestyle Management',
                                            'Curated Travel Itineraries',
                                            'Exclusive Brand Collaborations'
                                        ].map((service, idx) => (
                                            <div key={idx} className="group/item flex items-center justify-between py-6 border-b border-white/5 hover:border-gold/30 transition-all cursor-pointer">
                                                <span className="text-white/60 text-[11px] uppercase tracking-[0.4em] font-bold group-hover/item:text-white transition-colors">
                                                    {service}
                                                </span>
                                                <ArrowRight size={14} className="text-gold/20 group-hover/item:text-gold transition-all -translate-x-4 group-hover/item:translate-x-0" />
                                            </div>
                                        ))}
                                    </div>

                                    <button className="mt-12 px-12 py-6 bg-gradient-to-r from-gold/80 to-gold text-black font-black uppercase tracking-[0.4em] text-[10px] hover:from-white hover:to-white transition-all shadow-[0_10px_40px_rgba(212,175,55,0.2)] active:scale-95">
                                        Contact Concierge
                                    </button>
                                </div>

                                <div className="relative h-[700px] rounded-[3rem] overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/ai_character_desk.jpg"
                                        className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105"
                                        alt="Concierge Executive"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                                    <div className="absolute bottom-12 right-12 text-right">
                                        <p className="text-white font-serif text-2xl italic">Evelyn Vance</p>
                                        <p className="text-gold text-[9px] uppercase tracking-[0.4em] font-black mt-2">Chief of Lifestyle</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* AMBASSADOR'S CHOICE */}
            <section className="py-24 bg-[#050505] border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-neutral-900/40 p-12 rounded-[3.5rem] border border-white/5">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/30 shrink-0">
                            <img src="/images/ai_character_face_premium.jpg" className="w-full h-full object-cover" alt="Ambassador" />
                        </div>
                        <div>
                            <h5 className="text-gold font-black uppercase tracking-[0.5em] text-[10px] mb-4">Ambassador's Choice</h5>
                            <p className="text-white text-lg font-serif italic leading-relaxed">
                                "The Tokyo Neon nights are where culture truly meets couture. I'll see you at the Shibuya Sky Lounge for our private viewing next month."
                            </p>
                            <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] font-black mt-4">— Evelyn Vance</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* RSVP Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={closeRSVPModal}></div>
                    <div className="relative bg-neutral-900 border border-white/10 p-10 max-w-md w-full rounded-xl shadow-2xl animate-in zoom-in-95 duration-300">
                        <button
                            onClick={closeRSVPModal}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center mb-8">
                            <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-black mb-2">RSVP Request</h3>
                            <h4 className="text-2xl font-serif font-bold text-white max-w-[80%] mx-auto">{selectedEvent.title}</h4>
                            <p className="text-neutral-500 text-xs mt-2">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                        </div>
                        {rsvpStatus === 'success' ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ArrowRight size={32} />
                                </div>
                                <h4 className="text-xl text-white font-serif mb-2">Request Received</h4>
                                <p className="text-neutral-400 text-sm">We'll review your RSVP and send a confirmation shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleRSVP} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={rsvpName}
                                        onChange={(e) => setRsvpName(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={rsvpEmail}
                                        onChange={(e) => setRsvpEmail(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-gold outline-none transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={rsvpStatus === 'submitting'}
                                    className="w-full bg-gold text-black py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-colors disabled:opacity-50"
                                >
                                    {rsvpStatus === 'submitting' ? 'Processing...' : 'Confirm RSVP'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsPage;
