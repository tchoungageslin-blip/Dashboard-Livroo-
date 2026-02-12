import React, { useState } from 'react';
import { ArrowRight, User, Lock, Loader2 } from 'lucide-react';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay for better UX
    setTimeout(() => {
      // Check for Super Admin credentials
      if (username === 'superadmin' && password === 'superadmin12345') {
        onLogin('superadmin');
      } 
      // Fallback for Agency Login (Accept any other non-empty credentials for demo purposes)
      else if (username && password) {
        onLogin('agency');
      } else {
        setError('Please enter your username and password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-['Plus_Jakarta_Sans'] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#0f392b] rounded-b-[50px] z-0"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
      <div className="absolute top-40 right-10 w-48 h-48 bg-emerald-300/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden">
        
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
             <div className="w-24 h-24 mx-auto mb-4 drop-shadow-lg">
                <img 
                    src="https://what-if-assets.s3.amazonaws.com/images/user/666986/e182312b-2321-4d37-af59-e93259e836ec.png" 
                    alt="Livroo Logo" 
                    className="w-full h-full object-contain"
                />
             </div>
             <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
             <p className="text-gray-400 text-sm mt-1">Sign in to manage your deliveries</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium text-gray-700 placeholder-gray-400"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium text-gray-700 placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-center">
                    <p className="text-red-500 text-xs font-bold">{error}</p>
                </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#0f392b] hover:bg-emerald-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Protected by Livroo Security. <br/>
              By signing in, you agree to our <a href="#" className="text-emerald-600 font-semibold hover:underline">Terms of Service</a>.
            </p>
          </div>
        </div>
        
        {/* Footer decoration */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 to-[#0f392b]"></div>
      </div>

      <p className="mt-8 text-emerald-100/60 text-xs font-medium relative z-10">
        &copy; 2024 Livroo Delivery Systems
      </p>
    </div>
  );
};

export default LoginPage;