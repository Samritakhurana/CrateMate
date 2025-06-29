import React from 'react';
import { Package2, AlertTriangle, TrendingUp, Calendar, Plus, Eye, Bell } from 'lucide-react';
import { getDaysUntilExpiry, formatDate } from '../utils/storage';
import JamesGuide from './JamesGuide/JamesGuide';

interface DashboardProps {
  fruits: any[];
  alerts: any[];
  onViewChange: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ fruits, alerts, onViewChange }) => {
  // Check if this is the user's first visit
  const isFirstVisit = !localStorage.getItem('cratemate_visited');
  
  React.useEffect(() => {
    if (isFirstVisit) {
      localStorage.setItem('cratemate_visited', 'true');
    }
  }, [isFirstVisit]);

  // Memoize calculations to prevent unnecessary re-computations
  const totalFruits = React.useMemo(() => 
    fruits.reduce((sum, fruit) => sum + fruit.quantity, 0), [fruits]
  );
  
  const expiringSoon = React.useMemo(() => 
    fruits.filter(fruit => {
      const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
      return daysLeft <= 2 && daysLeft >= 0;
    }), [fruits]
  );
  
  const expired = React.useMemo(() => 
    fruits.filter(fruit => getDaysUntilExpiry(fruit.expiry_date) < 0), [fruits]
  );
  
  const unreadAlerts = React.useMemo(() => 
    alerts.filter(alert => !alert.read).length, [alerts]
  );

  const stats = React.useMemo(() => [
    {
      title: 'Total Fruits',
      value: totalFruits,
      icon: Package2,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Expiring Soon',
      value: expiringSoon.length,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Expired',
      value: expired.length,
      icon: TrendingUp,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Active Alerts',
      value: unreadAlerts,
      icon: Calendar,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ], [totalFruits, expiringSoon.length, expired.length, unreadAlerts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-600 mt-1">
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welcome back!</p>
            <p className="text-lg font-semibold text-green-600">CrateMate</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`${stat.bgColor} p-4 rounded-xl shadow-sm border border-white/50 backdrop-blur-sm`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className={`text-xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => onViewChange('add-fruit')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Add New Fruit</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onViewChange('inventory')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Inventory</span>
              </button>
              <button
                onClick={() => onViewChange('alerts')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Bell className="h-4 w-4" />
                <span>Alerts</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        {alerts.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
              <button
                onClick={() => onViewChange('alerts')}
                className="text-green-600 text-sm font-medium hover:text-green-700"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(alert.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expiring Soon */}
        {expiringSoon.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Expiring Soon</h2>
            <div className="space-y-3">
              {expiringSoon.map((fruit) => {
                const daysLeft = getDaysUntilExpiry(fruit.expiry_date);
                return (
                  <div key={fruit.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    <div>
                      <p className="font-medium text-gray-900">{fruit.variety || fruit.fruit_type}</p>
                      <p className="text-sm text-gray-600">{fruit.quantity} pieces</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">
                        {daysLeft === 0 ? 'Expires Today' : `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(fruit.expiry_date)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Welcome Message for New Users */}
        {fruits.length === 0 && (
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-6 text-white text-center">
            <Package2 className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Welcome to CrateMate!</h3>
            <p className="text-green-100 mb-4">
              Start by adding your first fruit to track its shelf life and get smart storage recommendations.
            </p>
            <button
              onClick={() => onViewChange('add-fruit')}
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Add Your First Fruit
            </button>
          </div>
        )}
      </div>

      {/* James the CrateMate Guide - positioned on left with welcome popup */}
      <JamesGuide isFirstVisit={isFirstVisit} showWelcomePopup={isFirstVisit} />
    </div>
  );
};

export default Dashboard;