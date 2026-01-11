import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDatabase, useTheme } from '../App';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, Gamepad2, Newspaper, TrendingUp, Users, MousePointer2, 
    Plus, Edit3, Trash2, CheckCircle, Save, X, ArrowLeft, BarChart3, Clock,
    Monitor, Globe, ShieldAlert, Activity, Cpu, CloudLightning
} from 'lucide-react';
import { Game, BlogPost, GameStatus } from '../types';

const Admin: React.FC = () => {
    const { data, updateGames, updateBlog, adminUser, logout } = useDatabase();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dash' | 'games' | 'blog'>('dash');

    // State for forms
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (!adminUser) navigate('/');
        window.scrollTo(0, 0);
    }, [adminUser, navigate]);

    if (!adminUser) return null;

    // --- MOCK ANALYTICS DATA ---
    const stats = [
        { label: 'Network Traffic', value: '14.2k', trend: '+12%', icon: Users },
        { label: 'Build Success', value: '100%', trend: 'Stable', icon: CloudLightning },
        { label: 'Edge Events', value: '2.9k', trend: '+18%', icon: MousePointer2 },
        { label: 'Response Time', value: '42ms', trend: '-2ms', icon: Clock }
    ];

    // --- HANDLERS ---
    const saveGame = (game: Game) => {
        const isNew = !data.games.find(g => g.id === game.id);
        let newGames;
        if (isNew) {
            newGames = [...data.games, game];
        } else {
            newGames = data.games.map(g => g.id === game.id ? game : g);
        }
        updateGames(newGames);
        setEditingGame(null);
    };

    const deleteGame = (id: string) => {
        if (window.confirm("CRITICAL: Permanently delete this project from the studio directory?")) {
            updateGames(data.games.filter(g => g.id !== id));
        }
    };

    const savePost = (post: BlogPost) => {
        const isNew = !data.blogPosts.find(b => b.id === post.id);
        let newPosts;
        if (isNew) {
            newPosts = [post, ...data.blogPosts];
        } else {
            newPosts = data.blogPosts.map(b => b.id === post.id ? post : b);
        }
        updateBlog(newPosts);
        setEditingPost(null);
    };

    return (
        <div className="pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase">Studio Backend</h1>
                    </div>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
                        System Access: <span className="text-emerald-500">{adminUser.email}</span>
                    </p>
                </div>
                
                <div className="flex bg-neutral-900 border border-white/5 rounded-2xl p-1 shadow-2xl">
                    {[
                        { id: 'dash', icon: LayoutDashboard, label: 'Metrics' },
                        { id: 'games', icon: Gamepad2, label: 'Projects' },
                        { id: 'blog', icon: Newspaper, label: 'Dispatches' }
                    ].map(tab => (
                        <button 
                            key={tab.id} 
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            {/* TAB CONTENT */}
            <AnimatePresence mode="wait">
                {activeTab === 'dash' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="dash" className="space-y-8">
                        {/* Netlify System Status */}
                        <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-6">
                                <div className="p-4 rounded-3xl bg-emerald-500/10 text-emerald-500">
                                    <CloudLightning className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight mb-1">Netlify Production Edge</h3>
                                    <p className="text-sm text-gray-500 font-medium">All systems operational in <span className="text-emerald-500 font-bold">us-east-1</span> cluster.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Deploy: 09-2025</span>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Functions: Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((s, idx) => (
                                <div key={idx} className="p-8 rounded-[2rem] bg-neutral-900 border border-white/5 shadow-xl">
                                    <s.icon className="w-5 h-5 text-emerald-500 mb-6 opacity-40" />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">{s.label}</h4>
                                    <div className="flex items-end gap-3">
                                        <span className="text-4xl font-black tracking-tighter">{s.value}</span>
                                        <span className={`text-[10px] font-bold mb-1.5 ${s.trend.startsWith('+') || s.trend === 'Stable' ? 'text-emerald-500' : 'text-red-500'}`}>{s.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Graph Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 p-10 rounded-[2.5rem] bg-neutral-900 border border-white/5 h-96 flex flex-col shadow-2xl">
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Visitor Signals</h3>
                                    <select className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none text-emerald-500">
                                        <option>Last 24 Hours</option>
                                        <option>Last 7 Days</option>
                                    </select>
                                </div>
                                <div className="flex-grow flex items-end justify-between gap-3 px-2">
                                    {[30, 45, 35, 60, 80, 55, 90, 70, 40, 55, 30, 85, 95, 60, 40, 70, 50, 85].map((h, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ height: 0 }} 
                                            animate={{ height: `${h}%` }} 
                                            transition={{ delay: i * 0.03, type: 'spring' }}
                                            className="w-full bg-emerald-500/10 hover:bg-emerald-500 transition-all rounded-t-lg group relative"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                                {h}req
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="p-10 rounded-[2.5rem] bg-neutral-900 border border-white/5 flex flex-col shadow-2xl">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-10">Access Logs</h3>
                                <div className="space-y-6">
                                    {[
                                        { user: 'vermetra@gmail.com', time: '2m ago', action: 'Update: Cardamania' },
                                        { user: 'rktspencer@gmail.com', time: '45m ago', action: 'New Dispatch' },
                                        { user: 'baddudepvp1126@gmail.com', time: '2h ago', action: 'Status Sync' },
                                        { user: 'vermetra@gmail.com', time: '5h ago', action: 'Dash Access' }
                                    ].map((log, i) => (
                                        <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0">
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-black text-white">{log.user}</span>
                                                <span className="text-[9px] font-bold text-gray-600 uppercase">{log.time}</span>
                                            </div>
                                            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{log.action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'games' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="games" className="space-y-6">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter">Project Inventory</h2>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Global Directory Management</p>
                            </div>
                            <button 
                                onClick={() => setEditingGame({
                                    id: `game_${Date.now()}`, title: '', description: '', fullText: '', 
                                    image: '', releaseDate: 'TBA', link: '', status: 'In Development', 
                                    genres: [], platforms: ['PC']
                                })}
                                className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all"
                            >
                                <Plus className="w-5 h-5" /> Initialize Project
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {data.games.map(game => (
                                <div key={game.id} className="p-8 rounded-[2.5rem] bg-neutral-900 border border-white/5 flex flex-col md:flex-row items-center gap-8 shadow-xl group transition-all hover:border-emerald-500/20">
                                    <div className="w-40 h-24 overflow-hidden rounded-2xl border border-white/10 flex-shrink-0">
                                        <img src={game.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-2xl font-black mb-2 tracking-tight">{game.title}</h4>
                                        <div className="flex gap-3 items-center">
                                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${game.status === 'Released' ? 'border-blue-500/30 text-blue-500' : 'border-emerald-500/30 text-emerald-500'}`}>{game.status}</span>
                                            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{game.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => setEditingGame(game)} className="p-4 rounded-2xl bg-white/5 hover:bg-emerald-500/10 text-emerald-500 border border-white/5 transition-all"><Edit3 className="w-5 h-5" /></button>
                                        <button onClick={() => deleteGame(game.id)} className="p-4 rounded-2xl bg-white/5 hover:bg-red-500/10 text-red-500 border border-white/5 transition-all"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'blog' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="blog" className="space-y-6">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter">Studio Dispatches</h2>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Public Feed Control</p>
                            </div>
                            <button 
                                onClick={() => setEditingPost({
                                    id: `post_${Date.now()}`, title: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), 
                                    excerpt: '', content: '', image: '', relatedGameIds: []
                                })}
                                className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all"
                            >
                                <Plus className="w-5 h-5" /> New Dispatch
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {data.blogPosts.map(post => (
                                <div key={post.id} className="p-8 rounded-[2.5rem] bg-neutral-900 border border-white/5 flex flex-col md:flex-row items-center gap-8 shadow-xl group transition-all hover:border-emerald-500/20">
                                    <div className="flex-grow">
                                        <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] mb-2 block">{post.date}</span>
                                        <h4 className="text-2xl font-black tracking-tight">{post.title}</h4>
                                        <p className="text-sm text-gray-500 mt-2 font-medium line-clamp-1">{post.excerpt}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={() => setEditingPost(post)} className="p-4 rounded-2xl bg-white/5 hover:bg-emerald-500/10 text-emerald-500 border border-white/5 transition-all"><Edit3 className="w-5 h-5" /></button>
                                        <button onClick={() => { if(window.confirm("Delete dispatch?")) updateBlog(data.blogPosts.filter(b => b.id !== post.id)) }} className="p-4 rounded-2xl bg-white/5 hover:bg-red-500/10 text-red-500 border border-white/5 transition-all"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EDIT MODALS */}
            {editingGame && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-neutral-900 border border-white/10 w-full max-w-3xl rounded-[3rem] p-12 overflow-y-auto max-h-[90vh] shadow-2xl">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-4xl font-black uppercase tracking-tighter">Project Workbench</h2>
                            <button onClick={() => setEditingGame(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all"><X /></button>
                        </div>
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Project Title</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-emerald-500 font-bold" value={editingGame.title} onChange={e => setEditingGame({...editingGame, title: e.target.value})} /></div>
                                <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Current Status</label>
                                    <select className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-emerald-500 font-bold" value={editingGame.status} onChange={e => setEditingGame({...editingGame, status: e.target.value as any})}>
                                        {['In Development', 'Released', 'Paused', 'Alpha', 'Beta', 'Canceled'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Primary Media URL</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 font-bold" value={editingGame.image} onChange={e => setEditingGame({...editingGame, image: e.target.value})} /></div>
                            <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Directory Excerpt</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 font-bold" value={editingGame.description} onChange={e => setEditingGame({...editingGame, description: e.target.value})} /></div>
                            <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Full Technical Log</label><textarea className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 h-40 font-medium resize-none" value={editingGame.fullText} onChange={e => setEditingGame({...editingGame, fullText: e.target.value})} /></div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => saveGame(editingGame)} className="flex-grow bg-emerald-500 hover:bg-emerald-400 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"><Save className="w-5 h-5" /> Push Changes to Core</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {editingPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-neutral-900 border border-white/10 w-full max-w-3xl rounded-[3rem] p-12 overflow-y-auto max-h-[90vh] shadow-2xl">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-4xl font-black uppercase tracking-tighter">Dispatch Terminal</h2>
                            <button onClick={() => setEditingPost(null)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all"><X /></button>
                        </div>
                        <div className="space-y-8">
                            <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Dispatch Headline</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 font-bold outline-none focus:border-emerald-500" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value})} /></div>
                            <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Feed Excerpt</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 font-bold" value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} /></div>
                            <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Primary Image URL</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 font-bold" value={editingPost.image} onChange={e => setEditingPost({...editingPost, image: e.target.value || ''})} /></div>
                            <div><label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 block">Full Broadcast Content</label><textarea className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 h-64 font-medium resize-none" value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} /></div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => savePost(editingPost)} className="flex-grow bg-emerald-500 hover:bg-emerald-400 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /> Execute Broadcast</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Footer System Status */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-gray-600">
                    <ShieldAlert className="w-6 h-6 text-emerald-500/40" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Session Security: <span className="text-emerald-500">Authorized</span> • Persistent Engine: <span className="text-white">Active</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => navigate('/')} className="px-6 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors">Exit Portal</button>
                    <button onClick={logout} className="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/10 text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all">Sign Out</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;