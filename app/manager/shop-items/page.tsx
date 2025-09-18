'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShopItemsGrid from '../../../components/ShopItemsGrid';
// Showing drinks instead of ingredient stock items

interface ShopItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imgUrl?: string;
}

export default function ShopItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/drink');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data?.message || 'Failed to fetch drinks');
        }
        type DrinkApi = {
          id: number;
          name: string;
          price: number;
          img?: string;
          ingredients?: Array<{
            quantity: number; // required per schema
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

        const mapped: ShopItem[] = ((data || []) as DrinkApi[]).map((d) => ({
          id: d.id,
          name: String(d.name || ''),
          price: Number(d.price || 0),
          stock: computePossibleCups(d.ingredients),
          category: 'DRINK',
          imgUrl: d.img || undefined,
        }));
        setItems(mapped);
        setError(null);
      } catch (err) {
        setError('Failed to load drinks');
        console.error('Error fetching drinks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCreateItem = () => {
    router.push('/manager/item-form');
  };

  const handleEditItem = (itemId: number) => {
    router.push(`/manager/item-form?id=${itemId}`);
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      // In real app, this would be: await fetch(`/api/shop-items/${itemId}`, { method: 'DELETE' });
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item');
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shop items...</p>
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
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Shop Items</h1>
          <button
            onClick={handleCreateItem}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <span>➕</span>
            Create New Item
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ShopItemsGrid
          items={filteredItems}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      </div>
    </div>
  );
}
