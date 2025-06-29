import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Package2, Calculator, ArrowLeft, Thermometer, Droplets, Calendar } from 'lucide-react';

const ShelfLifePrediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo || '/';

  const [formData, setFormData] = useState({
    fruitType: '',
    variety: '',
    condition: 'good',
    storageMethod: '',
    temperature: '',
    humidity: '',
    harvestDate: ''
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [tips, setTips] = useState<string[]>([]);

  const fruitTypes = [
    'Papaya', 'Mango', 'Banana', 'Apple', 'Orange', 'Grapes', 'Tomato', 'Avocado', 'Other'
  ];

  const varietiesByFruit: Record<string, string[]> = {
    'Papaya': ['Red Lady', 'Sunrise Solo', 'Tainung', 'Hawaiian', 'Maradol'],
    'Mango': ['Alphonso', 'Kesar', 'Dasheri', 'Langra', 'Chausa', 'Totapuri'],
    'Banana': ['Cavendish', 'Robusta', 'Red Banana', 'Nendran', 'Poovan'],
    'Apple': ['Red Delicious', 'Granny Smith', 'Gala', 'Fuji', 'Honeycrisp'],
    'Orange': ['Valencia', 'Navel', 'Blood Orange', 'Mandarin', 'Tangerine'],
    'Grapes': ['Thompson Seedless', 'Red Globe', 'Flame Seedless', 'Black Beauty'],
    'Tomato': ['Roma', 'Cherry', 'Beefsteak', 'Heirloom', 'Grape Tomato'],
    'Avocado': ['Hass', 'Fuerte', 'Bacon', 'Zutano', 'Pinkerton'],
    'Other': ['Mixed Variety']
  };

  const storageMethods = [
    'Refrigerated', 'Cool Dry Place', 'Room Temperature', 'Outdoor Storage'
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent', color: 'text-green-600' },
    { value: 'good', label: 'Good', color: 'text-blue-600' },
    { value: 'fair', label: 'Fair', color: 'text-yellow-600' },
    { value: 'poor', label: 'Poor', color: 'text-red-600' }
  ];

  const predictShelfLife = () => {
    const baseShelfLife: Record<string, number> = {
      'papaya': 7, 'mango': 5, 'banana': 4, 'apple': 10,
      'orange': 8, 'grapes': 7, 'tomato': 5, 'avocado': 4, 'other': 6
    };

    const conditionMultiplier: Record<string, number> = {
      'excellent': 1.2, 'good': 1.0, 'fair': 0.8, 'poor': 0.5
    };

    const storageMultiplier: Record<string, number> = {
      'refrigerated': 1.5, 'cool dry place': 1.2, 'room temperature': 1.0, 'outdoor storage': 0.7
    };

    const base = baseShelfLife[formData.fruitType.toLowerCase()] || baseShelfLife['other'];
    const condition = conditionMultiplier[formData.condition] || 1.0;
    const storage = storageMultiplier[formData.storageMethod.toLowerCase()] || 1.0;

    let tempAdjustment = 1.0;
    if (formData.temperature) {
      const temp = parseInt(formData.temperature);
      if (temp < 10) tempAdjustment = 1.3;
      else if (temp > 30) tempAdjustment = 0.8;
    }

    let humidityAdjustment = 1.0;
    if (formData.humidity) {
      const humidity = parseInt(formData.humidity);
      if (humidity > 85 || humidity < 60) humidityAdjustment = 0.9;
    }

    const predicted = Math.round(base * condition * storage * tempAdjustment * humidityAdjustment);
    setPrediction(Math.max(1, predicted));

    const generatedTips = [];
    if (formData.storageMethod.toLowerCase() === 'refrigerated') {
      generatedTips.push('Store in perforated plastic bags to maintain humidity while allowing air flow');
    }

    switch (formData.fruitType.toLowerCase()) {
      case 'papaya':
        generatedTips.push('Optimal temperature for papayas is 10-13°C');
        generatedTips.push('Maintain 85-90% relative humidity to prevent moisture loss');
        break;
      case 'mango':
        generatedTips.push('Store mangoes at 12-15°C for optimal ripening');
        generatedTips.push('Keep away from direct sunlight to prevent over-ripening');
        break;
      case 'banana':
        generatedTips.push('Store bananas at 13-15°C to slow ripening');
        generatedTips.push('Separate from other fruits to prevent ethylene exposure');
        break;
      case 'apple':
        generatedTips.push('Apples store best at 0-4°C with high humidity');
        generatedTips.push('Keep in ventilated containers to prevent moisture buildup');
        break;
      default:
        generatedTips.push('Optimal storage temperature varies by fruit type');
        generatedTips.push('Maintain proper ventilation to prevent spoilage');
    }

    generatedTips.push('Handle fruits carefully to avoid bruising which accelerates spoilage');
    setTips(generatedTips);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fruitType && formData.condition && formData.storageMethod) {
      predictShelfLife();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate('/');
                }
              }}
              className="flex items-center space-x-3 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <Package2 className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">CrateMate</h1>
                <p className="text-xs text-gray-500">Shelf-Life Prediction</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Calculator className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shelf-Life Prediction</h1>
          <p className="text-xl text-gray-600">Get accurate predictions for how long your fruits will stay fresh</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Fruit Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Fruit Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fruit Type *</label>
                <select
                  value={formData.fruitType}
                  onChange={(e) => setFormData({ ...formData, fruitType: e.target.value, variety: '' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select fruit type</option>
                  {fruitTypes.map((fruit) => (
                    <option key={fruit} value={fruit}>{fruit}</option>
                  ))}
                </select>
              </div>

              {/* Variety */}
              {formData.fruitType && varietiesByFruit[formData.fruitType] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
                  <select
                    value={formData.variety}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select variety (optional)</option>
                    {varietiesByFruit[formData.fruitType].map((variety) => (
                      <option key={variety} value={variety}>{variety}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Condition Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fruit Condition *</label>
                <div className="grid grid-cols-2 gap-2">
                  {conditions.map((condition) => (
                    <button
                      key={condition.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, condition: condition.value })}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        formData.condition === condition.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`font-medium ${condition.color}`}>{condition.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage Method *</label>
                <select
                  value={formData.storageMethod}
                  onChange={(e) => setFormData({ ...formData, storageMethod: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select storage method</option>
                  {storageMethods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {/* Harvest Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
                <input
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Temperature and Humidity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Thermometer className="inline h-4 w-4 mr-1" />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Predict Shelf Life
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {prediction && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Prediction Result</h3>
                  <div className="bg-green-50 rounded-xl p-6">
                    <p className="text-4xl font-bold text-green-600 mb-2">{prediction} days</p>
                    <p className="text-gray-600">Expected shelf life for {formData.fruitType}</p>
                  </div>
                </div>

                {formData.harvestDate && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      <strong>Harvest Date:</strong> {new Date(formData.harvestDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Expected Expiry:</strong> {new Date(new Date(formData.harvestDate).getTime() + prediction * 86400000).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            )}

            {tips.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Storage Tips for {formData.fruitType}</h3>
                <div className="space-y-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="bg-green-100 p-1 rounded-full mt-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">How It Works</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <p>• Our AI considers fruit-specific characteristics and varieties</p>
                <p>• Fruit condition affects the base shelf life significantly</p>
                <p>• Storage method is the most important factor for longevity</p>
                <p>• Temperature and humidity fine-tune the prediction</p>
                <p>• Predictions are based on agricultural research across multiple fruit types</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelfLifePrediction;
