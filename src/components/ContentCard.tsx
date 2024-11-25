import React from 'react';
import { Play, Clock, BookOpen, Heart } from 'lucide-react';

interface ContentCardProps {
  title: string;
  type: string;
  image: string;
  topic: string;
  duration?: string;
  progress?: number;
  isFavorite?: boolean;
  onToggleFavorite?: (title: string) => void;
  onClick?: (title: string) => void;
}

const topicColors: { [key: string]: string } = {
  'Focus & Organization': 'bg-topic-green border-topic-green/30 text-topic-green',
  'Social Navigation': 'bg-topic-orange border-topic-orange/30 text-topic-orange',
  'Sports & Competition': 'bg-topic-purple border-topic-purple/30 text-topic-purple',
  'Self-Discovery': 'bg-topic-mint border-topic-mint/30 text-topic-mint',
  'Parent Resources': 'bg-topic-blue border-topic-blue/30 text-topic-blue',
  'Skill Building': 'bg-topic-red border-topic-red/30 text-topic-red',
  'Mood Boosters': 'bg-topic-yellow border-topic-yellow/30 text-topic-yellow',
  'Eating Patterns': 'bg-topic-teal border-topic-teal/30 text-topic-teal',
  'ADHD Superpowers': 'bg-topic-pink border-topic-pink/30 text-topic-pink',
  'Emotional Management': 'bg-topic-indigo border-topic-indigo/30 text-topic-indigo',
};

export function ContentCard({ 
  title, 
  type, 
  image, 
  topic, 
  duration, 
  progress,
  isFavorite,
  onToggleFavorite,
  onClick
}: ContentCardProps) {
  const TypeIcon = type === "Video Series" ? Play : type === "Course" ? Clock : BookOpen;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(title);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(title);
  };

  const topicColorClass = topicColors[topic] || 'bg-dark-700 border-dark-600 text-gray-400';

  return (
    <div 
      onClick={handleClick}
      className="bg-dark-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all border border-dark-600 hover:border-accent-purple group relative cursor-pointer"
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-700">
            <div 
              className="h-full bg-accent-purple"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-dark-900/80 hover:bg-dark-800 transition-colors"
        >
          <Heart
            size={16}
            className={`${isFavorite ? 'fill-accent-purple text-accent-purple' : 'text-gray-400'}`}
          />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-semibold mb-1 text-sm group-hover:text-accent-purple">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TypeIcon size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">{type}</span>
            {duration && <span className="text-xs text-gray-400">• {duration}</span>}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${topicColorClass} bg-opacity-10`}>
            {topic}
          </span>
        </div>
      </div>
    </div>
  );
}