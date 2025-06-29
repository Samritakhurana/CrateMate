import { PredictionData } from '../types';

// Papaya shelf-life prediction algorithm based on variety, condition, and storage
export const predictShelfLife = (data: PredictionData): number => {
  const baseShelfLife: Record<string, number> = {
    'red-lady': 7,
    'sunrise-solo': 6,
    'tainung': 8,
    'hawaiian': 5,
    'maradol': 9,
    'other': 6
  };

  const conditionMultiplier: Record<string, number> = {
    'excellent': 1.2,
    'good': 1.0,
    'fair': 0.8,
    'poor': 0.5
  };

  const storageMultiplier: Record<string, number> = {
    'refrigerated': 1.5,
    'cool-dry': 1.2,
    'room-temperature': 1.0,
    'outdoor': 0.7
  };

  const base = baseShelfLife[data.variety.toLowerCase()] || baseShelfLife['other'];
  const condition = conditionMultiplier[data.condition] || 1.0;
  const storage = storageMultiplier[data.storageMethod] || 1.0;

  // Temperature and humidity adjustments
  let tempAdjustment = 1.0;
  if (data.temperature) {
    if (data.temperature < 10) tempAdjustment = 1.3;
    else if (data.temperature > 30) tempAdjustment = 0.8;
  }

  let humidityAdjustment = 1.0;
  if (data.humidity) {
    if (data.humidity > 85) humidityAdjustment = 0.9;
    else if (data.humidity < 60) humidityAdjustment = 0.9;
  }

  const predicted = Math.round(base * condition * storage * tempAdjustment * humidityAdjustment);
  return Math.max(1, predicted); // Minimum 1 day
};

export const getStorageTips = (variety: string, storageMethod: string) => {
  const tips = [
    {
      id: '1',
      title: 'Optimal Temperature',
      description: `Store ${variety} papayas at 10-13°C for maximum shelf life`,
      category: 'temperature' as const,
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'Humidity Control',
      description: 'Maintain 85-90% relative humidity to prevent moisture loss',
      category: 'humidity' as const,
      priority: 'high' as const
    },
    {
      id: '3',
      title: 'Gentle Handling',
      description: 'Handle fruits carefully to avoid bruising which accelerates spoilage',
      category: 'handling' as const,
      priority: 'medium' as const
    },
    {
      id: '4',
      title: 'Proper Ventilation',
      description: 'Ensure good air circulation around stored fruits',
      category: 'packaging' as const,
      priority: 'medium' as const
    }
  ];

  if (storageMethod === 'refrigerated') {
    tips.push({
      id: '5',
      title: 'Refrigeration Tips',
      description: 'Store in perforated plastic bags to maintain humidity while allowing air flow',
      category: 'packaging' as const,
      priority: 'high' as const
    });
  }

  return tips;
};