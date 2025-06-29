import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Package2,
  ArrowLeft,
  Lightbulb,
  Thermometer,
  Droplets,
  Package,
  Clock,
  Star
} from 'lucide-react';

interface StorageTip {
  id: string;
  title: string;
  description: string;
  category: 'temperature' | 'humidity' | 'handling' | 'packaging' | 'timing';
  priority: 'high' | 'medium' | 'low';
  fruitType?: string;
  icon: any;
}

const StorageTips = () => {
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/';
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFruitType, setSelectedFruitType] = useState('all');

const tips: StorageTip[] = [
  {
    id: '1',
    title: 'Optimal Temperature Range for Papayas',
    description: 'Store papayas at 10-13°C (50-55°F) for maximum shelf life. Temperatures below 7°C can cause chilling injury.',
    category: 'temperature',
    priority: 'high',
    fruitType: 'Papaya',
    icon: Thermometer
  },
  {
    id: '2',
    title: 'Mango Storage Temperature',
    description: 'Store mangoes at 12-15°C for optimal ripening. Avoid refrigeration until fully ripe to prevent flavor loss.',
    category: 'temperature',
    priority: 'high',
    fruitType: 'Mango',
    icon: Thermometer
  },
  {
    id: '3',
    title: 'Banana Temperature Control',
    description: 'Store bananas at 13-15°C to slow ripening. Never refrigerate green bananas as it stops ripening process.',
    category: 'temperature',
    priority: 'high',
    fruitType: 'Banana',
    icon: Thermometer
  },
  {
    id: '4',
    title: 'Apple Cold Storage',
    description: 'Apples store best at 0-4°C with 90-95% humidity. Can maintain quality for several months under proper conditions.',
    category: 'temperature',
    priority: 'high',
    fruitType: 'Apple',
    icon: Thermometer
  },
  {
    id: '5',
    title: 'Universal Humidity Control',
    description: 'Maintain 85-90% relative humidity for most fruits to prevent moisture loss and skin shriveling.',
    category: 'humidity',
    priority: 'high',
    icon: Droplets
  },
  {
    id: '6',
    title: 'Gentle Handling for All Fruits',
    description: 'Handle all fruits carefully to avoid bruising. Even small bruises can accelerate spoilage significantly.',
    category: 'handling',
    priority: 'high',
    icon: Package
  },
  {
    id: '7',
    title: 'Citrus Fruit Storage',
    description: 'Store oranges and citrus fruits at 3-9°C with good ventilation. Avoid plastic bags that trap moisture.',
    category: 'temperature',
    priority: 'medium',
    fruitType: 'Orange',
    icon: Thermometer
  },
  {
    id: '8',
    title: 'Grape Storage Conditions',
    description: 'Store grapes at 0-2°C with 90-95% humidity. Keep in perforated bags to maintain moisture while allowing air flow.',
    category: 'temperature',
    priority: 'medium',
    fruitType: 'Grapes',
    icon: Thermometer
  },
  {
    id: '9',
    title: 'Tomato Ripening Control',
    description: 'Store green tomatoes at 12-15°C to ripen slowly. Ripe tomatoes should be kept at 10-12°C.',
    category: 'temperature',
    priority: 'medium',
    fruitType: 'Tomato',
    icon: Thermometer
  },
  {
    id: '10',
    title: 'Avocado Storage Strategy',
    description: 'Store unripe avocados at room temperature. Once ripe, refrigerate at 4-7°C to slow further ripening.',
    category: 'temperature',
    priority: 'medium',
    fruitType: 'Avocado',
    icon: Thermometer
  },
  {
    id: '11',
    title: 'Proper Ventilation',
    description: 'Ensure good air circulation around stored fruits. Avoid overcrowding to prevent heat buildup and uneven ripening.',
    category: 'packaging',
    priority: 'medium',
    icon: Package2
  },
  {
    id: '12',
    title: 'Packaging Materials',
    description: 'Use food-grade plastic crates with ventilation holes. Avoid metal containers which can cause temperature fluctuations.',
    category: 'packaging',
    priority: 'medium',
    icon: Package
  },
  {
    id: '13',
    title: 'Ethylene Management',
    description: 'Keep ethylene-sensitive fruits away from ethylene producers like bananas and apples to slow ripening.',
    category: 'handling',
    priority: 'medium',
    icon: Package2
  },
  {
    id: '14',
    title: 'Daily Inspection',
    description: 'Check stored fruits daily and remove any showing signs of decay to prevent spread to healthy fruits.',
    category: 'timing',
    priority: 'high',
    icon: Clock
  },
  {
    id: '15',
    title: 'Harvest Timing',
    description: 'Harvest fruits at optimal maturity for longer storage life. Over-ripe fruits should be sold immediately.',
    category: 'timing',
    priority: 'high',
    icon: Clock
  }
];


  const categories = [
    { value: 'all', label: 'All Tips', icon: Lightbulb },
    { value: 'temperature', label: 'Temperature', icon: Thermometer },
    { value: 'humidity', label: 'Humidity', icon: Droplets },
    { value: 'handling', label: 'Handling', icon: Package },
    { value: 'packaging', label: 'Packaging', icon: Package2 },
    { value: 'timing', label: 'Timing', icon: Clock }
  ];

  const fruitTypes = ['all', 'Papaya', 'Mango', 'Banana', 'Apple', 'Orange', 'Grapes', 'Tomato', 'Avocado'];

  const filteredTips = tips.filter(tip => {
    const categoryMatch = selectedCategory === 'all' || tip.category === selectedCategory;
    const fruitMatch = selectedFruitType === 'all' || !tip.fruitType || tip.fruitType === selectedFruitType;
    return categoryMatch && fruitMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'temperature':
        return 'bg-red-50 border-red-200';
      case 'humidity':
        return 'bg-blue-50 border-blue-200';
      case 'handling':
        return 'bg-green-50 border-green-200';
      case 'packaging':
        return 'bg-purple-50 border-purple-200';
      case 'timing':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <Package2 className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CrateMate</h1>
                <p className="text-xs text-gray-500">Storage Tips</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Lightbulb className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Smart Storage Tips</h1>
          <p className="text-xl text-gray-600">Expert recommendations to maximize shelf life for all types of fruits</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Category</label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Fruit Type</label>
              <select
                value={selectedFruitType}
                onChange={(e) => setSelectedFruitType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {fruitTypes.map((fruit) => (
                  <option key={fruit} value={fruit}>
                    {fruit === 'all' ? 'All Fruit Types' : fruit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 p-6 hover:shadow-md transition-shadow ${getCategoryColor(tip.category)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg">{tip.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(tip.priority)}`}>
                        {tip.priority.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{tip.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 capitalize">{tip.category.replace('_', ' ')}</span>
                      {tip.fruitType && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {tip.fruitType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTips.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Lightbulb className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">No tips found</p>
            <p className="text-gray-500">Try adjusting your filters to see more storage tips</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 mt-12 text-white">
          <div className="text-center mb-8">
            <Star className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quick Reference Guide</h2>
            <p className="text-green-100">Essential storage parameters for different fruits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Temperature</p>
              <p className="text-sm text-green-100">Varies by fruit type</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Humidity</p>
              <p className="text-sm text-green-100">85-95% for most fruits</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <Package className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Handling</p>
              <p className="text-sm text-green-100">Gentle Care Always</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p className="font-semibold">Inspection</p>
              <p className="text-sm text-green-100">Daily Check Required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorageTips;
