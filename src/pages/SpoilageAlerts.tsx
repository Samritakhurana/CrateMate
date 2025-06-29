import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Package2, ArrowLeft, Bell, AlertTriangle, Clock, CheckCircle, Trash2 } from 'lucide-react';


interface Alert {
  id: string;
  fruitId: string;
  fruitName: string;
  type: 'spoilage_warning' | 'expired' | 'storage_tip';
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const SpoilageAlerts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo || '/';

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const sampleAlerts: Alert[] = [
      {
        id: '1',
        fruitId: '1',
        fruitName: 'Red Lady Papayas',
        type: 'spoilage_warning',
        message: 'Red Lady papayas will expire in 2 days. Consider prioritizing sales.',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'high',
      },
      {
        id: '2',
        fruitId: '2',
        fruitName: 'Alphonso Mangoes',
        type: 'expired',
        message: 'Alphonso mangoes expired 1 day ago. Remove from inventory immediately.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        priority: 'high',
      },
      {
        id: '3',
        fruitId: '3',
        fruitName: 'Cavendish Bananas',
        type: 'storage_tip',
        message: 'Cavendish bananas added. Store at 13-15°C for optimal shelf life.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'medium',
      },
      {
        id: '4',
        fruitId: '4',
        fruitName: 'Granny Smith Apples',
        type: 'spoilage_warning',
        message: 'Granny Smith apples will expire tomorrow. Urgent sale required.',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: false,
        priority: 'high',
      },
      {
        id: '5',
        fruitId: '5',
        fruitName: 'Valencia Oranges',
        type: 'storage_tip',
        message: 'Valencia oranges stored. Maintain 85-90% humidity for best results.',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'low',
      },
    ];
    setAlerts(sampleAlerts);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'spoilage_warning': return AlertTriangle;
      case 'expired': return Clock;
      case 'storage_tip': return CheckCircle;
      default: return Bell;
    }
  };

  const getAlertColor = (type: string, priority: string) => {
    if (type === 'expired' || priority === 'high') return 'text-red-500 bg-red-50 border-red-200';
    if (type === 'spoilage_warning') return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-blue-500 bg-blue-50 border-blue-200';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.read;
    if (filter === 'high') return alert.priority === 'high';
    return alert.type === filter;
  });

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => alert.id === id ? { ...alert, read: true } : alert));
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const unreadCount = alerts.filter(a => !a.read).length;
  const highPriorityCount = alerts.filter(a => a.priority === 'high' && !a.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
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
                <p className="text-xs text-gray-500">Spoilage Alerts</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="bg-orange-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Bell className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Spoilage Alerts</h1>
          <p className="text-xl text-gray-600">
            Stay ahead of spoilage with timely notifications for all your fruits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-600">Total Alerts</p>
            <p className="text-3xl font-bold text-blue-600">{alerts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-600">Unread</p>
            <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-600">High Priority</p>
            <p className="text-3xl font-bold text-red-600">{highPriorityCount}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-600">Read</p>
            <p className="text-3xl font-bold text-green-600">{alerts.length - unreadCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <div className="flex gap-2 flex-wrap">
              {['all', 'unread', 'high'].map(option => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === option ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)} ({
                    option === 'all' ? alerts.length :
                    option === 'unread' ? unreadCount :
                    highPriorityCount
                  })
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Mark All as Read
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-2">No alerts found</p>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              const isUnread = !alert.read;

              return (
                <div
                  key={alert.id}
                  className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${
                    isUnread ? 'border-l-orange-500 bg-orange-50' : 'border-l-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getAlertColor(alert.type, alert.priority)}`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{alert.fruitName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                              {alert.priority.toUpperCase()}
                            </span>
                            {isUnread && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
                          </div>
                          <p className="text-gray-700 mb-2">{alert.message}</p>
                          <p className="text-sm text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          {isUnread && (
                            <button
                              onClick={() => markAsRead(alert.id)}
                              className="text-green-600 hover:text-green-700 text-sm font-medium"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => deleteAlert(alert.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {alert.type === 'spoilage_warning' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                          <p className="text-sm text-yellow-800">
                            <strong>Recommended Action:</strong> Prioritize selling or processing these fruits.
                          </p>
                        </div>
                      )}

                      {alert.type === 'expired' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                          <p className="text-sm text-red-800">
                            <strong>Urgent Action Required:</strong> Remove from inventory to avoid contamination.
                          </p>
                        </div>
                      )}
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

export default SpoilageAlerts;