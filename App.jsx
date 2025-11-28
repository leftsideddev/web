import React, { useState, useEffect, createContext, useContext, useRef, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Menu, Sun, Moon, ArrowLeft, Gamepad2, Network, 
    Users, Mail, Monitor, MessageSquareText, Globe, Search, X, ChevronRight
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
const ThemeContext = createContext({ isDarkMode: true, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
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

const SearchModal = ({ isOpen, onClose }) => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

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
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Search Logic
    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        const items = [];

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
                                    className={`w-full text-left flex items-center gap-4 p-3 rounded-lg transition-colors group ${isDarkMode ?