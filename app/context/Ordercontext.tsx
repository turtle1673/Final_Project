"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface OrderItem {
  id: string;
  name: string;
  basePrice: number;
  sweetness?: string | null;
  type?: string | null;
  topping?: string | null;
  plasticglass?: string | null;
  quantity: number;
  totalPrice: number;
  image?: string;
}

interface OrderContextType {
  orders: OrderItem[];
  addOrder: (item: Omit<OrderItem, "id" | "totalPrice">) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  // ช่วยคำนวณราคาตาม options
  const toppingOptionsPrice = (topping?: string) => {
    const map: Record<string, number> = {
      topping1: 5,
      topping2: 5,
      topping3: 5,
    };
    return topping ? map[topping] || 0 : 0;
  };

  const typeOptionsPrice = (type?: string) => {
    const map: Record<string, number> = {
      hot: 0,
      cold: 0,
      blend: 5,
    };
    return type ? map[type] || 0 : 0;
  };

  const glassOptionsPrice = (glass?: string) => {
    const map: Record<string, number> = {
      S: 0,
      M: 5,
      L: 10,
    };
    return glass ? map[glass] || 0 : 0;
  };

  const addOrder = (item: Omit<OrderItem, "id" | "totalPrice">) => {
    const totalPrice =
      (item.basePrice +
        toppingOptionsPrice(item.topping) +
        typeOptionsPrice(item.type) +
        glassOptionsPrice(item.plasticglass)) *
      item.quantity;

    setOrders((prev) => [
      ...prev,
      { ...item, id: Date.now().toString(), totalPrice },
    ]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
};
