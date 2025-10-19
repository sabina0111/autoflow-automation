'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Shield, Moon, Sun, Palette } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useThemeContext } from '@/components/theme/ThemeProvider';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  const [backgroundEnabled, setBackgroundEnabled] = useState(true);

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/30 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Profile Information
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={user?.displayName || ''}
                disabled
                className="w-full px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white opacity-75 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white opacity-75 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Account Role
              </label>
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-medium">
                {user?.role === 'admin' ? 'Administrator' : 'User'}
              </div>
            </div>
          </div>
        </Card>

        {/* Appearance Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Appearance
            </h2>
          </div>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between pb-6 border-b border-dark-700">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-primary-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  )}
                  <h3 className="text-base font-medium text-white">
                    Theme Mode
                  </h3>
                </div>
                <p className="text-sm text-gray-400">
                  Currently using {theme === 'dark' ? 'dark' : 'light'} mode
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={handleThemeToggle}
              >
                {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
              </Button>
            </div>

            {/* 3D Background Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-base font-medium text-white mb-1">
                  3D Background Animation
                </h3>
                <p className="text-sm text-gray-400">
                  Enable or disable the animated 3D background
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={backgroundEnabled}
                  onChange={() => setBackgroundEnabled(!backgroundEnabled)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Security Section */}
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Security
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-dark-700">
              <div className="flex-1">
                <h3 className="text-base font-medium text-white mb-1">
                  Password
                </h3>
                <p className="text-sm text-gray-400">
                  Last changed: Never
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => window.location.href = '/forgot-password'}
              >
                Reset Password
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-base font-medium text-white mb-1">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </Card>

        {/* Account Actions */}
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-medium text-white mb-1">
                Delete Account
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Permanently delete your account and all associated data
              </p>
              <Button variant="danger" disabled>
                Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
