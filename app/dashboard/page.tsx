'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Workflow, AnalyticsData } from '@/types';
import Link from 'next/link';
import { Plus, FileText, Database, Activity, TrendingUp, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export default function Dashboard() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalWorkflows: 0,
    totalRecords: 0,
    recentActivity: 0,
    usersCount: 1,
  });
  const [recentWorkflows, setRecentWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch user's workflows (without orderBy to avoid index requirement)
      const workflowsQuery = query(
        collection(db, 'workflows'),
        where('userId', '==', user.id)
      );
      const workflowsSnap = await getDocs(workflowsQuery);
      let workflowsData = workflowsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workflow[];
      
      // Sort and limit in JavaScript
      workflowsData.sort((a, b) => {
        const aDate = a.createdAt && typeof a.createdAt.toDate === 'function' 
          ? a.createdAt.toDate() 
          : new Date(0);
        const bDate = b.createdAt && typeof b.createdAt.toDate === 'function'
          ? b.createdAt.toDate()
          : new Date(0);
        return bDate.getTime() - aDate.getTime();
      });
      workflowsData = workflowsData.slice(0, 5);
      
      setRecentWorkflows(workflowsData);

      // Fetch records count
      const recordsQuery = query(
        collection(db, 'records'),
        where('userId', '==', user.id)
      );
      const recordsSnap = await getDocs(recordsQuery);

      // Calculate recent activity (records from last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentRecords = recordsSnap.docs.filter(doc => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate();
        return createdAt && createdAt >= sevenDaysAgo;
      });

      setAnalytics({
        totalWorkflows: workflowsData.length,
        totalRecords: recordsSnap.size,
        recentActivity: recentRecords.length,
        usersCount: 1,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Mon', records: 12 },
    { name: 'Tue', records: 19 },
    { name: 'Wed', records: 15 },
    { name: 'Thu', records: 25 },
    { name: 'Fri', records: 22 },
    { name: 'Sat', records: 18 },
    { name: 'Sun', records: 20 },
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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 gradient-text">
            Dashboard Overview
          </h1>
          <p className="text-gray-400">
            Track your automation workflows and monitor performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Workflows"
            value={analytics.totalWorkflows}
            icon={FileText}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Records"
            value={analytics.totalRecords}
            icon={Database}
            color="green"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Recent Activity"
            value={analytics.recentActivity}
            icon={Activity}
            color="purple"
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Growth Rate"
            value="+12%"
            icon={TrendingUp}
            color="orange"
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Activity Chart */}
        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">
            Weekly Activity
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
                <Bar dataKey="records" fill="#0B60FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Workflows */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">
              Recent Workflows
            </h2>
            <Link href="/dashboard/workflows/new">
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Workflow
              </Button>
            </Link>
          </div>

          {recentWorkflows.length === 0 ? (
            <EmptyState
              icon={Zap}
              title="No workflows yet"
              description="Get started by creating your first automation workflow"
              action={{
                label: 'Create Workflow',
                onClick: () => window.location.href = '/dashboard/workflows/new'
              }}
            />
          ) : (
            <div className="space-y-3">
              {recentWorkflows.map((workflow) => (
                <Link key={workflow.id} href={`/dashboard/workflows/${workflow.id}`}>
                  <Card hover padding="md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          {workflow.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          {workflow.description || 'No description'}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 bg-dark-700/50 px-3 py-1 rounded-full">
                        {workflow.fields.length} fields
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
