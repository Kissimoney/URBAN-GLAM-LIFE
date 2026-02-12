
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { sendVIPEmail } from '../utils/emailService';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight, X } from 'lucide-react';

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
    const { user } = useAuth();

    // RSVP Form State
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpEmail, setRsvpEmail] = useState('');
    const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetchEvents();
        if (user) {
            setRsvpEmail(user.email || '');
            // Supabase user metadata might contain full_name if set during signup, 
            // otherwise user has to fill it.
            // setRsvpName(user.user_metadata?.full_name || ''); 
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
                // Extract unique cities
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
                        status: 'pending', // Default status
                        user_id: user?.id // Link to user if logged in
                    }
                ]);

            if (error) throw error;

            // Send VIP Email Notification
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
        <div className="bg-black min-h-screen text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <h1 className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-sm font-bold mb-4">The Social Calendar</h1>
                        <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter leading-tight max-w-4xl mx-auto">Exclusive Events</h2>
                    </div>

                    {/* Filter */}
                    <div className="flex justify-center gap-4 mb-16 flex-wrap animate-in fade-in duration-1000 delay-300">
                        {cities.map(city => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-8 py-3 rounded-full border text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-500 ${selectedCity === city
                                    ? 'bg-gold text-black border-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                    : 'bg-transparent text-white/40 border-white/10 hover:border-gold/50 hover:text-gold'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>

                    {/* Events Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div
                            key={selectedCity} // Key change triggers re-animation for filter transition
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

                                        <div className="absolute bottom-6 left-6">
                                            <span className="bg-gold/10 backdrop-blur-md text-gold text-[9px] uppercase tracking-[0.3em] font-black border border-gold/20 px-4 py-2 rounded-full">
                                                {event.city}
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
                </div>
            </main>

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
