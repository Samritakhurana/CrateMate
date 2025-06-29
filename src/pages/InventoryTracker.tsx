import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package2, ArrowLeft, Plus, Search, Filter, Calendar, MapPin, AlertTriangle, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface Fruit {
  id: string;
  fruitType: string;
  variety: string;
  quantity: number;
  harvestDate: string;
  storageMethod: string;
  condition: string;
  shelfLifeDays: number;
  expiryDate: string;
  location?: string;
}

const InventoryTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo || '/';
  
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('expiryDate');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFruit, setNewFruit] = useState({
    fruitType: '',
    variety: '',
    quantity: '',
    harvestDate: '',
    storageMethod: '',
    condition: 'good',
    location: ''
  });

  // Load sample data on component mount
  useEffect(() => {
    const sampleFruits: Fruit[] = [
      {
        id: '1',
        fruitType: 'Papaya',
        variety: 'Red Lady',
        quantity: 50,
        harvestDate: '2025-01-15',
        storageMethod: 'Refrigerated',
        condition: 'excellent',
        shelfLifeDays: 8,
        expiryDate: '2025-01-23',
        location: 'Cold Storage A'
      },
      {
        id: '2',
        fruitType: 'Mango',
        variety: 'Alphonso',
        quantity: 30,
        harvestDate: '2025-01-18',
        storageMethod: 'Cool Dry Place',
        condition: 'good',
        shelfLifeDays: 6,
        expiryDate: '2025-01-24',
        location: 'Warehouse B'
      },
      {
        id: '3',
        fruitType: 'Banana',
        variety: 'Cavendish',
        quantity: 25,
        harvestDate: '2025-01-10',
        storageMethod: 'Room Temperature',
        condition: 'fair',
        shelfLifeDays: 4,
        expiryDate: '2025-01-14',
        location: 'Storage Room 1'
      },
      {
        id: '4',
        fruitType: 'Apple',
        variety: 'Granny Smith',
        quantity: 40,
        harvestDate: '2025-01-12',
        storageMethod: 'Refrigerated',
        condition: 'excellent',
        shelfLifeDays: 12,
        expiryDate: '2025-01-24',
        location: 'Cold Storage B'
      }
    ];
    setFruits(sampleFruits);
  }, []);

  const getDaysUntilExpiry = (expiryDate: string): number => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (fruit: Fruit) => {
    const daysLeft = getDaysUntilExpiry(fruit.expiryDate);
    if (daysLeft < 0) return 'bg-red-100 text-red-800 border-red-200';
    if (daysLeft <= 2) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStatusText = (fruit: Fruit) => {
    const daysLeft = getDaysUntilExpiry(fruit.expiryDate);
    if (daysLeft < 0) return `Expired ${Math.abs(daysLeft)} day${Math.abs(daysLeft) > 1 ? 's' : ''} ago`;
    if (daysLeft === 0) return 'Expires today';
    if (daysLeft <= 2) return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
    return `${daysLeft} days left`;
  };

  const filteredFruits = fruits
    .filter(fruit => {
      const matchesSearch = fruit.fruitType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fruit.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (fruit.location && fruit.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (filterStatus === 'all') return matchesSearch;
      
      const daysLeft = getDaysUntilExpiry(fruit.expiryDate);
      if (filterStatus === 'fresh') return matchesSearch && daysLeft > 2;
      if (filterStatus === 'warning') return matchesSearch && daysLeft <= 2 && daysLeft >= 0;
      if (filterStatus === 'expired') return matchesSearch && daysLeft < 0;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'expiryDate') {
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      }
      if (sortBy === 'fruitType') {
        return a.fruitType.localeCompare(b.fruitType);
      }
      if (sortBy === 'quantity') {
        return b.quantity - a.quantity;
      }
      return 0;
    });

  const handleAddFruit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFruit.fruitType || !newFruit.quantity || !newFruit.harvestDate || !newFruit.storageMethod) {
      alert('Please fill in all required fields');
      return;
    }

    const shelfLifeDays = 7; // Default shelf life
    const harvestDate = new Date(newFruit.harvestDate);
    const expiryDate = new Date(harvestDate);
    expiryDate.setDate(expiryDate.getDate() + shelfLifeDays);

    const fruit: Fruit = {
      id: Date.now().toString(),
      fruitType: newFruit.fruitType,
      variety: newFruit.variety || 'Mixed',
      quantity: parseInt(newFruit.quantity),
      harvestDate: newFruit.harvestDate,
      storageMethod: newFruit.storageMethod,
      condition: newFruit.condition,
      shelfLifeDays,
      expiryDate: expiryDate.toISOString().split('T')[0],
      location: newFruit.location || undefined
    };

    setFruits([...fruits, fruit]);
    setNewFruit({
      fruitType: '',
      variety: '',
      quantity: '',
      harvestDate: '',
      storageMethod: '',
      condition: 'good',
      location: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteFruit = (id: string) => {
    if (confirm('Are you sure you want to delete this fruit entry?')) {
      setFruits(fruits.filter(fruit => fruit.id !== id));
    }
  };

  const totalQuantity = filteredFruits.reduce((sum, fruit) => sum + fruit.quantity, 0);
  const expiringSoon = filteredFruits.filter(fruit => {
    const daysLeft = getDaysUntilExpiry(fruit.expiryDate);
    return daysLeft <= 2 && daysLeft >= 0;
  }).length;

  const fruitTypes = ['Papaya', 'Mango', 'Banana', 'Apple', 'Orange', 'Grapes', 'Tomato', 'Avocado'];
  const storageMethods = ['Refrigerated', 'Cool Dry Place', 'Room Temperature', 'Outdoor Storage'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between py-4">
      <button
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1); // Go back to previous page
          } else {
            navigate('/'); // Fallback to home
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
          <p className="text-xs text-gray-500">Inventory Tracker</p>
        </div>
      </div>
    </div>
  </div>
</header>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Tracker</h1>
            <p className="text-gray-600 mt-2">
              {filteredFruits.length} items • {totalQuantity} total fruits
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Fruit</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-3xl font-bold text-blue-600">{filteredFruits.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Total Fruits</p>
            <p className="text-3xl font-bold text-green-600">{totalQuantity}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-600">Expiring Soon</p>
            <p className="text-3xl font-bold text-orange-600">{expiringSoon}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by fruit type, variety, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="fresh">Fresh</option>
              <option value="warning">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="expiryDate">Sort by Expiry Date</option>
              <option value="fruitType">Sort by Fruit Type</option>
              <option value="quantity">Sort by Quantity</option>
            </select>
          </div>
        </div>

        {/* Inventory List */}
        <div className="space-y-4">
          {filteredFruits.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Package2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">No fruits found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredFruits.map((fruit) => {
              const daysLeft = getDaysUntilExpiry(fruit.expiryDate);
              const isExpiringSoon = daysLeft <= 2 && daysLeft >= 0;
              const isExpired = daysLeft < 0;

              return (
                <div key={fruit.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{fruit.fruitType}</h3>
                        {fruit.variety && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                            {fruit.variety}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(fruit)}`}>
                          {getStatusText(fruit)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Package2 className="h-4 w-4" />
                          <span>{fruit.quantity} pieces</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Harvested {new Date(fruit.harvestDate).toLocaleDateString()}</span>
                        </div>
                        {fruit.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{fruit.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className="capitalize">{fruit.storageMethod.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      </div>

                      {(isExpiringSoon || isExpired) && (
                        <div className="mt-4 flex items-center space-x-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="text-orange-600 font-medium">
                            {isExpired ? 'Action needed: Remove expired fruit' : 'Priority sale recommended'}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteFruit(fruit.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Fruit Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Fruit</h2>
              
              <form onSubmit={handleAddFruit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fruit Type *
                  </label>
                  <select
                    value={newFruit.fruitType}
                    onChange={(e) => setNewFruit({...newFruit, fruitType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select fruit type</option>
                    {fruitTypes.map((fruit) => (
                      <option key={fruit} value={fruit}>{fruit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variety
                  </label>
                  <input
                    type="text"
                    value={newFruit.variety}
                    onChange={(e) => setNewFruit({...newFruit, variety: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Red Lady, Alphonso"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={newFruit.quantity}
                    onChange={(e) => setNewFruit({...newFruit, quantity: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Number of fruits"
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
                    value={newFruit.harvestDate}
                    onChange={(e) => setNewFruit({...newFruit, harvestDate: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storage Method *
                  </label>
                  <select
                    value={newFruit.storageMethod}
                    onChange={(e) => setNewFruit({...newFruit, storageMethod: e.target.value})}
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
                    Location
                  </label>
                  <input
                    type="text"
                    value={newFruit.location}
                    onChange={(e) => setNewFruit({...newFruit, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Warehouse A, Cold Storage 1"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTracker;