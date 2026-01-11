import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../constants';
import { useTheme } from '../App';
import { History, Info, Download, Mail, Layout, Terminal, Compass, Zap, GitBranch, Share2, CheckCircle2, ArrowRight } from 'lucide-react';

const FadeInSection: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.section>
);

const FamilyTreeNode: React.FC<{ 
    name: string; 
    type: string; 
    color: string; 
    isJoint?: boolean;
}> = ({ name, type, color, isJoint }) => {
    const { isDarkMode } = useTheme();
    return (
        <div 
            tabIndex={0}
            role="treeitem"
            aria-label={`${type}: ${name}`}
            className={`flex flex-col items-center p-4 rounded-2xl border outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${isDarkMode ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-gray-100 shadow-sm'} transition-all hover:scale-105 w-44 h-28 justify-center text-center relative z-10 ${isJoint ? 'ring-2 ring-orange-500/20 shadow-lg shadow-orange-500/5' : ''}`}
        >
            {isJoint && (
                <div className="absolute -top-2 bg-orange-500 text-[7px] font-black px-2 py-0.5 rounded-full text-white uppercase tracking-widest">
                    Joint Venture
                </div>
            )}
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 ${color}`}>{type}</span>
            <span className="text-sm font-bold tracking-tight">{name}</span>
        </div>
    );
};

const Studio: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [downloadingAsset, setDownloadingAsset] = useState<string | null>(null);

    const handleDownload = (e: React.MouseEvent, label: string) => {
        e.preventDefault();
        setDownloadingAsset(label);
        setTimeout(() => setDownloadingAsset(null), 4000);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto py-12 pb-32 px-4">
            {/* Download Notification Toast */}
            <AnimatePresence>
                {downloadingAsset && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="fixed bottom-10 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl shadow-emerald-500/40 font-bold"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Download started for "{downloadingAsset}" placeholder...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <header className="text-center mb-24">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                        duration: 1.2,
                        ease: "easeOut"
                    }}
                    className="text-7xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 bg-clip-text text-transparent"
                >
                    The Studio.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed italic"
                >
                    "{db.about.text}"
                </motion.p>
            </header>

            {/* Core Values */}
            <FadeInSection className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                <div className={`p-10 rounded-3xl border transition-all hover:border-emerald-500/30 ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <Compass className="w-10 h-10 text-emerald-500 mb-8" />
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Philosophy</h2>
                    <p className="text-gray-500 leading-relaxed text-lg">{db.about.philosophy}</p>
                </div>
                <div className={`p-10 rounded-3xl border transition-all hover:border-purple-500/30 ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <Zap className="w-10 h-10 text-purple-500 mb-8" />
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Mission</h2>
                    <p className="text-gray-500 leading-relaxed text-lg">{db.about.mission}</p>
                </div>
            </FadeInSection>

            {/* Timeline Section */}
            <FadeInSection className="mb-32">
                <div className="flex items-center gap-3 mb-16">
                    <History className="w-8 h-8 text-blue-500" />
                    <h2 className="text-3xl font-black uppercase tracking-tight">Timeline of Growth</h2>
                </div>
                <div className="space-y-12 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                    {db.timeline.map((event, i) => (
                        <div 
                            key={i} 
                            className="relative pl-16 group cursor-default transition-all"
                        >
                            <div className="absolute left-0 top-1 w-[35px] h-[35px] rounded-full bg-neutral-900 border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold transition-all group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                {event.year}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 transition-colors group-hover:text-emerald-400">{event.event}</h3>
                            <motion.div 
                                whileHover={{ 
                                    scale: 1.02, 
                                    borderColor: isDarkMode ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.6)" 
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className={`text-gray-500 text-lg leading-relaxed max-w-3xl transition-all duration-300 p-4 rounded-2xl border border-transparent ${isDarkMode ? 'bg-white/5' : 'bg-gray-50/50'}`}
                                style={{ willChange: 'transform, border-color' }}
                            >
                                {event.description}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </FadeInSection>

            {/* Family Tree Section */}
            <FadeInSection className="mb-32" aria-label="Studio Ecosystem Hierarchy">
                <div className="flex items-center gap-3 mb-12">
                    <GitBranch className="w-8 h-8 text-emerald-500" />
                    <h2 className="text-3xl font-black uppercase tracking-tight">Studio Ecosystem</h2>
                </div>
                
                <div className="relative p-12 rounded-[3rem] border border-white/5 bg-black/5 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16" role="tree" aria-label="Visual organizational structure of Left-Sided Studios and partners">
                        {/* LEFT SIDED BRANCH */}
                        <div className="md:col-span-8 flex flex-col items-center">
                            <FamilyTreeNode name="Left-Sided Studios" type="Parent Studio" color="text-emerald-500" />
                            
                            <div className="w-full flex justify-center py-4" aria-hidden="true">
                                <div className="h-12 w-px bg-gradient-to-b from-emerald-500 to-transparent"></div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                                <FamilyTreeNode name="ANdE Studios" type="Subsidiary" color="text-purple-500" />
                                <FamilyTreeNode name="Gotch-ya Studios" type="Subsidiary" color="text-purple-500" />
                                <FamilyTreeNode name="Bomb Banana" type="Subsidiary" color="text-purple-500" />
                                <FamilyTreeNode name="Endgame Studios" type="Subsidiary" color="text-purple-500" />
                            </div>
                        </div>

                        {/* CITADEL BRANCH */}
                        <div className="md:col-span-4 flex flex-col items-center">
                            <div className="mb-4 text-[10px] font-black uppercase tracking-widest text-gray-600 opacity-50">Strategic Alignment</div>
                            <FamilyTreeNode name="Citadel Studios" type="Strategic Partner" color="text-blue-500" />
                            <div className="w-full flex justify-center py-4" aria-hidden="true">
                                <div className="h-12 w-px bg-gradient-to-b from-blue-500 to-transparent"></div>
                            </div>
                        </div>

                        {/* SHARED ASSET (SKULLIX) */}
                        <div className="md:col-span-12 flex flex-col items-center pt-16 relative">
                            <div className="absolute top-0 left-1/4 right-1/4 h-16 border-t-2 border-x-2 border-dashed border-white/10 rounded-t-[3rem] -mt-2" aria-hidden="true"></div>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <Share2 className="w-4 h-4 text-orange-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Shared Production Unit</span>
                            </div>
                            
                            <FamilyTreeNode name="Skullix Media Group" type="Media & Production" color="text-orange-500" isJoint={true} />
                        </div>
                    </div>
                </div>
                
                <p className="text-center text-xs text-gray-500 mt-12 font-medium italic opacity-60">
                    Skullix Media Group operates as a joint venture, providing specialized media production support for both the Left-Sided network and Citadel Studios initiatives.
                </p>
            </FadeInSection>

            {/* Press Kit Hub */}
            <FadeInSection className={`p-12 md:p-20 rounded-[3rem] border transition-shadow hover:shadow-emerald-500/5 ${isDarkMode ? 'bg-neutral-900 border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-2xl'}`}>
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <div className="flex items-center gap-3 mb-8 text-emerald-500">
                            <Terminal className="w-6 h-6" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em]">Media Resources</h2>
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter mb-6 leading-none">Press Kit & Branding</h3>
                        <p className="text-gray-500 mb-10 text-sm">Download official logos, screenshots, and studio descriptions for use in your content.</p>
                        <div className="space-y-4">
                            {db.pressAssets.map((asset, i) => (
                                <a 
                                    key={i} 
                                    href={asset.url} 
                                    onClick={(e) => asset.type === 'Brand Package' || asset.url === '#' ? handleDownload(e, asset.label) : null}
                                    aria-label={`Download ${asset.label}`}
                                    className={`flex items-center justify-between p-4 rounded-2xl border outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/50' : 'bg-gray-50 border-gray-200 hover:border-emerald-500'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Layout className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs font-bold uppercase tracking-widest">{asset.label}</span>
                                    </div>
                                    <Download className="w-4 h-4 text-emerald-500" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-12">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-4">Brief Bio</h4>
                            <p className="text-gray-400 text-xl font-light leading-relaxed">
                                Left-Sided Studios is an independent collective based in the digital sphere. We specialize in narrative-heavy action and simulation titles, utilizing our network of niche subsidiaries to deliver specialized gameplay across horror, RPG, and platforming genres.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-gray-600 mb-2">Social Hub</h4>
                                <p className="text-sm font-bold">@LeftSidedDev</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-gray-600 mb-2">Direct Inquiries</h4>
                                <p className="text-sm font-bold">LeftSidedStudios@gmail.com</p>
                            </div>
                        </div>
                        <div className="pt-8">
                             <button onClick={() => window.location.href='mailto:leftsidedstudios@gmail.com'} className="group flex items-center gap-3 text-white bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-emerald-500/20 outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50">
                                <Mail className="w-4 h-4" /> Request Interview
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                             </button>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </motion.div>
    );
};

export default Studio;