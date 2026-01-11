import React, { useState, useEffect, createContext, useContext, useRef, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Menu, Sun, Moon, ArrowLeft,
    Users, Mail, Monitor, MessageSquare, Search, X, ChevronRight, Info, Layout, Newspaper, Zap, Filter, Check, RotateCcw, ChevronDown, ShieldCheck, Lock, LogOut, Tag, Activity, Globe, Compass
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { db as initialDb } from './constants';
import { DB, Game, BlogPost } from './types';

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
import Blog from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import About from './pages/About';
import Admin from './pages/Admin';

// --- DATABASE CONTEXT ---
interface DatabaseContextType {
    data: DB;
    updateGames: (games: Game[]) => void;
    updateBlog: (posts: BlogPost[]) => void;
    adminUser: any | null;
    login: (user: any) => void;
    logout: () => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) throw new Error("useDatabase must be used within a DatabaseProvider");
    return context;
};

const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<DB>(() => {
        const saved = localStorage.getItem('lss_database');
        return saved ? JSON.parse(saved) : initialDb;
    });

    const [adminUser, setAdminUser] = useState<any | null>(() => {
        const saved = localStorage.getItem('lss_admin_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        localStorage.setItem('lss_database', JSON.stringify(data));
    }, [data]);

    const updateGames = (games: Game[]) => setData(prev => ({ ...prev, games }));
    const updateBlog = (posts: BlogPost[]) => setData(prev => ({ ...prev, blogPosts: posts }));

    const login = (user: any) => {
        setAdminUser(user);
        localStorage.setItem('lss_admin_user', JSON.stringify(user));
    };

    const logout = () => {
        setAdminUser(null);
        localStorage.removeItem('lss_admin_user');
    };

    return (
        <DatabaseContext.Provider value={{ data, updateGames, updateBlog, adminUser, login, logout }}>
            {children}
        </DatabaseContext.Provider>
    );
};

