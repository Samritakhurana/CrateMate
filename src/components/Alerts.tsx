import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Trash2, ArrowLeft } from 'lucide-react';
import { formatDate, getDaysUntilExpiry } from '../utils/storage';

interface AlertsProps {
  alerts: any[];
  fruits: any[];
  onMarkAsRead: (alertId: string) => void;
  onDeleteAlert: (alertId: string) => void;
  onViewChange?: (view: string) => void;
}

const Alerts: React.FC<AlertsProps> = ({ alerts, fruits, onMarkAsRead, onDeleteAlert, onViewChange }) => {
  const unreadAlerts = alerts.filter(alert => !alert.read);
  const readAlerts = alerts.filter(alert => alert.read);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'spoilage_warning':
        return AlertTriangle;
      case 'expired':
        return Clock;
      case 'storage_tip':
        return CheckCircle;
      default:
        return Bell;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'spoilage_warning':
        return 'text-orange-500';
      case 'expired':
        return 'text-red-500';
      case 'storage_tip':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getFruitDetails = (fruitId: string) => {
    return fruits.find(fruit => fruit.id === fruitId);
  };

  const AlertCard: React.FC<{ alert: any; isRead: boolean }> = ({ alert, isRead }) => {
    const Icon = getAlertIcon(alert.type);
    const fruit = getFruitDetails(alert.fruit_id);
    
    return (
      <div className={`bg-white rounded-xl shadow-sm border p-4 ${isRead ? 'border-gray-100' : 'border-orange-200 bg-orange-50'}`}>
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${isRead ? 'bg-gray-100' : 'bg-orange-100'}`}>
            <Icon className={`h-5 w-5 ${getAlertColor(alert.type)}`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className={`font-medium ${isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                  {alert.message}
                </p>
                {fruit && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>{fruit.variety || fruit.fruit_type}</strong> • {fruit.quantity} pieces</p>
                    {fruit.location && <p>Location: {fruit.location}</p>}
                    <p>Expires: {formatDate(fruit.expiry_date)} ({getDaysUntilExpiry(fruit.expiry_date)} days)</p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(alert.created_at)}
                </p>
              </div>
              
              <div className="flex space-x-2">
                {!isRead && (
                  <button
                    onClick={() => onMarkAsRead(alert.id)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => onDeleteAlert(alert.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onViewChange && (
            <button
              onClick={() => onViewChange('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          <Bell className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        </div>
        <div className="text-sm text-gray-500">
          {unreadAlerts.length} unread • {alerts.length} total
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Total Alerts</p>
          <p className="text-2xl font-bold text-blue-600">{alerts.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Unread</p>
          <p className="text-2xl font-bold text-orange-600">{unreadAlerts.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">Read</p>
          <p className="text-2xl font-bold text-green-600">{readAlerts.length}</p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No alerts yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Alerts will appear here when fruits are about to expire or need attention
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Unread Alerts */}
          {unreadAlerts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Unread Alerts ({unreadAlerts.length})
              </h2>
              <div className="space-y-3">
                {unreadAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} isRead={false} />
                ))}
              </div>
            </div>
          )}

          {/* Read Alerts */}
          {readAlerts.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Read Alerts ({readAlerts.length})
              </h2>
              <div className="space-y-3">
                {readAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} isRead={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Alerts;