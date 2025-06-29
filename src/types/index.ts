export interface Fruit {
  id: string;
  variety: string;
  quantity: number;
  harvestDate: string;
  storageMethod: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  shelfLifeDays: number;
  expiryDate: string;
  status: 'fresh' | 'warning' | 'expired';
  location?: string;
}

export interface StorageTip {
  id: string;
  title: string;
  description: string;
  category: 'temperature' | 'humidity' | 'handling' | 'packaging';
  priority: 'high' | 'medium' | 'low';
}

export interface Alert {
  id: string;
  fruitId: string;
  type: 'spoilage_warning' | 'expired' | 'storage_tip';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PredictionData {
  variety: string;
  condition: string;
  storageMethod: string;
  temperature?: number;
  humidity?: number;
}