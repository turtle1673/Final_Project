'use client';
import { useState } from 'react';
import { Order } from '../types';

interface OrderListProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export default function OrderList({ orders, onSelectOrder }: OrderListProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'ALL' | Order['status']>('ALL');

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CANCELLED': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
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

  const getDrinkIcon = (drinkname: string) => {
    if (drinkname.toLowerCase().includes('tea')) return '🧋';
    if (drinkname.toLowerCase().includes('coffee')) return '☕';
    if (drinkname.toLowerCase().includes('smoothie')) return '🥤';
    return '🥤';
  };

  const filteredOrders = filterStatus === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleOrderSelect = (order: Order) => {
    setSelectedOrderId(order.id);
    onSelectOrder(order);
  };

  const statusCounts = {
    ALL: orders.length,
    PENDING: orders.filter(o => o.status === 'PENDING').length,
    COMPLETED: orders.filter(o => o.status === 'COMPLETED').length,
    CANCELLED: orders.filter(o => o.status === 'CANCELLED').length,
  };

  return (
    <div className="w-160 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📋</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Queue</h2>
            <p className="text-sm text-gray-600">{filteredOrders.length} orders</p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          {(['ALL', 'PENDING', 'COMPLETED', 'CANCELLED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                filterStatus === status
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
              <span className="ml-1 text-xs opacity-75">
                ({statusCounts[status]})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleOrderSelect(order)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedOrderId === order.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg flex items-center justify-center text-2xl">
                    {getDrinkIcon(order.drinkname)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">#{order.id}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      {order.user.name || order.user.email.split('@')[0]}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(order.status)} flex items-center gap-1`}>
                    <span>{getStatusIcon(order.status)}</span>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Drink Details */}
              <div className="bg-gray-160 rounded-lg p-3 mb-3">
                <h4 className="font-bold text-gray-900 mb-2">{order.drinkname}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">🌡️</span>
                    <span className="font-medium text-gray-500">{order.type}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">📏</span>
                    <span className="font-medium text-gray-500">{order.cupsize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">🍯</span>
                    <span className="font-medium text-gray-500">{order.sweetness}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">🧋</span>
                    <span className="font-medium text-gray-500">{order.topping || 'None'}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Qty:</span>
                  <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-full text-sm">
                    {order.quantity}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">${order.price.toFixed(2)} each</p>
                </div>
              </div>

              {/* Priority Indicator for Pending Orders */}
              {order.status === 'PENDING' && (
                <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-500 font-medium">No {filterStatus.toLowerCase()} orders</p>
              <p className="text-sm text-gray-400 mt-1">Orders will appear here when customers place them</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-amber-600">{statusCounts.PENDING}</p>
            <p className="text-xs text-gray-600">Pending</p>
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-600">{statusCounts.COMPLETED}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-600">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </p>
            <p className="text-xs text-gray-600">Total Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
}
