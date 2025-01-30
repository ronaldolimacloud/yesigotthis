import React, { useState } from 'react';
import { signIn, signInWithRedirect } from 'aws-amplify/auth';
import { FcGoogle } from 'react-icons/fc';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import logoPng from '/logopng.png';

interface SignInError {
  message: string;
}

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<SignInError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn({ username: email, password });
      // Auth success - the app will automatically redirect
    } catch (err: any) {
      setError({ message: err.message || 'An error occurred during sign in' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' });
    } catch (err: any) {
      setError({ message: err.message || 'An error occurred with Google sign in' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-dark-800 p-8 rounded-2xl border border-dark-600">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src={logoPng} alt="ADHD Hub Logo" className="w-20 h-20 object-contain" />
          <h2 className="mt-4 text-2xl font-bold text-white">Sign in to ADHD Hub</h2>
          <p className="mt-2 text-gray-400">Welcome back! Please enter your details</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-red-500 text-sm">{error.message}</p>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 bg-dark-700 border border-dark-600 rounded-lg 
                          focus:ring-2 focus:ring-accent-purple focus:border-transparent
                          text-white placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 bg-dark-700 border border-dark-600 rounded-lg 
                          focus:ring-2 focus:ring-accent-purple focus:border-transparent
                          text-white placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 border border-transparent rounded-lg
                     bg-accent-purple text-white font-medium
                     hover:bg-opacity-90 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-accent-purple
                     transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-800 text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-4
                     border border-dark-600 rounded-lg text-white
                     hover:bg-dark-700 transition-colors"
        >
          <FcGoogle size={24} />
          <span>Sign in with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="#" className="text-accent-purple hover:text-accent-purple/80">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
} 