// --- THEME CONTEXT ---
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: true, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'light') setIsDarkMode(false);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('light-mode', !isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// --- SEARCH MODAL COMPONENT ---
const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const inputRef = useRef<HTMLInputElement>(null);

    const types = ['All', 'Project', 'Blog', 'Studio', 'Partner', 'Site'];
    const statuses = ['All', 'In Development', 'Released', 'Paused', 'Canceled'];

    const genres = useMemo(() => {
        const allGames = [
            ...data.games,
            ...data.subsidiaries.flatMap(s => s.games)
        ];
        const uniqueGenres = new Set<string>();
        allGames.forEach(g => g.genres?.forEach(gen => uniqueGenres.add(gen)));
        return ['All', ...Array.from(uniqueGenres).sort()];
    }, [data]);

    const results = useMemo(() => {
        const q = query.toLowerCase();
        let items: any[] = [];

        // Aggregate All Content
        data.games.forEach(g => items.push({ 
            id: g.id, title: g.title, desc: g.description, type: 'Project', 
            path: `/games/${g.id}`, image: g.image, status: g.status, genres: g.genres 
        }));
        
        data.blogPosts.forEach(b => items.push({ 
            id: b.id, title: b.title, desc: b.excerpt, type: 'Blog', 
            path: `/blog/${b.id}`, image: b.image 
        }));

        data.subsidiaries.forEach(s => {
            items.push({ 
                id: s.id, title: s.name, desc: s.description, type: 'Studio', 
                path: `/network/${s.id}`, image: s.image 
            });
            // Games from subsidiaries
            s.games.forEach(g => items.push({ 
                id: g.id, title: g.title, desc: g.description, type: 'Project', 
                path: `/games/${g.id}`, image: g.image, status: g.status, genres: g.genres 
            }));
            // Series from subsidiaries
            s.series?.forEach(ser => items.push({
                id: ser.id, title: ser.title, desc: ser.description, type: 'Project',
                path: `/series/${ser.id}`, image: ser.image, status: ser.status
            }));
        });

        // Left-Sided Studios explicit entry
        items.push({
            id: 'lss_about', title: 'Left-Sided Studios', desc: 'About the parent studio.', type: 'Studio',
            path: '/about', image: 'https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true'
        });

        data.partners.forEach(p => items.push({ 
            id: p.id, title: p.name, desc: p.description, type: 'Partner', 
            path: `/partners/${p.id}`, image: p.image 
        }));

        // Site Navigation Items
        const siteItems = [
            { id: 'site_home', title: 'Home', desc: 'Studio landing portal.', type: 'Site', path: '/' },
            { id: 'site_about', title: 'About Us', desc: 'History and Philosophy.', type: 'Site', path: '/about' },
            { id: 'site_games', title: 'Projects Gallery', desc: 'Browse our creations.', type: 'Site', path: '/games' },
            { id: 'site_network', title: 'Studio Network', desc: 'Explore subsidiaries.', type: 'Site', path: '/network' },
            { id: 'site_blog', title: 'Blog & News', desc: 'Latest updates.', type: 'Site', path: '/blog' },
            { id: 'site_contact', title: 'Contact Support', desc: 'Get in touch.', type: 'Site', path: '/contact' },
            { id: 'site_legacy', title: 'Legacy Google Site', desc: 'Original LSS archives.', type: 'Site', path: 'EXTERNAL:https://sites.google.com/view/leftsidedstudios/' }
        ];
        siteItems.forEach(si => items.push({ ...si, image: '' }));

        // Deduplicate
        const uniqueItems = Array.from(new Map(items.map(item => [item.id, item])).values());

        return uniqueItems.filter(i => {
            const matchesQuery = !q || i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q);
            const matchesType = selectedType === 'All' || i.type === selectedType;
            
            let matchesStatus = true;
            let matchesGenre = true;

            if (i.type === 'Project' && i.status) {
                matchesStatus = selectedStatus === 'All' || i.status === selectedStatus;
                matchesGenre = selectedGenre === 'All' || (i.genres?.includes(selectedGenre) ?? true);
            }

            return matchesQuery && matchesType && matchesStatus && matchesGenre;
        });
    }, [query, data, selectedType, selectedStatus, selectedGenre]);

    if (!isOpen) return null;

    const FilterPill: React.FC<{ label: string; active: boolean; onClick: () => void; color?: string }> = ({ label, active, onClick, color = 'emerald' }) => {
        const activeClasses = {
            emerald: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20',
            purple: 'bg-purple-500 text-white shadow-lg shadow-purple-500/20',
            blue: 'bg-blue-500 text-white shadow-lg shadow-blue-500/20',
            amber: 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
        }[color as 'emerald' | 'purple' | 'blue' | 'amber'];

        return (
            <button 
                onClick={onClick}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                    active 
                        ? activeClasses 
                        : isDarkMode ? 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                }`}
            >
                {label}
            </button>
        );
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className={`relative w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ${isDarkMode ? 'bg-neutral-900 border border-white/10' : 'bg-white'}`}>
                
                {/* Search Bar */}
                <div className={`px-8 py-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <div className="flex items-center">
                        <Search className="w-6 h-6 mr-4 text-emerald-500" />
                        <input ref={inputRef} autoFocus type="text" placeholder="Access studio logs..." value={query} onChange={(e) => setQuery(e.target.value)} className={`flex-grow bg-transparent outline-none text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                        <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors"><X /></button>
                    </div>
                </div>

                {/* Advanced Filters */}
                <div className={`px-8 py-4 border-b flex flex-col gap-4 overflow-x-auto no-scrollbar ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-gray-50 bg-gray-50/30'}`}>
                    
                    {/* Content Type Filter */}
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1 min-w-[60px]">
                            <Layout className="w-3 h-3" /> Type
                        </span>
                        <div className="flex gap-2">
                            {types.map(t => (
                                <FilterPill 
                                    key={t} 
                                    label={t} 
                                    active={selectedType === t} 
                                    onClick={() => {
                                        setSelectedType(t);
                                        if (t !== 'Project') {
                                            setSelectedStatus('All');
                                            setSelectedGenre('All');
                                        }
                                    }} 
                                    color={t === 'Studio' ? 'purple' : t === 'Partner' ? 'blue' : t === 'Blog' ? 'amber' : t === 'Site' ? 'amber' : 'emerald'}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Project-Specific Filters: Status and Genre */}
                    {selectedType === 'Project' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1 min-w-[60px]">
                                    <Activity className="w-3 h-3" /> Status
                                </span>
                                <div className="flex gap-2">
                                    {statuses.map(s => (
                                        <FilterPill 
                                            key={s} 
                                            label={s} 
                                            active={selectedStatus === s} 
                                            onClick={() => setSelectedStatus(s)} 
                                            color="amber"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-1 min-w-[60px]">
                                    <Tag className="w-3 h-3" /> Genre
                                </span>
                                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                    {genres.map(g => (
                                        <FilterPill 
                                            key={g} 
                                            label={g} 
                                            active={selectedGenre === g} 
                                            onClick={() => setSelectedGenre(g)} 
                                            color="emerald"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Results Area */}
                <div className="flex-grow overflow-y-auto p-8">
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {results.map(item => (
                                <button 
                                    key={item.id} 
                                    onClick={() => { 
                                        if (item.path.startsWith('EXTERNAL:')) {
                                            window.open(item.path.replace('EXTERNAL:', ''), '_blank');
                                        } else {
                                            navigate(item.path); 
                                        }
                                        onClose(); 
                                    }} 
                                    className={`w-full text-left flex items-center gap-6 p-5 rounded-3xl transition-all border group ${
                                        isDarkMode ? 'hover:bg-white/5 border-white/5 hover:border-emerald-500/20' : 'hover:bg-gray-50 border-transparent hover:border-emerald-500/20'
                                    }`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform flex items-center justify-center ${isDarkMode ? 'bg-neutral-800' : 'bg-gray-100'}`}>
                                        {item.image ? (
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                                        ) : (
                                            <Compass className={`w-6 h-6 ${item.type === 'Site' ? 'text-amber-500' : 'text-gray-500'}`} />
                                        )}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${
                                                item.type === 'Project' ? 'text-emerald-500 border-emerald-500/20' :
                                                item.type === 'Blog' ? 'text-amber-500 border-amber-500/20' :
                                                item.type === 'Studio' ? 'text-purple-500 border-purple-500/20' : 
                                                item.type === 'Site' ? 'text-amber-500 border-amber-500/20' : 'text-blue-500 border-blue-500/20'
                                            } uppercase tracking-widest`}>
                                                {item.type}
                                            </span>
                                            {item.status && (
                                                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest opacity-60">
                                                    • {item.status}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className={`font-bold text-lg truncate ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-emerald-500 transition-colors`}>{item.title}</h4>
                                        <p className="text-xs text-gray-500 truncate font-medium">{item.desc}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-emerald-500 transition-colors group-hover:translate-x-1" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
                            <RotateCcw className="w-12 h-12 mb-6 text-emerald-500" />
                            <p className="font-mono text-sm uppercase tracking-widest">No matching logs found in terminal.</p>
                            <p className="text-[10px] mt-2 font-bold text-gray-500 uppercase">Refine search parameters or clear filters.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const Navbar: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { adminUser } = useDatabase();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'ABOUT', path: '/about' },
        { name: 'GAMES', path: '/games' },
        { name: 'NETWORK', path: '/network' },
        { name: 'BLOG', path: '/blog' },
        { name: 'CONTACT', path: '/contact' }
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const getActiveColor = (name: string) => {
        if (name === 'BLOG') return 'text-amber-500';
        if (name === 'NETWORK') return 'text-purple-500';
        if (name === 'CONTACT') return 'text-blue-500';
        return 'text-emerald-500';
    };

    const getActiveBg = (name: string) => {
        if (name === 'BLOG') return 'bg-amber-500';
        if (name === 'NETWORK') return 'bg-purple-500';
        if (name === 'CONTACT') return 'bg-blue-500';
        return 'bg-emerald-500';
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 border-b ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/90 border-gray-200'} backdrop-blur-md`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold tracking-tighter hover:text-emerald-500 transition-colors uppercase">
                        LEFT-SIDED <span className="text-gray-500">STUDIOS</span>
                    </Link>

                    <div className="hidden md:flex space-x-5 text-[11px] font-black items-center tracking-[0.25em]">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path} 
                                className={`relative py-1 transition-colors ${isActive(link.path) ? getActiveColor(link.name) : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.div 
                                        layoutId="nav-underline"
                                        className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${getActiveBg(link.name)}`}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                        
                        <div className="h-4 w-px bg-white/10"></div>

                        <div className="flex items-center gap-6">
                            <button onClick={() => setIsSearchOpen(true)} className="text-emerald-500 hover:text-emerald-400 transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                            <button onClick={toggleTheme} className="text-gray-400 hover:text-white transition-colors">
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            {adminUser && (
                                <Link 
                                    to="/admin" 
                                    className={`relative p-2 rounded-xl transition-all ${isActive('/admin') ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/40' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'}`}
                                >
                                    <ShieldCheck className="w-5 h-5" />
                                    {isActive('/admin') && (
                                        <motion.div 
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <AnimatePresence>{isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}</AnimatePresence>
        </>
    );
};

const Footer: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { adminUser, login, logout } = useDatabase();
    const navigate = useNavigate();

    const handleBackendAuth = () => {
        if (adminUser) {
            navigate('/admin');
        } else {
            login({ email: 'developer@leftsided.com', name: 'Studio Tester' });
            navigate('/admin');
        }
    };

    return (
        <footer className={`border-t py-16 mt-auto ${isDarkMode ? 'bg-neutral-950 border-white/5 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="md:col-span-2">
                    <h3 className="text-xl font-black mb-4 uppercase tracking-tighter text-emerald-500">Left-Sided Studios</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">Independent game development studio sharing original games and projects on GameJolt and other platforms. Founded 2023.</p>
                    
                    <button 
                        onClick={handleBackendAuth}
                        className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            adminUser 
                            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
                            : 'bg-white/5 border border-white/10 text-gray-500 hover:border-emerald-500/50 hover:text-emerald-500'
                        }`}
                    >
                        {adminUser ? <ShieldCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        {adminUser ? 'Access Backend Dashboard' : 'Go to Backend'}
                    </button>
                    
                    {adminUser && (
                        <button onClick={logout} className="mt-4 flex items-center gap-2 text-[9px] font-black text-red-500 uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity px-1">
                            <LogOut className="w-3 h-3" /> Terminate Session
                        </button>
                    )}
                </div>
                
                <div>
                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6">Explore</h4>
                    <ul className="space-y-3 text-sm font-bold text-gray-500">
                        <li><Link to="/games" className="hover:text-emerald-500 transition-colors">Project Gallery</Link></li>
                        <li><Link to="/blog" className="hover:text-amber-500 transition-colors">Developer News</Link></li>
                        <li><Link to="/about" className="hover:text-emerald-500 transition-colors">Studio History</Link></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6">Platforms</h4>
                    <ul className="space-y-3 text-sm font-bold text-gray-500">
                        <li><a href="https://gamejolt.com/@LeftSidedStudios" target="_blank" className="hover:text-emerald-500 transition-colors">GameJolt</a></li>
                        <li><a href="https://youtube.com/@LeftSidedStudios" target="_blank" className="hover:text-emerald-500 transition-colors">YouTube</a></li>
                        <li><a href="https://discord.gg/A8XMvSnkCU" target="_blank" className="hover:text-emerald-500 transition-colors">Discord Hub</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex justify-between items-center text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
                <div>&copy; 2025 Left-Sided Studios Hub</div>
                <div className="flex gap-6">
                    <a href="mailto:leftsidedstudios@gmail.com" className="hover:text-emerald-500 transition-colors">Support</a>
                    <Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact</Link>
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
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <DatabaseProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
                        <Navbar />
                        <main className="flex-grow pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">
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