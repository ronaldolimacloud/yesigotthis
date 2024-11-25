import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { BookOpen, Heart, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { VideoCarousel } from '../components/VideoCarousel';
import { Footer } from '../components/Footer';

interface VideoPlayerProps {
  favorites?: Set<string>;
  onToggleFavorite?: (title: string) => void;
}

const relatedVideos = [
  {
    title: "Time Management Strategies",
    type: "Video Series",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
    topic: "Focus & Organization",
    duration: "30 min"
  },
  {
    title: "Building Better Study Habits",
    type: "Course",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
    topic: "Focus & Organization",
    duration: "45 min"
  },
  {
    title: "Memory Enhancement Techniques",
    type: "Video Series",
    image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2",
    topic: "Focus & Organization",
    duration: "25 min"
  },
  {
    title: "Task Organization Workshop",
    type: "Course",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    topic: "Focus & Organization",
    duration: "40 min"
  },
  {
    title: "Attention Tools Deep Dive",
    type: "Video Series",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    topic: "Focus & Organization",
    duration: "35 min"
  }
];

export function VideoPlayer({ favorites, onToggleFavorite }: VideoPlayerProps) {
  const { title } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const videoData = {
    title: decodedTitle,
    instructor: "Dr. Sarah Johnson",
    duration: "45 minutes",
    topic: "Focus & Organization",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleMute = () => setIsMuted(!isMuted);
  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleVideoClick = (videoTitle: string) => {
    navigate(`/video/${encodeURIComponent(videoTitle)}`);
  };

  return (
    <div className="flex-1 bg-dark-900 overflow-y-auto">
      {/* Video Player Section */}
      <div className="bg-dark-800 border-b border-dark-600">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative aspect-video bg-dark-900 rounded-lg overflow-hidden">
            <ReactPlayer
              url={videoData.videoUrl}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={isMuted}
              volume={volume}
              onProgress={({ played }) => setProgress(played * 100)}
            />
            
            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <button onClick={handlePlayPause} className="text-white hover:text-accent-purple">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                
                <button onClick={handleRestart} className="text-white hover:text-accent-purple">
                  <RotateCcw size={20} />
                </button>
                
                <div className="flex-1">
                  <div className="h-1 bg-dark-600 rounded-full">
                    <div 
                      className="h-full bg-accent-purple rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button onClick={handleMute} className="text-white hover:text-accent-purple">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-accent-purple"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Video Information */}
          <div>
            <h1 className="text-2xl font-bold mb-4 text-accent-purple-light">{videoData.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center">
                <BookOpen size={16} className="mr-2" />
                {videoData.instructor}
              </span>
              <span>•</span>
              <span>{videoData.duration}</span>
              <span>•</span>
              <span>{videoData.topic}</span>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-600">
            <h2 className="text-lg font-semibold mb-4 text-accent-purple-light">Summary</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed">
                In this video, Dr. Sarah Johnson explores essential strategies for managing ADHD effectively. 
                The session focuses on understanding how ADHD affects daily functioning and provides practical 
                techniques for improving focus and organization. Through real-world examples and evidence-based 
                approaches, you'll learn how to develop personalized coping strategies and build on your natural 
                strengths.
              </p>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-md font-semibold text-accent-purple-light">Key Points:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-gray-300">
                    <span className="text-accent-purple mt-1">•</span>
                    <span>Understanding ADHD's impact on executive function and daily tasks</span>
                  </li>
                  <li className="flex items-start space-x-2 text-gray-300">
                    <span className="text-accent-purple mt-1">•</span>
                    <span>Practical strategies for implementing structure and routine</span>
                  </li>
                  <li className="flex items-start space-x-2 text-gray-300">
                    <span className="text-accent-purple mt-1">•</span>
                    <span>Tools and techniques for managing time and maintaining focus</span>
                  </li>
                  <li className="flex items-start space-x-2 text-gray-300">
                    <span className="text-accent-purple mt-1">•</span>
                    <span>Methods for building sustainable habits and maintaining motivation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Videos Carousel */}
          <div className="mt-8">
            <VideoCarousel
              title="More from Focus & Organization"
              videos={relatedVideos}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              onVideoClick={handleVideoClick}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}