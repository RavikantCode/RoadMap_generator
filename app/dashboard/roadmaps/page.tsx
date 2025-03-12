'use client';

import React from 'react';
import { IconPlus, IconFolder, IconChevronRight } from '@tabler/icons-react';

interface Roadmap {
  id: string;
  title: string;
  description: string;
  lastModified: string;
  category: string;
}

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = React.useState<Roadmap[]>([]);
  const [loading, setLoading] = React.useState(true);

  // This would be replaced with your actual API call
  React.useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setRoadmaps([
        {
          id: '1',
          title: 'Full Stack Development',
          description: 'Complete roadmap for becoming a full stack developer',
          lastModified: '2024-03-06',
          category: 'Web Development'
        },
        {
          id: '2',
          title: 'Machine Learning Engineer',
          description: 'Path to becoming an ML engineer with focus on deep learning',
          lastModified: '2024-03-05',
          category: 'Machine Learning'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            My Roadmaps
          </h1>
          <p className="text-gray-400 mt-2">Create and manage your career roadmaps</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
          <IconPlus size={20} />
          New Roadmap
        </button>
      </div>

      {/* Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <div key={roadmap.id} className="group h-[280px]">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
              <div className="p-6 flex-1">
                <div className="mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg inline-block">
                    <IconFolder size={24} className="text-blue-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                  {roadmap.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{roadmap.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium text-blue-400">{roadmap.category}</span>
                  <span className="text-sm text-gray-500">
                    Modified {new Date(roadmap.lastModified).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="border-t border-white/10 p-4 bg-white/5">
                <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors">
                  View Roadmap
                  <IconChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      )}
    </div>
  );
}
