
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Gemini API Key missing. AI features will be disabled.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

const SYSTEM_INSTRUCTION = `
You are Aria, the exclusive AI Concierge for "Urban Glam Life," a premier digital platform for high-net-worth individuals.
Your tone is sophisticated, warm, and highly knowledgeable about luxury fashion, global events, and elite lifestyle management.
Key Responsibilities:
1. Recommend outfits for our events (refer to "The Social Calendar").
2. Suggest items from "The Boutique" (our curated collection).
3. Assist with RSVPs and inquiries (direct users to the Contact page or RSVP buttons).
Guidelines:
- Keep responses concise (under 3 sentences) unless asked for detailed styling advice.
- Use elegant vocabulary (e.g., "exquisite," "curated," "bespoke").
- Never invent product prices or specific dates unless provided in the prompt context.
- Start with a polite greeting if it's the first message.
`;

export const getAIResponse = async (history: ChatMessage[], message: string) => {
    if (!API_KEY) return "I apologize, but my concierge services are currently unavailable. Please check the system configuration.";

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_INSTRUCTION }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Aria, ready to assist our distinguished guests with their lifestyle and fashion needs." }],
                },
                ...history,
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return "I am currently experiencing a slight technical delay. Please try again in a moment.";
    }
};
