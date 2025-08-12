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
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-xl shadow-sm">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-500">Inventory Management</h1>
          <p className="text-muted-foreground mt-2 text-gray-500">
            {stocks.length} items across {new Set(stocks.map(s => s.category)).size} categories
          </p>
        </header>
        
        <div className="relative text-gray-500">
          <Storage
            stocks={stocks}
            onSelectStock={setSelectedStock}
          />
          
          {selectedStock && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 text-gray-500">
              <StorageDetails
                stock={selectedStock}
                onUpdateStock={handleUpdateStock}
                onClose={() => setSelectedStock(null)}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
