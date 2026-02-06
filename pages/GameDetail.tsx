import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Newspaper, Map, CheckCircle, Circle, Layers, Monitor, Calendar, MapPin, Info, Maximize2, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme, useDatabase } from '../App';
import { GameStatus } from '../types';

const StatusBadge: React.FC<{ status: GameStatus }> = ({ status }) => {
    const colors: Record<GameStatus, string> = {
        'In Development': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        'Released': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        'Paused': 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        'Alpha': 'bg-purple-500/10 border-purple-500/30 text-purple-400',
        'Beta': 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
        'Canceled': 'bg-red-500/10 border-red-500/30 text-red-400'
    };

    return (
        <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border backdrop-blur-md ${colors[status] || 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`}>
            {status}
        </div>
    );
};

const GameDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const { allData } = useDatabase();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const parentSubsidiary = useMemo(() => allData.subsidiaries.find(sub => sub.games.some(g => g.id === id)), [id, allData]);
    const game = useMemo(() => {
        let found = allData.games.find(g => g.id === id);
        if (!found && parentSubsidiary) found = parentSubsidiary.games.find(g => g.id === id);
        return found;
    }, [id, parentSubsidiary, allData]);

    const relatedArticles = useMemo(() => game ? allData.blogPosts.filter(post => post.relatedGameIds?.includes(game!.id)) : [], [game, allData]);

    if (!game) return <div className="text-center py-20 font-black uppercase tracking-widest opacity-40">Project Log Missing</div>;

    const isLinkActive = !!game.link;
    const isMainProject = allData.games.some(g => g.id === id);
    const backPath = isMainProject ? '/games' : (parentSubsidiary ? `/network/${parentSubsidiary.id}` : '/network');
    const backLabel = isMainProject ? 'Back to Catalog' : (parentSubsidiary ? `Back to ${parentSubsidiary.name}` : 'Back to Network');

    const renderMarkdown = (content: string) => {
        const processedContent = content.replace(/\[img:(.*?)\]/g, '![]($1)');
        return (
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ src, alt }) => (
                        <motion.img 
                            initial={{ opacity: 0 }} 
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            src={src} 
                            className="w-full h-auto rounded-2xl my-8 border border-white/5 shadow-lg cursor-zoom-in" 
                            onClick={() => setSelectedImage(src || null)}
                            alt={alt || "Project screenshot"} 
                        />
                    ),
                    p: ({ children }) => <p className="mb-4 leading-relaxed font-light text-gray-400">{children}</p>,
                    h1: ({ children }) => <h1 className="text-3xl font-black mt-8 mb-4 uppercase text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-black mt-6 mb-3 uppercase text-white">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-black mt-4 mb-2 uppercase text-emerald-500">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-500">{children}</ul>,
                    li: ({ children }) => <li className="text-base">{children}</li>,
                }}
            >
                {processedContent}
            </ReactMarkdown>
        );
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto py-8">
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X className="w-10 h-10" /></button>
                        <motion.img 
                            layoutId={`img-${selectedImage}`}
                            src={selectedImage} 
                            className="max-w-full max-h-full rounded-xl shadow-2xl" 
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-12 flex items-center justify-between">
                <Link to={backPath} className="hover:text-emerald-500 flex items-center gap-2 transition-colors text-xs font-bold uppercase tracking-widest text-gray-500">
                    <ChevronLeft className="w-4 h-4" /> {backLabel}
                </Link>
                <div className="flex gap-4">
                    {game.platforms.map(p => (
                        <span key={p} className="text-[10px] font-bold px-2 py-0.5 border border-white/10 rounded-full text-gray-400 uppercase tracking-widest">{p}</span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-12">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                        <img 
                            src={game.image} 
                            style={{ imageRendering: game.id === 'rise' ? 'pixelated' : 'auto' }}
                            className="w-full h-full object-cover opacity-80" 
                            alt={game.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                             <div className="flex flex-wrap items-baseline gap-4 mb-2">
                                <h1 className="text-6xl font-black text-white tracking-tighter uppercase">{game.title}</h1>
                                <div className="flex items-center gap-2 text-emerald-500/80 text-[10px] font-black uppercase tracking-[0.2em]">
                                    {game.genres.map((genre, idx) => (
                                        <React.Fragment key={genre}>
                                            <span>{genre}</span>
                                            {idx < game.genres.length - 1 && <span className="text-white/20">●</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                             </div>
                        </div>
                        <div className="absolute top-8 left-8">
                             <StatusBadge status={game.status} />
                        </div>
                    </div>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-emerald-500">
                            <Layers className="w-5 h-5" />
                            <h3 className="text-xs font-black uppercase tracking-[0.3em]">Project Description</h3>
                        </div>
                        <div className="text-xl text-gray-400 leading-relaxed font-light">
                            {renderMarkdown(game.fullText)}
                        </div>
                    </section>

                    {game.gallery && game.gallery.length > 0 && (
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 text-emerald-500">
                                <Maximize2 className="w-5 h-5" />
                                <h3 className="text-xs font-black uppercase tracking-[0.3em]">Visual Assets</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {game.gallery.map((img, i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ scale: 1.05 }}
                                        className="aspect-square rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in"
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="pt-12 border-t border-white/5">
                        <div className="flex items-center gap-2 mb-8">
                            <Newspaper className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-black uppercase tracking-tight">Related Articles</h2>
                        </div>
                        {relatedArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedArticles.map((post) => (
                                    <Link key={post.id} to={`/news/${post.id}`} className={`p-6 rounded-3xl border transition-all group ${isDarkMode ? 'bg-neutral-900 border-white/5 hover:bg-neutral-800' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{post.date}</span>
                                        <h4 className="text-lg font-bold mt-2 group-hover:text-emerald-500 transition-colors">{post.title}</h4>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 border border-dashed border-white/5 rounded-3xl text-center text-gray-600 text-sm">No specific logs linked to this project.</div>
                        )}
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100'}`}>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-6 flex items-center gap-2">
                            <span className="w-4 h-4 flex items-center justify-center"><Info className="w-4 h-4" /></span> Project Details
                        </h3>
                        <div className="space-y-6">
                            {[
                                { icon: Monitor, label: 'Platform', value: game.platforms.join(', ') },
                                { icon: Calendar, label: 'Release Date', value: game.releaseDate },
                                { icon: MapPin, label: 'Store', value: game.id === 'cardamania' ? 'Steam' : (game.link?.includes('gamejolt.com') ? 'GameJolt' : 'Official Site') }
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                        <spec.icon className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-black">{spec.label}</p>
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{spec.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href={game.link || '#'} target="_blank" rel="noreferrer" className={`mt-10 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 ${isLinkActive ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/20' : 'bg-neutral-800 text-gray-600 cursor-not-allowed opacity-50'}`}>
                            {isLinkActive ? `VIEW PROJECT` : 'LOCKED: IN DEV'} <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center gap-3 mb-8">
                            <Map className="w-5 h-5 text-purple-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Project Roadmap</h3>
                        </div>
                        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                            {game.roadmap && game.roadmap.length > 0 ? game.roadmap.map((m, i) => (
                                <div key={i} className="relative pl-10">
                                    <div className={`absolute left-0 top-1 transition-colors ${m.completed ? 'text-emerald-500' : 'text-gray-700'}`}>
                                        {m.completed ? <CheckCircle className="w-5 h-5 bg-neutral-900" /> : <Circle className="w-5 h-5 bg-neutral-900" />}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{m.date}</span>
                                    <h4 className={`text-sm font-bold leading-tight ${m.completed ? 'text-white' : 'text-gray-400'}`}>{m.label}</h4>
                                </div>
                            )) : <p className="text-xs text-gray-500 italic pl-10">TBA</p>}
                        </div>
                    </div>
                </aside>
            </div>
        </motion.div>
    );
};

export default GameDetail;