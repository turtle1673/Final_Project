'use client';

interface ShopItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imgUrl?: string;
}

interface ShopItemsGridProps {
  items: ShopItem[];
  onEdit: (itemId: number) => void;
  onDelete: (itemId: number) => void;
}

export default function ShopItemsGrid({ items, onEdit, onDelete }: ShopItemsGridProps) {
  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'bg-red-500';
    if (stock <= 10) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStockStatusText = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 10) return 'Low Stock';
    return 'In Stock';
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'drink':
        return '🥤';
      case 'topping':
        return '🧋';
      default:
        return '📦';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {items.map(item => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Item Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
            {item.imgUrl ? (
              <img
                src={item.imgUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-2">{getCategoryIcon(item.category)}</div>
                <p className="text-sm text-gray-600 capitalize">{item.category}</p>
              </div>
            )}
            
            {/* Stock Status Indicator */}
            <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStockStatusColor(item.stock)}`}></div>
          </div>

          {/* Item Details */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Price:</span>
                <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stock:</span>
                <span className="font-medium text-gray-900">{item.stock}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.stock === 0
                    ? 'bg-red-100 text-red-800'
                    : item.stock <= 10
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {getStockStatusText(item.stock)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item.id)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛍️</div>
          <p className="text-gray-500">No shop items found</p>
        </div>
      )}
    </div>
  );
}
