import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService.js';
import { Lock } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state)?.from?.pathname || '/admin/listings';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Use admin@grandview.com / password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <Lock className="text-white w-7 h-7" />
          </div>
          <h2 className="text-3xl font-display font-bold text-charcoal tracking-tight">Admin Portal</h2>
          <p className="text-gray-500 text-sm mt-3 font-medium">Sign in to manage Grandview listings</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm mb-6 text-center border border-red-100 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all duration-200"
              placeholder="admin@grandview.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-brand text-white font-display font-bold text-sm uppercase tracking-wide rounded-lg shadow-md hover:shadow-lg hover:bg-brand-light transition-all duration-200 transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400 font-medium">Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};