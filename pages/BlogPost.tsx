import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    Calendar, Share2, ArrowLeft, Clock, X, Tag, BookOpen, Eye, 
    Copy, MoreHorizontal, Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme, useDatabase } from '../App';

const ShareModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    postTitle: string; 
    postUrl: string;
    postImage: string;
}> = ({ isOpen, onClose, postTitle, postUrl, postImage }) => {
    const { isDarkMode } = useTheme();
    const [copied, setCopied] = useState(false);

    const displayTitle = postTitle.length > 60 ? postTitle.substring(0, 57) + "..." : postTitle;
    const shareText = `Check out this article on Left-Sided Studios: ${displayTitle}`;
    
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(postUrl);

    const platforms = [
        { 
            name: 'X', 
            iconUrl: 'https://cdn.simpleicons.org/x/white',
            hoverIconUrl: 'https://cdn.simpleicons.org/x/black',
            color: 'hover:bg-white', 
            url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}` 
        },
        { 
            name: 'Threads', 
            iconUrl: 'https://cdn.simpleicons.org/threads/white',
            hoverIconUrl: 'https://cdn.simpleicons.org/threads/black',
            color: 'hover:bg-white', 
            url: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}` 
        },
        { 
            name: 'Reddit', 
            iconUrl: `https://cdn.simpleicons.org/reddit/white`,
            hoverIconUrl: 'https://cdn.simpleicons.org/reddit/white',
            color: 'hover:bg-[#FF4500]', 
            url: `https://www.reddit.com/submit?title=${encodedText}&url=${encodedUrl}` 
        },
        { 
            name: 'Snapchat', 
            iconUrl: isDarkMode ? 'https://cdn.simpleicons.org/snapchat/white' : 'https://cdn.simpleicons.org/snapchat/black',
            hoverIconUrl: 'https://cdn.simpleicons.org/snapchat/black',
            color: 'hover:bg-[#FFFC00]', 
            url: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}` 
        },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[500] flex items-center justify-center px-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={onClose} 
                        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className={`relative w-full max-w-sm rounded-[2.5rem] border p-8 shadow-2xl ${isDarkMode ? 'bg-neutral-900 border-white/10 text-white' : 'bg-white border-gray-200 text-black'}`}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black uppercase tracking-tighter">Share Article</h3>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                        </div>

                        <div className={`mb-8 p-4 rounded-2xl border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-neutral-800">
                                <img src={postImage} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-tight line-clamp-1 mb-1">{postTitle}</h4>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">leftsidedstudios.netlify.app</p>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8">
                            {platforms.map(p => (
                                <a 
                                    key={p.name} 
                                    href={p.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="flex flex-col items-center gap-2 group outline-none"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 transition-all group-hover:scale-110 flex items-center justify-center overflow-hidden ${p.color}`}>
                                        <img 
                                            src={p.iconUrl} 
                                            className="w-6 h-6 object-contain group-hover:hidden" 
                                            alt={p.name} 
                                        />
                                        <img 
                                            src={p.hoverIconUrl} 
                                            className="w-6 h-6 object-contain hidden group-hover:block" 
                                            alt={p.name} 
                                        />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">{p.name}</span>
                                </a>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block ml-1">Copy Article Link</label>
                            <div className="relative flex items-center gap-2">
                                <input 
                                    readOnly 
                                    value={postUrl} 
                                    className={`flex-grow p-4 rounded-2xl border text-[10px] font-mono truncate outline-none ${isDarkMode ? 'bg-black border-white/5 text-emerald-500' : 'bg-gray-50 border-gray-200 text-emerald-600'}`} 
                                />
                                <button 
                                    onClick={copyToClipboard}
                                    className={`p-4 rounded-2xl transition-all border shrink-0 ${copied ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/5 border-white/5 hover:border-emerald-500/50 text-gray-400'}`}
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const BlogPost: React.FC = () => {
    const { id } = useParams();
    const { isDarkMode } = useTheme();
    const { allData } = useDatabase();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isReaderMode, setIsReaderMode] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const post = useMemo(() => allData.blogPosts.find(b => b.id === id), [id, allData]);

    // Metadata & Social Embed Management
    useEffect(() => {
        if (!post) return;

        // Save original defaults
        const originalTitle = document.title;
        const defaultImage = "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png";
        
        // Update Title
        document.title = `${post.title} | Left-Sided Studios`;

        // Update Meta Tags Helper
        const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
            let tag = document.querySelector(`meta[${attr}="${name}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute(attr, name);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };

        // Apply Dynamic Metadata
        const metaTitle = post.title;
        const metaDesc = post.excerpt;
        const metaImg = post.image || defaultImage;

        updateMeta('og:title', metaTitle, 'property');
        updateMeta('og:description', metaDesc, 'property');
        updateMeta('og:image', metaImg, 'property');
        updateMeta('twitter:title', metaTitle, 'name');
        updateMeta('twitter:description', metaDesc, 'name');
        updateMeta('twitter:image', metaImg, 'name');
        updateMeta('twitter:card', 'summary_large_image', 'name');

        // Restore defaults on unmount
        return () => {
            document.title = originalTitle;
            updateMeta('og:title', 'Left Sided Studios', 'property');
            updateMeta('og:description', 'Left-Sided Studios Hub for everything by us!', 'property');
            updateMeta('og:image', defaultImage, 'property');
            updateMeta('twitter:title', 'Left Sided Studios', 'name');
            updateMeta('twitter:description', 'Left-Sided Studios Hub for everything by us!', 'name');
            updateMeta('twitter:image', defaultImage, 'name');
        };
    }, [post]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const readingTime = useMemo(() => {
        if (!post) return 0;
        const words = post.content.split(/\s+/).length;
        return Math.ceil(words / 200);
    }, [post]);

    if (!post) return <div className="text-center py-20 font-black uppercase tracking-widest opacity-40">Article Interrupted</div>;

    const postUrl = window.location.href;
    const isRiseRelated = post.relatedGameIds?.includes('game_rise');
    const imageStyle: React.CSSProperties = { imageRendering: isRiseRelated ? 'pixelated' : 'auto' };
    const hasGallery = post.gallery && post.gallery.length > 0;

    const renderMarkdown = (content: string) => {
        const processedContent = content.replace(/\[img:(.*?)\]/g, '![]($1)');

        return (
            <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ src, alt }) => (
                        <motion.img 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            src={src} 
                            alt={alt || ""}
                            onClick={() => setSelectedImage(src || null)}
                            className={`w-full h-auto rounded-3xl my-12 border border-white/5 shadow-2xl cursor-zoom-in ${isReaderMode ? 'max-w-3xl mx-auto' : ''}`}
                        />
                    ),
                    p: ({ children }) => <p className={`mb-6 leading-relaxed font-light ${isReaderMode ? 'text-xl text-neutral-300 font-serif leading-loose' : 'text-lg text-gray-300'}`}>{children}</p>,
                    h1: ({ children }) => <h1 className="text-4xl font-black mt-12 mb-6 uppercase tracking-tight text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-3xl font-black mt-10 mb-5 uppercase tracking-tight text-white">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-2xl font-black mt-8 mb-4 uppercase tracking-tight text-emerald-500">{children}</h3>,
                    ul: ({ children }) => <ul className={`list-disc list-inside mb-8 space-y-2 ${isReaderMode ? 'text-neutral-400' : 'text-gray-400'}`}>{children}</ul>,
                    ol: ({ children }) => <ol className={`list-decimal list-inside mb-8 space-y-2 ${isReaderMode ? 'text-neutral-400' : 'text-gray-400'}`}>{children}</ol>,
                    li: ({ children }) => <li className="text-lg font-light">{children}</li>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 italic text-gray-400 text-xl">{children}</blockquote>,
                }}
            >
                {processedContent}
            </ReactMarkdown>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0.8 }} 
            animate={{ opacity: 1 }} 
            key={id} 
            className={`max-w-4xl mx-auto transition-colors duration-500 ${isReaderMode ? 'bg-neutral-900 fixed inset-0 z-[200] overflow-y-auto px-6 pt-12' : ''}`}
        >
            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)} 
                postTitle={post.title} 
                postUrl={postUrl}
                postImage={post.image || 'https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png'}
            />

            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X className="w-10 h-10" /></button>
                        <motion.img 
                            layoutId={`img-${selectedImage}`}
                            src={selectedImage} 
                            className="max-w-full max-h-full rounded-xl shadow-2xl" 
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`flex items-center justify-between mb-12 ${isReaderMode ? 'max-w-3xl mx-auto' : ''}`}>
                <Link 
                    to={isReaderMode ? "#" : "/news"} 
                    onClick={(e) => isReaderMode && (e.preventDefault(), setIsReaderMode(false))}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors font-bold uppercase text-[10px] tracking-[0.2em]"
                >
                    <ArrowLeft className="w-4 h-4" /> {isReaderMode ? "Exit Focus" : "Back to News"}
                </Link>

                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsReaderMode(!isReaderMode)}
                        className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isReaderMode ? 'bg-amber-500 text-white' : 'bg-white/5 text-gray-500 hover:text-white border border-white/5'}`}
                    >
                        {isReaderMode ? <Eye className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                        {isReaderMode ? "Reader Mode Active" : "Focus Mode"}
                    </button>
                    <button 
                        onClick={() => setIsShareModalOpen(true)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-amber-500 text-white shadow-lg shadow-amber-500/20 active:scale-95`}
                    >
                        <Share2 className="w-3 h-3" />
                        <span className="hidden md:inline">Share Article</span>
                        <span className="md:hidden flex items-center gap-1">More <MoreHorizontal className="w-3 h-3" /></span>
                    </button>
                </div>
            </div>

            <article className={`${isReaderMode ? 'max-w-3xl mx-auto pb-32' : ''}`}>
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-amber-500 uppercase tracking-widest mb-6">
                        <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span className="flex items-center gap-2 text-gray-500"><Clock className="w-3 h-3" /> {readingTime} MIN READ</span>
                        <div className="flex gap-2">
                            {post.tags?.map(t => (
                                <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-500">#{t}</span>
                            ))}
                        </div>
                    </div>
                    <h1 className={`text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter uppercase ${isDarkMode || isReaderMode ? 'text-white' : 'text-gray-900'}`}>
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-between py-8 border-y border-white/5">
                        <div className="flex items-center gap-4">
                            <img 
                                src="https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png" 
                                className="w-12 h-12 rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all object-cover" 
                                style={{ filter: isDarkMode || isReaderMode ? 'invert(1)' : 'none' }}
                                alt="LSS Logo" 
                            />
                            <div>
                                <p className={`text-sm font-black uppercase tracking-widest ${isDarkMode || isReaderMode ? 'text-white' : 'text-black'}`}>LSS Editorial Team</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Official Broadcast</p>
                            </div>
                        </div>
                    </div>
                </header>

                {!isReaderMode && (
                    <>
                        {hasGallery ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {post.gallery!.map((img, idx) => (
                                    <div key={idx} className="rounded-3xl overflow-hidden border border-white/5 shadow-xl aspect-video bg-neutral-900 cursor-zoom-in" onClick={() => setSelectedImage(img)}>
                                        <img src={img} style={imageStyle} className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" alt="Gallery asset" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            post.image && (
                                <div className="rounded-[2.5rem] overflow-hidden mb-12 border border-white/5 shadow-2xl bg-neutral-900">
                                    <img src={post.image} style={imageStyle} className="w-full h-auto" alt={post.title} />
                                </div>
                            )
                        )}
                    </>
                )}

                <div className={`prose prose-invert prose-lg max-w-none ${isReaderMode ? 'font-serif text-neutral-300' : ''}`}>
                    {renderMarkdown(post.content)}
                </div>

                {!isReaderMode && post.relatedGameIds && post.relatedGameIds.length > 0 && (
                    <div className={`mt-20 p-10 rounded-[2.5rem] border ${isDarkMode ? 'bg-neutral-900 border-white/5 shadow-2xl' : 'bg-gray-50 border-gray-200'}`}>
                        <h3 className={`text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6`}>Mentioned Projects</h3>
                        <div className="flex flex-wrap gap-3">
                            {post.relatedGameIds.map(gameId => {
                                const game = allData.games.find(g => g.id === gameId) || 
                                             allData.subsidiaries.flatMap(s => s.games).find(g => g.id === gameId) ||
                                             allData.subsidiaries.flatMap(s => s.series || []).find(s => s.id === gameId);
                                
                                if (!game) return null;
                                const isSeries = allData.subsidiaries.some(sub => sub.series?.some(s => s.id === gameId));
                                const path = isSeries ? `/series/${gameId}` : `/games/${gameId}`;

                                return (
                                    <Link key={gameId} to={path} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDarkMode ? 'bg-black hover:bg-emerald-500/20 text-gray-500 hover:text-emerald-500 border border-white/5' : 'bg-white hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 border border-gray-200 shadow-sm'}`}>
                                        {game.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </article>
        </motion.div>
    );
};

export default BlogPost;