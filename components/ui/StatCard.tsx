'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export function StatCard({ title, value, icon: Icon, trend, color = 'blue' }: StatCardProps) {
  const colors = {
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400',
    green: 'from-green-500/20 to-green-600/5 border-green-500/30 text-green-400',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400',
    orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30 text-orange-400',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className={`
        relative overflow-hidden
        bg-gradient-to-br ${colors[color]}
        border rounded-xl p-6
        transition-all duration-200
        hover:shadow-glow-md
      `}
    >
      {/* Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-dark-800/50 rounded-lg">
          <Icon className="w-6 h-6" />
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-white mb-1">
        {value}
      </div>

      {/* Title */}
      <div className="text-sm text-gray-400">
        {title}
      </div>

      {/* Decorative gradient */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl" />
    </motion.div>
  );
}
