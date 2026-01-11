import React from 'react';
import { useTheme } from '../App';

interface SkeletonProps {
    className?: string;
    repeat?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', repeat = 1 }) => {
    const { isDarkMode } = useTheme();
    
    const items = Array.from({ length: repeat });

    return (
        <>
            {items.map((_, i) => (
                <div 
                    key={i}
                    className={`animate-pulse rounded-2xl ${
                        isDarkMode ? 'bg-neutral-800/50' : 'bg-gray-200'
                    } ${className}`}
                />
            ))}
        </>
    );
};

export default Skeleton;