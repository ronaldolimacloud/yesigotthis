import React, { useState } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';

interface AuthButtonProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  username?: string;
}

export function AuthButton({ isAuthenticated, onLogin, onLogout, username }: AuthButtonProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isAuthenticated) {
    return (
      <button
        onClick={onLogin}
        className="flex items-center space-x-2 px-4 py-2 bg-accent-purple hover:bg-accent-purple-dark rounded-lg transition-colors"
      >
        <LogIn size={18} />
        <span>Login</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg border border-dark-600 transition-colors"
      >
        <User size={18} />
        <span>{username || 'User'}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-lg border border-dark-600 py-1">
          <button
            onClick={() => {
              setShowDropdown(false);
              onLogout();
            }}
            className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-dark-700 text-gray-300 hover:text-accent-purple transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}