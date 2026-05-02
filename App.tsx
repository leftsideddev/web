
import React, { useState, useEffect, createContext, useContext, useRef, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Menu, Sun, Moon, ArrowLeft,
    Users, Mail, Monitor, MessageSquare, Search, X, ChevronRight, Info, Layout, Newspaper, Zap, Filter, Check, RotateCcw, ChevronDown, Tag, Activity, Globe, Compass, Cloud, CloudOff, Contrast
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { DatabaseProvider, ThemeProvider, useTheme, useDatabase } from './contexts';
import { SafeMarkdown } from './components/SafeMarkdown';
import { LSS_LOGO_DARK, LSS_LOGO_LIGHT, LSS_EASTER_EGG_SOUND } from './constants';

// Pages
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Network from './pages/Network';
import SubsidiaryDetail from './pages/SubsidiaryDetail';
import SeriesDetail from './pages/SeriesDetail';
import Partners from './pages/Partners';
import PartnerDetail from './pages/PartnerDetail';
import Contact from './pages/Contact';
import News from './pages/News';
import BlogPostPage from './pages/BlogPost';
import About from './pages/About';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// --- DATABASE CONTEXT REMOVED (Moved to contexts.tsx) ---

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const AnchorScroll = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 200);
            }
        }
    }, [pathname, hash]);

    return null;
};

const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) return <>{text}</>;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, i) => 
                regex.test(part) ? (
                    <span key={i} className="text-emerald-500 bg-emerald-500/10 px-0.5 rounded-sm">{part}</span>
                ) : (
                    part
                )
            )}
        </>
    );
};

