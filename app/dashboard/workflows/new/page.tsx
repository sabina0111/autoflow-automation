'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { WorkflowField } from '@/types';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable field item component
function SortableFieldItem({ field, onUpdate, onDelete }: {
  field: WorkflowField;
  onUpdate: (field: WorkflowField) => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-dark-800 border border-dark-700 rounded-lg p-4 mb-3 hover:border-primary-500/50 transition-colors"
    >
      <div className="flex items-start space-x-3">
        <div {...attributes} {...listeners} className="cursor-grab pt-2 hover:text-primary-500 transition-colors">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Field Name
            </label>
            <input
              type="text"
              value={field.name}
              onChange={(e) => onUpdate({ ...field, name: e.target.value })}
              className="block w-full bg-dark-900 border border-dark-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Field Type
            </label>
            <select
              value={field.type}
              onChange={(e) => onUpdate({ ...field, type: e.target.value as any })}
              className="block w-full bg-dark-900 border border-dark-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="date">Date</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
            </select>
          </div>
          <div className="flex items-end space-x-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={field.required}
                onChange={(e) => onUpdate({ ...field, required: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-700 rounded bg-dark-900"
              />
              <span className="ml-2 text-sm text-gray-300">Required</span>
            </label>
            <button
              onClick={onDelete}
              type="button"
              className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {field.type === 'select' && (
        <div className="mt-3 ml-8">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Options (comma-separated)
          </label>
          <input
            type="text"
            value={field.options?.join(', ') || ''}
            onChange={(e) =>
              onUpdate({
                ...field,
                options: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
              })
            }
            className="block w-full bg-dark-900 border border-dark-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="e.g., Option 1, Option 2, Option 3"
          />
        </div>
      )}
    </div>
  );
}

export default function NewWorkflow() {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<WorkflowField[]>([]);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addField = () => {
    const newField: WorkflowField = {
      id: `field-${Date.now()}`,
      name: '',
      type: 'text',
      required: false,
      order: fields.length,
    };
    setFields([...fields, newField]);
  };

  const updateField = (index: number, updatedField: WorkflowField) => {
    const newFields = [...fields];
    newFields[index] = updatedField;
    setFields(newFields);
  };

  const deleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in');
      return;
    }

    if (fields.length === 0) {
      toast.error('Please add at least one field');
      return;
    }

    // Update field orders
    const orderedFields = fields.map((field, index) => ({ ...field, order: index }));

    setLoading(true);

    try {
      await addDoc(collection(db, 'workflows'), {
        userId: user.id,
        name,
        description,
        fields: orderedFields,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast.success('Workflow created successfully!');
      router.push('/dashboard/workflows');
    } catch (error) {
      console.error('Error creating workflow:', error);
      toast.error('Failed to create workflow');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Create New Workflow</h1>
          <p className="mt-1 text-sm text-gray-400">
            Design your custom workflow with drag-and-drop fields
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Workflow Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full bg-dark-900 border border-dark-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Customer Onboarding"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full bg-dark-900 border border-dark-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Brief description of this workflow"
                />
              </div>
            </div>
          </div>

          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Workflow Fields</h2>
              <button
                type="button"
                onClick={addField}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </button>
            </div>

            {fields.length === 0 ? (
              <div className="text-center py-12 bg-dark-900/50 rounded-lg border-2 border-dashed border-dark-700">
                <p className="text-gray-400">No fields added yet. Click "Add Field" to get started.</p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={fields.map(f => f.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((field, index) => (
                    <SortableFieldItem
                      key={field.id}
                      field={field}
                      onUpdate={(updated) => updateField(index, updated)}
                      onDelete={() => deleteField(index)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-dark-700 rounded-md text-sm font-medium text-gray-300 bg-dark-800 hover:bg-dark-750 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Workflow'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
