'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Workflow } from '@/types';
import Link from 'next/link';
import { Plus, Edit, Trash2, Zap, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { CreateWorkflowModal } from '@/components/workflows/CreateWorkflowModal';

export default function WorkflowsPage() {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; workflowId: string | null }>({
    isOpen: false,
    workflowId: null,
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchWorkflows();
  }, [user]);

  const fetchWorkflows = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'workflows'),
        where('userId', '==', user.id)
      );
      const snapshot = await getDocs(q);
      const workflowsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Workflow[];
      
      // Sort in JavaScript
      workflowsData.sort((a, b) => {
        const aDate = a.createdAt && typeof a.createdAt.toDate === 'function'
          ? a.createdAt.toDate()
          : new Date(0);
        const bDate = b.createdAt && typeof b.createdAt.toDate === 'function'
          ? b.createdAt.toDate()
          : new Date(0);
        return bDate.getTime() - aDate.getTime();
      });
      
      setWorkflows(workflowsData);
    } catch (error) {
      console.error('Error fetching workflows:', error);
      toast.error('Failed to load workflows');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (workflowId: string) => {
    setDeleteDialog({ isOpen: true, workflowId });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.workflowId) return;

    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'workflows', deleteDialog.workflowId));
      setWorkflows(workflows.filter(w => w.id !== deleteDialog.workflowId));
      toast.success('Workflow deleted successfully');
      setDeleteDialog({ isOpen: false, workflowId: null });
    } catch (error) {
      console.error('Error deleting workflow:', error);
      toast.error('Failed to delete workflow');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    const d = typeof date.toDate === 'function' ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Workflows
            </h1>
            <p className="text-gray-400">
              Create and manage your workflow automations
            </p>
          </div>
          <Button variant="primary" onClick={() => setCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
        </div>

        {/* Workflows List */}
        {workflows.length === 0 ? (
          <EmptyState
            icon={Zap}
            title="No workflows yet"
            description="Get started by creating your first automation workflow"
            action={{
              label: 'Create Workflow',
              onClick: () => setCreateModalOpen(true)
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} hover padding="md">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/30 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {workflow.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(workflow.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-2">
                    {workflow.description || 'No description provided'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-dark-700">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">
                        {workflow.fields?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Fields</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">0</div>
                      <div className="text-xs text-gray-500">Records</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-white">
                        {workflow.status || 'Active'}
                      </div>
                      <div className="text-xs text-gray-500">Status</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/dashboard/workflows/${workflow.id}`} className="flex-1">
                      <Button variant="secondary" size="sm" fullWidth>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(workflow.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create Workflow Modal */}
      <CreateWorkflowModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={fetchWorkflows}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, workflowId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Workflow"
        message="Are you sure you want to delete this workflow? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleting}
      />
    </DashboardLayout>
  );
}
