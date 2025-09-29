"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  sweetness: string;
  type: string;
  topping: string | null;
  plasticglass: string;
  quantity: number;
  image: string;
  totalPrice: number;
  orderStatus?: 'PENDING' | 'COMPLETED' | 'CANCELLED' | null;
  orderId?: number | null;
}

export interface SubmittedOrder {
  id: number;
  name: string;
  basePrice: number;
  sweetness: string;
  type: string;
  topping: string | null;
  plasticglass: string;
  quantity: number;
  image: string;
  totalPrice: number;
  orderStatus: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  orderDate: string;
  drinkId: number;
}

interface OrderContextType {
  cartItems: CartItem[];
  submittedOrders: SubmittedOrder[];
  addOrder: (item: Omit<CartItem, 'id'>) => void;
  updateOrder: (id: string, updates: Partial<CartItem>) => void;
  removeOrder: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartTotalItems: () => number;
  fetchSubmittedOrders: () => Promise<void>;
  updateOrderStatus: (orderId: number, status: 'PENDING' | 'COMPLETED' | 'CANCELLED') => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [submittedOrders, setSubmittedOrders] = useState<SubmittedOrder[]>([]);

  // โหลดข้อมูลจาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    const savedCart = localStorage.getItem('smoothieCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // โหลดข้อมูล orders ที่เคยส่งไปแล้ว
  useEffect(() => {
    fetchSubmittedOrders();
  }, []);

  // บันทึกข้อมูลลง localStorage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem('smoothieCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const addOrder = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: generateId(),
    };
    setCartItems(prev => [...prev, newItem]);
  };

  const updateOrder = (id: string, updates: Partial<CartItem>) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const removeOrder = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getCartTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const fetchSubmittedOrders = async () => {
    try {
      const response = await fetch('/api/order');
      if (response.ok) {
        const orders = await response.json();
        setSubmittedOrders(orders);
      }
    } catch (error) {
      console.error('Error fetching submitted orders:', error);
    }
  };

  const updateOrderStatus = (orderId: number, status: 'PENDING' | 'COMPLETED' | 'CANCELLED') => {
    setSubmittedOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, orderStatus: status } : order
      )
    );
  };

  const value: OrderContextType = {
    cartItems,
    submittedOrders,
    addOrder,
    updateOrder,
    removeOrder,
    clearCart,
    getTotalPrice,
    getCartTotalItems,
    fetchSubmittedOrders,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
