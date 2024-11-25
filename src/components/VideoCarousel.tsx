import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentCard } from './ContentCard';

interface VideoCarouselProps {
  title: string;
  videos: Array<{
    title: string;
    type: string;
    image: string;
    topic: string;
    duration: string;
  }>;
  favorites?: Set<string>;
  onToggleFavorite?: (title: string) => void;
  onVideoClick?: (title: string) => void;
}

export function VideoCarousel({ title, videos, favorites, onToggleFavorite, onVideoClick }: VideoCarouselProps) {
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('carousel-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-accent-purple-light">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-dark-700 hover:bg-dark-600 text-gray-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-dark-700 hover:bg-dark-600 text-gray-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div
        id="carousel-container"
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
      >
        {videos.map((video, index) => (
          <div key={index} className="flex-none w-72">
            <ContentCard
              {...video}
              isFavorite={favorites?.has(video.title)}
              onToggleFavorite={onToggleFavorite}
              onClick={onVideoClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}