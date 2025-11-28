import React, { useState, useEffect, createContext, useContext, useRef, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Menu, Sun, Moon, ArrowLeft,
    Users, Mail, Monitor, MessageSquare, Search, X, ChevronRight
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { db } from './constants';

// Pages
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Subsidiaries from './pages/Subsidiaries';
import SubsidiaryDetail from './pages/SubsidiaryDetail';
import Partners from './pages/Partners';
import PartnerDetail from './pages/PartnerDetail';
import Contact from './pages/Contact';

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

interface SearchResultItem {
    id: string;
    title: string;
    desc: string;
    type: 'Game' | 'Subsidiary' | 'Partner';
    path: string;
    image: string;
}

const SearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            setQuery('');
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Search Logic
    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        const items: SearchResultItem[] = [];

        // 1. Search Main Games
        db.games.forEach(g => {
            if (g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)) {
                items.push({ id: g.id, title: g.title, desc: g.description, type: 'Game', path: `/games/${g.id}`, image: g.image });
            }
        });

        // 2. Search Subsidiaries and their Games
        db.subsidiaries.forEach(s => {
            // The Studio itself
            if (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
                items.push({ id: s.id, title: s.name, desc: s.description, type: 'Subsidiary', path: `/subsidiaries/${s.id}`, image: s.image });
            }
            // Studio's Games
            s.games.forEach(g => {
                 if (g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q)) {
                    // Avoid duplicates if a game is listed in both places (unlikely but safe)
                    if (!items.find(i => i.id === g.id)) {
                        items.push({ id: g.id, title: g.title, desc: g.description, type: 'Game', path: `/games/${g.id}`, image: g.image });
                    }
                 }
            });
        });

        // 3. Search Partners
        db.partners.forEach(p => {
             if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
                items.push({ id: p.id, title: p.name, desc: p.description, type: 'Partner', path: `/partners/${p.id}`, image: p.image });
            }
        });

        return items;
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`relative w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] ${isDarkMode ? 'bg-neutral-900 border border-white/10' : 'bg-white'}`}
            >
                {/* Header / Input */}
                <div className={`flex items-center px-4 py-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <Search className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Search games, studios, partners..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`flex-grow bg-transparent outline-none text-lg ${isDarkMode ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}`}
                    />
                    <button onClick={onClose} className={`p-1 rounded-full hover:bg-gray-500/10 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Results List */}
                <div className="overflow-y-auto p-2 scrollbar-hide">
                    {results.length > 0 ? (
                        <div className="space-y-1">
                            {results.map((item) => (
                                <button
                                    key={item.id + item.type}
                                    onClick={() => { navigate(item.path); onClose(); }}
                                    className={`w-full text-left flex items-center gap-4 p-3 rounded-lg transition-colors group ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
                                >
                                    <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-800">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x48/333/FFF?text=${item.title[0]}`; }}
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className={`font-bold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.title}</span>
                                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                                                item.type === 'Game' ? 'border-blue-500/30 text-blue-500' :
                                                item.type === 'Subsidiary' ? 'border-purple-500/30 text-purple-500' :
                                                'border-green-500/30 text-green-500'
                                            }`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{item.desc}</p>
                                    </div>
                                    <div className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-gray-500 text-sm">
                            {query ? 'No results found.' : 'Type to search...'}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

// --- NAVBAR ---

const Navbar: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    // Helper to determine Google Site link based on current route
    const getGoogleSiteUrl = () => {
        const path = location.pathname;
        if (path.includes('game')) return db.siteMap.games;
        if (path.includes('subsidiaries')) return db.siteMap.subsidiaries;
        if (path.includes('partner')) return db.siteMap.partners;
        if (path.includes('contact')) return db.siteMap.contact;
        return db.siteMap.home;
    };

    const navLinks = [
        { path: '/games', label: 'GAMES' },
        { path: '/subsidiaries', label: 'SUBSIDIARIES' },
        { path: '/partners', label: 'PARTNERS' },
        { path: '/contact', label: 'CONTACT' },
    ];

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 border-b ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white/90 border-gray-200'} backdrop-blur-md`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold tracking-tighter hover:text-blue-500 transition-colors">
                            LEFT-SIDED <span className="text-gray-500">STUDIOS</span>
                        </Link>
                        <a 
                            href={getGoogleSiteUrl()} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`hidden md:flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full transition-colors ${isDarkMode ? 'text-gray-400 bg-white/5 hover:bg-white/10' : 'text-gray-600 bg-black/5 hover:bg-black/10'}`}
                        >
                            <ArrowLeft className="w-3 h-3" /> Back to Google Site
                        </a>
                    </div>

                    <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
                        {navLinks.map(link => (
                            <Link 
                                key={link.path} 
                                to={link.path} 
                                className={`transition-colors hover:text-blue-500 ${location.pathname.startsWith(link.path) ? (isDarkMode ? 'text-white' : 'text-black') : 'text-gray-500'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        <div className={`h-4 w-px ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}></div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setIsSearchOpen(true)} 
                                className={`hover:text-blue-500 transition-colors p-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={toggleTheme} 
                                className={`hover:text-blue-500 transition-colors p-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                                aria-label="Toggle Theme"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={`md:hidden border-b overflow-hidden ${isDarkMode ? 'bg-neutral-900 border-white/10' : 'bg-white border-gray-200'}`}
                        >
                            <div className="flex flex-col p-4 space-y-4">
                                {navLinks.map(link => (
                                    <Link 
                                        key={link.path} 
                                        to={link.path} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-gray-400 hover:text-blue-500 font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <button 
                                    onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }} 
                                    className="flex items-center gap-2 text-gray-400 hover:text-blue-500"
                                >
                                    <Search className="w-4 h-4" /> Search
                                </button>
                                <button onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-gray-400 hover:text-blue-500">
                                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Theme
                                </button>
                                <a href={getGoogleSiteUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-semibold text-gray-400 pt-4 border-t border-gray-800">
                                    <ArrowLeft className="w-3 h-3" /> Back to Google Site
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Render Search Modal */}
            <AnimatePresence>
                {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

const Footer: React.FC = () => {
    const { isDarkMode } = useTheme();
    
    return (
        <footer className={`border-t py-12 mt-auto ${isDarkMode ? 'bg-neutral-950 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-lg font-bold mb-4">Left-Sided Studios</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Independent game development studio sharing original games and projects on GameJolt and other platforms.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-4">Connect</h3>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li>
                            <a href="https://gamejolt.com/@LeftSidedStudios" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                <Monitor className="w-4 h-4" /> GameJolt (Main)
                            </a>
                        </li>
                        <li>
                            <a href="https://discord.gg/A8XMvSnkCU" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Discord Server
                            </a>
                        </li>
                        <li>
                            <a href="mailto:leftsidedstudios@gmail.com" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email Us
                            </a>
                        </li>
                        <li className={`pt-4 font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <Users className="w-4 h-4" /> Team & Individual Links
                        </li>
                        {db.people.map((person, idx) => (
                            <li key={idx}>
                                <a href={person.links[0].url} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                    <span className="opacity-70">{person.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="text-center text-gray-500 text-xs mt-12">
                &copy; 2025 Left-Sided Studios. All rights reserved.
            </div>
        </footer>
    );
};

// --- APP ---

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:id" element={<GameDetail />} />
                <Route path="/subsidiaries" element={<Subsidiaries />} />
                <Route path="/subsidiaries/:id" element={<SubsidiaryDetail />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/partners/:id" element={<PartnerDetail />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white">
                    <Navbar />
                    <main className="flex-grow pt-24 pb-20 px-6 max-w-7xl mx-auto w-full">
                        <AnimatedRoutes />
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;