import React, { useState } from 'react';
import { Package2, Calendar, Thermometer, Droplets } from 'lucide-react';
import { predictShelfLife, getStorageTips } from '../utils/predictions';
import toast from 'react-hot-toast';

interface AddFruitProps {
  onAddFruit: (fruit: any) => void;
  onViewChange: (view: string) => void;
}

const AddFruit: React.FC<AddFruitProps> = ({ onAddFruit, onViewChange }) => {
  const [formData, setFormData] = useState({
    fruit_type: 'Papaya',
    variety: '',
    quantity: '',
    harvest_date: '',
    storage_method: '',
    condition: 'good' as const,
    location: '',
    temperature: '',
    humidity: '',
    notes: ''
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [tips, setTips] = useState<any[]>([]);

  const varieties = [
    'Red Lady',
    'Sunrise Solo',
    'Tainung',
    'Hawaiian',
    'Maradol',
    'Other'
  ];

  const storageMethods = [
    'Refrigerated',
    'Cool Dry Place',
    'Room Temperature',
    'Outdoor Storage'
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent', color: 'text-green-600' },
    { value: 'good', label: 'Good', color: 'text-blue-600' },
    { value: 'fair', label: 'Fair', color: 'text-yellow-600' },
    { value: 'poor', label: 'Poor', color: 'text-red-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Auto-predict when key fields are filled
    if (newFormData.variety && newFormData.condition && newFormData.storage_method) {
      const predictionData = {
        variety: newFormData.variety,
        condition: newFormData.condition,
        storageMethod: newFormData.storage_method.toLowerCase().replace(' ', '-'),
        temperature: newFormData.temperature ? parseInt(newFormData.temperature) : undefined,
        humidity: newFormData.humidity ? parseInt(newFormData.humidity) : undefined
      };
      
      const shelfLife = predictShelfLife(predictionData);
      setPrediction(shelfLife);
      setTips(getStorageTips(newFormData.variety, predictionData.storageMethod));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fruit_type || !formData.quantity || !formData.harvest_date || !formData.storage_method) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const shelfLifeDays = prediction || 7;
      const harvestDate = new Date(formData.harvest_date);
      const expiryDate = new Date(harvestDate);
      expiryDate.setDate(expiryDate.getDate() + shelfLifeDays);

      const newFruit = {
        fruit_type: formData.fruit_type,
        variety: formData.variety || null,
        quantity: parseInt(formData.quantity),
        harvest_date: formData.harvest_date,
        storage_method: formData.storage_method.toLowerCase().replace(' ', '-'),
        condition: formData.condition,
        shelf_life_days: shelfLifeDays,
        expiry_date: expiryDate.toISOString().split('T')[0],
        status: 'fresh',
        location: formData.location || null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        humidity: formData.humidity ? parseFloat(formData.humidity) : null,
        notes: formData.notes || null
      };

      await onAddFruit(newFruit);
      
      // Reset form
      setFormData({
        fruit_type: 'Papaya',
        variety: '',
        quantity: '',
        harvest_date: '',
        storage_method: '',
        condition: 'good',
        location: '',
        temperature: '',
        humidity: '',
        notes: ''
      });
      setPrediction(null);
      setTips([]);
      
      // Navigate to dashboard
      onViewChange('dashboard');
    } catch (error) {
      console.error('Error adding fruit:', error);
      toast.error('Failed to add fruit. Please try again.');
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-3">
        <Package2 className="h-6 w-6 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-900">Add New Fruit</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fruit Type *
              </label>
              <select
                value={formData.fruit_type}
                onChange={(e) => handleInputChange('fruit_type', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="Papaya">Papaya</option>
                <option value="Mango">Mango</option>
                <option value="Banana">Banana</option>
                <option value="Apple">Apple</option>
                <option value="Orange">Orange</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variety
              </label>
              <select
                value={formData.variety}
                onChange={(e) => handleInputChange('variety', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select variety</option>
                {varieties.map((variety) => (
                  <option key={variety} value={variety}>{variety}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (pieces) *
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter number of fruits"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harvest Date *
              </label>
              <input
                type="date"
                value={formData.harvest_date}
                onChange={(e) => handleInputChange('harvest_date', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Warehouse A, Cold Storage 1"
              />
            </div>
          </div>
        </div>

        {/* Storage & Condition */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Storage & Condition</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Storage Method *
              </label>
              <select
                value={formData.storage_method}
                onChange={(e) => handleInputChange('storage_method', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select storage method</option>
                {storageMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fruit Condition *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {conditions.map((condition) => (
                  <button
                    key={condition.value}
                    type="button"
                    onClick={() => handleInputChange('condition', condition.value)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      formData.condition === condition.value
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={`font-medium ${condition.color}`}>
                      {condition.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Thermometer className="inline h-4 w-4 mr-1" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Droplets className="inline h-4 w-4 mr-1" />
                  Humidity (%)
                </label>
                <input
                  type="number"
                  value={formData.humidity}
                  onChange={(e) => handleInputChange('humidity', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Optional"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Additional notes about the fruit..."
              />
            </div>
          </div>
        </div>

        {/* Prediction Results */}
        {prediction && (
          <div className="bg-green-50 rounded-xl border border-green-200 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
              <h2 className="text-lg font-semibold text-green-900">Shelf-Life Prediction</h2>
            </div>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-2xl font-bold text-green-600 mb-2">{prediction} days</p>
              <p className="text-sm text-gray-600">
                Expected shelf life based on variety, condition, and storage method
              </p>
            </div>

            {tips.length > 0 && (
              <div>
                <h3 className="font-medium text-green-900 mb-2">Storage Tips:</h3>
                <div className="space-y-2">
                  {tips.slice(0, 2).map((tip) => (
                    <div key={tip.id} className="bg-white rounded-lg p-3">
                      <p className="font-medium text-gray-900 text-sm">{tip.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => onViewChange('dashboard')}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Add Fruit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFruit;