import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, name: string) => void;
}

interface LoginFormData {
  email: string;
  password: string;
  name: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  if (!isOpen) return null;

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      // Validate password strength
      if (data.password.length < 6) {
        setAuthError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      // Extract name from email or use provided name
      const displayName = data.name || data.email.split('@')[0];
      
      // Store credentials in localStorage (in production, use secure backend)
      const credentials = {
        email: data.email,
        passwordHash: btoa(data.password), // Simple encoding (use bcrypt in production)
        name: displayName,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(`emosphere_user_${data.email}`, JSON.stringify(credentials));
      onLogin(data.email, displayName);
    } catch (error) {
      setAuthError('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl w-full max-w-md shape-premium p-8 shadow-2xl border border-white/20 dark:border-white/10 transform animate-scale-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Sign in with email and password to start your personalized wellness journey.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {authError && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded text-red-700 dark:text-red-400 text-sm">
              {authError}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email'
                }
              })}
              placeholder="you@example.com"
              className="w-full px-6 py-4 shape-premium bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500/50 focus:bg-white dark:focus:bg-zinc-800 transition-all text-gray-800 dark:text-white font-medium outline-none"
            />
            {errors.email && <p className="text-red-600 dark:text-red-400 text-xs mt-1 px-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              placeholder="••••••••"
              className="w-full px-6 py-4 shape-premium bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500/50 focus:bg-white dark:focus:bg-zinc-800 transition-all text-gray-800 dark:text-white font-medium outline-none"
            />
            {errors.password && <p className="text-red-600 dark:text-red-400 text-xs mt-1 px-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1 uppercase tracking-wider">Display Name (Optional)</label>
            <input 
              type="text" 
              {...register('name')}
              placeholder="e.g. Alex"
              className="w-full px-6 py-4 shape-premium bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 focus:ring-2 focus:ring-rose-400 dark:focus:ring-rose-500/50 focus:bg-white dark:focus:bg-zinc-800 transition-all text-gray-800 dark:text-white font-medium outline-none"
            />
            <p className="text-gray-400 text-xs mt-1 px-1">Leave blank to use your email prefix</p>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black shape-premium font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-gray-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            By signing in, you agree to our <span className="underline cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;