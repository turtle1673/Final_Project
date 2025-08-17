'use client';
import { useState, useEffect } from 'react';
import ManagerStorage from '../../../components/ManagerStorage';
import StorageDetails from '../../../components/StorageDetails';
import { Stock } from '../../../types';

// Mock data matching your Prisma schema
const mockStocks: Stock[] = [
  {
    id: 1,
    name: 'Thai Tea Mix',
    quantity: 50,
    category: 'DRINK',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: 'Tapioca Pearls',
    quantity: 5,
    category: 'TOPPING',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    name: 'Green Tea Leaves',
    quantity: 0,
    category: 'DRINK',
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    name: 'Coconut Jelly',
    quantity: 25,
    category: 'TOPPING',
    status: 'INACTIVE',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function ManagerStoragePage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    // Simulate API call
    const fetchStocks = async () => {
      try {
        setLoading(true);
        // In real app, this would be: const response = await fetch('/api/stock');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setStocks(mockStocks);
        setError(null);
      } catch (err) {
        setError('Failed to load stock items');
        console.error('Error fetching stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleUpdateStock = (stockId: number, updates: { quantity?: number; status?: Stock['status'] }) => {
    setStocks(prevStocks =>
      prevStocks.map(stock =>
        stock.id === stockId 
          ? { ...stock, ...updates, updatedAt: new Date() }
          : stock
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading stock items...</p>
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
      {selectedStock ? (
        <StorageDetails
          stock={selectedStock}
          onUpdateStock={handleUpdateStock}
          onClose={() => setSelectedStock(null)}
        />
      ) : (
        <ManagerStorage
          stocks={stocks}
          onSelectStock={setSelectedStock}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      )}
    </div>
  );
}
