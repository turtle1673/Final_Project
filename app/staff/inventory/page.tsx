'use client';
import { useState } from 'react';
import Storage from '../../../components/Storage';
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

export default function StaffStorage() {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleUpdateStock = (stockId: number, updates: { quantity?: number; status?: Stock['status'] }) => {
    setStocks(prevStocks =>
      prevStocks.map(stock =>
        stock.id === stockId 
          ? { ...stock, ...updates, updatedAt: new Date() }
          : stock
      )
    );
  };

 return (
    <div className="h-screen bg-gray-100 text-gray-600 ml-10">
      {selectedStock ? (
        <StorageDetails
          stock={selectedStock}
          onUpdateStock={handleUpdateStock}
          onClose={() => setSelectedStock(null)}
        />
      ) : (
        <Storage
          stocks={stocks}
          onSelectStock={setSelectedStock}
        />
      )}
    </div>
  );
}
