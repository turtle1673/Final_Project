export interface Iitem {
  id: number;
  name: string;
  category: string;
  currentQuantity: number;
  maxQuantity: number;
  unit: string;
  status: 'OUT' | 'LOW' | 'OK';
  img: string;
  lastUpdated: string;
}
