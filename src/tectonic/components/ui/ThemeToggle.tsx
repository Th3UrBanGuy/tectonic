import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

interface ThemeToggleProps {
    className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-white/20 transition-all ${className}`}
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} className="text-orange-500" />}
            </motion.div>
        </button>
    );
};

export default ThemeToggle;
