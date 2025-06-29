import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthWrapper from './components/Auth/AuthWrapper';
import MainApp from './components/MainApp';
import LandingPage from './pages/LandingPage';
import ShelfLifePrediction from './pages/ShelfLifePrediction';
import SpoilageAlerts from './pages/SpoilageAlerts';
import StorageTips from './pages/StorageTips';
import InventoryTracker from './pages/InventoryTracker';
import OfflineMode from './pages/OfflineMode';
import LanguageSupport from './pages/LanguageSupport';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/shelf-life-prediction" element={<ShelfLifePrediction />} />
          <Route path="/spoilage-alerts" element={<SpoilageAlerts />} />
          <Route path="/storage-tips" element={<StorageTips />} />
          <Route path="/inventory-tracker" element={<InventoryTracker />} />
          <Route path="/offline-mode" element={<OfflineMode />} />
          <Route path="/language-support" element={<LanguageSupport />} />
          
          {/* Protected app routes */}
          <Route path="/app/*" element={
            <AuthWrapper>
              <MainApp />
            </AuthWrapper>
          } />
        </Routes>
      </Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;