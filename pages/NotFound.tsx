import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { useTheme } from '../App';

const NotFound: React.FC = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-6 text-center"
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-12"
            >
                <img 
                    src="https://github.com/leftsideddev/web/blob/main/images/left-sided.png?raw=true" 
                    alt="Left-Sided Studios" 
                    className={`w-32 h-32 md:w-48 md:h-48 object-contain mx-auto ${isDarkMode ? 'brightness-110' : 'brightness-90'}`}
                />
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase mb-2 leading-none">
                404
            </h1>
            <p className={`text-xl md:text-2xl font-black uppercase tracking-[0.4em] mb-12 ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`}>
                Not Found
            </p>

            <p className="text-gray-500 font-medium max-w-md mx-auto mb-12 leading-relaxed">
                The page you are looking for has been moved, deleted, or does not exist in our studio logs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                    onClick={() => navigate(-1)}
                    className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600'}`}
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
                <Link 
                    to="/"
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/20"
                >
                    <Home className="w-4 h-4" /> Back Home
                </Link>
            </div>
        </motion.div>
    );
};

export default NotFound;