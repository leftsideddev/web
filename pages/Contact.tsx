import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquareText, ExternalLink, User, Gamepad2, Zap, Youtube, CheckCircle } from 'lucide-react';
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
        
        // Safer way to open mailto in sandboxed environments
        const mailtoLink = `mailto:leftsidedstudios@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.click();
        
        setStatus('success');
        setTimeout(() => setStatus('idle'), 8000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <h1 className={`text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h1>
            <p className="text-xl text-gray-500 mb-12">We love hearing from our fans, partners, and aspiring developers.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Channels */}
                <div>
                    <h2 className={`text-3xl font-bold mb-6 border-b pb-3 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'}`}>Official Channels</h2>
                    <div className="space-y-6">
                        <div className={`flex items-start gap-4 p-4 rounded-xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-200'}`}>
                            <Mail className="w-6 h-6 text-blue-500 mt-1" />
                            <div>
                                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>General Inquiries</h3>
                                <p className="text-gray-500 text-sm mb-2">For partnerships, press, or business matters.</p>
                                <a href="mailto:leftsidedstudios@gmail.com" className="text-blue-500 font-medium hover:underline">leftsidedstudios@gmail.com</a>
                            </div>
                        </div>
                        <div className={`flex items-start gap-4 p-4 rounded-xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-200'}`}>
                            <MessageSquareText className="w-6 h-6 text-purple-500 mt-1" />
                            <div>
                                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Community Support</h3>
                                <p className="text-gray-500 text-sm mb-2">Join our Discord for real-time chat.</p>
                                <a href="https://discord.gg/A8XMvSnkCU" target="_blank" rel="noreferrer" className="text-purple-500 font-medium hover:underline">Join Our Discord Server</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team */}
                <div>
                    <h2 className={`text-3xl font-bold mb-6 border-b pb-3 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'}`}>Connect with Founders</h2>
                    <div className="space-y-4">
                        {db.people.map((person, idx) => {
                             let Icon = User;
                             const link = person.links[0];
                             if (link.icon === 'youtube') Icon = Youtube;
                             if (link.icon === 'gamepad-2') Icon = Gamepad2;
                             if (link.icon === 'zap') Icon = Zap;

                            return (
                                <a key={idx} href={link.url} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${isDarkMode ? 'bg-neutral-900 hover:bg-neutral-800 border-white/5' : 'bg-white hover:bg-gray-50 border-gray-200'}`}>
                                    <div className="flex items-center gap-4">
                                        <Icon className="w-5 h-5 text-gray-500" />
                                        <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{person.name}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-500" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <section className={`p-10 rounded-2xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-200 shadow-xl'}`}>
                <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            id="name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name (Required)" 
                            required 
                            className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-gray-50 border-gray-300 text-black'}`}
                        />
                        <input 
                            type="email" 
                            id="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Your Email (Optional)" 
                            className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-gray-50 border-gray-300 text-black'}`}
                        />
                    </div>
                    <input 
                        type="text" 
                        id="subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject (Required)" 
                        required 
                        className={`w-full mt-4 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-gray-50 border-gray-300 text-black'}`}
                    />
                    <textarea 
                        rows={5} 
                        id="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your Message (Required)" 
                        required 
                        className={`w-full mt-4 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${isDarkMode ? 'bg-neutral-950 border-neutral-700 text-white' : 'bg-gray-50 border-gray-300 text-black'}`}
                    ></textarea>
                    
                    <button 
                        type="submit" 
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/30"
                    >
                        Send Message
                    </button>

                    {status === 'success' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-3 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center gap-2"
                        >
                            <CheckCircle className="w-5 h-5" />
                            <span>Your email client should now be open with your message!</span>
                        </motion.div>
                    )}
                </form>
            </section>
        </motion.div>
    );
};

export default Contact;