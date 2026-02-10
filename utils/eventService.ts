
import { supabase } from './supabaseClient';

export interface Event {
    id: string;
    title: string;
    city: string;
    description: string;
    date: string; // timestamptz string
    location: string;
    image_url: string;
    created_at: string;
}

export interface RSVP {
    id: string;
    event_id: string;
    full_name: string;
    email: string;
    status: string;
    created_at: string;
}

export const eventService = {
    // Fetch all events
    async getEvents() {
        return await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });
    },

    // Fetch a single event by ID
    async getEventById(id: string) {
        return await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();
    },

    // Submit RSVP
    async submitRSVP(event_id: string, email: string, full_name: string) {
        return await supabase
            .from('rsvps')
            .insert([
                {
                    event_id,
                    email,
                    full_name,
                },
            ]);
    },
};
