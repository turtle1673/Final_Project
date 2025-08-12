export interface Order {
  id: number;
  drinkname: string;
  type: string;
  topping: string;
  sweetness: 'SWEETEST' | 'NORMAL' | 'LESS' | 'NO_SUGAR';
  cupsize: 'SMALL' | 'MEDIUM' | 'LARGE';
  price: number;
  quantity: number;
  total: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string | null;
    email: string;
  };
  stocks: OrderStock[];
}

export interface OrderStock {
  orderId: number;
  stockId: number;
  stock: Stock;
}

export interface Stock {
  id: number;
  name: string;
  quantity: number;
  category: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  name: string | null;
  email: string;
  role: 'USER' | 'ADMIN';
}

// Helper functions for display
export const getSweetnessLabel = (sweetness: Order['sweetness']) => {
  switch (sweetness) {
    case 'SWEETEST': return '100% Sweet';
    case 'NORMAL': return 'Normal Sweet';
    case 'LESS': return 'Less Sweet';
    case 'NO_SUGAR': return 'No Sugar';
    default: return 'Normal Sweet';
  }
};

export const getCupSizeLabel = (cupsize: Order['cupsize']) => {
  switch (cupsize) {
    case 'SMALL': return 'Small';
    case 'MEDIUM': return 'Medium';
    case 'LARGE': return 'Large';
    default: return 'Medium';
  }
};
