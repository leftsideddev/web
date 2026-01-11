import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

const CardSchemes = {
  emerald: {
    glow: "rgba(16, 185, 129, 0.3)",
    text: "text-emerald-500",
    border: "hover:border-emerald-500/40"
  },
  blue: {
    glow: "rgba(59, 130, 246, 0.3)",
    text: "text-blue-500",
    border: "hover:border-blue-500/40"
  },
  purple: {
    glow: "rgba(168, 85, 247, 0.3)",
    text: "text-purple-500",
    border: "hover:border-purple-500/40"
  },
  amber: {
    glow: "rgba(245, 158, 11, 0.4)",
    text: "text-amber-500",
    border: "hover:border-amber-500/40"
  },
  red: {
    glow: "rgba(239, 68, 68, 0.3)",
    text: "text-red-500",
    border: "hover:border-red-500/40"
  },
  gray: {
    glow: "rgba(156, 163, 175, 0.3)",
    text: "text-gray-400",
    border: "hover:border-white/20"
  }
};

interface CardProps {
    onClick?: () => void;
    image: string;
    title: string;
    description: string;
    subtitle?: React.ReactNode;
    subtitlePosition?: 'body' | 'top-left-overlay';
    footer?: React.ReactNode;
    overlayColor?: string;
    accentColor?: keyof typeof CardSchemes;
    ariaLabel?: string;
    className?: string;
    imageClassName?: string;
    scalingMode?: 'auto' | 'pixelated' | 'crisp-edges';
}

const Card: React.FC<CardProps> = ({ 
    onClick, 
    image, 
    title, 
    description, 
    subtitle, 
    subtitlePosition = 'body',
    footer, 
    overlayColor,
    accentColor = 'emerald',
    ariaLabel,
    className = "",
    imageClassName = "h-48",
    scalingMode = 'auto'
}) => {
    const { isDarkMode } = useTheme();
    const activeTheme = CardSchemes[accentColor];

    const imageStyle: React.CSSProperties = {
        imageRendering: scalingMode === 'pixelated' ? 'pixelated' : scalingMode === 'crisp-edges' ? 'crisp-edges' : 'auto'
    };

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
            role="button"
            aria-label={ariaLabel || `View ${title}`}
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
            className={`cursor-pointer group relative overflow-hidden rounded-3xl border transition-colors duration-300 flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isDarkMode 
                    ? `bg-neutral-900 border-white/5 ${activeTheme.border}` 
                    : `bg-white border-gray-200 shadow-sm ${activeTheme.border.replace('/40', '')}`
            } ${className}`}
        >
            <div className={`${imageClassName} overflow-hidden relative flex-shrink-0`}>
                {overlayColor && (
                    <div className={`absolute inset-0 mix-blend-overlay z-10 ${overlayColor}`}></div>
                )}
                {subtitle && subtitlePosition === 'top-left-overlay' && (
                    <div className="absolute top-4 left-4 z-20">
                        {subtitle}
                    </div>
                )}
                <img 
                    src={image} 
                    style={imageStyle}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    alt=""
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/800x400/1e293b/FFFFFF?text=${title.replace(/\s/g, '+')}`;
                    }}
                />
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex flex-wrap items-baseline gap-x-2 mb-2">
                    <h3 className={`text-2xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:${activeTheme.text}`}>{title}</h3>
                    {subtitle && subtitlePosition === 'body' && (
                        <div className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTheme.text} opacity-60`}>
                          {subtitle}
                        </div>
                    )}
                </div>
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
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