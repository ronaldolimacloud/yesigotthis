import { LogIn } from 'lucide-react';

export function AuthButton() {
  return (
    <button
      onClick={() => console.log('Login clicked')}
      className="flex items-center space-x-2 px-4 py-2 bg-accent-purple hover:bg-accent-purple-dark rounded-lg transition-colors text-white"
    >
      <LogIn size={18} />
      <span>Login</span>
    </button>
  );
}