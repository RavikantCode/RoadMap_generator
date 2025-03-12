'use client';

import React from 'react';
import { IconBrain, IconCode, IconDatabase, IconServer, IconStack2, IconRocket } from '@tabler/icons-react';

interface RecommendationCardsProps {
  selectedPath: string;
}

const categories = {
  languages: {
    title: 'Programming Languages',
    icon: IconCode,
    keywords: ['python', 'javascript', 'java', 'c++', 'typescript', 'ruby', 'go'],
    description: 'Master core programming languages'
  },
  dataStructures: {
    title: 'Data Structures & Algorithms',
    icon: IconBrain,
    keywords: ['dsa', 'algorithms', 'data structures', 'leetcode', 'problem solving'],
    description: 'Build strong problem-solving skills'
  },
  backend: {
    title: 'Backend Development',
    icon: IconServer,
    keywords: ['backend', 'server', 'api', 'database', 'nodejs', 'express', 'django'],
    description: 'Learn server-side development'
  },
  frontend: {
    title: 'Frontend Development',
    icon: IconStack2,
    keywords: ['frontend', 'react', 'vue', 'angular', 'web', 'ui', 'ux'],
    description: 'Master modern web frameworks'
  },
  databases: {
    title: 'Databases',
    icon: IconDatabase,
    keywords: ['sql', 'mongodb', 'postgresql', 'mysql', 'database design'],
    description: 'Learn database management'
  },
  systemDesign: {
    title: 'System Design',
    icon: IconRocket,
    keywords: ['architecture', 'scalability', 'design patterns', 'microservices'],
    description: 'Design scalable systems'
  }
};

export default function RecommendationCards({ selectedPath }: RecommendationCardsProps) {
  const getRelevantCategories = (path: string) => {
    const lowercasePath = path.toLowerCase();
    return Object.entries(categories).filter(([_, category]) =>
      category.keywords.some(keyword => lowercasePath.includes(keyword))
    );
  };

  const relevantCategories = selectedPath ? getRelevantCategories(selectedPath) : Object.entries(categories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {relevantCategories.map(([key, category]) => {
        const Icon = category.icon;
        return (
          <div
            key={key}
            className="group bg-[#0A0A0F] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {category.title}
                </h3>
                <p className="mt-2 text-gray-400 text-sm">
                  {category.description}
                </p>
              </div>
            </div>
            {selectedPath && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-purple-400">
                  Recommended based on your interest in {selectedPath}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
