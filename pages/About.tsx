import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme, useDatabase } from '../contexts';
import { History, Info, Download, Mail, Layout, Terminal, Compass, Zap, GitBranch, Share2, CheckCircle2, ArrowRight, ExternalLink, HelpCircle, ChevronDown } from 'lucide-react';

const FadeInSection: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className, id }) => (
    <motion.section 
        id={id}
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
    onClick?: () => void;
}> = ({ name, type, color, isJoint, onClick }) => {
    const { isDarkMode } = useTheme();
    
    return (
        <div 
            tabIndex={0}
            role="treeitem"
            aria-label={`${type}: ${name}`}
            onClick={onClick}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border outline-none transition-all hover:scale-105 w-full max-w-[280px] h-28 relative z-10 ${onClick ? 'cursor-pointer' : 'cursor-default'} ${isDarkMode ? 'bg-neutral-900/50 border-white/5 focus-visible:border-emerald-500' : 'bg-white border-gray-100 shadow-sm focus-visible:ring-emerald-500'} ${isJoint ? 'ring-2 ring-orange-500/20 shadow-lg shadow-orange-500/5' : ''}`}
        >
            {isJoint && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-[7px] font-black px-2 py-0.5 rounded-full text-white uppercase tracking-widest whitespace-nowrap">
                    Joint Venture
                </div>
            )}
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1.5 ${color}`}>
                {type}
            </span>
            <span className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {name}
            </span>
        </div>
    );
};

