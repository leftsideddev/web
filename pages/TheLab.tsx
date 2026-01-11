import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Beaker, Terminal, Microscope, Zap, ArrowRight, Layers, Construction } from 'lucide-react';
import { useTheme } from '../App';
import Skeleton from '../components/Skeleton';

const TheLab: React.FC = () => {
    const { isDarkMode } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const prototypes = [
        {
            title: "Project: Neural-Pik",
            status: "Research",
            desc: "Experimental pathfinding AI for mass-unit coordination, inspired by our founding vision.",
            tags: ["AI", "Netcode"],
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Dynamic Shaders v4",
            status: "WIP",
            desc: "Custom rendering pipeline for achieving the signature LSS atmosphere in low-poly environments.",
            tags: ["Rendering", "Technical Art"],
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Procedural Horror Engine",
            status: "Alpha",
            desc: "A modular system for ANdE Studios to generate random interior layouts for psychological horror simulation.",
            tags: ["Generation", "Horror"],
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "TCG Deck Builder Core",
            status: "Stable",
            desc: "The underlying logic for Cardamania's complex interaction engine.",
            tags: ["Logic", "Cardmania"],
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        }
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pb-32">
            <header className="mb-16 text-center max-w-2xl mx-auto">
                <div className={`inline-flex p-3 rounded-2xl mb-6 ${isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    <FlaskConical className="w-10 h-10" />
                </div>
                <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">THE LAB.</h1>
                <p className="text-gray-500 text-lg leading-relaxed">
                    Where the sparks fly. Explore our technical experiments, early-stage prototypes, and the modular tools powering the LSS ecosystem.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {isLoading ? (
                    <Skeleton className="h-64" repeat={4} />
                ) : (
                    prototypes.map((proto, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`p-10 rounded-[2.5rem] border relative overflow-hidden group transition-all duration-300 ${
                                isDarkMode ? 'bg-neutral-900 border-white/5 hover:border-emerald-500/40' : 'bg-white border-gray-200 shadow-sm'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-4 rounded-2xl ${proto.bg} ${proto.color}`}>
                                    <Microscope className="w-6 h-6" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${isDarkMode ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                                    {proto.status}
                                </span>
                            </div>

                            <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-emerald-500 transition-colors">
                                {proto.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                                {proto.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {proto.tags.map(t => (
                                    <span key={t} className="text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-500/5">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-emerald-500 transition-colors">
                                Internal Technical Log <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>

                            <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <Terminal className="w-32 h-32" />
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <section className={`mt-32 p-12 md:p-16 rounded-[3rem] border flex flex-col md:flex-row items-center gap-12 text-center md:text-left ${
                isDarkMode ? 'bg-neutral-950 border-white/5' : 'bg-gray-50 border-gray-200'
            }`}>
                <div className="p-6 rounded-full bg-orange-500/10 text-orange-500">
                    <Construction className="w-12 h-12" />
                </div>
                <div className="flex-grow">
                    <h2 className="text-3xl font-black mb-4 tracking-tight">Access Early Builds?</h2>
                    <p className="text-gray-500 font-medium">
                        We occasionally host public stress-tests for our experimental modules on our Discord server. Join the community to help us refine the future of LSS interactive projects.
                    </p>
                </div>
                <a 
                    href="https://discord.gg/A8XMvSnkCU" 
                    target="_blank" 
                    rel="noreferrer"
                    className="whitespace-nowrap bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                    Join Testing Hub
                </a>
            </section>
        </motion.div>
    );
};

export default TheLab;