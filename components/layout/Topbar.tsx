'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Bell, LogOut, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Topbar() {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="h-16 bg-dark-900/50 backdrop-blur-md border-b border-dark-700 flex items-center justify-between px-6">
      {/* Search / Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-white">
          Welcome back, {user?.displayName?.split(' ')[0] || 'User'}
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-dark-700/50 hover:bg-dark-600/50 border border-dark-600 hover:border-primary-500 transition-all duration-200">
          <Bell className="w-5 h-5 text-gray-400" />
          {/* Notification badge */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-dark-700/50 hover:bg-dark-600/50 border border-dark-600 hover:border-primary-500 transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm font-medium text-white">
                {user?.displayName || 'User'}
              </div>
              <div className="text-xs text-gray-400">
                {user?.email}
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {showDropdown && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowDropdown(false)}
                />

                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-dark-800 border border-dark-700 rounded-lg shadow-xl z-20 overflow-hidden"
                >
                  <div className="p-3 border-b border-dark-700">
                    <div className="text-sm font-medium text-white">
                      {user?.displayName || 'User'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user?.email}
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