const TimelineTooltip: React.FC<{ content: string }> = ({ content }) => {
    const { isDarkMode } = useTheme();
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute left-0 top-full mt-3 z-20 w-72 p-4 rounded-2xl shadow-2xl border pointer-events-none ${isDarkMode ? 'bg-neutral-800 border-emerald-500/30 text-gray-300' : 'bg-white border-emerald-100 text-gray-600'}`}
        >
            <p className="text-xs leading-relaxed">{content}</p>
            <div className={`absolute -top-2 left-6 w-4 h-4 rotate-45 border-t border-l ${isDarkMode ? 'bg-neutral-800 border-emerald-500/30' : 'bg-white border-emerald-100'}`} />
        </motion.div>
    );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useTheme();

    return (
        <div className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className={`text-lg font-bold uppercase tracking-tight transition-colors ${isOpen ? 'text-emerald-500' : isDarkMode ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'}`}>
                    {question}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : 'text-gray-500'}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-gray-500 leading-relaxed font-light">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const About: React.FC = () => {
    const { isDarkMode } = useTheme();
    const { data } = useDatabase();
    const navigate = useNavigate();
    const [downloadingAsset, setDownloadingAsset] = useState<boolean>(false);
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [
        { id: 'philosophy', label: 'Philosophy' },
        { id: 'mission', label: 'Mission' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'network', label: 'Ecosystem' },
        { id: 'press', label: 'Press Kit' }
    ];

    if (!data) return null;

    const timelineContexts = [
        "The studio's soul was forged in the summer of 2023. DaRealSansYT and RocketBlasts visited Vermetra's house for a week, conceptualizing the LSS journey.",
        "Expansion into labels like ANdE allowed for multi-genre development across horror, RPGs, and action titles.",
        "The unified platform centralization serves as a single source of truth for the studio's global operations."
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto py-12 pb-32 px-4">
            <AnimatePresence>
                {downloadingAsset && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="fixed bottom-10 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl shadow-emerald-500/40 font-bold"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Redirecting to External Source...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="flex flex-col items-center text-center mb-16">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl md:text-8xl font-black tracking-tighter text-emerald-500 uppercase mb-8"
                >
                    ABOUT US
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed italic"
                >
                    "{data.about.text}"
                </motion.p>
            </header>

            {/* Sticky Sub-Navigation */}
            <div className={`sticky top-0 z-40 w-full backdrop-blur-md border-b ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'} mb-16 -mx-4 px-4`}>
                <div className="max-w-6xl mx-auto overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-center gap-4 md:gap-8 py-4 min-w-max">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-600 hover:text-emerald-600'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                <FadeInSection id="philosophy" className={`p-10 rounded-3xl border transition-all hover:border-emerald-500/30 ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <Compass className="w-10 h-10 text-emerald-500 mb-8" />
                    <h2 className={`text-2xl font-black uppercase tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Philosophy</h2>
                    <p className="text-gray-500 leading-relaxed text-lg">{data.about.philosophy}</p>
                </FadeInSection>
                <FadeInSection id="mission" className={`p-10 rounded-3xl border transition-all hover:border-purple-500/30 ${isDarkMode ? 'bg-neutral-900 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <Zap className="w-10 h-10 text-purple-500 mb-8" />
                    <h2 className={`text-2xl font-black uppercase tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Mission</h2>
                    <p className="text-gray-500 leading-relaxed text-lg">{data.about.mission}</p>
                </FadeInSection>
            </div>

            <FadeInSection id="timeline" className="mb-32">
                <div className="flex items-center gap-3 mb-16">
                    <History className="w-8 h-8 text-blue-500" />
                    <h2 className="text-3xl font-black uppercase tracking-tight">Timeline of Growth</h2>
                </div>
                <div className="space-y-12 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                    {data.timeline.map((event, i) => (
                        <div 
                            key={i} 
                            className="relative pl-16 group cursor-default"
                            onMouseEnter={() => setActiveTooltip(i)}
                            onMouseLeave={() => setActiveTooltip(null)}
                        >
                            <div className="absolute left-0 top-1 w-[35px] h-[35px] rounded-full bg-neutral-900 border-2 border-emerald-500 flex items-center justify-center text-[10px] font-bold transition-all group-hover:bg-emerald-500 group-hover:text-black">
                                {event.year}
                            </div>
                            <div className="relative">
                                <h3 className="text-2xl font-bold mb-2 transition-colors group-hover:text-emerald-400">{event.event}</h3>
                                <AnimatePresence>
                                    {activeTooltip === i && (
                                        <TimelineTooltip content={timelineContexts[i] || "Documentation pending."} />
                                    )}
                                </AnimatePresence>
                            </div>
                            <p className={`text-gray-500 text-lg leading-relaxed max-w-3xl p-4 rounded-2xl border border-transparent ${isDarkMode ? 'bg-white/5' : 'bg-gray-50/50'}`}>
                                {event.description}
                            </p>
                        </div>
                    ))}
                </div>
            </FadeInSection>

            <FadeInSection id="network" className="mb-32" aria-label="Studio Ecosystem Hierarchy">
                <div className="flex items-center gap-3 mb-12">
                    <GitBranch className="w-8 h-8 text-emerald-500" />
                    <h2 className="text-3xl font-black uppercase tracking-tight">Studio Ecosystem</h2>
                </div>
                
                <div className="relative p-6 md:p-12 rounded-[3rem] border border-white/5 bg-black/5 overflow-hidden">
                    <div className="flex flex-col items-center gap-16" role="tree" aria-label="Organizational structure">
                        
                        {/* Parent Node */}
                        <div className="flex flex-col items-center w-full">
                            <FamilyTreeNode name="Left-Sided Studios" type="Parent Studio" color="text-emerald-500" onClick={() => navigate('/')} />
                            <div className="w-full flex justify-center py-4" aria-hidden="true">
                                <div className="h-12 w-px bg-gradient-to-b from-emerald-500 to-transparent"></div>
                            </div>
                        </div>

                        {/* Subsidiaries Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                            <FamilyTreeNode name="ANdE Studios" type="Subsidiary" color="text-purple-500" onClick={() => navigate('/network/ande')} />
                            <FamilyTreeNode name="Gotch-ya Studios" type="Subsidiary" color="text-purple-500" onClick={() => navigate('/network/gotchya')} />
                            <FamilyTreeNode name="Bomb Banana" type="Subsidiary" color="text-purple-500" onClick={() => navigate('/network/bomb-banana')} />
                            <FamilyTreeNode name="Endgame Studios" type="Subsidiary" color="text-purple-500" onClick={() => navigate('/network/endgame')} />
                        </div>

                        {/* Strategic Partners Row */}
                        <div className="w-full flex flex-col md:flex-row items-center justify-center mt-8 gap-8 md:gap-32">
                             <div className="flex flex-col items-center">
                                <div className="mb-4 text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-60">Strategic Alignment</div>
                                <FamilyTreeNode name="Citadel Studios" type="Strategic Partner" color="text-blue-500" onClick={() => navigate('/partners/citadel')} />
                             </div>
                             
                             <div className="flex flex-col items-center relative">
                                <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 h-8 w-px border-l border-dashed border-white/20" aria-hidden="true"></div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Share2 className="w-4 h-4 text-orange-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Shared Production</span>
                                </div>
                                <FamilyTreeNode name="Skullix Media Group" type="Media & Production" color="text-orange-500" isJoint={true} onClick={() => navigate('/network/skullix')} />
                             </div>
                        </div>

                    </div>
                </div>
            </FadeInSection>

            <FadeInSection id="faq" className="mb-32">
                <div className="flex items-center gap-3 mb-12">
                    <HelpCircle className="w-8 h-8 text-emerald-500" />
                    <h2 className="text-3xl font-black uppercase tracking-tight">Frequently Asked Questions</h2>
                </div>
                <div className={`p-8 md:p-12 rounded-[3rem] border ${isDarkMode ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <FAQItem 
                        question="How did Left-Sided Studios begin?" 
                        answer="The studio's soul was forged in the summer of 2023. Founders DaRealSansYT and RocketBlasts visited Vermetra's house for a week, conceptualizing the LSS journey and our commitment to transparency and narrative depth."
                    />
                    <FAQItem 
                        question="What does the development cycle look like?" 
                        answer="Our process is iterative and collaborative. We leverage our studio ecosystem—including subsidiaries like ANdE and Gotch-ya—to specialize in different genres while maintaining a unified creative vision and high production standards."
                    />
                    <FAQItem 
                        question="How can I get involved with the LSS community?" 
                        answer="We are highly active on Discord and social media. Our community is a core part of our development process, providing feedback and ideas that shape our titles. Join our Discord server to participate in playtests and community events."
                    />
                    <FAQItem 
                        question="Does LSS work with other studios?" 
                        answer="Yes, we maintain strategic alignments with partners like Citadel Studios to co-produce high-fidelity content and expand our production capabilities across the indie landscape."
                    />
                </div>
            </FadeInSection>

            <FadeInSection id="press" className={`p-12 md:p-20 rounded-[3rem] border transition-shadow hover:shadow-emerald-500/5 ${isDarkMode ? 'bg-neutral-900 border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-2xl'}`}>
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <div className="flex items-center gap-3 mb-8 text-emerald-500">
                            <Terminal className="w-6 h-6" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em]">Media Resources</h2>
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter mb-6 leading-none">Press Kit & Branding</h3>
                        <p className="text-gray-500 mb-10 text-sm">Download official logos and assets.</p>
                        <div className="space-y-4">
                            {data.pressAssets.map((asset, i) => {
                                const isPressKit = asset.label.toLowerCase().includes('press kit');
                                return (
                                    <a 
                                        key={i} 
                                        href={asset.url} 
                                        target={isPressKit ? "_blank" : "_self"}
                                        rel={isPressKit ? "noreferrer" : ""}
                                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-emerald-500/50' : 'bg-gray-50 border-gray-200 hover:border-emerald-500'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                                                <Layout className="w-4 h-4" />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest">{asset.label}</span>
                                        </div>
                                        {isPressKit ? <ExternalLink className="w-4 h-4 text-emerald-500" /> : <Download className="w-4 h-4 text-emerald-500" />}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-12">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-4">Brief Bio</h4>
                            <p className="text-gray-400 text-xl font-light leading-relaxed">
                                Left-Sided Studios is an independent collective specializing in narrative-heavy action and simulation titles, utilizing a network of labels to deliver unique interactive experiences.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-gray-600 mb-2">Social Hub</h4>
                                <p className="text-sm font-bold">@LeftSidedDev</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-gray-600 mb-2">Direct Inquiries</h4>
                                <p className="text-sm font-bold lowercase">Contact via Discord</p>
                            </div>
                        </div>
                        <div className="pt-8">
                             <button onClick={() => navigate('/contact')} className="group flex items-center gap-3 text-white bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-emerald-500/20">
                                <Mail className="w-4 h-4" /> Contact Us
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                             </button>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </motion.div>
    );
};

export default About;