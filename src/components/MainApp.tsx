import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFruits } from '../hooks/useFruits';
import { useAlerts } from '../hooks/useAlerts';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import AddFruit from './AddFruit';
import Inventory from './Inventory';
import Alerts from './Alerts';
import Settings from './Settings';
import AnalyticsDashboard from './Analytics/AnalyticsDashboard';
import MarketPrices from './MarketPrices/MarketPrices';
import FarmProfile from './Profile/FarmProfile';
import { LogOut, User } from 'lucide-react';

const MainApp: React.FC = () => {
  const { user, signOut } = useAuth();
  const { fruits, addFruit, updateFruit, removeFruit } = useFruits();
  const { alerts, markAsRead, removeAlert } = useAlerts();
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  // Update current view based on route
  useEffect(() => {
    const path = location.pathname.split('/app/')[1] || '';
    setCurrentView(path || 'dashboard');
  }, [location]);

  const handleViewChange = React.useCallback((view: string) => {
    setCurrentView(view);
    const path = view === 'dashboard' ? '/app' : `/app/${view}`;
    navigate(path);
  }, [navigate]);

  const handleExportData = React.useCallback(() => {
    const data = {
      fruits,
      alerts,
      exportDate: new Date().toISOString(),
      user: user?.email
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cratemate-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [fruits, alerts, user?.email]);

  const handleImportData = React.useCallback((data: any) => {
    // In a real app, you would validate and import the data
    console.log('Importing data:', data);
  }, []);

  const unreadAlerts = React.useMemo(() => 
    alerts.filter(alert => !alert.read), [alerts]
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">CrateMate Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto pb-24">
        <Routes>
          <Route path="/" element={
            <Dashboard 
              fruits={fruits} 
              alerts={alerts} 
              onViewChange={handleViewChange} 
            />
          } />
          <Route path="/add-fruit" element={
            <AddFruit 
              onAddFruit={addFruit} 
              onViewChange={handleViewChange} 
            />
          } />
          <Route path="/inventory" element={
            <Inventory 
              fruits={fruits} 
              onUpdateFruit={updateFruit} 
              onDeleteFruit={removeFruit}
              onViewChange={handleViewChange}
            />
          } />
          <Route path="/alerts" element={
            <Alerts 
              alerts={alerts} 
              fruits={fruits} 
              onMarkAsRead={markAsRead} 
              onDeleteAlert={removeAlert}
              onViewChange={handleViewChange}
            />
          } />
          <Route path="/analytics" element={
            <AnalyticsDashboard 
              fruits={fruits}
              onViewChange={handleViewChange}
            />
          } />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/profile" element={<FarmProfile />} />
          <Route path="/settings" element={
            <Settings 
              onExportData={handleExportData} 
              onImportData={handleImportData} 
            />
          } />
        </Routes>
      </div>

      {/* Navigation */}
      <Navigation 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        alertCount={unreadAlerts.length} 
      />

      {/* Global Bolt.new Badge - Positioned above navigation and visible on all pages */}
      <div className="fixed bottom-24 right-4 z-50">
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition-transform duration-200 drop-shadow-lg"
        >
          <img
            src="/black_circle_360x360.png"
            alt="Powered by Bolt.new"
            className="w-full h-full object-contain"
          />
        </a>
      </div>
    </div>
  );
};

export default MainApp;