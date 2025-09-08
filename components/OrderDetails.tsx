'use client';
import { Order, getSweetnessLabel, getCupSizeLabel } from '../types';

interface OrderDetailsProps {
  order: Order | null;
  onUpdateStatus: (orderId: number, status: Order['status']) => void;
}

export default function OrderDetails({ order, onUpdateStatus }: OrderDetailsProps) {
  if (!order) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-8xl mb-6">🧋</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Select an Order</h3>
          <p className="text-gray-500">Choose an order from the list to view details and manage its status</p>
        </div>
      </div>
    );
  }

  const getDrinkIcon = (drinkname: string) => {
    if (drinkname.toLowerCase().includes('tea')) return '🧋';
    if (drinkname.toLowerCase().includes('coffee')) return '☕';
    if (drinkname.toLowerCase().includes('smoothie')) return '🥤';
    return '🥤';
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'CANCELLED': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return '⏳';
      case 'COMPLETED': return '✅';
      case 'CANCELLED': return '❌';
      default: return '📋';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto h-full">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-3xl">
                  {getDrinkIcon(order.drinkname)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
                  <p className="text-gray-600 font-medium">{order.user.name || order.user.email}</p>
                  <p className="text-sm text-gray-500">
                    Placed at {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold ${getStatusColor(order.status)}`}>
                  <span className="text-lg">{getStatusIcon(order.status)}</span>
                  {order.status}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-140px)]">
          {/* Left Side - Drink Visualization and Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="h-full flex flex-col">
              {/* Drink Visualization */}
              <div className="flex-1 flex flex-col items-center justify-center mb-6">
                <div className="w-48 h-48 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                  <div className="text-center">
                    <div className="text-8xl mb-2">{getDrinkIcon(order.drinkname)}</div>
                    <div className="w-16 h-2 bg-gradient-to-r from-orange-300 to-pink-300 rounded-full mx-auto"></div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{order.drinkname}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span>🌡️</span> {order.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📏</span> {getCupSizeLabel(order.cupsize)}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🍯</span> {getSweetnessLabel(order.sweetness)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onUpdateStatus(order.id, 'PENDING')}
                    disabled={order.status === 'PENDING'}
                    className="px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>⏳</span>
                    Start Making
                  </button>
                  <button
                    onClick={() => onUpdateStatus(order.id, 'CANCELLED')}
                    disabled={order.status === 'CANCELLED' || order.status === 'COMPLETED'}
                    className="px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>❌</span>
                    Cancel
                  </button>
                </div>
                
                <button
                  onClick={() => onUpdateStatus(order.id, 'COMPLETED')}
                  disabled={order.status === 'COMPLETED' || order.status === 'CANCELLED'}
                  className="w-full px-4 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>✅</span>
                  Mark as Completed
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Side - Order Details */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📋</span>
                Order Summary
              </h3>
              
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-900 text-lg">{order.drinkname}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    x{order.quantity}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">🌡️</span>
                    <span className="font-medium">{order.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📏</span>
                    <span className="font-medium">{getCupSizeLabel(order.cupsize)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">🍯</span>
                    <span className="font-medium">{getSweetnessLabel(order.sweetness)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">🧋</span>
                    <span className="font-medium">{order.topping || 'None'}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Unit Price:</span>
                    <span className="font-medium">${order.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>👤</span>
                Customer Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.user.name || 'Customer'}</p>
                    <p className="text-sm text-gray-600">{order.user.email}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Order Time:</span> {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Last Updated:</span> {new Date(order.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredients Card */}
            {order.stocks && order.stocks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🥤</span>
                  Required Ingredients
                </h3>
                
                <div className="space-y-3">
                  {order.stocks.map((orderStock) => (
                    <div key={orderStock.stockId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{orderStock.stock.name}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        orderStock.stock.status === 'ACTIVE' && orderStock.stock.quantity > 0
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {orderStock.stock.status === 'ACTIVE' && orderStock.stock.quantity > 0 ? '✅ Available' : '❌ Out of Stock'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
