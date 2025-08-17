'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ItemForm from '../../../components/ItemForm';

interface ShopItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imgUrl?: string;
}

// Mock data for editing
const mockItems: ShopItem[] = [
  {
    id: 1,
    name: 'Thai Tea',
    price: 4.50,
    stock: 25,
    category: 'DRINK',
    imgUrl: '/api/placeholder/150/150'
  },
  {
    id: 2,
    name: 'Green Tea',
    price: 3.50,
    stock: 30,
    category: 'DRINK',
    imgUrl: '/api/placeholder/150/150'
  }
];

export default function ItemFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get('id');
  
  const [item, setItem] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (itemId) {
      const fetchItem = async () => {
        setLoading(true);
        try {
          // In real app, this would be: const response = await fetch(`/api/shop-items/${itemId}`);
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
          const foundItem = mockItems.find(i => i.id === parseInt(itemId));
          if (foundItem) {
            setItem(foundItem);
          } else {
            setError('Item not found');
          }
        } catch (err) {
          setError('Failed to load item');
          console.error('Error fetching item:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    }
  }, [itemId]);

  const handleSaveItem = async (itemData: Omit<ShopItem, 'id'>) => {
    try {
      if (item) {
        // Update existing item
        // In real app, this would be: await fetch(`/api/shop-items/${item.id}`, { method: 'PUT', body: JSON.stringify(itemData) });
        console.log('Updating item:', { ...item, ...itemData });
      } else {
        // Create new item
        // In real app, this would be: await fetch('/api/shop-items', { method: 'POST', body: JSON.stringify(itemData) });
        console.log('Creating item:', itemData);
      }
      
      // Redirect back to shop items
      router.push('/manager/shop-items');
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Failed to save item. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/manager/shop-items');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item...</p>
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
            onClick={() => router.push('/manager/shop-items')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Shop Items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {item ? 'Edit Item' : 'Create New Item'}
          </h1>
          <p className="text-gray-600 mt-2">
            {item ? 'Update the item details below.' : 'Fill out the form below to create a new shop item.'}
          </p>
        </div>

        <ItemForm
          item={item}
          onSave={handleSaveItem}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
