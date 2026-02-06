import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Map, CheckCircle, Circle, Layers, Calendar, MapPin, Info, PlayCircle } from 'lucide-react';
import { useTheme, useDatabase } from '../App';

const SeriesDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const { allData } = useDatabase();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const series = useMemo(() => {
        for (const sub of allData.subsidiaries) {
            const found = sub.series?.find(s => s.id === id);
            if (found) return found;
        }
        return null;
    }, [id, allData]);

    if (!series) return <div className="text-center py-20">Series Not Found</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto py-8">
            <div className="mb-12 flex items-center justify-between">
                <Link to="/network" className="hover:text-red-500 flex items-center gap-2 transition-colors text-xs font-bold uppercase tracking-widest text-gray-500">
                    <ChevronLeft className="w-4 h-4" /> Back to Network
                </Link>
                <span className="text-[10px] font-black px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-500 rounded-full uppercase tracking-widest">Production Series</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                        <img 
                            src={series.image} 
                            style={{ imageRendering: series.id === 'rise' ? 'pixelated' : 'auto' }}
                            className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" 
                            alt={series.title}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="w-20 h-20 text-white/50" />
                        </div>
                        <div className="absolute bottom-6 left-8">
                             <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl uppercase">{series.title}</h1>
                        </div>
                    </div>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-red-500">
                            <Layers className="w-5 h-5" />
                            <h3 className="text-xs font-black uppercase tracking-[0.3em]">Project Description</h3>
                        </div>
                        <p className="text-xl text-gray-400 leading-relaxed font-light">{series.fullText}</p>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100'}`}>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 mb-6 flex items-center gap-2">
                            <span className="w-4 h-4 flex items-center justify-center"><Info className="w-4 h-4" /></span> Project Details
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Release Date</p>
                                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{series.releaseDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Status</p>
                                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{series.status}</p>
                                </div>
                            </div>
                        </div>

                        {series.link && (
                            <a 
                                href={series.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-10 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-500/20"
                            >
                                VIEW PROJECT <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                    </div>

                    <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center gap-3 mb-8">
                            <Map className="w-5 h-5 text-red-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Project Roadmap</h3>
                        </div>
                        
                        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                            {series.roadmap && series.roadmap.length > 0 ? (
                                series.roadmap.map((milestone, i) => (
                                    <div key={i} className="relative pl-10">
                                        <div className={`absolute left-0 top-1 transition-colors ${milestone.completed ? 'text-red-500' : 'text-gray-700'}`}>
                                            {milestone.completed ? <CheckCircle className="w-5 h-5 bg-neutral-900" /> : <Circle className="w-5 h-5 bg-neutral-900" />}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{milestone.date}</span>
                                        <h4 className={`text-sm font-bold leading-tight ${milestone.completed ? 'text-white' : 'text-gray-400'}`}>{milestone.label}</h4>
                                        {milestone.description && (
                                            <p className="text-[10px] text-gray-500 mt-1">{milestone.description}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic pl-10">Production schedule TBA.</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </motion.div>
    );
};

export default SeriesDetail;