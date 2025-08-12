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

  const getStockStatusText = (stock: Stock) => {
    if (stock.status === 'INACTIVE') return 'Inactive';
    if (stock.quantity === 0) return 'Out of Stock';
    if (stock.quantity <= 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="flex h-full">
      {/* Category Sidebar */}
      <div className="w-64 bg-white border-r p-4">
        <h3 className="font-medium text-gray-800 mb-4">Categories</h3>
        <div className="space-y-2">
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
                <span className="capitalize">{category.name === 'all' ? 'All Items' : category.name}</span>
                <span className="text-sm text-gray-500">{category.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
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
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            Filters
          </button>
        </div>
        
        {/* Stock Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStocks.map(stock => (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className="group bg-card border border-border rounded-xl p-4 hover:border-primary/30 cursor-pointer transition-all duration-200 hover:shadow-sm relative"
            >
              <div className="relative">
                <div className="bg-gradient-to-br rounded-xl p-4 aspect-square flex items-center justify-center mb-3">
                  <div className="text-center space-y-1">
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform text-gray-500">
                      {stock.category.toLowerCase().includes('drink') ? '🥤' :
                       stock.category.toLowerCase().includes('topping') ? '🧋' :
                       '📦'}
                    </div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {stock.category}
                    </p>
                  </div>
                </div>
                
                {/* Stock Status Indicator */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  stock.status === 'INACTIVE'
                    ? 'bg-muted text-muted-foreground'
                    : stock.quantity === 0
                    ? 'bg-destructive/20 text-destructive'
                    : stock.quantity <= 10
                    ? 'bg-warning/20 text-warning'
                    : 'bg-success/20 text-success'
                }`}>
                  {getStockStatusText(stock)}
                </div>
              </div>
              
              <h4 className="font-semibold text-foreground mb-1 truncate">{stock.name}</h4>
              
              <div className="flex justify-between items-center mt-3">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground text-lg mr-1">
                      {stock.quantity}
                    </span>
                    units available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {new Date(stock.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStock(stock);
                  }}
                  className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium flex items-center gap-1.5"
                >
                  <span>Manage</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
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
