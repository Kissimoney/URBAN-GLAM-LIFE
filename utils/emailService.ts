import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const VIP_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_VIP_TEMPLATE_ID;

interface EmailParams {
    [key: string]: unknown;
}

export const sendContactEmail = async (params: EmailParams) => {
    if (!PUBLIC_KEY || !SERVICE_ID || !CONTACT_TEMPLATE_ID) {
        console.warn('EmailJS credentials missing. Check .env.local');
        return;
    }

    try {
        const result = await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, params, PUBLIC_KEY);
        return result;
    } catch (error) {
        console.error('EmailJS Error:', error);
        throw error;
    }
};

export const sendVIPEmail = async (params: EmailParams) => {
    if (!PUBLIC_KEY || !SERVICE_ID || !VIP_TEMPLATE_ID) {
        console.warn('EmailJS credentials missing. Check .env.local');
        return;
    }

    try {
        const result = await emailjs.send(SERVICE_ID, VIP_TEMPLATE_ID, params, PUBLIC_KEY);
        return result;
    } catch (error) {
        console.error('EmailJS Error:', error);
        throw error;
    }
};

export const sendVIPSignup = async (params: EmailParams) => {
    return sendVIPEmail(params);
};

export const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
