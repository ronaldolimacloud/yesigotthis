import React from 'react';

interface TopicFilterProps {
  topics: string[];
  selectedTopic: string | null;
  onTopicSelect: (topic: string) => void;
}

const topicColors: { [key: string]: string } = {
  'Focus & Organization': 'bg-topic-green/10 text-topic-green border-topic-green hover:bg-topic-green hover:text-white',
  'Social Navigation': 'bg-topic-orange/10 text-topic-orange border-topic-orange hover:bg-topic-orange hover:text-white',
  'Sports & Competition': 'bg-topic-purple/10 text-topic-purple border-topic-purple hover:bg-topic-purple hover:text-white',
  'Self-Discovery': 'bg-topic-mint/10 text-topic-mint border-topic-mint hover:bg-topic-mint hover:text-white',
  'Parent Resources': 'bg-topic-blue/10 text-topic-blue border-topic-blue hover:bg-topic-blue hover:text-white',
  'Skill Building': 'bg-topic-red/10 text-topic-red border-topic-red hover:bg-topic-red hover:text-white',
  'Mood Boosters': 'bg-topic-yellow/10 text-topic-yellow border-topic-yellow hover:bg-topic-yellow hover:text-white',
  'Eating Patterns': 'bg-topic-teal/10 text-topic-teal border-topic-teal hover:bg-topic-teal hover:text-white',
  'ADHD Superpowers': 'bg-topic-pink/10 text-topic-pink border-topic-pink hover:bg-topic-pink hover:text-white',
  'Emotional Management': 'bg-topic-indigo/10 text-topic-indigo border-topic-indigo hover:bg-topic-indigo hover:text-white',
};

export function TopicFilter({ topics, selectedTopic, onTopicSelect }: TopicFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => {
        const isSelected = topic === selectedTopic;
        const colorClass = topicColors[topic] || 'bg-dark-800 text-gray-400 border-dark-600 hover:bg-dark-700';
        
        return (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            className={`px-3 py-1.5 rounded-full transition-all text-sm border ${
              isSelected 
                ? `${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]}`
                : colorClass
            }`}
          >
            {topic}
          </button>
        );
      })}
    </div>
  );
}