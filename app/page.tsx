'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, BarChart, Layers, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: Layers,
      title: 'Drag & Drop Builder',
      description: 'Create forms and tables visually without any coding required.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'See changes instantly as your team updates data in real-time.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Secure & Role-Based',
      description: 'Control access with admin and user roles. Data is encrypted.',
      color: 'purple'
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Track workflows, records, and activity with built-in analytics.',
      color: 'orange'
    }
  ];

  const benefits = [
    'No spreadsheets needed',
    'Visual workflow builder',
    'Real-time collaboration',
    'Zapier integration',
    'Google Sheets export',
    'Secure authentication'
  ];

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="bg-dark-900/50 backdrop-blur-md border-b border-dark-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                AutoFlow
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Modern Workflow Automation Platform
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl mb-6">
            Replace Google Sheets with
            <br />
            <span className="gradient-text">Visual Workflows</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400">
            Build powerful automation workflows with drag-and-drop interface.
            No spreadsheets, no complex formulas. Just simple, visual data management.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Benefits List */}
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-300"
              >
                <CheckCircle className="w-5 h-5 text-primary-400" />
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-32 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors: Record<string, string> = {
              blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
              green: 'from-green-500/20 to-green-600/5 border-green-500/30',
              purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
              orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30'
            };

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Card hover padding="md" className={`bg-gradient-to-br ${colors[feature.color]}`}>
                  <div className="h-12 w-12 bg-dark-800/50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-32 mb-20"
        >
          <Card padding="lg" className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to automate your workflows?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who have replaced spreadsheets with our visual workflow platform
            </p>
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
