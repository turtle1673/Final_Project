'use client';
import { useState, useEffect } from 'react';
import ManagerStorage from '../../../components/ManagerStorage';
import StorageDetails from '../../../components/StorageDetails';
import { Stock } from '../../../types';
import { Iitem } from '../../../types/item';

export default function ManagerStoragePage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const [stockRes, drinkRes] = await Promise.all([
          fetch('/api/stockItem'),
          fetch('/api/drink')
        ]);

        const [stockData, drinkData] = await Promise.all([
          stockRes.json(),
          drinkRes.json()
        ]);

        if (!stockRes.ok) {
          throw new Error(stockData?.message || 'Failed to fetch stock items');
        }
        if (!drinkRes.ok) {
          throw new Error(drinkData?.message || 'Failed to fetch drinks');
        }

        // Map API StockItem -> UI Stock
        const mappedStocks: Stock[] = ((stockData || []) as Iitem[]).map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.currentQuantity ?? 0,
          category: item.category,
          status: item.status === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
          createdAt: item.lastUpdated ? new Date(item.lastUpdated) : new Date(),
          updatedAt: item.lastUpdated ? new Date(item.lastUpdated) : new Date()
        }));

        // Map Drinks -> UI Stock-like entries with computed availability
        type DrinkApi = {
          id: number;
          name: string;
          createdAt?: string | Date;
          updatedAt?: string | Date;
          ingredients?: Array<{
            quantity: number;
            stockItem: { currentQuantity: number | null };
          }>;
        };

        const computePossibleCups = (ingredients?: DrinkApi['ingredients']): number => {
          if (!ingredients || ingredients.length === 0) return 0;
          let minCups = Infinity;
          for (const ing of ingredients) {
            const available = ing.stockItem.currentQuantity ?? 0;
            if (ing.quantity <= 0) continue;
            const possible = Math.floor(available / ing.quantity);
            if (possible < minCups) minCups = possible;
          }
          return Number.isFinite(minCups) ? minCups : 0;
        };

        const mappedDrinks: Stock[] = ((drinkData || []) as DrinkApi[]).map((drink) => ({
          id: -Number(drink.id || 0) || 0,
          name: String(drink.name || ''),
          quantity: computePossibleCups(drink.ingredients),
          category: 'DRINK',
          status: 'ACTIVE',
          createdAt: drink.createdAt ? new Date(drink.createdAt) : new Date(),
          updatedAt: drink.updatedAt ? new Date(drink.updatedAt) : new Date()
        }));

        setStocks([...mappedStocks, ...mappedDrinks]);
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
