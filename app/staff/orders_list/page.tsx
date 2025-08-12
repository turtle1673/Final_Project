'use client';
import { useState, useEffect } from 'react';
import OrderList from '../../../components/Orders';
import OrderDetails from '../../../components/OrderDetails';
import { Order } from '../../../types';

// Mock data matching your Prisma schema
const mockOrders: Order[] = [
  {
    id: 1,
    drinkname: 'Thai Tea',
    type: 'Cold',
    topping: 'Boba',
    sweetness: 'NORMAL',
    cupsize: 'LARGE',
    price: 4.50,
    quantity: 1,
    total: 4.50,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    },
    stocks: []
  },
  {
    id: 2,
    drinkname: 'Green Tea',
    type: 'Hot',
    topping: 'Jelly',
    sweetness: 'LESS',
    cupsize: 'MEDIUM',
    price: 3.50,
    quantity: 2,
    total: 7.00,
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    stocks: []
  }
];

export default function StaffOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateStatus = (orderId: number, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
      )
    );
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status, updatedAt: new Date() });
    }
  };

  return (
    <div className="w-900 flex h-screen bg-gray-100">
      <OrderList orders={orders} onSelectOrder={setSelectedOrder} />
      <OrderDetails order={selectedOrder} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}
