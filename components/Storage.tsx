'use client';
import { useState } from 'react';
import { Stock } from '../types';


interface Category {
  name: string;
  count: number;
}

interface StorageProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
}

export default function Storage({ stocks, onSelectStock }: StorageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Generate categories from stocks
  const categories: Category[] = [
    { name: 'all', count: stocks.length },
    ...Array.from(new Set(stocks.map(stock => stock.category)))
      .map(category => ({
        name: category,
        count: stocks.filter(stock => stock.category === category).length
      }))
  ];

  const filteredStocks = stocks.filter(stock => {
    const matchesCategory = selectedCategory === 'all' || stock.category === selectedCategory;
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStockStatusColor = (stock: Stock) => {
    if (stock.status === 'INACTIVE') return 'bg-gray-500';
    if (stock.quantity === 0) return 'bg-red-500';
    if (stock.quantity <= 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStockStatusText = (stock: Stock) => {
    if (stock.status === 'INACTIVE') return 'Inactive';
    if (stock.quantity === 0) return 'Out of Stock';
    if (stock.quantity <= 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Category Sidebar */}
      <div className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-4">
        <h3 className="font-medium text-gray-800 mb-4">Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-2">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category.name 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between">
                <span className="capitalize text-sm">{category.name === 'all' ? 'All Items' : category.name}</span>
                <span className="text-xs text-gray-500">{category.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search stock items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            Filters
          </button>
        </div>
        
        {/* Stock Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStocks.map(stock => (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className="bg-white border rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg p-4 aspect-square flex items-center justify-center mb-3">
                  <div className="text-center">
                    <div className="text-3xl mb-1">
                      {stock.category.toLowerCase().includes('drink') ? '🥤' : 
                       stock.category.toLowerCase().includes('topping') ? '🧋' : 
                       '📦'}
                    </div>
                    <p className="text-xs text-gray-600">{stock.category}</p>
                  </div>
                </div>
                
                {/* Stock Status Indicator */}
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${getStockStatusColor(stock)}`}></div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-1">{stock.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                Quantity: {stock.quantity}
              </p>
              
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stock.status === 'INACTIVE'
                    ? 'bg-gray-100 text-gray-800'
                    : stock.quantity === 0
                    ? 'bg-red-100 text-red-800'
                    : stock.quantity <= 10
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {getStockStatusText(stock)}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStock(stock);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStocks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No stock items found</p>
          </div>
        )}
      </div>
    </div>
  );
}
