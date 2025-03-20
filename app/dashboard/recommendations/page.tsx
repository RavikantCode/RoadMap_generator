'use client';

import React, { useState } from 'react';
import { IconBrain, IconBulb, IconChartBar, IconCode, IconDeviceLaptop, IconRocket, IconSearch } from '@tabler/icons-react';

interface Recommendation {
  title: string;
  description: string;
  icon: any;
  color: string;
  type: 'course' | 'skill' | 'project' | 'career';
  link?: string;
}

const initialRecommendations: Recommendation[] = [
  {
    title: 'Learn React Advanced Patterns',
    description: 'Master advanced React concepts like custom hooks, render props, and state management patterns.',
    icon: IconCode,
    color: 'from-blue-500/80 to-cyan-500/80',
    type: 'course',
    link: 'https://react-patterns.com'
  },
  {
    title: 'Build a Full-Stack Project',
    description: 'Create a complete web application using Next.js, TypeScript, and a modern backend technology.',
    icon: IconRocket,
    color: 'from-purple-500/80 to-pink-500/80',
    type: 'project'
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Strengthen your problem-solving skills by practicing algorithmic challenges daily.',
    icon: IconBrain,
    color: 'from-yellow-500/80 to-orange-500/80',
    type: 'skill'
  },
  {
    title: 'Cloud Computing Certification',
    description: 'Get certified in AWS or Azure to enhance your cloud computing expertise.',
    icon: IconDeviceLaptop,
    color: 'from-green-500/80 to-emerald-500/80',
    type: 'career'
  },
  {
    title: 'System Design Fundamentals',
    description: 'Learn how to design scalable systems and understand architectural patterns.',
    icon: IconChartBar,
    color: 'from-red-500/80 to-orange-500/80',
    type: 'course'
  },
  {
    title: 'Open Source Contribution',
    description: 'Start contributing to open-source projects to gain real-world experience.',
    icon: IconBulb,
    color: 'from-blue-500/80 to-indigo-500/80',
    type: 'project'
  }
];

export default function RecommendationsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [interests, setInterests] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);

  const handleGenerateRoadmap = async () => {
    if (!interests.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills: [],
          experience_level: "Beginner",
          interests: [interests],
          career_path: interests,
          learning_preference: "Course-based",
          degree: "B.Tech",
          branch: "Data Science",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data); // Debug log

      if (!data || !data.roadmap || !Array.isArray(data.roadmap)) {
        throw new Error('Invalid response format: missing roadmap array');
      }

      // Transform the API response into recommendations
      const newRecommendations: Recommendation[] = data.roadmap.map((step: any, index: number) => ({
        title: `Step ${index + 1}: ${step.title || step.name || 'Learning Step'}`,
        description: step.description || 'Master this skill or concept',
        icon: [IconCode, IconRocket, IconBrain, IconDeviceLaptop, IconChartBar, IconBulb][index % 6],
        color: [
          'from-blue-500/80 to-cyan-500/80',
          'from-purple-500/80 to-pink-500/80',
          'from-yellow-500/80 to-orange-500/80',
          'from-green-500/80 to-emerald-500/80',
          'from-red-500/80 to-orange-500/80',
          'from-blue-500/80 to-indigo-500/80'
        ][index % 6],
        type: step.type || 'course'
      }));

      setRecommendations(newRecommendations);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setRecommendations([{
        title: 'Error Generating Roadmap',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        icon: IconBrain,
        color: 'from-red-500/80 to-red-600/80',
        type: 'course'
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          AI Recommendations
        </h1>
        <p className="text-gray-400 mt-2">Get personalized learning roadmaps based on your interests</p>
      </div>

      {/* Input Section */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6">
        <div className="max-w-2xl">
          <label htmlFor="interests" className="block text-white font-medium mb-2">
            What technology or field are you interested in?
          </label>
          <div className="flex gap-4">
            <input
              id="interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., React.js, Machine Learning, Cloud Computing..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button
              onClick={handleGenerateRoadmap}
              disabled={isGenerating || !interests.trim()}
              className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 ${
                isGenerating || !interests.trim()
                  ? 'bg-white/5 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 text-white transform hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white/100 rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <IconSearch size={20} />
                  Generate Roadmap
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Enter a specific technology or field you want to learn, and we'll generate a personalized learning roadmap for you.
          </p>
        </div>
      </div>

      {recommendations.length > 0 && (
        <>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                !selectedType 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              All
            </button>
            {['course', 'skill', 'project', 'career'].map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 capitalize ${
                  selectedType === type 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {type}s
              </button>
            ))}
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedType ? recommendations.filter(rec => rec.type === selectedType) : recommendations).map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${rec.color}`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                        {rec.title}
                      </h3>
                      <p className="text-gray-400 mt-2">{rec.description}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <span className={`text-sm font-medium px-2 py-1 rounded-full capitalize ${
                          rec.type === 'course' ? 'bg-blue-500/20 text-blue-400' :
                          rec.type === 'skill' ? 'bg-yellow-500/20 text-yellow-400' :
                          rec.type === 'project' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {rec.type}
                        </span>
                        {rec.link && (
                          <a
                            href={rec.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors ml-auto"
                          >
                            Learn More →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
