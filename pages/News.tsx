import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Newspaper, Calendar, Search, X, Tag } from 'lucide-react';
import { useTheme, useDatabase } from '../App';
import Card from '../components/Card';

const News: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        data.blogPosts.forEach(post => post.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [data.blogPosts]);

    const filteredPosts = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return data.blogPosts.filter(post => {
            const matchesQuery = !q || 
                post.title.toLowerCase().includes(q) || 
                post.excerpt.toLowerCase().includes(q);
            const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
            return matchesQuery && matchesTag;
        });
    }, [searchQuery, selectedTag, data.blogPosts]);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto">
            <motion.div variants={item} className="text-center mb-12">
                <div className={`inline-flex p-3 rounded-2xl mb-4 ${isDarkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-50 text-amber-600'}`}>
                    <Newspaper className="w-8 h-8" />
                </div>
                <h1 className={`text-5xl font-extrabold mb-4 tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>NEWS & ARTICLES</h1>
                <p className="text-xl text-gray-500 font-light">The central hub for all Left-Sided Studios announcements.</p>
            </motion.div>

            <motion.div variants={item} className="space-y-6 mb-12">
                <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${isDarkMode ? 'text-gray-500 group-focus-within:text-amber-500' : 'text-gray-400 group-focus-within:text-amber-600'}`}>
                        <Search className="w-5 h-5 transition-colors" />
                    </div>
                    <input 
                        type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder="Search articles..." 
                        className={`w-full pl-12 pr-12 py-4 rounded-2xl border outline-none transition-all text-lg ${isDarkMode ? 'bg-neutral-900 border-white/10 text-white focus:border-amber-500' : 'bg-white border-gray-200 text-gray-900 focus:border-amber-600'}`} 
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-amber-500 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Tag Filter */}
                <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                    <button 
                        onClick={() => setSelectedTag(null)}
                        className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${!selectedTag ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' : isDarkMode ? 'bg-white/5 border-white/5 text-gray-500 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                    >
                        All Articles
                    </button>
                    {allTags.map(tag => (
                        <button 
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${selectedTag === tag ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/20' : isDarkMode ? 'bg-white/5 border-white/5 text-gray-500 hover:text-white' : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                        <motion.div 
                            key={post.id} 
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card
                                onClick={() => navigate(`/news/${post.id}`)}
                                image={post.image || ''}
                                title={post.title}
                                description={post.excerpt}
                                accentColor="amber"
                                imageClassName="aspect-[2/1]"
                                footer={
                                    <div className="flex flex-col gap-4 w-full">
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags?.map(t => (
                                                <span key={t} className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                                    <Tag className="w-2 h-2" /> {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                                                <Calendar className="w-3 h-3" /> {post.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-white bg-amber-600 px-6 py-2 rounded-full shadow-lg shadow-amber-500/20 group-hover:bg-amber-700 transition-colors uppercase tracking-[0.2em]">
                                                Read Article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                }
                            />
                        </motion.div>
                    )) : (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 0.4 }} 
                            className="col-span-full text-center py-32 text-gray-500 font-bold uppercase tracking-widest"
                        >
                            No articles matched your parameters.
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default News;