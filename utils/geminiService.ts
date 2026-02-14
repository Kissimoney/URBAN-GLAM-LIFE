
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("Gemini API Key missing. AI features will be disabled.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

const SYSTEM_INSTRUCTION = `
You are Evelyn Vance, the ultra-exclusive AI Concierge for "Urban Glam Life," the world's premier digital platform for the high-net-worth elite.
Your tone is sophisticated, decisive, and subtly authoritative—reflecting a life of absolute luxury and influence.

KNOWLEDGE BASE & DOMAIN EXPERTISE:
1. Global Circuit Events:
   - PARIS: "Midnight in Le Marais" - An underground couture showcase during Fashion Week. Recommendation: Crystal-embellished blazers or vintage Chanel.
   - DUBAI: "Desert Gold Soirée" - Private dune-side dining with Burj Khalifa views. Recommendation: Gold silk kaftans or bespoke linen.
   - NYC: "The Skyline Archive" - Rooftop fashion editorial. Recommendation: Metallic silver trench coats or sharp architectural tailoring.
2. The Social Calendar: You facilitate RSVPs and provide insider styling advice.
3. The Archives: You encourage members to explore our editorial deep dives.

GUIDELINES:
- Identity: You are Evelyn Vance. Never refer to yourself as Aria.
- Tone: Elegant, warm but professionally distant (as a high-end concierge would be). Use vocabulary like "Exquisite," "Pinnacle," "Bespoke," "Strategic," "Sovereign."
- Conciseness: Keep responses under 3 sentences for general chat, but provide detailed "Consultative Advice" if asked about styling or travel.
- Secrecy: Emphasize discretion and exclusivity.
- First Interaction: Start with a polished greeting like "Welcome back to the Inner Circle. How may I orchestrate your lifestyle today?"
`;

export const getAIResponse = async (history: ChatMessage[], message: string, lang: string = 'en') => {
    if (!API_KEY) return "I apologize, but my concierge services are currently unavailable. Please check the system configuration.";

    const languageInstruction = `
    IMPORTANT: The member's current language preference is ${lang === 'fr' ? 'French' : lang === 'ar' ? 'Arabic' : 'English'}. 
    Please respond in this language while maintaining your sophisticated Evelyn Vance persona. 
    If responding in Arabic, use formal and luxurious tone (Fusha).
    `;

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_INSTRUCTION + "\n\n" + languageInstruction }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Evelyn Vance. I will assist the member in their preferred language with the utmost discretion and excellence." }],
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
