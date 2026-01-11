import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight, PlayCircle } from 'lucide-react';
import { useTheme, useDatabase } from '../App';
import Card from '../components/Card';
import { GameStatus } from '../types';

const StatusBadge: React.FC<{ status: GameStatus | string }> = ({ status }) => {
    const colors: Record<string, string> = {
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

const SubsidiaryDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();

    const sub = data.subsidiaries.find(s => s.id === id);

    if (!sub) {
        return <div className="text-center py-20 font-black uppercase tracking-widest opacity-40">Subsidiary Data Missing</div>;
    }

    const isFounder = sub.type === 'Founder Imprint';
    const accentColor = isFounder ? 'emerald' : 'purple';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto py-8">
             <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
                <Link to="/network" className="hover:text-emerald-500 flex items-center gap-1 transition-colors text-xs font-bold uppercase tracking-widest">
                    <ChevronLeft className="w-4 h-4" /> Back to Network
                </Link>
                <span className="opacity-20">/</span>
                <span className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-black'}`}>{sub.name}</span>
            </div>

            <div className={`rounded-[3rem] p-10 md:p-12 border mb-20 flex flex-col md:flex-row gap-12 items-center md:items-start ${isDarkMode ? 'bg-neutral-900 border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
                <div className="relative group flex-shrink-0">
                    <div className={`absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isFounder ? 'bg-emerald-500' : 'bg-purple-500'}`}></div>
                    <img 
                        src={sub.image} 
                        className="relative w-40 h-40 rounded-full object-cover border-4 border-black/10 shadow-lg" 
                        alt={sub.name}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/128x128/3730a3/FFFFFF?text=${sub.name.charAt(0)}`; }}
                    />
                </div>
                <div className="text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                        <h1 className={`text-5xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{sub.name}</h1>
                        <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${isFounder ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-purple-500/10 border-purple-500/30 text-purple-500'}`}>
                            {isFounder ? `BY ${sub.owner?.toUpperCase()}` : sub.type.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.3em] mb-6 text-sm">{sub.tagline}</p>
                    <p className={`max-w-3xl text-xl leading-relaxed font-light ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {sub.fullText || sub.description}
                    </p>
                </div>
            </div>

            {/* Games Section */}
            {(sub.games && sub.games.length > 0) && (
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Interactive Projects
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sub.games.map(game => (
                            <Card 
                                key={game.id}
                                onClick={() => navigate(`/games/${game.id}`)}
                                image={game.image}
                                title={game.title}
                                description={game.description}
                                accentColor={accentColor}
                                imageClassName="aspect-[16/9]"
                                scalingMode={game.id === 'game_rise' ? 'pixelated' : 'auto'}
                                subtitle={
                                    <div className="flex flex-wrap items-center gap-2">
                                        {(game.genres as string[]).map((genre, idx) => (
                                            <React.Fragment key={genre}>
                                                <span className="text-[10px] font-black uppercase tracking-widest">{genre}</span>
                                                {idx < (game.genres as string[]).length - 1 && <span className="opacity-30">●</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                }
                                footer={
                                    <div className="flex items-center justify-between w-full">
                                        <StatusBadge status={game.status} />
                                        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isFounder ? 'text-emerald-500' : 'text-purple-500'}`}>
                                            View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Series Section */}
            {(sub.series && sub.series.length > 0) && (
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Cinematic Productions
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {sub.series.map(series => (
                            <Card 
                                key={series.id}
                                onClick={() => navigate(`/series/${series.id}`)}
                                image={series.image}
                                title={series.title}
                                description={series.description}
                                accentColor="red"
                                imageClassName="aspect-[16/9]"
                                subtitle={
                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                                        OFFICIAL SERIES
                                    </span>
                                }
                                footer={
                                    <div className="flex items-center justify-between w-full">
                                        <StatusBadge status={series.status} />
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500">
                                            Watch Trailer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </section>
            )}

            {(!sub.games.length && (!sub.series || !sub.series.length)) && (
                <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem] opacity-40">
                    <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">No public projects currently logged for this division.</p>
                </div>
            )}
        </motion.div>
    );
};

export default SubsidiaryDetail;