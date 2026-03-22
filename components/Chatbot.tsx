import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Minus, Maximize2, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { useDatabase, useTheme } from '../contexts';
import { SafeMarkdown } from './SafeMarkdown';

interface Message {
    role: 'user' | 'bot';
    text: string;
}

const Chatbot: React.FC = () => {
    const { allData } = useDatabase();
    const { isDarkMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: "Hi there! I'm the Left-Sided Studios assistant. How can I help you today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
            const model = "gemini-3-flash-preview";
            
            // Prepare context from studio data
            const studioContext = JSON.stringify({
                about: allData.about,
                games: allData.games,
                subsidiaries: allData.subsidiaries,
                partners: allData.partners,
                news: allData.news,
                team: allData.teamDetails
            });

            const systemInstruction = `
                You are a friendly, helpful, and knowledgeable assistant for Left-Sided Studios (LSS).
                Your goal is to answer questions about the studio, its games, its team, and its history.
                
                Studio Context:
                ${studioContext}
                
                Guidelines:
                - Be warm and professional.
                - Use the provided context to answer accurately.
                - If you don't know something, be honest and suggest they contact the studio via our official Discord server or social media channels.
                - Keep responses concise but helpful.
                - Don't use sci-fi or overly robotic language. Just be a friendly human-like assistant.
                - Mention specific games like Cardamania, RISE, Bumbl, and BREAKPOINT when relevant.
                - Mention the founders: Vermetra, RocketBlasts, and DaRealSansYT if asked about the team.
                
                Privacy & Confidentiality:
                - Some items in the context have "isPublic: false". 
                - If a user asks about something that is marked as "isPublic: false", do NOT say it doesn't exist.
                - Instead, acknowledge its existence but politely explain that you cannot share specific details about it at this time (e.g., "I'm aware of that project, but I can't share any details about it just yet!").
                - "Skirt over" these topics gracefully.
                
                Formatting:
                - Use Markdown for your responses (bold, italics, lists, etc.) to make them readable.
            `;

            const chat = ai.chats.create({
                model: model,
                config: {
                    systemInstruction: systemInstruction,
                },
            });

            const response = await chat.sendMessage({ message: userMessage });
            const botResponse = response.text || "I'm sorry, I couldn't process that request.";
            
            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having a bit of trouble connecting right now. Please try again in a moment!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className={`mb-4 w-[350px] sm:w-[400px] rounded-3xl shadow-2xl overflow-hidden border flex flex-col ${
                            isDarkMode ? 'bg-neutral-900 border-white/10' : 'bg-white border-gray-200'
                        } ${isMinimized ? 'h-16' : 'h-[500px]'}`}
                    >
                        {/* Header */}
                        <div className={`px-6 py-4 flex items-center justify-between border-b ${
                            isDarkMode ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-100'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LSS Assistant</h3>
                                    {!isMinimized && <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Online</span>
                                    </div>}
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 text-gray-500 hover:text-emerald-500 transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-hide">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                                                msg.role === 'user' 
                                                    ? 'bg-emerald-500 text-white rounded-tr-none' 
                                                    : isDarkMode 
                                                        ? 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none' 
                                                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                            }`}>
                                                {msg.role === 'bot' ? (
                                                    <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                                                        <SafeMarkdown content={msg.text} />
                                                    </div>
                                                ) : (
                                                    msg.text
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className={`p-4 rounded-2xl rounded-tl-none flex items-center gap-2 ${
                                                isDarkMode ? 'bg-white/5 text-gray-400 border border-white/5' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                    <form 
                                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                        className="relative flex items-center"
                                    >
                                        <input 
                                            type="text" 
                                            placeholder="Ask about our games..." 
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className={`w-full pl-4 pr-12 py-3 rounded-xl text-sm font-medium outline-none transition-all border ${
                                                isDarkMode 
                                                    ? 'bg-black/40 border-white/10 text-white focus:border-emerald-500' 
                                                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                                            }`}
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className={`absolute right-2 p-2 rounded-lg transition-all ${
                                                input.trim() && !isLoading 
                                                    ? 'text-emerald-500 hover:bg-emerald-500/10' 
                                                    : 'text-gray-500 opacity-50'
                                            }`}
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </form>
                                    <p className="mt-3 text-[9px] text-center font-bold text-gray-600 uppercase tracking-widest">
                                        Powered by LSS Intelligence
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    if (isOpen && isMinimized) {
                        setIsMinimized(false);
                    } else {
                        setIsOpen(!isOpen);
                    }
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                    isOpen && !isMinimized ? 'bg-red-500 rotate-90' : 'bg-emerald-500'
                }`}
            >
                {isOpen && !isMinimized ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
