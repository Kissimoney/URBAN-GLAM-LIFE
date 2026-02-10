import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
const initEmailJS = () => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
        emailjs.init(publicKey);
    }
};

// Initialize on module load
initEmailJS();

/**
 * Send VIP access signup email
 */
export const sendVIPSignup = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_VIP_TEMPLATE_ID;

        if (!serviceId || !templateId) {
            throw new Error('EmailJS configuration missing. Please set up environment variables.');
        }

        const templateParams = {
            to_email: email,
            from_name: 'Urban Glam Life',
            signup_date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        };

        await emailjs.send(serviceId, templateId, templateParams);

        return {
            success: true,
            message: 'Successfully joined the VIP list!',
        };
    } catch (error) {
        console.error('VIP signup error:', error);
        return {
            success: false,
            message: 'Failed to process signup. Please try again.',
        };
    }
};

/**
 * Send contact form inquiry
 */
export const sendContactInquiry = async (formData: {
    name: string;
    email: string;
    engagementType: string;
    message: string;
}): Promise<{ success: boolean; message: string }> => {
    try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;

        if (!serviceId || !templateId) {
            throw new Error('EmailJS configuration missing. Please set up environment variables.');
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            engagement_type: formData.engagementType,
            message: formData.message,
            inquiry_date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        await emailjs.send(serviceId, templateId, templateParams);

        return {
            success: true,
            message: 'Your inquiry has been sent successfully!',
        };
    } catch (error) {
        console.error('Contact form error:', error);
        return {
            success: false,
            message: 'Failed to send inquiry. Please try again or email us directly.',
        };
    }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
