import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const SubsidiaryDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const sub = db.subsidiaries.find(s => s.id === id);

    if (!sub) {
        return <div className="text-center py-20">Subsidiary not found</div>;
    }

    // Standard Animation Config matching Games tab benchmark
    const cardTransition = { type: "spring", stiffness: 400, damping: 25 } as const;
    const standardHover = { 
        y: -12, 
        scale: 1.04,
        boxShadow: isDarkMode 
            ? "0 30px 60px -12px rgba(16, 185, 129, 0.3)" 
            : "0 30px 60px -12px rgba(0, 0, 0, 0.12)"
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
             <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
                <Link to="/network" className="hover:text-emerald-500 flex items-center gap-1 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> All Network
                </Link>
                <span>/</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>{sub.name}</span>
            </div>

            <div className={`rounded-2xl p-8 md:p-12 border mb-12 flex flex-col md:flex-row gap-8 items-start ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-200'}`}>
                <img 
                    src={sub.image} 
                    className="w-32 h-32 rounded-full object-cover border-2 border-white/10" 
                    alt={sub.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/128x128/3730a3/FFFFFF?text=${sub.name.charAt(0)}`; }}
                />
                <div>
                    <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sub.name}</h1>
                    <p className="text-purple-500 font-mono mb-4">{sub.tagline}</p>
                    <p className={`max-w-2xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {sub.fullText || sub.description}
                    </p>
                </div>
            </div>

            {/* Games Section */}
            {(sub.games && sub.games.length > 0) && (
                <>
                    <h2 className={`text-2xl font-bold mb-6 border-b pb-4 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'}`}>
                        Interactive Projects by {sub.name}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                        {sub.games.map(game => (
                            <motion.div 
                                key={game.id}
                                whileHover={standardHover}
                                transition={cardTransition}
                                onClick={() => navigate(`/games/${game.id}`)}
                                className={`cursor-pointer border rounded-2xl p-4 flex items-center gap-4 transition-colors duration-300 ${isDarkMode ? 'bg-black border-neutral-800 hover:border-emerald-500/40' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-500'}`}
                                style={{ willChange: 'transform' }}
                            >
                                <img 
                                    src={game.image} 
                                    className="w-24 h-24 object-cover rounded-xl bg-neutral-800 transition-transform duration-500 group-hover:scale-105" 
                                    alt={game.title}
                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/96x96/1e293b/FFFFFF?text=IMG`; }}
                                />
                                <div>
                                    <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{game.title}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-1">{game.description}</p>
                                    <p className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-widest">{game.status}</p>
                                </div>
                                <div className="ml-auto text-gray-500">
                                    <ChevronRight />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {/* Series Section */}
            {(sub.series && sub.series.length > 0) && (
                <>
                    <h2 className={`text-2xl font-bold mb-6 border-b pb-4 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'}`}>
                        Media Series & Productions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sub.series.map(series => (
                            <motion.div 
                                key={series.id}
                                whileHover={standardHover}
                                transition={cardTransition}
                                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black border-neutral-800 hover:border-emerald-500/40' : 'bg-gray-50 border-gray-200 hover:bg-white hover:border-emerald-500'}`}
                                style={{ willChange: 'transform' }}
                            >
                                <div className="aspect-video relative group overflow-hidden">
                                    <img 
                                        src={series.image} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        alt={series.title}
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="w-12 h-12 text-white/80" />
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">SERIES</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{series.title}</h4>
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{series.releaseDate}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">{series.fullText}</p>
                                    <div className="flex items-center gap-2">
                                         <span className="text-[9px] font-bold px-2 py-0.5 border border-white/10 rounded text-gray-400 uppercase tracking-widest">{series.status}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            {(!sub.games.length && (!sub.series || !sub.series.length)) && (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                    <p className="text-gray-500 italic">This subsidiary currently has no public project logs.</p>
                </div>
            )}
        </motion.div>
    );
};

export default SubsidiaryDetail;