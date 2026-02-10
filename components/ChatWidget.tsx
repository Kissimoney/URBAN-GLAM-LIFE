
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getAIResponse } from '../utils/geminiService';

interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = { role: 'user', parts: [{ text: inputValue }] };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const responseText = await getAIResponse(messages, inputValue); // Pass history WITHOUT current message? 
            // Actually geminiService.ts handles history reconstruction differently in startChat if we passed history including current message it would duplicate?
            // Wait, startChat(history) sets PREVIOUS context. Then sendMessage(current) adds the new turn.
            // So passed history should contain all previous turns EXCLUDING the one being sent now?
            // Yes. So passing `messages` (which includes previous turns) is correct.
            // But wait! Creating `newMessages` includes the CURRENT user input.
            // If `getAIResponse` takes `history` argument and initializes `startChat` with it, then calls `sendMessage(inputValue)`,
            // the `history` argument passed to `getAIResponse` should NOT contain `inputValue` yet.
            // So I should pass `messages` (the OLD state) to `getAIResponse`, NOT `newMessages`.

            const aiResponseText = await getAIResponse(messages, inputValue);

            const aiMessage: ChatMessage = { role: 'model', parts: [{ text: aiResponseText }] };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Chat Error:', error);
            const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "I apologize, but I'm having trouble connecting to the concierge service right now." }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 ${isOpen ? 'bg-neutral-900 border border-gold text-gold rotate-90' : 'bg-gold text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} fill="currentColor" />}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-8 z-40 w-96 max-w-[calc(100vw-4rem)] bg-black/90 backdrop-blur-xl border border-gold/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-neutral-900/80 p-6 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                        <Sparkles size={18} className="text-gold" />
                    </div>
                    <div>
                        <h3 className="text-white font-serif font-bold text-lg leading-tight">Aria</h3>
                        <p className="text-gold/60 text-[10px] uppercase tracking-widest font-bold">AI Concierge</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
                    {messages.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-white/40 text-sm italic mb-2">"Welcome to Urban Glam Life."</p>
                            <p className="text-white/30 text-xs">How may I assist with your lifestyle today?</p>
                        </div>
                    )}

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-gold text-black font-medium rounded-tr-none'
                                        : 'bg-neutral-800 text-neutral-200 border border-white/5 rounded-tl-none'
                                    }`}
                            >
                                {msg.parts[0].text}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-neutral-800 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-neutral-900/50 border-t border-white/10">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about events, style..."
                            className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isLoading}
                            className="absolute right-1 top-1 p-2 bg-gold/10 text-gold rounded-full hover:bg-gold hover:text-black transition-all disabled:opacity-0 disabled:scale-75"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ChatWidget;
