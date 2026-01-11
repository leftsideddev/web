import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme, useDatabase } from '../App';
import { GameStatus } from '../types';

const StatusBadge: React.FC<{ status: GameStatus }> = ({ status }) => {
    const colors: Record<GameStatus, string> = {
        'In Development': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        'Released': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        'Paused': 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        'Alpha': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
        'Beta': 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
        'Canceled': 'bg-red-500/10 border-red-500/30 text-red-400'
    };

    return (
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border backdrop-blur-md ${colors[status] || 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`}>
            {status}
        </div>
    );
};

const Games: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-20">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate('/')} className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}><ArrowLeft className="w-5 h-5" /></button>
                    <h1 className="text-5xl font-black tracking-tighter">Main Projects</h1>
                </div>
                <p className="text-gray-500 max-w-xl text-lg">Flagship releases and primary development efforts by the Left-Sided core team.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.games.map((game) => (
                    <motion.div 
                        key={game.id} 
                        whileHover={{ y: -12, scale: 1.04, boxShadow: isDarkMode ? "0 30px 60px -12px rgba(16, 185, 129, 0.3)" : "0 30px 60px -12px rgba(0, 0, 0, 0.12)" }}
                        onClick={() => navigate(`/games/${game.id}`)}
                        className={`cursor-pointer group relative overflow-hidden rounded-3xl border transition-colors duration-300 ${isDarkMode ? 'bg-neutral-900 border-white/5 hover:border-emerald-500/40' : 'bg-white border-gray-200 shadow-sm hover:border-emerald-500'}`}
                    >
                        <div className="aspect-[16/9] overflow-hidden relative">
                            <img src={game.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={game.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute top-4 right-4"><StatusBadge status={game.status} /></div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-2 transition-colors group-hover:text-emerald-400">{game.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">{game.description}</p>
                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest">View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Games;