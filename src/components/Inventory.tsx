import React, { useState } from 'react';
import { Package2, Search, Filter, Calendar, MapPin, AlertTriangle, ArrowLeft, Trash2 } from 'lucide-react';
import { getDaysUntilExpiry, formatDate } from '../utils/storage';
import toast from 'react-hot-toast';

interface InventoryProps {
  fruits: any[];
  onUpdateFruit: (fruit: any) => void;
  onDeleteFruit: (id: string) => void;
  onViewChange?: (view: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ fruits, onUpdateFruit, onDeleteFruit, onViewChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('expiry_date');

  const filteredFruits = fruits
    .filter(fruit => {
      const matchesSearch = (fruit.variety || fruit.fruit_type).toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (fruit.location && fruit.location.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (filterStatus === 'all') return matchesSearch;
      
      const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
      if (filterStatus === 'fresh') return matchesSearch && daysLeft > 2;
      if (filterStatus === 'warning') return matchesSearch && daysLeft <= 2 && daysLeft >= 0;
      if (filterStatus === 'expired') return matchesSearch && daysLeft < 0;
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'expiry_date') {
        return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
      }
      if (sortBy === 'fruit_type') {
        return (a.variety || a.fruit_type).localeCompare(b.variety || b.fruit_type);
      }
      if (sortBy === 'quantity') {
        return b.quantity - a.quantity;
      }
      return 0;
    });

  const getStatusColor = (fruit: any) => {
    const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
    if (daysLeft < 0) return 'bg-red-100 text-red-800 border-red-200';
    if (daysLeft <= 2) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStatusText = (fruit: any) => {
    const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
    if (daysLeft < 0) return `Expired ${Math.abs(daysLeft)} day${Math.abs(daysLeft) > 1 ? 's' : ''} ago`;
    if (daysLeft === 0) return 'Expires today';
    if (daysLeft <= 2) return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
    return `${daysLeft} days left`;
  };

  const handleRemoveFruit = async (fruitId: string, fruitName: string) => {
    if (confirm(`Are you sure you want to remove ${fruitName} from inventory?`)) {
      try {
        await onDeleteFruit(fruitId);
        toast.success('Fruit removed from inventory successfully!');
      } catch (error) {
        console.error('Error removing fruit:', error);
        toast.error('Failed to remove fruit. Please try again.');
      }
    }
  };

  const totalQuantity = filteredFruits.reduce((sum, fruit) => sum + fruit.quantity, 0);
  const expiringSoon = filteredFruits.filter(fruit => {
    const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
    return daysLeft <= 2 && daysLeft >= 0;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {onViewChange && (
              <button
                onClick={() => onViewChange('dashboard')}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <Package2 className="h-6 w-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          </div>
          <div className="text-sm text-gray-500">
            {filteredFruits.length} items • {totalQuantity} total fruits
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/20">
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-bold text-blue-600">{filteredFruits.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/20">
            <p className="text-sm text-gray-600">Total Fruits</p>
            <p className="text-2xl font-bold text-green-600">{totalQuantity}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/20">
            <p className="text-sm text-gray-600">Expiring Soon</p>
            <p className="text-2xl font-bold text-orange-600">{expiringSoon}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by variety or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                >
                  <option value="all">All Status</option>
                  <option value="fresh">Fresh</option>
                  <option value="warning">Expiring Soon</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
                >
                  <option value="expiry_date">Expiry Date</option>
                  <option value="fruit_type">Fruit Type</option>
                  <option value="quantity">Quantity</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory List */}
        <div className="space-y-3">
          {filteredFruits.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8 text-center">
              <Package2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No fruits found matching your criteria</p>
            </div>
          ) : (
            filteredFruits.map((fruit) => {
              const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
              const isExpiringSoon = daysLeft <= 2 && daysLeft >= 0;
              const isExpired = daysLeft < 0;

              return (
                <div key={fruit.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {fruit.variety || fruit.fruit_type}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(fruit)}`}>
                          {getStatusText(fruit)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Package2 className="h-4 w-4" />
                          <span>{fruit.quantity} pieces</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Harvested {formatDate(fruit.harvest_date)}</span>
                        </div>
                        {fruit.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{fruit.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <span className="capitalize">{fruit.storage_method.replace('-', ' ')}</span>
                        </div>
                      </div>

                      {(isExpiringSoon || isExpired) && (
                        <div className="mt-3 flex items-center space-x-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="text-orange-600 font-medium">
                            {isExpired ? 'Action needed: Remove expired fruit' : 'Priority sale recommended'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleRemoveFruit(fruit.id, fruit.variety || fruit.fruit_type)}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;