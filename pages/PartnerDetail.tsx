import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Globe } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const PartnerDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();

    const partner = db.partners.find(p => p.id === id);

    if (!partner) {
        return <div className="text-center py-20">Partner not found</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
            <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
                <Link to="/partners" className="hover:text-blue-500 flex items-center gap-1 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> All Partners
                </Link>
                <span>/</span>
                <span className={isDarkMode ? 'text-white' : 'text-black'}>{partner.name}</span>
            </div>

            <div className={`border rounded-2xl p-8 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-8 ${isDarkMode ? 'bg-neutral-900 border-white/10' : 'bg-white border-gray-200'}`}>
                <img 
                    src={partner.image} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-black" 
                    alt={partner.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/128x128/10b981/FFFFFF?text=${partner.name.substring(0, 5)}`; }}
                />
                <div>
                    <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{partner.name}</h1>
                    <span className="inline-block bg-green-900/30 text-green-500 text-xs font-bold px-3 py-1 rounded-full mb-4">{partner.type}</span>
                    <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {partner.fullText || partner.description}
                    </p>
                    
                    {partner.website && (
                        <a 
                            href={partner.website} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded transition-colors font-medium text-sm ${isDarkMode ? 'text-white bg-white/10 hover:bg-white/20' : 'text-black bg-gray-100 hover:bg-gray-200'}`}
                        >
                            <Globe className="w-4 h-4" /> Visit Official Website
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PartnerDetail;