import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
             <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
                <Link to="/subsidiaries" className="hover:text-blue-500 flex items-center gap-1 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> All Subsidiaries
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

            <h2 className={`text-2xl font-bold mb-6 border-b pb-4 ${isDarkMode ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'}`}>
                Projects by {sub.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sub.games.length > 0 ? (
                    sub.games.map(game => (
                        <motion.div 
                            key={game.id}
                            whileHover={{ x: 5 }}
                            onClick={() => navigate(`/games/${game.id}`)}
                            className={`cursor-pointer border rounded-lg p-4 flex items-center gap-4 transition-colors ${isDarkMode ? 'bg-black border-neutral-800 hover:bg-neutral-900' : 'bg-gray-50 border-gray-200 hover:bg-white'}`}
                        >
                            <img 
                                src={game.image} 
                                className="w-24 h-24 object-cover rounded bg-neutral-800" 
                                alt={game.title}
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/96x96/1e293b/FFFFFF?text=IMG`; }}
                            />
                            <div>
                                <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{game.title}</h4>
                                <p className="text-sm text-gray-500 line-clamp-1">{game.description}</p>
                            </div>
                            <div className="ml-auto text-gray-500">
                                <ChevronRight />
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No public projects listed yet.</p>
                )}
            </div>
        </motion.div>
    );
};

export default SubsidiaryDetail;