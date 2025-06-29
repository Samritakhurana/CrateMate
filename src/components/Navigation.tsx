import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package2, Home, Plus, Bell, BarChart3, Settings, TrendingUp, User } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  alertCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, alertCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', path: '/app', icon: Home, label: 'Dashboard' },
    { id: 'add-fruit', path: '/app/add-fruit', icon: Plus, label: 'Add Fruit' },
    { id: 'alerts', path: '/app/alerts', icon: Bell, label: 'Alerts', badge: alertCount },
    { id: 'inventory', path: '/app/inventory', icon: Package2, label: 'Inventory' },
    { id: 'analytics', path: '/app/analytics', icon: BarChart3, label: 'Analytics' }
  ];

  const handleNavigation = (item: any) => {
    onViewChange(item.id);
    navigate(item.path);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-t border-gray-200 px-4 py-2 fixed bottom-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex justify-around max-w-7xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                isActive 
                  ? 'text-green-600 bg-green-50 scale-105' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;