import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const Games: React.FC = () => {
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
                <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Our Games</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {db.games.map((game) => (
                    <motion.div 
                        key={game.id}
                        onClick={() => navigate(`/games/${game.id}`)}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900 border border-white/10 group shadow-lg"
                    >
                        <img 
                            src={game.image} 
                            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500" 
                            alt={game.title}
                            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x600/1e293b/FFFFFF?text=${game.title.replace(/\s/g, '+')}`; }}
                        />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent">
                            <h3 className="text-3xl font-bold text-white mb-2">{game.title}</h3>
                            <p className="text-gray-300 line-clamp-2">{game.description}</p>
                            <div className="mt-4 text-sm font-mono text-blue-400 flex items-center gap-2 font-bold">
                                DETAILS <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Games;