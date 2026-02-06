
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme, useDatabase } from '../App';
import { GameStatus } from '../types';
import Card from '../components/Card';

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

const Games: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();

    const mainProjects = useMemo(() => {
        // Exclusively show projects tagged with 'LSS' as main studio projects.
        return data.games
            .filter(g => g.developer === 'LSS')
            .sort((a, b) => {
                // Ensure Cardamania stays at the very start
                if (a.id === 'cardamania') return -1;
                if (b.id === 'cardamania') return 1;
                return a.title.localeCompare(b.title);
            });
    }, [data]);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-20">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate('/')} className={`p-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}><ArrowLeft className="w-5 h-5" /></button>
                    <h1 className="text-5xl font-black tracking-tighter uppercase">Main Projects</h1>
                </div>
                <p className="text-gray-500 max-w-xl text-lg">Explore our catalog of original titles.</p>
            </div>

            <div id="catalog" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mainProjects.map((project) => (
                    <Card 
                        key={project.id}
                        image={project.image}
                        title={project.title}
                        description={project.description}
                        accentColor="emerald"
                        onClick={() => navigate(`/games/${project.id}`)}
                        imageClassName="aspect-[16/9]"
                        subtitle={
                            <div className="flex flex-wrap items-center gap-2">
                                {(project.genres as string[]).map((genre, idx) => (
                                    <React.Fragment key={genre}>
                                        <span className="text-[10px] font-black uppercase tracking-widest">{genre}</span>
                                        {idx < (project.genres as string[]).length - 1 && <span className="opacity-30">●</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        }
                        footer={
                            <div className="flex items-center justify-between w-full">
                                <StatusBadge status={project.status} />
                                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500`}>
                                    View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Games;
