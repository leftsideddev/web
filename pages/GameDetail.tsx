
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Newspaper, Map, CheckCircle, Circle, Layers, Monitor, Calendar, MapPin, Info } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';
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
        <div 
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border backdrop-blur-md ${colors[status] || 'bg-gray-500/10 border-gray-500/30 text-gray-400'}`}
            role="status"
            aria-label={`Project Status: ${status}`}
        >
            {status}
        </div>
    );
};

const GameDetail: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();

    // Helper to find game anywhere in DB
    const game = useMemo(() => {
        let found = db.games.find(g => g.id === id);
        if (!found) {
            for (const sub of db.subsidiaries) {
                const sFound = sub.games.find(g => g.id === id);
                if (sFound) {
                    found = sFound;
                    break;
                }
            }
        }
        return found;
    }, [id]);

    const relatedArticles = useMemo(() => {
        if (!game) return [];
        return db.blogPosts.filter(post => post.relatedGameIds?.includes(game!.id));
    }, [game]);

    if (!game) return <div className="text-center py-20">Project Log Not Found</div>;

    const isLinkActive = !!game.link;
    const releaseLocation = game.link?.includes('gamejolt.com') ? 'GameJolt' : 'Official Site';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto py-8">
            <div className="mb-12 flex items-center justify-between">
                <Link to="/games" className="hover:text-emerald-500 flex items-center gap-2 transition-colors text-xs font-bold uppercase tracking-widest text-gray-500">
                    <ChevronLeft className="w-4 h-4" /> Back to Catalog
                </Link>
                <div className="flex gap-4">
                    {game.platforms.map(p => (
                        <span key={p} className="text-[10px] font-bold px-2 py-0.5 border border-white/10 rounded-full text-gray-400 uppercase tracking-widest">{p}</span>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Main Intel */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                        <img 
                            src={game.image} 
                            className="w-full h-full object-cover opacity-80" 
                            alt={game.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-8">
                             <h1 className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl">{game.title}</h1>
                        </div>
                        <div className="absolute top-6 left-8">
                             <StatusBadge status={game.status} />
                        </div>
                    </div>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-emerald-500">
                            <Layers className="w-5 h-5" />
                            <h3 className="text-xs font-black uppercase tracking-[0.3em]">Project Description</h3>
                        </div>
                        <p className="text-xl text-gray-400 leading-relaxed font-light">{game.fullText}</p>
                    </section>

                    {/* Related Media Feed */}
                    <section className="pt-12 border-t border-white/5">
                        <div className="flex items-center gap-2 mb-8">
                            <Newspaper className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-black uppercase tracking-tight">Related Articles</h2>
                        </div>
                        {relatedArticles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedArticles.map((post) => (
                                    <Link 
                                        key={post.id}
                                        to={`/blog/${post.id}`}
                                        className={`p-6 rounded-3xl border transition-all group ${isDarkMode ? 'bg-neutral-900 border-white/5 hover:bg-neutral-800' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}
                                    >
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{post.date}</span>
                                        <h4 className="text-lg font-bold mt-2 group-hover:text-emerald-500 transition-colors">{post.title}</h4>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 border border-dashed border-white/5 rounded-3xl text-center text-gray-600 text-sm">
                                No related articles for this project yet.
                            </div>
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    {/* Info Section */}
                    <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100'}`}>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-6 flex items-center gap-2">
                            <Info className="w-4 h-4" /> Project Details
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <Monitor className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Platforms</p>
                                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{game.platforms.join(', ')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Release Date</p>
                                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{game.releaseDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Release Location</p>
                                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{releaseLocation}</p>
                                </div>
                            </div>
                        </div>

                        <a 
                            href={game.link || '#'} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`mt-10 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 ${
                                isLinkActive 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/20' 
                                    : 'bg-neutral-800 text-gray-600 cursor-not-allowed opacity-50'
                            }`}
                        >
                            {isLinkActive ? `View on ${releaseLocation}` : 'Project Pending'} <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Roadmap Section */}
                    <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center gap-3 mb-8">
                            <Map className="w-5 h-5 text-purple-500" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Roadmap</h3>
                        </div>
                        
                        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                            {game.roadmap && game.roadmap.length > 0 ? (
                                game.roadmap.map((milestone, i) => (
                                    <div key={i} className="relative pl-10">
                                        <div className={`absolute left-0 top-1 transition-colors ${milestone.completed ? 'text-emerald-500' : 'text-gray-700'}`}>
                                            {milestone.completed ? <CheckCircle className="w-5 h-5 bg-neutral-900" /> : <Circle className="w-5 h-5 bg-neutral-900" />}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{milestone.date}</span>
                                        <h4 className={`text-sm font-bold leading-tight ${milestone.completed ? 'text-white' : 'text-gray-400'}`}>{milestone.label}</h4>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 italic pl-10">Coming soon.</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </motion.div>
    );
};

export default GameDetail;
