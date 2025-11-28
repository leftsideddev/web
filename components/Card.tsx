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
}

const Card: React.FC<CardProps> = ({ onClick, image, title, description, subtitle, footer, overlayColor }) => {
    const { isDarkMode } = useTheme();

    return (
        <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={onClick}
            className={`cursor-pointer rounded-xl overflow-hidden border shadow-sm transition-all duration-300 relative group h-full flex flex-col ${isDarkMode ? 'bg-neutral-900 border-white/5 shadow-white/5' : 'bg-white border-gray-200 shadow-gray-200'}`}
        >
            <div className="h-48 overflow-hidden relative">
                {overlayColor && (
                    <div className={`absolute inset-0 mix-blend-overlay z-10 ${overlayColor}`}></div>
                )}
                <img 
                    src={image} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={title}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://placehold.co/800x400/1e293b/FFFFFF?text=${title.replace(/\s/g, '+')}`;
                    }}
                />
            </div>
            
            <div className="p-6 flex-grow">
                <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                {subtitle && (
                    <p className="text-blue-500 text-xs font-mono uppercase tracking-widest mb-4">{subtitle}</p>
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