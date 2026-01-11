import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added 'Users' to imports
import { Mail, MessageSquareText, ExternalLink, User, Users, Gamepad2, Zap, Youtube, CheckCircle, Twitter } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const Contact: React.FC = () => {
    const { isDarkMode } = useTheme();
    
    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const { name, email, subject, message } = formData;
        
        const emailBody = `Sender Name: ${name}\nSender Email: ${email || 'Not Provided'}\n\n--- Message ---\n${message}`;
        const encodedSubject = encodeURIComponent(`LSS Website Inquiry: ${subject}`);
        const encodedBody = encodeURIComponent(emailBody);
        
        const mailtoLink = `mailto:leftsidedstudios@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.click();
        
        setStatus('success');
        setTimeout(() => setStatus('idle'), 8000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto py-8">
            <h1 className={`text-6xl font-black mb-4 tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h1>
            <p className="text-xl text-gray-500 mb-16 font-light">We love hearing from our fans, partners, and aspiring developers.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-20">
                {/* Channels */}
                <div className="flex flex-col h-full">
                    <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2 ${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`}>
                        <Zap className="w-4 h-4" /> Official Channels
                    </h2>
                    <div className="flex flex-col gap-4 flex-grow">
                        <div className={`group flex items-start gap-4 p-8 rounded-[2rem] border transition-all flex-1 ${isDarkMode ? 'bg-neutral-900/50 border-white/5 hover:border-blue-500/30' : 'bg-white border-gray-100 shadow-sm hover:border-blue-500'}`}>
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform flex-shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className={`text-xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>General Inquiries</h3>
                                <p className="text-gray-500 text-sm mb-4 font-medium">For partnerships, press, or business matters.</p>
                                <a href="mailto:leftsidedstudios@gmail.com" className="text-blue-500 font-black uppercase text-[10px] tracking-widest hover:underline mt-auto">leftsidedstudios@gmail.com</a>
                            </div>
                        </div>
                        <div className={`group flex items-start gap-4 p-8 rounded-[2rem] border transition-all flex-1 ${isDarkMode ? 'bg-neutral-900/50 border-white/5 hover:border-purple-500/30' : 'bg-white border-gray-100 shadow-sm hover:border-purple-500'}`}>
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform flex-shrink-0">
                                <MessageSquareText className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className={`text-xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Community Hub</h3>
                                <p className="text-gray-500 text-sm mb-4 font-medium">Join our Discord for real-time chat and updates.</p>
                                <a href="https://discord.gg/A8XMvSnkCU" target="_blank" rel="noreferrer" className="text-purple-500 font-black uppercase text-[10px] tracking-widest hover:underline mt-auto">Join Our Discord Server</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div className="flex flex-col h-full">
                    <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2 ${isDarkMode ? 'text-blue-500' : 'text-blue-600'}`}>
                        <Users className="w-4 h-4" /> Connect with Founders
                    </h2>
                    <div className="flex flex-col gap-4 flex-grow">
                        {db.people.map((person, idx) => (
                            <div key={idx} className={`p-6 rounded-[2rem] border flex items-center justify-between transition-all flex-1 ${isDarkMode ? 'bg-neutral-900/50 border-white/5 hover:border-blue-500/30' : 'bg-white border-gray-100 shadow-sm hover:border-blue-500'}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                        <User className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <span className={`font-black text-sm block leading-none mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{person.name}</span>
                                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Co-Founder</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {person.links.map((link, lIdx) => {
                                        let Icon = User;
                                        if (link.icon === 'youtube') Icon = Youtube;
                                        if (link.icon === 'twitter') Icon = Twitter;
                                        if (link.icon === 'gamepad-2') Icon = Gamepad2;
                                        if (link.icon === 'zap') Icon = Zap;

                                        return (
                                            <a 
                                                key={lIdx} 
                                                href={link.url} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                title={link.label}
                                                className={`p-2.5 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30' : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-500'}`}
                                            >
                                                <Icon className="w-4 h-4 text-gray-500 hover:text-blue-500" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <section className={`p-12 md:p-16 rounded-[3rem] border ${isDarkMode ? 'bg-neutral-900 border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
                <div className="max-w-3xl mx-auto">
                    <h2 className={`text-4xl font-black mb-2 tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Send a Message</h2>
                    <p className="text-gray-500 mb-10 font-medium">Have a specific question? Fill out the form below and we'll get back to you.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Jane Doe" 
                                    required 
                                    className={`w-full p-4 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-700' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400'}`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="jane@example.com" 
                                    className={`w-full p-4 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-700' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400'}`}
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                            <input 
                                type="text" 
                                id="subject" 
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Partnership inquiry..." 
                                required 
                                className={`w-full p-4 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-700' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400'}`}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Message</label>
                            <textarea 
                                rows={5} 
                                id="message" 
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tell us more about your project or inquiry..." 
                                required 
                                className={`w-full p-4 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none ${isDarkMode ? 'bg-neutral-950 border-neutral-800 text-white placeholder-neutral-700' : 'bg-gray-50 border-gray-200 text-black placeholder-gray-400'}`}
                            ></textarea>
                        </div>
                        
                        <div className="pt-4 relative">
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <Zap className="w-5 h-5 fill-current" /> Send us a message
                            </button>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Dispatch Received Successfully</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>
            </section>
        </motion.div>
    );
};

export default Contact;