const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const inputRef = useRef<HTMLInputElement>(null);

    const types = ['All', 'Project', 'Article', 'Studio', 'Partner', 'Site'];
    const statuses = ['All', 'In Development', 'Released', 'Paused', 'Canceled', 'REWORKING'];

    const genres = useMemo(() => {
        const allGames = [...data.games, ...data.subsidiaries.flatMap(s => s.games)];
        const uniqueGenres = new Set<string>();
        allGames.forEach(g => g.genres?.forEach(gen => uniqueGenres.add(gen)));
        return ['All', ...Array.from(uniqueGenres).sort()];
    }, [data]);

    const results = useMemo(() => {
        const q = query.toLowerCase().trim();
        let items: any[] = [];

        // Aggregate all searchable items
        data.games.forEach(g => items.push({ id: g.id, title: g.title, desc: g.description, type: 'Project', path: `/games/${g.id}`, image: g.image, status: g.status, genres: g.genres }));
        data.blogPosts.forEach(b => items.push({ id: b.id, title: b.title, desc: b.excerpt, type: 'Article', path: `/news/${b.id}`, image: b.image }));
        data.subsidiaries.forEach(s => {
            items.push({ id: s.id, title: s.name, desc: s.description, type: 'Studio', path: `/network/${s.id}`, image: s.image });
            s.games.forEach(g => items.push({ id: g.id, title: g.title, desc: g.description, type: 'Project', path: `/games/${g.id}`, image: g.image, status: g.status, genres: g.genres }));
            s.series?.forEach(ser => items.push({ id: ser.id, title: ser.title, desc: ser.description, type: 'Project', path: `/series/${ser.id}`, image: ser.image, status: ser.status }));
        });

        items.push({ id: 'lss_about', title: 'Left-Sided Studios', desc: 'About the parent studio.', type: 'Studio', path: '/about', image: 'https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true' });
        data.partners.forEach(p => items.push({ id: p.id, title: p.name, desc: p.description, type: 'Partner', path: `/partners/${p.id}`, image: p.image }));

        const siteItems = [
            { id: 'site_home', title: 'Home', desc: 'Studio landing portal.', type: 'Site', path: '/' },
            { id: 'site_about', title: 'About Us', desc: 'History and Philosophy.', type: 'Site', path: '/about' },
            { id: 'site_games', title: 'Projects Gallery', desc: 'Browse our creations.', type: 'Site', path: '/games' },
            { id: 'site_network', title: 'Studio Network', desc: 'Explore subsidiaries.', type: 'Site', path: '/network' },
            { id: 'site_news', title: 'News & Articles', desc: 'Latest updates.', type: 'Site', path: '/news' },
            { id: 'site_contact', title: 'Contact Support', desc: 'Get in touch.', type: 'Site', path: '/contact' },
            { id: 'site_legacy', title: 'Legacy Google Site', desc: 'Original LSS archives.', type: 'Site', path: 'EXTERNAL:https://sites.google.com/view/leftsidedstudios/' }
        ];
        siteItems.forEach(si => items.push({ ...si, image: '' }));

        const uniqueItems = Array.from(new Map(items.map(item => [item.id, item])).values());

        // Parse query for prefixes
        let searchTerms = q;
        let forcedType: string | null = null;

        const prefixMap: Record<string, string> = {
            'game': 'Project',
            'project': 'Project',
            'news': 'Article',
            'article': 'Article',
            'blog': 'Article',
            'studio': 'Studio',
            'subsidiary': 'Studio',
            'partner': 'Partner',
            'site': 'Site',
            'page': 'Site'
        };

        const firstWord = q.split(' ')[0];
        if (prefixMap[firstWord]) {
            forcedType = prefixMap[firstWord];
            searchTerms = q.substring(firstWord.length).trim();
        }

        if (!q) return [];

        return uniqueItems
            .map(item => {
                const titleMatch = item.title.toLowerCase().includes(searchTerms);
                const descMatch = item.desc.toLowerCase().includes(searchTerms);
                const typeMatch = forcedType ? item.type === forcedType : true;
                
                let score = 0;
                if (titleMatch) score += 10;
                if (descMatch) score += 5;
                if (forcedType && item.type === forcedType) {
                    if (titleMatch || descMatch) score += 50; // High priority for type + keyword match
                }
                if (selectedType !== 'All' && item.type === selectedType) score += 20;

                return { ...item, score, titleMatch, descMatch };
            })
            .filter(i => (i.titleMatch || i.descMatch) && (selectedType === 'All' || i.type === selectedType))
            .sort((a, b) => b.score - a.score);
    }, [query, data, selectedType, selectedStatus, selectedGenre]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={onClose} 
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className={`relative w-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${isDarkMode ? 'bg-neutral-900 border-white/10' : 'bg-white'}`}
                    >
                        <div className={`px-8 py-6 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                            <div className="flex items-center flex-grow">
                                <Search className="w-6 h-6 mr-4 text-emerald-500" />
                                <input ref={inputRef} autoFocus type="text" placeholder="Access studio logs..." value={query} onChange={(e) => setQuery(e.target.value)} className={`flex-grow bg-transparent outline-none text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                            </div>
                            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors"><X /></button>
                        </div>

                        <div className="flex flex-grow overflow-hidden">
                            <div className={`border-r overflow-y-auto flex-shrink-0 p-8 w-[280px] scrollbar-hide ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-gray-100 bg-gray-50/50'}`}>
                                <div className="space-y-10">
                                    <div>
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2"><Tag className="w-3 h-3" /> Content Type</h5>
                                        <div className="flex flex-col gap-2">
                                            {types.map(t => (
                                                <button key={t} onClick={() => setSelectedType(t)} className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedType === t ? 'bg-emerald-500 border-emerald-500 text-white' : isDarkMode ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'}`}>{t}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2"><Activity className="w-3 h-3" /> Status</h5>
                                        <div className="flex flex-col gap-2">
                                            {statuses.map(s => (
                                                <button key={s} onClick={() => setSelectedStatus(s)} className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedStatus === s ? 'bg-blue-500 border-blue-500 text-white' : isDarkMode ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'}`}>{s}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2"><Zap className="w-3 h-3" /> Genres</h5>
                                        <div className="flex flex-col gap-2 pb-8">
                                            {genres.map(g => (
                                                <button key={g} onClick={() => setSelectedGenre(g)} className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${selectedGenre === g ? 'bg-purple-500 border-purple-500 text-white' : isDarkMode ? 'bg-white/5 border-white/5 text-gray-500 hover:text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'}`}>{g}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-grow overflow-y-auto p-8">
                                {results.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {results.map(item => (
                                            <button key={item.id} onClick={() => { if (item.path.startsWith('EXTERNAL:')) { window.open(item.path.replace('EXTERNAL:', ''), '_blank'); } else { navigate(item.path); } onClose(); }} className={`w-full text-left flex items-center gap-6 p-5 rounded-3xl transition-all border group ${isDarkMode ? 'hover:bg-white/5 border-white/5 hover:border-emerald-500/20' : 'hover:bg-gray-50 border-transparent hover:border-emerald-500/20'}`}>
                                                <div className={`w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform flex items-center justify-center ${isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                                                    {item.image ? <img src={item.image} className="w-full h-full object-cover" alt={item.title} /> : <Compass className={`w-6 h-6 ${item.type === 'Site' ? 'text-amber-500' : 'text-gray-500'}`} />}
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${item.type === 'Project' ? 'text-emerald-500 border-emerald-500/20' : item.type === 'Article' ? 'text-amber-500 border-amber-500/20' : item.type === 'Studio' ? 'text-purple-500 border-purple-500/20' : item.type === 'Site' ? 'text-amber-500 border-amber-500/20' : 'text-blue-500 border-blue-500/20'} uppercase tracking-widest`}>{item.type}</span>
                                                        {item.status && <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest opacity-60">• {item.status}</span>}
                                                    </div>
                                                    <h4 className={`font-bold text-lg truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-emerald-500 transition-colors`}>
                                                        <HighlightText text={item.title} highlight={query.split(' ').length > 1 && results[0].score > 50 ? query.split(' ').slice(1).join(' ') : query} />
                                                    </h4>
                                                    <p className="text-xs text-gray-500 truncate font-medium">
                                                        <HighlightText text={item.desc} highlight={query.split(' ').length > 1 && results[0].score > 50 ? query.split(' ').slice(1).join(' ') : query} />
                                                    </p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-emerald-500 transition-colors group-hover:translate-x-1" />
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
                                        <RotateCcw className="w-12 h-12 mb-6 text-emerald-500" />
                                        <p className="font-mono text-sm uppercase tracking-widest">Terminal Clear: No logs match parameters.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Navbar: React.FC = () => {
    const { isDarkMode, isHighContrast, toggleTheme, toggleHighContrast } = useTheme();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const handleHomeClick = (e: React.MouseEvent) => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        
        if (newCount === 10) {
            const audio = new Audio(LSS_EASTER_EGG_SOUND);
            audio.play().catch(err => console.error("Error playing easter egg sound:", err));
            setClickCount(0); // Reset after playing
        }
    };

    const navLinks = [
        { name: 'HOME', path: '/', color: 'emerald' },
        { name: 'ABOUT', path: '/about', color: 'emerald' },
        { name: 'PROJECTS', path: '/games', color: 'emerald' },
        { name: 'NETWORK', path: '/network', color: 'purple' },
        { name: 'NEWS', path: '/news', color: 'amber' },
        { name: 'CONTACT', path: '/contact', color: 'blue' }
    ];

    const isActive = (path: string) => path === '/' ? location.pathname === '/' : (location.pathname.startsWith(path) || (path === '/games' && location.pathname.startsWith('/series')));
    
    const getActiveColorClass = (color: string, path: string) => {
        if (path === '/games' && location.pathname.startsWith('/series')) return 'text-red-500';
        return color === 'amber' ? 'text-amber-500' : (color === 'purple' ? 'text-purple-500' : (color === 'blue' ? 'text-blue-500' : 'text-emerald-500'));
    };

    const getActiveBgClass = (color: string, path: string) => {
        if (path === '/games' && location.pathname.startsWith('/series')) return 'bg-red-500';
        return color === 'amber' ? 'bg-amber-500' : (color === 'purple' ? 'bg-purple-500' : (color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'));
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 border-b ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/90 border-gray-200'} backdrop-blur-md`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link 
                        to="/" 
                        onClick={handleHomeClick}
                        className={`relative flex items-center gap-3 text-xl font-bold tracking-tighter transition-colors uppercase py-1 ${isActive('/') ? 'text-emerald-500' : 'text-gray-400 hover:text-white'}`}
                    >
                        <img 
                            src={isDarkMode ? LSS_LOGO_LIGHT : LSS_LOGO_DARK} 
                            alt="LSS Logo" 
                            className="w-8 h-8 object-contain"
                            referrerPolicy="no-referrer"
                        />
                        <span className="hidden sm:inline">
                            LEFT-SIDED <span className="text-gray-500">STUDIOS</span>
                        </span>
                        {isActive('/') && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-emerald-500 hidden md:block" />}
                    </Link>
                    <div className="hidden md:flex space-x-5 text-[11px] font-black items-center tracking-[0.2em]">
                        {navLinks.slice(1).map((link) => (
                            <Link key={link.name} to={link.path} className={`relative py-1 transition-colors ${isActive(link.path) ? getActiveColorClass(link.color, link.path) : 'text-gray-400 hover:text-white'}`}>
                                {link.name}
                                {isActive(link.path) && <motion.div layoutId="nav-underline" className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${getActiveBgClass(link.color, link.path)}`} />}
                            </Link>
                        ))}
                        <div className="h-4 w-px bg-white/10"></div>
                        <div className="flex items-center gap-5">
                            <button onClick={() => setIsSearchOpen(true)} className="text-emerald-500 hover:text-emerald-400 transition-colors" title="Search"><Search className="w-5 h-5" /></button>
                            <button onClick={toggleHighContrast} className={`${isHighContrast ? 'text-emerald-500' : 'text-gray-400'} hover:text-white transition-colors`} title="Toggle High Contrast"><Contrast className="w-5 h-5" /></button>
                            <button onClick={toggleTheme} className="text-gray-400 hover:text-white transition-colors" title="Toggle Dark/Light Mode">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={() => setIsSearchOpen(true)} className="text-emerald-500"><Search className="w-5 h-5" /></button>
                        <button onClick={() => setIsMenuOpen(true)} className={`p-2 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 text-emerald-500' : 'bg-gray-100 text-emerald-600'}`}><Menu className="w-6 h-6" /></button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] z-[101] flex flex-col shadow-2xl md:hidden ${isDarkMode ? 'bg-neutral-950 border-l border-white/10' : 'bg-white border-l border-gray-200'}`}>
                            <div className="p-8 flex items-center justify-between border-b border-white/5">
                                <div className="text-xs font-black uppercase tracking-widest text-emerald-500">Navigation Hub</div>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-white/5 text-gray-500 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                            </div>
                            <div className="flex-grow p-8 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <button 
                                        key={link.name} 
                                        onClick={() => { navigate(link.path); setIsMenuOpen(false); }} 
                                        className={`relative group flex items-center justify-between text-left py-3 px-6 rounded-2xl transition-all outline-none ${isActive(link.path) ? (isDarkMode ? 'bg-white/5' : 'bg-gray-50') : 'hover:bg-white/5'}`}
                                    >
                                        <span className={`text-sm font-black tracking-[0.3em] transition-colors ${isActive(link.path) ? getActiveColorClass(link.color, link.path) : 'text-gray-500 group-hover:text-white'}`}>{link.name}</span>
                                        {isActive(link.path) && (
                                            <motion.div 
                                                layoutId="nav-underline-mobile" 
                                                className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full ${getActiveBgClass(link.color, link.path)}`} 
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="p-8 border-t border-white/5 flex flex-col gap-4">
                                <button onClick={toggleHighContrast} className={`flex items-center justify-between w-full p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${isHighContrast ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600') : (isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500')}`}>
                                    <span className="flex items-center gap-3"><Contrast className="w-4 h-4" />High Contrast</span>
                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isHighContrast ? 'bg-emerald-500' : 'bg-gray-600'}`}>
                                        <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${isHighContrast ? 'left-5' : 'left-1'}`} />
                                    </div>
                                </button>
                                <button onClick={() => { toggleTheme(); setIsMenuOpen(false); }} className={`flex items-center justify-between w-full p-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-black'}`}>
                                    <span className="flex items-center gap-3">{isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                                <div className="text-[10px] font-black text-gray-700 uppercase tracking-widest text-center mt-4">LSS Hub v2.6</div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

const Footer: React.FC = () => {
    const { isDarkMode } = useTheme();
    return (
        <footer className={`border-t py-20 mt-auto ${isDarkMode ? 'bg-neutral-950 border-white/5 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                <div className="md:col-span-4">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-emerald-500">Left-Sided Studios</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm font-medium">
                        Independent game development studio sharing original games and projects on GameJolt and other platforms. Founded 2023. Leveraging creativity, intuition, and unconventional design.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://github.com/leftsideddev" target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 transition-all border border-white/5">
                            <img src="https://cdn.simpleicons.org/github/white" className="w-5 h-5" alt="GitHub" />
                        </a>
                        <a href="https://youtube.com/@LeftSidedStudios" target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 transition-all border border-white/5">
                            <img src="https://cdn.simpleicons.org/youtube/white" className="w-5 h-5" alt="YouTube" />
                        </a>
                        <a href="https://twitter.com/@LeftSidedDev" target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 transition-all border border-white/5">
                            <img src="https://cdn.simpleicons.org/x/white" className="w-5 h-5" alt="X" />
                        </a>
                        <a href="https://discord.gg/A8XMvSnkCU" target="_blank" className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-500 transition-all border border-white/5">
                            <img src="https://cdn.simpleicons.org/discord/white" className="w-5 h-5" alt="Discord" />
                        </a>
                    </div>
                </div>
                
                <div className="md:col-span-2 md:col-start-6">
                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-8">Projects</h4>
                    <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-500">
                        <li><Link to="/games#catalog" className="hover:text-emerald-500 transition-colors">Catalog</Link></li>
                        <li><Link to="/games/cardamania" className="hover:text-emerald-500 transition-colors">Cardamania</Link></li>
                        <li><Link to="/games/breakpoint" className="hover:text-emerald-500 transition-colors">BREAKPOINT</Link></li>
                        <li><Link to="/games/bumbl" className="hover:text-emerald-500 transition-colors">Bumbl</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-8">Ecosystem</h4>
                    <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-500">
                        <li><Link to="/network#official" className="hover:text-purple-500 transition-colors">Network Hub</Link></li>
                        <li><Link to="/network#partners" className="hover:text-purple-500 transition-colors">Partnerships</Link></li>
                        <li><Link to="/network/endgame" className="hover:text-purple-500 transition-colors">Endgame Studios</Link></li>
                        <li><Link to="/network/skullix" className="hover:text-purple-500 transition-colors">Skullix Media Group</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-8">Resources</h4>
                    <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-500">
                        <li><Link to="/news" className="hover:text-amber-500 transition-colors">News Hub</Link></li>
                        <li><Link to="/about#press" className="hover:text-amber-500 transition-colors">Press Assets</Link></li>
                        <li><a href="https://discord.gg/A8XMvSnkCU" className="hover:text-amber-500 transition-colors">Inquiries</a></li>
                        <li><a href="https://sites.google.com/view/leftsidedstudios/" target="_blank" className="hover:text-amber-500 transition-colors">Legacy Site</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                    &copy; 2023-2026 Left-Sided Studios
                </div>
                <div className="flex gap-8">
                    <Link to="/contact" className="text-gray-600 hover:text-emerald-500 transition-colors text-[10px] font-black uppercase tracking-widest">Support</Link>
                    <Link to="/privacy" className="text-gray-600 hover:text-emerald-500 transition-colors text-[10px] font-black uppercase tracking-widest">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:id" element={<GameDetail />} />
                <Route path="/series/:id" element={<SeriesDetail />} />
                <Route path="/network" element={<Network />} />
                <Route path="/network/:id" element={<SubsidiaryDetail />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/partners/:id" element={<PartnerDetail />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<BlogPostPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
};

const BackgroundBar: React.FC = () => {
    const { isDarkMode } = useTheme();
    const color = isDarkMode ? '0, 0, 0' : '255, 255, 255';
    
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <div 
                className="w-full h-full transition-all duration-700"
                style={{
                    background: `linear-gradient(to right, 
                        transparent 0%, 
                        rgba(${color}, 0) calc(50% - 850px), 
                        rgba(${color}, 0.3) calc(50% - 780px), 
                        rgba(${color}, 0.7) calc(50% - 720px), 
                        rgba(${color}, 0.98) calc(50% - 676px), 
                        rgba(${color}, 0.98) calc(50% + 676px), 
                        rgba(${color}, 0.7) calc(50% + 720px), 
                        rgba(${color}, 0.3) calc(50% + 780px), 
                        rgba(${color}, 0) calc(50% + 850px), 
                        transparent 100%
                    )`
                }}
            />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <DatabaseProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <AnchorScroll />
                    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
                        <BackgroundBar />
                        <Navbar />
                        <main className="flex-grow pt-24 pb-20 px-6 w-full max-w-[1400px] mx-auto">
                            <AnimatedRoutes />
                        </main>
                        <Footer />
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </DatabaseProvider>
    );
};

export default App;
