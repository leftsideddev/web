import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';
import Card from '../components/Card';

const Partners: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filteredPartners = useMemo(() => {
        return db.partners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 pb-20">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className={`p-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}><ArrowLeft className="w-5 h-5" /></button>
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Strategic Ecosystem</h1>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search partners..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-neutral-900 border-white/5 focus:border-blue-500/50 text-white' : 'bg-white border-gray-200 focus:border-blue-500 text-black'}`}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPartners.map((partner) => (
                    <Card
                        key={partner.id}
                        image={partner.image}
                        title={partner.name}
                        description={partner.description}
                        accentColor="blue"
                        imageClassName="h-32 rounded-full w-32 mx-auto mt-8 border-2 border-white/10"
                        className="text-center"
                        onClick={() => navigate(`/partners/${partner.id}`)}
                        footer={
                            <div className="flex flex-col items-center w-full mt-4">
                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    <span className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em]">{partner.type}</span>
                                    {partner.tags?.map(t => <span key={t} className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{t}</span>)}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-blue-500 transition-colors">
                                    View Details <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Partners;