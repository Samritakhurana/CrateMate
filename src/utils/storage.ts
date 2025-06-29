import { Fruit, Alert } from '../types';

const STORAGE_KEYS = {
  FRUITS: 'cratemate_fruits',
  ALERTS: 'cratemate_alerts',
  SETTINGS: 'cratemate_settings'
};

export const saveFruits = (fruits: Fruit[]): void => {
  localStorage.setItem(STORAGE_KEYS.FRUITS, JSON.stringify(fruits));
};

export const loadFruits = (): Fruit[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.FRUITS);
  return stored ? JSON.parse(stored) : [];
};

export const saveAlerts = (alerts: Alert[]): void => {
  localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
};

export const loadAlerts = (): Alert[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.ALERTS);
  return stored ? JSON.parse(stored) : [];
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Auto-generate alerts for fruits
export const generateAlertsForFruit = (fruit: any): any[] => {
  const alerts = [];
  const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
  
  if (daysLeft <= 2 && daysLeft >= 0) {
    alerts.push({
      fruit_id: fruit.id,
      type: 'spoilage_warning',
      title: 'Fruit Expiring Soon',
      message: `${fruit.variety || fruit.fruit_type} will expire in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}. Consider prioritizing sales.`,
      priority: 'high',
      read: false
    });
  }
  
  if (daysLeft < 0) {
    alerts.push({
      fruit_id: fruit.id,
      type: 'expired',
      title: 'Fruit Expired',
      message: `${fruit.variety || fruit.fruit_type} expired ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''} ago. Remove from inventory immediately.`,
      priority: 'high',
      read: false
    });
  }
  
  return alerts;
};