import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface TestCardProps {
  title: string;
  description: string;
  duration: string;
  questions: number;
  category: string;
}

export function TestCard({ title, description, duration, questions, category }: TestCardProps) {
  return (
    <div className="bg-dark-800 p-5 rounded-lg border border-dark-600 hover:border-accent-purple transition-all group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold group-hover:text-accent-purple">{title}</h3>
        <span className="px-3 py-1 bg-dark-700 rounded-full text-xs text-gray-300">{category}</span>
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{duration}</span>
          </div>
          <span>{questions} questions</span>
        </div>
        <button className="flex items-center space-x-1 text-accent-purple hover:text-accent-purple-light transition-colors">
          <span className="text-sm">Start Test</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}