import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategorySection } from '../components/CategorySection';

interface FavoritesProps {
  content: Array<{
    title: string;
    type: string;
    image: string;
    topic: string;
    duration?: string;
    progress?: number;
  }>;
}

export function Favorites({ content }: FavoritesProps) {
  const navigate = useNavigate();

  if (content.length === 0) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <Heart size={48} className="text-accent-purple mb-4" />
        <h2 className="text-xl font-semibold text-accent-purple-light mb-2">No favorites yet</h2>
        <p className="text-gray-400 max-w-md">
          Start adding content to your favorites by clicking the heart icon on any content card
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-accent-purple-light mb-2">My Favorites</h1>
        <p className="text-gray-400">Your collection of saved content</p>
      </div>

      <CategorySection 
        title="Saved Content" 
        content={content}
        favorites={new Set(content.map(item => item.title))}
      />
    </div>
  );
}