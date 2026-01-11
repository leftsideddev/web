import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

interface CardProps {
    onClick?: () => void;
    image: string;
    title: string;
    description: string;
    subtitle?: string;
    footer?: React.ReactNode;
    overlayColor?: string;
    accentColor?: 'emerald' | 'blue' | 'purple' | 'amber';
}

const Card: React.FC<CardProps> = ({ 
    onClick, 
    image, 
    title, 
    description, 
    subtitle, 
    footer, 
    overlayColor,
    accentColor = 'emerald'
}) => {
    const { isDarkMode } = useTheme();
    
    const themes = {
        emerald: {
            glow: 'rgba(16, 185, 129, 0.3)',
            text: 'text-emerald-500',
            hoverText: 'group-hover:text-emerald-500',
            border: 'group-hover:border-emerald-500/40'
        },
        blue: {
            glow: 'rgba(59, 130, 246, 0.3)',
            text: 'text-blue-500',
            hoverText: 'group-hover:text-blue-500',
            border: 'group-hover:border-blue-500/40'
        },
        purple: {
            glow: 'rgba(168, 85, 247, 0.3)',
            text: 'text-purple-500',
            hoverText: 'group-hover:text-purple-500',
            border: 'group-hover:border-purple-500/40'
        },
        amber: {
            glow: 'rgba(245, 158, 11, 0.4)',
            text: 'text-amber-500',
            hoverText: 'group-hover:text-amber-500',
            border: 'group-hover:border-amber-500/40'
        }
    };

    const activeTheme = themes[accentColor];

    return (
        <motion.div 
            whileHover={{ 
                y: -12, 
                scale: 1.04, 
                boxShadow: isDarkMode 
                    ? `0 30px 60px -12px ${activeTheme.glow}` 
                    : "0 30px 60px -12px rgba(0, 0, 0, 0.12)" 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={onClick}
            className={`cursor-pointer group relative overflow-hidden rounded-3xl border transition-colors duration-300 flex flex-col h-full ${
                isDarkMode 
                    ? `bg-neutral-900 border-white/5 ${activeTheme.border}` 
                    : `bg-white border-gray-200 shadow-sm ${activeTheme.border.replace('/40', '')}`
            }`}
        >
            <div className="h-48 overflow-hidden relative">
                {overlayColor && (
                    <div className={`absolute inset-0 mix-blend-overlay z-10 ${overlayColor}`}></div>
                )}
                <img 
                    src={image} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    alt={title}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/800x400/1e293b/FFFFFF?text=${title.replace(/\s/g, '+')}`;
                    }}
                />
            </div>
            
            <div className="p-6 flex-grow">
                <h3 className={`text-2xl font-bold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'} ${activeTheme.hoverText}`}>{title}</h3>
                {subtitle && (
                    <p className={`text-xs font-mono uppercase tracking-widest mb-4 transition-colors ${activeTheme.text}`}>{subtitle}</p>
                )}
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {description}
                </p>
            </div>

            {footer && (
                <div className={`px-6 pb-6 pt-0 mt-auto flex justify-between items-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {footer}
                </div>
            )}
        </motion.div>
    );
};

export default Card;