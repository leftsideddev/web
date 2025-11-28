import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';
import { Game } from '../types';

const GameDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    // Helper to find game anywhere in DB
    let game: Game | undefined = db.games.find(g => g.id === id);
    let parentLabel = 'Games';
    let parentPath = '/games';

    if (!game) {
        for (const sub of db.subsidiaries) {
            const found = sub.games.find(g => g.id === id);
            if (found) {
                game = found;
                parentLabel = sub.name;
                parentPath = `/subsidiaries/${sub.id}`;
                break;
            }
        }
    }

    if (!game) {
        return <div className="text-center py-20">Game not found</div>;
    }

    const isLinkActive = !!game.link;
    const buttonText = isLinkActive ? (game.link?.includes('gamejolt') ? 'VIEW ON GAMEJOLT' : 'VIEW WEBSITE') : 'COMING SOON';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
                <Link to={parentPath} className="hover:text-blue-500 flex items-center gap-1 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back to {parentLabel}
                </Link>
                <span>/</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>{game.title}</span>
            </div>

            <div className={`rounded-2xl overflow-hidden border mb-12 shadow-lg ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <img 
                    src={game.image} 
                    className="w-full h-[50vh] object-cover" 
                    alt={game.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/1000x500/1e293b/FFFFFF?text=${game.title.replace(/\s/g, '+')}`; }}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <h1 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{game.title}</h1>
                    <p className={`text-xl leading-relaxed mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{game.fullText}</p>
                </div>
                <div className="md:col-span-1">
                    <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-200'}`}>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Info</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="block text-xs text-gray-500">RELEASE</span>
                                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>{game.releaseDate || "Released"}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-500">PLATFORM</span>
                                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>PC Only</span>
                            </div>
                            <button 
                                disabled={!isLinkActive}
                                onClick={() => isLinkActive && window.open(game.link!, '_blank')}
                                className={`w-full mt-4 font-bold py-3 rounded transition-all ${
                                    isLinkActive 
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30' 
                                        : 'bg-neutral-200 text-gray-400 cursor-not-allowed dark:bg-neutral-800 dark:text-gray-600'
                                }`}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default GameDetail;