import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import {
  Search,
  Brain,
  Users,
  Trophy,
  Sparkles,
  Users2,
  Lightbulb,
  Smile,
  Home,
  Settings,
  Menu,
  ClipboardCheck,
  Heart,
  Utensils,
  Zap,
  LogOut
} from 'lucide-react';
import { NavItem } from './components/NavItem';
import { TopicFilter } from './components/TopicFilter';
import { CategorySection } from './components/CategorySection';
import { Tests } from './pages/Tests';
import { Favorites } from './pages/Favorites';
import { VideoPlayer } from './pages/VideoPlayer';

const topics = [
  'Focus & Organization',
  'Social Navigation',
  'Sports & Competition',
  'Self-Discovery',
  'Parent Resources',
  'Skill Building',
  'Mood Boosters',
  'Eating Patterns',
  'ADHD Superpowers',
  'Emotional Management'
];

const topicSubItems: { [key: string]: string[] } = {
  'Focus & Organization': ['Study Skills', 'Time Management', 'Task Organization', 'Memory Strategies', 'Attention Tools'],
  'Social Navigation': ['Friendship Skills', 'Reading Social Cues', 'Handling Conflicts', 'Building Confidence', 'Team Dynamics'],
  'Sports & Competition': ['Performance Anxiety', 'Competitive Mindset', 'Handling Loss', 'Team Sports', 'Building Resilience'],
  'Emotional Management': ['Rejection Sensitivity', 'Handling Criticism', 'Managing Disappointment', 'Emotional Regulation', 'Anxiety & Worry'],
  'Self-Discovery': ['Understanding ADHD', 'Brain Science', 'Personal Strengths', 'Success Stories', 'Growth Mindset'],
  'Parent Resources': ['Communication Tools', 'Support Strategies', 'Understanding RSD', 'School Collaboration', 'Family Activities'],
  'Skill Building': ['Coping Strategies', 'Problem Solving', 'Decision Making', 'Impulse Control', 'Goal Setting'],
  'Mood Boosters': ['Quick Wins', 'Confidence Building', 'Positive Stories', 'Motivation Clips', 'Achievement Celebration'],
  'Eating Patterns': ['Time-Blind Eating', 'Dopamine-Seeking Food Choices', 'Executive Function & Meals', 'Medication & Appetite'],
  'ADHD Superpowers': ['Hyperfocus & Laser Concentration', 'Innovative Thinking & Creativity', 'Boundless Energy & Enthusiasm']
};

const sampleContent = [
  {
    title: "Understanding Executive Function",
    type: "Video Series",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    topic: "Focus & Organization",
    duration: "45 min",
    progress: 60
  },
  {
    title: "Building Social Confidence",
    type: "Course",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
    topic: "Social Navigation",
    duration: "1.5 hours"
  },
  {
    title: "Sports Psychology for ADHD Athletes",
    type: "Video Series",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    topic: "Sports & Competition",
    duration: "30 min"
  },
  {
    title: "Unleashing Your ADHD Superpowers",
    type: "Course",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3",
    topic: "ADHD Superpowers",
    duration: "2 hours"
  }
];

function App() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const signOutRedirect = async () => {
    try {
      await auth.removeUser();
      const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
      const logoutUri = import.meta.env.PROD 
        ? 'https://www.yesigotthis.com'
        : 'http://localhost:5173';
      const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
      navigate('/');
      window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  const handleToggleFavorite = (title: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(title)) {
        newFavorites.delete(title);
      } else {
        newFavorites.add(title);
      }
      return newFavorites;
    });
  };

  const favoriteContent = sampleContent.filter(item => favorites.has(item.title));

  if (auth.isLoading) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (auth.error) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-white">Error: {auth.error.message}</div>
    </div>;
  }

  // If not authenticated, show login screen
  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-8">Welcome to ADHD Hub</h1>
          <button 
            onClick={() => auth.signinRedirect()}
            className="bg-accent-purple text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      {/* Sidebar */}
      <div className={`bg-dark-800 border-r border-dark-600 transition-all ${isNavOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 flex items-center justify-between">
          <span 
            className={`font-bold text-accent-purple ${!isNavOpen && 'hidden'} cursor-pointer`}
            onClick={() => navigate('/')}
          >
            ADHD Hub
          </span>
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="p-1 hover:bg-dark-700 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="p-2 space-y-1">
          <NavItem
            icon={<Home size={20} />}
            text="Home"
            isOpen={isNavOpen}
            isActive={!selectedTopic}
            onClick={() => {
              setSelectedTopic(null);
              navigate('/');
            }}
          />
          {topics.map(topic => (
            <NavItem
              key={topic}
              icon={getTopicIcon(topic)}
              text={topic}
              isOpen={isNavOpen}
              isActive={selectedTopic === topic}
              onClick={() => setSelectedTopic(topic)}
              subItems={topicSubItems[topic]}
              onSubItemClick={setSelectedSubItem}
              selectedSubItem={selectedSubItem}
            />
          ))}
          
          {/* Add Logout Nav Item */}
          <NavItem
            icon={<LogOut size={20} />}
            text="Sign Out"
            isOpen={isNavOpen}
            onClick={() => signOutRedirect()}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-dark-800 border-b border-dark-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-700 rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            {/* Add user email display */}
            <div className="ml-4 text-sm text-gray-400">
              {auth.user?.profile.email}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <Routes>
          <Route path="/" element={
            <div className="flex-1 p-6 overflow-y-auto">
              <TopicFilter
                topics={topics}
                selectedTopic={selectedTopic}
                onTopicSelect={setSelectedTopic}
              />
              <CategorySection
                title="Continue Learning"
                content={sampleContent}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
              <CategorySection
                title="Recommended for You"
                content={sampleContent}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          } />
          <Route path="/tests" element={<Tests />} />
          <Route path="/favorites" element={
            <Favorites
              content={favoriteContent}
            />
          } />
          <Route path="/video/:title" element={
            <VideoPlayer
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
        </Routes>
      </div>
    </div>
  );
}

function getTopicIcon(topic: string) {
  const icons = {
    'Focus & Organization': <Brain size={20} />,
    'Social Navigation': <Users size={20} />,
    'Sports & Competition': <Trophy size={20} />,
    'Self-Discovery': <Sparkles size={20} />,
    'Parent Resources': <Users2 size={20} />,
    'Skill Building': <Lightbulb size={20} />,
    'Mood Boosters': <Smile size={20} />,
    'Eating Patterns': <Utensils size={20} />,
    'ADHD Superpowers': <Zap size={20} />,
    'Emotional Management': <Heart size={20} />
  };
  return icons[topic as keyof typeof icons] || <ClipboardCheck size={20} />;
}

function AppWrapper() {
  return <App />;
}

export default AppWrapper;