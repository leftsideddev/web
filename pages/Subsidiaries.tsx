import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';
import Card from '../components/Card';

const Subsidiaries: React.FC = () => {
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
                <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Subsidiaries</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {db.subsidiaries.map((sub) => (
                    <Card
                        key={sub.id}
                        onClick={() => navigate(`/subsidiaries/${sub.id}`)}
                        image={sub.image}
                        title={sub.name}
                        subtitle={sub.tagline}
                        description={sub.description}
                        overlayColor="bg-purple-900/20"
                        footer={
                            <>
                                <span className={`text-xs border px-2 py-1 rounded-full ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                    {sub.games.length} Projects
                                </span>
                                <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                    View Studio <ArrowRight className="w-3 h-3" />
                                </span>
                            </>
                        }
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Subsidiaries;