import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Package2,
  ArrowLeft,
  Wifi,
  WifiOff,
  Cloud,
  HardDrive,
  CheckCircle,
  AlertCircle,
  FolderSync as Sync,
} from 'lucide-react';

const OfflineMode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = location.state?.returnTo || '/';

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const features = [
    {
      icon: Cloud,
      title: 'Cloud-Based Storage',
      description: 'All your data is securely stored in the cloud and syncs across devices when connected.',
      status: isOnline ? 'active' : 'pending',
    },
    {
      icon: Sync,
      title: 'Real-time Sync',
      description: 'When internet is available, your data automatically syncs with the cloud.',
      status: isOnline ? 'active' : 'pending',
    },
    {
      icon: CheckCircle,
      title: 'Internet Required',
      description: 'CrateMate requires an internet connection for full functionality and data access.',
      status: isOnline ? 'active' : 'pending',
    },
    {
      icon: HardDrive,
      title: 'Secure Backup',
      description: 'Your data is safely backed up to the cloud when connected to the internet.',
      status: isOnline ? 'active' : 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
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
                <p className="text-xs text-gray-500">Connectivity Status</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-6">
            {isOnline ? (
              <Wifi className="h-12 w-12 text-purple-600" />
            ) : (
              <WifiOff className="h-12 w-12 text-purple-600" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Connectivity Status
          </h1>
          <p className="text-xl text-gray-600">
            CrateMate requires an internet connection for optimal functionality
          </p>
        </div>

        {/* Connection Status */}
        <div
          className={`rounded-xl shadow-sm p-6 mb-8 ${
            isOnline ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${isOnline ? 'bg-green-100' : 'bg-orange-100'}`}>
              {isOnline ? (
                <Wifi className="h-6 w-6 text-green-600" />
              ) : (
                <WifiOff className="h-6 w-6 text-orange-600" />
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  isOnline ? 'text-green-900' : 'text-orange-900'
                }`}
              >
                {isOnline ? 'Connected to Internet' : 'No Internet Connection'}
              </h3>
              <p className={`text-sm ${isOnline ? 'text-green-700' : 'text-orange-700'}`}>
                {isOnline
                  ? 'Your device is connected to the internet. All features are available.'
                  : 'No internet connection detected. Please connect to use CrateMate features.'}
              </p>
            </div>
          </div>
        </div>

        {/* Features Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      feature.status === 'active' ? 'bg-green-100' : 'bg-orange-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        feature.status === 'active' ? 'text-green-600' : 'text-orange-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          feature.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {feature.status === 'active' ? 'Available' : 'Requires Internet'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How CrateMate Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Cloud className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cloud Storage</h3>
              <p className="text-sm text-gray-600">
                All your data is stored securely in the cloud and accessible from any device with
                internet.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <Sync className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Sync</h3>
              <p className="text-sm text-gray-600">
                Your data syncs in real-time across all your devices when connected to the internet.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Always Updated</h3>
              <p className="text-sm text-gray-600">
                Get the latest features, market prices, and storage recommendations with internet
                access.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits for Farmers */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Internet Connection Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 mt-1" />
                <div>
                  <p className="font-semibold">Real-time Market Prices</p>
                  <p className="text-sm text-green-100">
                    Get up-to-date pricing information for better selling decisions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 mt-1" />
                <div>
                  <p className="font-semibold">Cloud Backup</p>
                  <p className="text-sm text-green-100">
                    Your data is safely backed up and never lost
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 mt-1" />
                <div>
                  <p className="font-semibold">Multi-device Access</p>
                  <p className="text-sm text-green-100">
                    Access your data from phone, tablet, or computer
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 mt-1" />
                <div>
                  <p className="font-semibold">Latest Features</p>
                  <p className="text-sm text-green-100">
                    Receive updates and new features automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isOnline && (
          <div className="bg-orange-100 border border-orange-200 rounded-xl p-6 mt-8">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Connection Required</h3>
            </div>
            <p className="text-orange-800 mb-4">
              To use CrateMate, please connect to the internet. You can use:
            </p>
            <ul className="list-disc list-inside text-orange-800 space-y-1">
              <li>Wi-Fi connection</li>
              <li>Mobile data</li>
              <li>Ethernet connection</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineMode;
