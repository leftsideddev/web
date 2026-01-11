
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Share2, ArrowLeft } from 'lucide-react';
import { useTheme } from '../App';
import { db } from '../constants';

const BlogPost: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const post = db.blogPosts.find(b => b.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return <div className="text-center py-20">Post not found</div>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
        >
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors mb-12 font-medium">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <article>
                <header className="mb-12">
                    <div className="flex items-center gap-3 text-xs font-bold text-amber-500 uppercase tracking-widest mb-4">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                    </div>
                    <h1 className={`text-5xl font-extrabold mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-between py-6 border-y border-white/5">
                        <div className="flex items-center gap-3">
                            <img 
                                src="https://github.com/leftsideddev/web/blob/main/images/vermetra.jpg?raw=true" 
                                className="w-10 h-10 rounded-full border border-white/10" 
                                alt="Author"
                            />
                            <div>
                                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>LSS Editorial Team</p>
                                <p className="text-xs text-gray-500">Official Release</p>
                            </div>
                        </div>
                        <button className="text-gray-500 hover:text-amber-500 transition-colors p-2 rounded-full bg-white/5">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                {post.image && (
                    <div className="rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                        <img src={post.image} className="w-full h-auto" alt={post.title} />
                    </div>
                )}

                <div className={`prose prose-lg max-w-none ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {post.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-6 leading-relaxed text-lg">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {post.relatedGameIds && post.relatedGameIds.length > 0 && (
                    <div className={`mt-20 p-8 rounded-2xl border ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Mentioned Projects</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.relatedGameIds.map(gameId => {
                                const game = db.games.find(g => g.id === gameId) || 
                                             db.subsidiaries.flatMap(s => s.games).find(g => g.id === gameId);
                                if (!game) return null;
                                return (
                                    <Link 
                                        key={gameId} 
                                        to={`/games/${gameId}`}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${isDarkMode ? 'bg-black hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-500 border border-white/5' : 'bg-white hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 border border-gray-200 shadow-sm'}`}
                                    >
                                        {game.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </article>

            <footer className="mt-20 pt-12 border-t border-white/10 text-center">
                <p className="text-gray-500 mb-6 italic">Thanks for reading! Stay tuned for more updates from Left-Sided Studios.</p>
                <button 
                    onClick={() => navigate('/blog')}
                    className="inline-flex items-center gap-2 text-amber-500 font-bold hover:underline"
                >
                    Return to Blog Overview <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
            </footer>
        </motion.div>
    );
};

export default BlogPost;