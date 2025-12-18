import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { authService } from '../services/authService.js';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = authService.isAuthenticated();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">G</span>
            </div>
            <span className="font-display font-bold text-xl text-charcoal tracking-tight">
              GRANDVIEW <span className="text-brand font-light">REALTY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-brand' : 'text-gray-600 hover:text-brand'}`}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={`text-sm font-medium transition-colors ${isActive('/properties') ? 'text-brand' : 'text-gray-600 hover:text-brand'}`}
            >
              Properties
            </Link>
            {isAuth && (
              <Link 
                to="/admin/listings" 
                className={`text-sm font-medium transition-colors ${isActive('/admin/listings') ? 'text-brand' : 'text-gray-600 hover:text-brand'}`}
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {isAuth ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              /* Admin Login button removed. Access via URL /#/login manually */
              <div /> 
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};