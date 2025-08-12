'use client';
import { useState } from 'react';
import { Stock } from '../types';

interface StorageDetailsProps {
  stock: Stock | null;
  onUpdateStock: (stockId: number, updates: { quantity?: number; status?: Stock['status'] }) => void;
  onClose: () => void;
}

export default function StorageDetails({ stock, onUpdateStock, onClose }: StorageDetailsProps) {
  const [quantity, setQuantity] = useState(stock?.quantity || 0);
  const [status, setStatus] = useState<Stock['status']>(stock?.status || 'ACTIVE');

  if (!stock) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm border h-full flex items-center justify-center">
          <p className="text-gray-500">Select a stock item to manage</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdateStock(stock.id, { quantity, status });
    onClose();
  };

  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-sm border h-full">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Manage Stock</h2>
            <p className="text-sm text-gray-600">{stock.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Item Display */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">
                  {stock.category.toLowerCase().includes('drink') ? '🥤' : 
                   stock.category.toLowerCase().includes('topping') ? '🧋' : 
                   '📦'}
                </div>
                <p className="text-sm text-gray-600">{stock.category}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-center">{stock.name}</h3>
            <p className="text-center text-gray-600">Category: {stock.category}</p>
          </div>
          
          {/* Right Side - Stock Management */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-4">Current Status</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Quantity:</span>
                  <span className="font-medium">{stock.quantity}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stock.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {stock.status}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="text-sm text-gray-600">
                    {new Date(stock.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Stock Update Form */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Update Stock</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => setQuantity(quantity + 10)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                    >
                      +10
                    </button>
                    <button
                      onClick={() => setQuantity(Math.max(0, quantity - 1))}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                    >
                      -1
                    </button>
                    <button
                      onClick={() => setQuantity(Math.max(0, quantity - 10))}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                    >
                      -10
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Stock['status'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}