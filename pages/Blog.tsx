import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Newspaper, Calendar, Search, X } from 'lucide-react';
import { useTheme, useDatabase } from '../App';
import Card from '../components/Card';

const Blog: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    const filteredPosts = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return data.blogPosts;
        return data.blogPosts.filter(post => 
            post.title.toLowerCase().includes(q) || 
            post.excerpt.toLowerCase().includes(q)
        );
    }, [searchQuery, data.blogPosts]);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-6xl mx-auto">
            <motion.div variants={item} className="text-center mb-12">
                <div className={`inline-flex p-3 rounded-2xl mb-4 ${isDarkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-50 text-amber-600'}`}>
                    <Newspaper className="w-8 h-8" />
                </div>
                <h1 className={`text-5xl font-extrabold mb-4 tracking-tighter ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>BLOG & NEWS</h1>
                <p className="text-xl text-gray-500 font-light">The central hub for all Left-Sided Studios announcements.</p>
            </motion.div>

            <motion.div variants={item} className="relative mb-12 group">
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
            </motion.div>

            <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                    <motion.div key={post.id} variants={item}>
                        <Card
                            onClick={() => navigate(`/blog/${post.id}`)}
                            image={post.image || ''}
                            title={post.title}
                            description={post.excerpt}
                            accentColor="amber"
                            footer={
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest">
                                        <Calendar className="w-3 h-3" /> {post.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-white bg-amber-600 px-4 py-2 rounded-full shadow-lg shadow-amber-500/20 group-hover:bg-amber-700 transition-colors uppercase tracking-[0.2em]">
                                        Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            }
                        />
                    </motion.div>
                )) : (
                    <div className="col-span-full text-center py-20 text-gray-500 font-bold uppercase tracking-widest opacity-40">
                        No articles matched your search.
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Blog;