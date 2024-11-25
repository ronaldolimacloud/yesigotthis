import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { TestCard } from '../components/TestCard';
import { TopicFilter } from '../components/TopicFilter';

const testCategories = [
  "All Tests",
  "Attention",
  "Executive Function",
  "Emotional Regulation",
  "Behavior",
  "Learning"
];

const tests = [
  {
    title: "ADHD Symptom Checker",
    description: "Comprehensive assessment based on DSM-5 criteria for ADHD diagnosis.",
    duration: "15-20 min",
    questions: 18,
    category: "Attention"
  },
  {
    title: "Executive Function Assessment",
    description: "Evaluate your planning, organization, and time management skills.",
    duration: "10-15 min",
    questions: 15,
    category: "Executive Function"
  },
  {
    title: "Emotional Response Evaluation",
    description: "Assess your emotional regulation and impulse control patterns.",
    duration: "12-15 min",
    questions: 20,
    category: "Emotional Regulation"
  },
  {
    title: "Learning Style Analysis",
    description: "Discover your optimal learning strategies and potential challenges.",
    duration: "10 min",
    questions: 12,
    category: "Learning"
  },
  {
    title: "Behavioral Patterns Assessment",
    description: "Identify common ADHD-related behavioral patterns in daily life.",
    duration: "15 min",
    questions: 25,
    category: "Behavior"
  },
  {
    title: "Focus & Concentration Test",
    description: "Measure your attention span and concentration abilities.",
    duration: "8-10 min",
    questions: 10,
    category: "Attention"
  }
];

export function Tests() {
  const [selectedCategory, setSelectedCategory] = useState("All Tests");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTests = tests.filter(test => 
    (selectedCategory === "All Tests" || test.category === selectedCategory) &&
    (test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     test.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-accent-purple-light mb-2">ADHD Assessments</h1>
        <p className="text-gray-400">Take our scientifically-backed tests to better understand your ADHD patterns</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800 rounded-lg py-2.5 px-10 focus:outline-none focus:ring-2 focus:ring-accent-purple border border-dark-600 placeholder-gray-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center space-x-2 bg-dark-800 px-4 rounded-lg border border-dark-600">
          <Filter size={18} className="text-gray-400" />
          <span className="text-sm text-gray-400">Filter:</span>
        </div>
      </div>

      <div className="mb-6">
        <TopicFilter
          topics={testCategories}
          selectedTopic={selectedCategory}
          onTopicSelect={setSelectedCategory}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTests.map((test, index) => (
          <TestCard key={index} {...test} />
        ))}
      </div>
    </div>
  );
}