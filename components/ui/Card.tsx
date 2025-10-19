'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  onClick 
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = `
    bg-dark-800 border border-dark-700 rounded-xl
    transition-all duration-200
    ${paddingStyles[padding]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const hoverStyles = hover 
    ? 'hover:bg-dark-750 hover:border-dark-600 hover:shadow-glow-sm' 
    : '';

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        className={`${baseStyles} ${hoverStyles}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseStyles}>
      {children}
    </div>
  );
}
