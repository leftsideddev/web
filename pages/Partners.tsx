import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const Partners: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <div className="mb-12 flex items-center gap-4">
                <button 
                    onClick={() => navigate('/')} 
                    className={`p-2 rounded-full ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Strategic Partners</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {db.partners.map((partner) => (
                    <motion.div 
                        key={partner.id}
                        onClick={() => navigate(`/partners/${partner.id}`)}
                        whileHover={{ y: -8 }}
                        className={`cursor-pointer p-6 rounded-xl border flex flex-col items-center text-center group transition-all ${isDarkMode ? 'bg-neutral-900 border-white/5 hover:border-white/20' : 'bg-white border-gray-200 hover:border-blue-200 shadow-sm'}`}
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border border-white/10">
                            <img 
                                src={partner.image} 
                                className="w-full h-full object-cover" 
                                alt={partner.name}
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/96x96/10b981/FFFFFF?text=${partner.name.substring(0, 5)}`; }}
                            />
                        </div>
                        <h3 className={`text-xl font-bold mb-1 group-hover:text-green-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{partner.name}</h3>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">{partner.type}</p>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{partner.description}</p>
                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-auto">View Profile <ArrowRight className="w-3 h-3" /></span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Partners;