'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useThemeContext();

  // Prevent flash during SSR
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-dark-700/50 animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg bg-dark-700/50 hover:bg-dark-600/50 
                 border border-dark-600 hover:border-primary-500 
                 transition-all duration-200 flex items-center justify-center
                 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-primary-400" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'light' ? 0 : -180,
          scale: theme === 'light' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-yellow-400" />
      </motion.div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-200" />
    </motion.button>
  );
}
