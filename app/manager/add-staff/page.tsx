'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StaffForm from '../../../components/StaffForm';

interface StaffData {
  name: string;
  email: string;
  role: 'USER' | 'EMPLOYEE' | 'MANAGER';
}

export default function AddStaffPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveStaff = async (staffData: StaffData) => {
    setIsSubmitting(true);
    try {
      // In real app, this would be:
      // const response = await fetch('/api/user', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(staffData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to ID Management page
      router.push('/manager/id-management');
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Failed to add staff member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/manager/id-management');
  };

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Staff Member</h1>
          <p className="text-gray-600 mt-2">
            Fill out the form below to add a new staff member to the system.
          </p>
        </div>

        <StaffForm
          onSave={handleSaveStaff}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
