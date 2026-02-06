import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Globe, ChevronRight, PlayCircle } from 'lucide-react';
import { useTheme, useDatabase } from '../App';
import Card from '../components/Card';

const PartnerDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const { allData } = useDatabase();
    const navigate = useNavigate();

    const partner = allData.partners.find(p => p.id === id);

    // Projects are now managed externally by partners on their own sites.
    const partnerGames: any[] = [];
    const partnerSeries: any[] = [];

    if (!partner) {
        return <div className="text-center py-20">Partner not found</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto py-8">
            <div className="mb-8 flex items-center gap-3 text-sm text-gray-500">
                <Link to="/network" className="hover:text-blue-500 flex items-center gap-1 transition-colors font-bold uppercase tracking-widest text-[10px]">
                    <ChevronLeft className="w-3 h-3" /> Back to Network
                </Link>
                <span className="opacity-20">/</span>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{partner.name}</span>
            </div>

            <div className={`border rounded-[2.5rem] p-10 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-10 mb-16 ${isDarkMode ? 'bg-neutral-900 border-white/5 shadow-2xl' : 'bg-white border-gray-200'}`}>
                <img 
                    src={partner.image} 
                    className="w-40 h-40 rounded-full object-cover border-4 border-black shadow-xl" 
                    alt={partner.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/128x128/3b82f6/FFFFFF?text=${partner.name.substring(0, 5)}`; }}
                />
                <div className="flex-grow">
                    <h1 className={`text-4xl font-black mb-2 tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{partner.name}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                        <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-500/20">{partner.type}</span>
                        {partner.tags.map(tag => (
                            <span key={tag} className="bg-gray-500/10 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/5">{tag}</span>
                        ))}
                    </div>
                    <p className={`text-xl leading-relaxed font-light mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {partner.fullText || partner.description}
                    </p>
                    
                    {partner.website && (
                        <a 
                            href={partner.website} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl ${isDarkMode ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 'text-white bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'}`}
                        >
                            <Globe className="w-4 h-4" /> Visit Official Site
                        </a>
                    )}
                </div>
            </div>

            {/* Strategic Projects */}
            {partnerGames.length > 0 && (
                <section className="mb-16">
                    <h2 className={`text-2xl font-black mb-8 uppercase tracking-tight border-b pb-4 ${isDarkMode ? 'text-white border-white/5' : 'text-gray-900 border-gray-100'}`}>
                        Collaborative Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {partnerGames.map(game => (
                            <Card 
                                key={game.id}
                                onClick={() => navigate(`/games/${game.id}`)}
                                image={game.image}
                                title={game.title}
                                subtitle={game.status}
                                description={game.description}
                                accentColor="blue"
                                footer={
                                    <span className="text-xs flex items-center gap-1 font-bold text-blue-500">
                                        View Details <ChevronRight className="w-3 h-3" />
                                    </span>
                                }
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Media/Series Projects */}
            {partnerSeries.length > 0 && (
                <section>
                    <h2 className={`text-2xl font-black mb-8 uppercase tracking-tight border-b pb-4 ${isDarkMode ? 'text-white border-white/5' : 'text-gray-900 border-gray-100'}`}>
                        Cinematic Productions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {partnerSeries.map(series => (
                            <Card 
                                key={series.id}
                                onClick={() => series.link ? window.open(series.link, '_blank') : null}
                                image={series.image}
                                title={series.title}
                                subtitle="Partner Series"
                                description={series.fullText}
                                accentColor="red"
                                footer={
                                    <div className="flex justify-between items-center w-full">
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{series.releaseDate}</span>
                                        <span className="text-xs flex items-center gap-1 font-bold text-red-500">
                                            Watch Now <PlayCircle className="w-3 h-3 ml-1" />
                                        </span>
                                    </div>
                                }
                            />
                        ))}
                    </div>
                </section>
            )}

            {partnerGames.length === 0 && partnerSeries.length === 0 && (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl opacity-50">
                    <p className="text-gray-500 italic">Project listings for this partner are managed on their official domain.</p>
                </div>
            )}
        </motion.div>
    );
};

export default PartnerDetail;