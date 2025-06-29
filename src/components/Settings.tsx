import React, { useState } from 'react';
import { Settings as SettingsIcon, Globe, Bell, Smartphone, Database, Download, Upload, ArrowLeft } from 'lucide-react';

interface SettingsProps {
  onExportData: () => void;
  onImportData: (data: any) => void;
  onViewChange?: (view: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onExportData, onImportData, onViewChange }) => {
  const [language, setLanguage] = useState('english');
  const [notifications, setNotifications] = useState(true);
  const [alertDays, setAlertDays] = useState(2);

  const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी (Hindi)' },
  { value: 'marathi', label: 'मराठी (Marathi)' },
  { value: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
  { value: 'tamil', label: 'தமிழ் (Tamil)' },
  { value: 'telugu', label: 'తెలుగు (Telugu)' },
  { value: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { value: 'bengali', label: 'বাংলা (Bengali)' }
];


  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          onImportData(data);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 p-4 space-y-6">
        <div className="flex items-center space-x-3">
          {onViewChange && (
            <button
              onClick={() => onViewChange('dashboard')}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          <SettingsIcon className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Language Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Language</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-2">
              Fully functioning language support is coming soon. Currently available in Titles only.
            </p>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Enable Notifications</p>
                <p className="text-sm text-gray-600">Get alerts about expiring fruits</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Days Before Expiry
              </label>
              <select
                value={alertDays}
                onChange={(e) => setAlertDays(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/80"
              >
                <option value={1}>1 day before</option>
                <option value={2}>2 days before</option>
                <option value={3}>3 days before</option>
                <option value={5}>5 days before</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-gray-900 mb-2">Backup & Restore</p>
              <p className="text-sm text-gray-600 mb-4">
                Export your data for backup or import from another device
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={onExportData}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Data</span>
                </button>
                
                <label className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span>Import Data</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="font-medium text-gray-900 mb-2">Storage Info</p>
              <p className="text-sm text-gray-600">
                Data is stored securely in the cloud and syncs across all your devices.
              </p>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">App Information</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">January 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Developer</span>
              <span className="font-medium">CrateMate Team</span>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <h3 className="font-semibold text-green-900 mb-2">Need Help?</h3>
          <p className="text-sm text-green-700 mb-3">
            Contact our support team for assistance with the app.
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> support@cratemate.app</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
          </div>
        </div>

        {/* Bolt.new Badge */}
        <div className="fixed bottom-4 right-4 z-50">
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition-transform duration-200"
          >
            <img
              src="/black_circle_360x360.png"
              alt="Powered by Bolt.new"
              className="w-full h-full object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;