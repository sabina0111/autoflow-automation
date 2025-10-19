'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Database, Zap } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkflows: 0,
    totalRecords: 0,
    avgRecordsPerWorkflow: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      const workflowsQuery = query(
        collection(db, 'workflows'),
        where('userId', '==', user.id)
      );
      const workflowsSnap = await getDocs(workflowsQuery);
      
      const recordsQuery = query(
        collection(db, 'records'),
        where('userId', '==', user.id)
      );
      const recordsSnap = await getDocs(recordsQuery);

      const totalWorkflows = workflowsSnap.size;
      const totalRecords = recordsSnap.size;
      
      setStats({
        totalWorkflows,
        totalRecords,
        avgRecordsPerWorkflow: totalWorkflows > 0 ? Math.round(totalRecords / totalWorkflows) : 0,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for charts
  const weeklyData = [
    { name: 'Mon', workflows: 4, records: 12 },
    { name: 'Tue', workflows: 3, records: 19 },
    { name: 'Wed', workflows: 5, records: 15 },
    { name: 'Thu', workflows: 2, records: 25 },
    { name: 'Fri', workflows: 7, records: 22 },
    { name: 'Sat', workflows: 3, records: 18 },
    { name: 'Sun', workflows: 4, records: 20 },
  ];

  const monthlyData = [
    { name: 'Jan', records: 65 },
    { name: 'Feb', records: 78 },
    { name: 'Mar', records: 90 },
    { name: 'Apr', records: 81 },
    { name: 'May', records: 95 },
    { name: 'Jun', records: 112 },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-400">
            Track your workflow performance and activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Workflows"
            value={stats.totalWorkflows}
            icon={Zap}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Records"
            value={stats.totalRecords}
            icon={Database}
            color="green"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Avg Records/Workflow"
            value={stats.avgRecordsPerWorkflow}
            icon={Activity}
            color="purple"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <Card>
            <h2 className="text-lg font-semibold text-white mb-4">
              Weekly Activity
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a202c',
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="workflows" fill="#0B60FF" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="records" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <h2 className="text-lg font-semibold text-white mb-4">
              Monthly Record Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a202c',
                      border: '1px solid #2d3748',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="records" 
                    stroke="#0B60FF" 
                    strokeWidth={3}
                    dot={{ fill: '#0B60FF', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Insights Card */}
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-500/10 border border-primary-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Performance Insights
              </h3>
              <p className="text-gray-400 mb-4">
                Your workflow automation is performing well. Keep creating and managing workflows to improve efficiency.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.totalWorkflows}
                  </div>
                  <div className="text-sm text-gray-400">Active Workflows</div>
                </div>
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.totalRecords}
                  </div>
                  <div className="text-sm text-gray-400">Data Records</div>
                </div>
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    +12%
                  </div>
                  <div className="text-sm text-gray-400">Growth This Month</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
