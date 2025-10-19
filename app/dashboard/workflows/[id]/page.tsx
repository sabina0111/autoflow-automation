'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Workflow, WorkflowRecord } from '@/types';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, Plus, Trash2, Download, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function WorkflowDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const workflowId = params.id as string;

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [records, setRecords] = useState<WorkflowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecordData, setNewRecordData] = useState<Record<string, any>>({});
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (workflowId) {
      fetchWorkflow();
      fetchRecords();
    }
  }, [workflowId, user]);

  const fetchWorkflow = async () => {
    try {
      const docRef = doc(db, 'workflows', workflowId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorkflow({ id: docSnap.id, ...docSnap.data() } as Workflow);
      } else {
        toast.error('Workflow not found');
        router.push('/dashboard/workflows');
      }
    } catch (error) {
      console.error('Error fetching workflow:', error);
      toast.error('Failed to load workflow');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'records'),
        where('workflowId', '==', workflowId),
        where('userId', '==', user.id)
      );
      const snapshot = await getDocs(q);
      const recordsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WorkflowRecord[];
      
      setRecords(recordsData);
    } catch (error) {
      console.error('Error fetching records:', error);
      toast.error('Failed to load records');
    }
  };

  const handleAddRecord = async () => {
    if (!user || !workflow) return;

    // Validate required fields
    const missingFields = workflow.fields
      .filter(f => f.required && !newRecordData[f.id])
      .map(f => f.name);

    if (missingFields.length > 0) {
      toast.error(`Please fill required fields: ${missingFields.join(', ')}`);
      return;
    }

    setSaving(true);
    try {
      const newRecord = {
        userId: user.id,
        workflowId: workflowId,
        data: newRecordData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, 'records'), newRecord);
      toast.success('Record added successfully');
      setNewRecordData({});
      setShowAddRecord(false);
      fetchRecords();
    } catch (error) {
      console.error('Error adding record:', error);
      toast.error('Failed to add record');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      await deleteDoc(doc(db, 'records', recordId));
      toast.success('Record deleted');
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error('Failed to delete record');
    }
  };

  const handleExportToSheets = async () => {
    if (!workflow) return;

    setExporting(true);
    try {
      const response = await fetch('/api/export/sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowName: workflow.name,
          fields: workflow.fields,
          records: records,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Exported to Google Sheets!');
        window.open(data.url, '_blank');
      } else {
        toast.error(data.error || 'Failed to export');
      }
    } catch (error) {
      console.error('Error exporting:', error);
      toast.error('Failed to export to Google Sheets');
    } finally {
      setExporting(false);
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

  if (!workflow) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-400">Workflow not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/workflows">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">{workflow.name}</h1>
              <p className="text-sm text-gray-400 mt-1">
                {workflow.description || 'No description'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              onClick={handleExportToSheets}
              disabled={exporting || records.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              {exporting ? 'Exporting...' : 'Export to Sheets'}
            </Button>
            <Button variant="primary" onClick={() => setShowAddRecord(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
        </div>

        {/* Workflow Info Card */}
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div className="flex gap-8">
              <div>
                <div className="text-sm text-gray-400">Fields</div>
                <div className="text-2xl font-bold text-white">{workflow.fields?.length || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Records</div>
                <div className="text-2xl font-bold text-white">{records.length}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Created</div>
                <div className="text-sm font-medium text-white flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(workflow.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Add Record Form */}
        {showAddRecord && (
          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Add New Record</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddRecord(false)}>
                Cancel
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {workflow.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field.name} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={newRecordData[field.id] || ''}
                      onChange={(e) => setNewRecordData({ ...newRecordData, [field.id]: e.target.value })}
                      className="block w-full bg-dark-900 border border-dark-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <input
                      type="checkbox"
                      checked={newRecordData[field.id] || false}
                      onChange={(e) => setNewRecordData({ ...newRecordData, [field.id]: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-700 rounded"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={newRecordData[field.id] || ''}
                      onChange={(e) => setNewRecordData({ ...newRecordData, [field.id]: e.target.value })}
                      className="block w-full bg-dark-900 border border-dark-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder={`Enter ${field.name}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <Button variant="primary" onClick={handleAddRecord} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Record'}
            </Button>
          </Card>
        )}

        {/* Records Table */}
        <Card padding="md">
          <h2 className="text-xl font-bold text-white mb-4">Records</h2>
          {records.length === 0 ? (
            <div className="text-center py-12 bg-dark-900/50 rounded-lg border-2 border-dashed border-dark-700">
              <p className="text-gray-400">No records yet. Add your first record to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-900 border-b border-dark-700">
                  <tr>
                    {workflow.fields.map((field) => (
                      <th key={field.id} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {field.name}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700">
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-dark-900/50 transition-colors">
                      {workflow.fields.map((field) => (
                        <td key={field.id} className="px-4 py-3 text-sm text-white">
                          {record.data[field.id]?.toString() || '-'}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRecord(record.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
