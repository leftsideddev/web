import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Users, Youtube, Twitter, Zap, User, Newspaper, ArrowRight, Star, Info, PlayCircle, History } from 'lucide-react';
import { useTheme, useDatabase } from '../App';
import { GameStatus, TeamMember } from '../types';
import Card from '../components/Card';

const Home: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const cardTransition = { type: "spring", stiffness: 400, damping: 25 } as const;
    
    const getStatusColorClasses = (status?: string) => {
        const s = status as GameStatus;
        switch (s) {
            case 'In Development': return 'border-emerald-500/50 text-emerald-400';
            case 'Released': return 'border-blue-500/50 text-blue-400';
            case 'Paused': return 'border-amber-500/50 text-amber-400';
            case 'Alpha': return 'border-purple-500/50 text-purple-400';
            case 'Beta': return 'border-indigo-500/50 text-indigo-400';
            case 'Canceled': return 'border-red-500/50 text-red-400';
            default: return 'border-white/10 text-white';
        }
    };

    const spotlightProjects = useMemo(() => {
        const allGames = [...data.games, ...data.subsidiaries.flatMap(s => s.games)];
        const allSeries = data.subsidiaries.flatMap(s => s.series || []);
        
        const projectPool = [
            ...allGames.map(g => ({ ...g, projectType: 'game' as const })),
            ...allSeries.map(s => ({ ...s, projectType: 'series' as const }))
        ];

        // Specifically find Cardamania for special treatment
        const cardamania = projectPool.find(p => p.id === 'game_cardamania');
        const others = projectPool.filter(p => p.id !== 'game_cardamania');
        const shuffled = [...others].sort(() => 0.5 - Math.random());
        const randomThree = shuffled.slice(0, 3);

        return cardamania ? [cardamania, ...randomThree] : shuffled.slice(0, 4);
    }, [data]);

    const latestNews = data.news && data.news.length > 0 ? data.news[0] : null;

    return (
        <motion.div variants={container} initial="hidden" animate="show">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-24">
                
                {/* --- LEFT COLUMN --- */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    
                    {/* Hero Section */}
                    <motion.section id="hero" variants={item} className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
                        <img 
                            src={isDarkMode ? data.about.featuredImage : data.about.featuredImageLight} 
                            className="absolute inset-0 w-full h-full object-cover" 
                            alt=""
                        />
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-black via-transparent to-transparent' : 'bg-gradient-to-t from-white via-transparent to-transparent'}`}></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                            <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} text-3xl font-black mb-2 drop-shadow-lg uppercase tracking-tighter text-shadow`}>LEFT-SIDED STUDIOS</h1>
                            <p className={`text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed drop-shadow-md max-w-xl`}>{data.about.subtitle}</p>
                        </div>
                    </motion.section>

                    {/* Founders Section */}
                    <motion.section id="founders" variants={item} className="flex-shrink-0">
                        <h2 className={`text-2xl font-black mb-6 uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Meet the Founders</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {Object.values(data.teamDetails).map((founder: TeamMember, idx) => {
                                return (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ 
                                            y: -12, 
                                            scale: 1.04, 
                                            boxShadow: isDarkMode ? `0 30px 60px -12px rgba(16, 185, 129, 0.3)` : "0 30px 60px -12px rgba(0, 0, 0, 0.12)" 
                                        }}
                                        transition={cardTransition}
                                        className={`p-4 rounded-2xl border flex flex-col items-center text-center cursor-default transition-colors duration-300 ${isDarkMode ? `bg-neutral-900 border-white/5 hover:border-emerald-500/40` : `bg-white border-gray-200 shadow-sm hover:border-emerald-500`}`}
                                    >
                                        <img 
                                            src={founder.image} 
                                            className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-emerald-500/50" 
                                            alt={founder.name}
                                        />
                                        <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{founder.name}</h3>
                                        <p className="text-xs font-mono text-emerald-500 mb-2 uppercase tracking-tighter">{founder.role}</p>
                                        <div className="flex space-x-3 mt-auto">
                                            {founder.links.map((link, lIdx) => {
                                                const IconMap: Record<string, any> = {
                                                    'youtube': Youtube,
                                                    'twitter': Twitter,
                                                    'gamepad-2': Gamepad2,
                                                    'zap': Zap,
                                                    'user': User
                                                };
                                                const LinkIcon = IconMap[link.icon] || User;
                                                return (
                                                    <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" title={link.label} className="text-gray-400 hover:text-emerald-500 transition-colors">
                                                        <LinkIcon className="w-4 h-4" />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Quick Links Row */}
                    <motion.section variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
                        {[
                            { label: 'About', sub: 'The Studio', icon: Info, path: '/about', color: 'text-gray-400', themeKey: 'gray' as const, glow: 'rgba(156, 163, 175, 0.3)' },
                            { label: 'Games', sub: 'Explore titles', icon: Gamepad2, path: '/games', color: 'text-emerald-500', themeKey: 'emerald' as const, glow: 'rgba(16, 185, 129, 0.3)' },
                            { label: 'Network', sub: 'Our Network', icon: Zap, path: '/network', color: 'text-purple-500', themeKey: 'purple' as const, glow: 'rgba(168, 85, 247, 0.3)' }
                        ].map((link, idx) => {
                            return (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ 
                                        y: -12, 
                                        scale: 1.04, 
                                        boxShadow: isDarkMode ? `0 30px 60px -12px ${link.glow}` : "0 30px 60px -12px rgba(0, 0, 0, 0.12)" 
                                    }}
                                    transition={cardTransition}
                                    onClick={() => navigate(link.path)}
                                    className={`p-6 rounded-2xl border cursor-pointer group transition-colors duration-300 flex flex-col items-center text-center justify-center ${isDarkMode ? `bg-neutral-900 border-white/5 hover:border-emerald-500/40` : `bg-white border-gray-200 hover:border-emerald-500`}`}
                                >
                                    <link.icon className={`w-8 h-8 mb-3 transition-colors ${link.color}`} />
                                    <h2 className={`text-xl font-bold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:${link.color}`}>{link.label}</h2>
                                    <p className="text-xs text-gray-500">{link.sub}</p>
                                </motion.div>
                            );
                        })}
                    </motion.section>
                </div>


                {/* --- RIGHT COLUMN --- */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    
                    {/* Latest News Section */}
                    {latestNews && (
                        <motion.section variants={item} className="flex-shrink-0">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Newspaper className="w-6 h-6 text-emerald-500" />
                                    <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Latest News</h2>
                                </div>
                                <button onClick={() => navigate('/news')} className="text-xs font-black text-gray-500 hover:text-emerald-500 transition-colors uppercase tracking-[0.2em]">Browse All News</button>
                            </div>
                            
                            <motion.div 
                                whileHover={{ 
                                    y: -12, 
                                    scale: 1.04, 
                                    boxShadow: isDarkMode ? `0 30px 60px -12px rgba(16, 185, 129, 0.3)` : "0 30px 60px -12px rgba(0, 0, 0, 0.12)" 
                                }}
                                transition={cardTransition}
                                onClick={() => latestNews.postId ? navigate(`/news/${latestNews.postId}`) : (latestNews.link && window.open(latestNews.link, '_blank'))}
                                className={`p-6 rounded-3xl border relative overflow-hidden cursor-pointer group transition-colors duration-300 ${isDarkMode ? 'bg-neutral-900 border-white/5 hover:border-emerald-500/40' : 'bg-white border-gray-200 hover:border-emerald-500'}`}
                            >
                                <div className={`absolute top-0 left-0 w-1 h-full ${isDarkMode ? 'bg-emerald-500' : 'bg-emerald-600'}`}></div>
                                <div className="flex flex-col gap-3">
                                    <h3 className={`text-xl font-black mb-2 group-hover:text-emerald-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{latestNews.title}</h3>
                                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{latestNews.content}</p>
                                    <div className="pt-2"><span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.2em] text-emerald-400 group-hover:text-emerald-300">View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span></div>
                                </div>
                            </motion.div>
                        </motion.section>
                    )}

                    {/* Spotlight Stack */}
                    <motion.section id="spotlight" variants={item} className="flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />
                            <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Project Spotlight</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 flex-grow">
                            {spotlightProjects.map((project, idx) => {
                                const isCardamania = project.id === 'game_cardamania';
                                const isGame = project.projectType === 'game';
                                
                                // Spotlight specifically uses amber (gold) for Cardamania
                                const themeKey = isCardamania ? 'amber' : (isGame ? 'emerald' : 'red');

                                return (
                                    <Card 
                                        key={`${project.id}-${idx}`}
                                        image={project.image}
                                        title={project.title}
                                        description={project.description}
                                        accentColor={themeKey}
                                        imageClassName="aspect-video"
                                        subtitle={
                                            <span className={`text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border bg-black/60 backdrop-blur-sm ${getStatusColorClasses(project.status)}`}>
                                                {project.status || 'Active'}
                                            </span>
                                        }
                                        subtitlePosition="top-left-overlay"
                                        className={isDarkMode ? (isCardamania ? 'border-amber-500/40' : 'border-white/5') : (isCardamania ? 'border-amber-500/50' : 'border-gray-200')}
                                        onClick={() => navigate(project.projectType === 'game' ? `/games/${project.id}` : `/series/${project.id}`)}
                                        footer={
                                            <div className="flex items-center justify-end w-full">
                                                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isCardamania ? 'text-amber-500 group-hover:text-amber-400' : 'text-emerald-500 group-hover:text-emerald-400'}`}>
                                                    View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        }
                                    />
                                );
                            })}
                        </div>
                    </motion.section>
                </div>
            </div>

            {/* Founding Spark Section */}
            <motion.section id="origins" variants={item} className="mb-24">
                 <div className={`p-12 md:p-20 rounded-[3.5rem] border relative overflow-hidden ${isDarkMode ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-gray-200'}`}>
                    {/* Gamepad Watermark */}
                    <div className="absolute -bottom-16 -right-16 rotate-[-15deg] opacity-[0.05] pointer-events-none">
                        <Gamepad2 className={`w-96 h-96 ${isDarkMode ? 'text-white' : 'text-black'}`} />
                    </div>

                    <div className="max-w-3xl relative z-10">
                        <div className="flex items-center gap-3 mb-8"><History className="w-6 h-6 text-emerald-500" /><span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">The Genesis</span></div>
                        <h2 className={`text-5xl font-black tracking-tighter mb-8 leading-none ${isDarkMode ? 'text-white' : 'text-black'}`}>A Summer That Changed Everything.</h2>
                        <p className="text-xl text-gray-500 leading-relaxed font-light mb-10">It began in the <span className="text-emerald-500 font-bold italic">summer of 2023</span>. Founders DaRealSansYT and RocketBlasts arrived at Vermetra’s house for a week-long hangout. Between messing around and gaming, a simple spark ignited that became the cornerstone of Left-Sided Studios.</p>
                        <button onClick={() => navigate('/about#timeline')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500 hover:gap-4 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1">Read the Full Story <ArrowRight className="w-4 h-4" /></button>
                    </div>
                 </div>
            </motion.section>
        </motion.div>
    );
};

export default Home;