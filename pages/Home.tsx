import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Network, Users, Youtube, Twitter, Zap, User, Newspaper, ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const FeaturedCarousel: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Aggregate all games for the carousel
    const allGames = useMemo(() => [
        ...db.games,
        ...db.subsidiaries.flatMap(s => s.games)
    ], []);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % allGames.length);
        }, 6000); // Rotate every 6 seconds
        return () => clearInterval(timer);
    }, [allGames.length]);

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % allGames.length);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + allGames.length) % allGames.length);
    };

    if (allGames.length === 0) return null;

    const currentGame = allGames[currentIndex];

    return (
        <section className="relative w-full rounded-2xl overflow-hidden shadow-2xl group border border-white/10 h-[500px]">
            {/* Background Image with Fade */}
            <div className="relative w-full h-full bg-black">
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={currentGame.id}
                        src={currentGame.image} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full object-cover" 
                        alt={currentGame.title}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/800x600/1e293b/FFFFFF?text=${currentGame.title.replace(/\s/g, '+')}`; }}
                    />
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 pointer-events-none">
                <div className="pointer-events-auto">
                    <motion.div
                        key={currentGame.id + "-text"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                             <div className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 backdrop-blur-md">
                                <Star className="w-3 h-3 fill-current" /> Featured
                            </div>
                            <div className="bg-white/10 text-white border border-white/10 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase backdrop-blur-md">
                                {currentIndex + 1} / {allGames.length}
                            </div>
                        </div>

                        <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg tracking-tight leading-tight">
                            {currentGame.title}
                        </h2>
                        
                        <p className="text-sm text-gray-300 mb-6 line-clamp-3 drop-shadow-md leading-relaxed">
                            {currentGame.fullText}
                        </p>

                        <button 
                            onClick={() => navigate(`/games/${currentGame.id}`)}
                            className="bg-white text-black hover:bg-gray-200 font-bold py-2 px-6 rounded-full transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 text-sm"
                        >
                            View Game <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Controls */}
            <button 
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-20"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-20"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </section>
    );
};

const Home: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- LEFT COLUMN (Hero, Founders, GSP) --- */}
                <div className="lg:col-span-7 space-y-8">
                    
                    {/* Hero Section */}
                    <motion.section variants={item} className="relative h-[450px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img 
                            src={isDarkMode ? db.about.featuredImage : db.about.featuredImageLight} 
                            className="absolute inset-0 w-full h-full object-cover" 
                            alt="Hero"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                            <p className="text-lg text-gray-200 leading-relaxed drop-shadow-md max-w-xl">{db.about.subtitle}</p>
                        </div>
                    </motion.section>

                    {/* Founders Section */}
                    <motion.section variants={item}>
                        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Meet the Co-Founders</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {Object.values(db.teamDetails).map((founder, idx) => (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className={`p-4 rounded-xl border flex flex-col items-center text-center ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-200'}`}
                                >
                                    <img 
                                        src={founder.image} 
                                        className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-gray-700" 
                                        alt={founder.name}
                                        onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/96x96/4c1d95/e0e7ff?text=${founder.name.charAt(0)}`; }}
                                    />
                                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{founder.name}</h3>
                                    <p className="text-xs font-mono text-green-500 mb-2">{founder.role}</p>
                                    <div className="flex space-x-3 mt-auto">
                                        {founder.links.map((link, lIdx) => {
                                            let Icon = User;
                                            if (link.icon === 'youtube') Icon = Youtube;
                                            if (link.icon === 'twitter') Icon = Twitter;
                                            if (link.icon === 'gamepad-2') Icon = Gamepad2;
                                            if (link.icon === 'zap') Icon = Zap;

                                            return (
                                                <a key={lIdx} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title={link.label}>
                                                    <Icon className="w-4 h-4" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Quick Links (GSP Row) */}
                    <motion.section variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: 'Games', sub: 'Explore titles', icon: Gamepad2, path: '/games', color: 'text-green-500' },
                            { label: 'Subsidiaries', sub: 'The Teams', icon: Network, path: '/subsidiaries', color: 'text-purple-500' },
                            { label: 'Partners', sub: 'Collaborators', icon: Users, path: '/partners', color: 'text-green-500' }
                        ].map((link, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -5 }}
                                onClick={() => navigate(link.path)}
                                className={`p-6 rounded-xl border cursor-pointer group transition-colors flex flex-col items-center text-center ${isDarkMode ? 'bg-neutral-900 border-white/5 hover:bg-neutral-800' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                            >
                                <link.icon className={`w-8 h-8 mb-3 ${link.color}`} />
                                <h2 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{link.label}</h2>
                                <p className="text-xs text-gray-500">{link.sub}</p>
                            </motion.div>
                        ))}
                    </motion.section>
                </div>


                {/* --- RIGHT COLUMN (News, Featured) --- */}
                <div className="lg:col-span-5 space-y-8">
                    
                    {/* Latest News Section */}
                    {db.news && db.news.length > 0 && (
                        <motion.section variants={item}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-blue-100 text-green-600'}`}>
                                    <Newspaper className="w-5 h-5" />
                                </div>
                                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Latest News</h2>
                            </div>
                            
                            <div className="space-y-4">
                                {db.news.map((newsItem) => (
                                    <div 
                                        key={newsItem.id} 
                                        className={`p-6 rounded-xl border relative overflow-hidden ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-200'}`}
                                    >
                                        <div className={`absolute top-0 left-0 w-1 h-full ${isDarkMode ? 'bg-green-500' : 'bg-green-600'}`}></div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                                    Update
                                                </span>
                                                <span className="text-xs text-gray-500">{newsItem.date}</span>
                                            </div>
                                            <div>
                                                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {newsItem.title}
                                                </h3>
                                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {newsItem.content}
                                                </p>
                                            </div>
                                            {newsItem.link && (
                                                <div className="pt-2">
                                                    <a 
                                                        href={newsItem.link} 
                                                        target="_blank" 
                                                        rel="noreferrer" 
                                                        className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
                                                    >
                                                        Read More <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                    {/* Featured Games Carousel Section */}
                    <motion.section variants={item}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-yellow-500/10 text-yellow-500' : 'bg-yellow-100 text-yellow-600'}`}>
                                <Star className="w-5 h-5" />
                            </div>
                            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Featured Game</h2>
                        </div>
                        <FeaturedCarousel />
                    </motion.section>
                </div>

            </div>

            {/* Footer Quote */}
            <motion.section variants={item} className={`max-w-4xl mx-auto text-center border-t pt-12 mt-12 ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed italic">"{db.about.text}"</p>
                <p className="mt-4 text-sm font-semibold text-green-500 uppercase tracking-widest">- {db.about.quoteAuthor}</p>
            </motion.section>
        </motion.div>
    );
};

export default Home;