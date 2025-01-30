import React from 'react';
import { PlusCircle, Video, BookOpen, Headphones, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

export function AdminDashboard() {
  const navigate = useNavigate();
  const auth = useAuth();

  // Check if user has admin role
  const isAdmin = auth.user?.profile.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-white">Not authorized</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-white">Content Management</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/admin/upload/video')}
              className="p-6 bg-dark-800 rounded-lg border border-dark-600 hover:border-accent-purple transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Video className="w-6 h-6 text-accent-purple" />
                <span className="font-medium text-white">Add Video Course</span>
              </div>
            </button>
            <button 
              onClick={() => navigate('/admin/upload/article')}
              className="p-6 bg-dark-800 rounded-lg border border-dark-600 hover:border-accent-purple transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-accent-purple" />
                <span className="font-medium text-white">Add Article</span>
              </div>
            </button>
            <button 
              onClick={() => navigate('/admin/upload/audio')}
              className="p-6 bg-dark-800 rounded-lg border border-dark-600 hover:border-accent-purple transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Headphones className="w-6 h-6 text-accent-purple" />
                <span className="font-medium text-white">Add Audiobook</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="bg-dark-800 rounded-lg border border-dark-600 p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Content</h2>
          <div className="space-y-4">
            {['Understanding Executive Function', 'Building Social Confidence', 'Sports Psychology'].map((title) => (
              <div key={title} className="flex items-center justify-between p-4 border border-dark-600 rounded bg-dark-700">
                <span className="text-white">{title}</span>
                <button 
                  onClick={() => navigate(`/admin/edit/${encodeURIComponent(title)}`)}
                  className="text-accent-purple hover:text-accent-purple-light"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 