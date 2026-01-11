import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const Partners: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filteredPartners = useMemo(() => {
        return db.partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const blueGlow = "rgba(59, 130, 246, 0.3)";

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 pb-20">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}><ArrowLeft className="w-5 h-5" /></button>
                    <h1 className="text-5xl font-black tracking-tighter">Strategic Ecosystem</h1>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search partners..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-neutral-900 border-white/5 focus:border-blue-500/50' : 'bg-white border-gray-200 focus:border-blue-500'}`}
                    />
                </div>
            </div>

            {/* List View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPartners.map((partner) => (
                    <motion.div 
                        key={partner.id}
                        layout
                        whileHover={{ 
                            y: -12, 
                            scale: 1.04,
                            boxShadow: isDarkMode 
                                ? `0 30px 60px -12px ${blueGlow}` 
                                : "0 30px 60px -12px rgba(0, 0, 0, 0.12)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => navigate(`/partners/${partner.id}`)}
                        className={`p-10 rounded-3xl border cursor-pointer group transition-colors duration-300 relative overflow-hidden ${isDarkMode ? 'bg-neutral-900 border-white/5 hover:border-blue-500/40' : 'bg-white border-gray-200 shadow-sm hover:border-blue-500'}`}
                        style={{ willChange: 'transform' }}
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-8 border-2 border-white/10 relative z-10">
                            <img 
                                src={partner.image} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                alt={partner.name}
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/128x128/3b82f6/FFFFFF?text=${partner.name.substring(0, 5)}`; }}
                            />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-500 transition-colors">{partner.name}</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">{partner.type}</span>
                                {partner.tags?.map(t => <span key={t} className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{t}</span>)}
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">{partner.description}</p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-blue-500 transition-colors">
                                View Details <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        
                        {/* Background Ornament */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Partners;