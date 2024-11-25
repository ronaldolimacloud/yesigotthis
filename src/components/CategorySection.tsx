import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentCard } from './ContentCard';

interface CategorySectionProps {
  title: string;
  content: Array<{
    title: string;
    type: string;
    image: string;
    topic: string;
    duration?: string;
    progress?: number;
  }>;
  favorites?: Set<string>;
  onToggleFavorite?: (title: string) => void;
}

export function CategorySection({ 
  title, 
  content, 
  favorites, 
  onToggleFavorite
}: CategorySectionProps) {
  const navigate = useNavigate();

  const handleContentClick = (title: string) => {
    navigate(`/video/${encodeURIComponent(title)}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3 text-accent-purple-light">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.map((item, index) => (
          <ContentCard 
            key={index} 
            {...item} 
            isFavorite={favorites?.has(item.title)}
            onToggleFavorite={onToggleFavorite}
            onClick={handleContentClick}
          />
        ))}
      </div>
    </div>
  );
}