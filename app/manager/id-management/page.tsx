'use client';
import { useState, useEffect } from 'react';
import StaffTable from '../../../components/StaffTable';
import StaffForm from '../../../components/StaffForm';

interface Staff {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'EMPLOYEE' | 'MANAGER';
  createdAt: Date;
}

// Mock data
const mockStaff: Staff[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'EMPLOYEE',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'MANAGER',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'EMPLOYEE',
    createdAt: new Date('2024-01-20')
  }
];

export default function IDManagementPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        // In real app, this would be: const response = await fetch('/api/user');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setStaff(mockStaff);
        setError(null);
      } catch (err) {
        setError('Failed to load staff members');
        console.error('Error fetching staff:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleEditStaff = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setShowForm(true);
  };

  const handleDeleteStaff = async (staffId: number) => {
    if (!confirm('Are you sure you want to delete this staff member?')) {
      return;
    }

    try {
      // In real app, this would be: await fetch(`/api/user/${staffId}`, { method: 'DELETE' });
      setStaff(prevStaff => prevStaff.filter(s => s.id !== staffId));
    } catch (err) {
      console.error('Error deleting staff:', err);
      alert('Failed to delete staff member');
    }
  };

  const handleSaveStaff = async (staffData: Omit<Staff, 'id' | 'createdAt'>) => {
    try {
      if (editingStaff) {
        // Update existing staff
        // In real app, this would be: await fetch(`/api/user/${editingStaff.id}`, { method: 'PUT', body: JSON.stringify(staffData) });
        setStaff(prevStaff => 
          prevStaff.map(s => 
            s.id === editingStaff.id 
              ? { ...s, ...staffData }
              : s
          )
        );
      } else {
        // Add new staff
        // In real app, this would be: await fetch('/api/user', { method: 'POST', body: JSON.stringify(staffData) });
        const newStaff: Staff = {
          id: Math.max(...staff.map(s => s.id)) + 1,
          ...staffData,
          createdAt: new Date()
        };
        setStaff(prevStaff => [...prevStaff, newStaff]);
      }
      
      setShowForm(false);
      setEditingStaff(null);
    } catch (err) {
      console.error('Error saving staff:', err);
      alert('Failed to save staff member');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Staff Management</h1>
          <button
            onClick={() => {
              setEditingStaff(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>➕</span>
            Add Staff
          </button>
        </div>

        {showForm ? (
          <StaffForm
            staff={editingStaff}
            onSave={handleSaveStaff}
            onCancel={() => {
              setShowForm(false);
              setEditingStaff(null);
            }}
          />
        ) : (
          <StaffTable
            staff={staff}
            onEdit={handleEditStaff}
            onDelete={handleDeleteStaff}
          />
        )}
      </div>
    </div>
  );
}
