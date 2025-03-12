'use client';

import React from 'react';
import { IconTrendingUp, IconBriefcase, IconDeviceLaptop } from '@tabler/icons-react';

interface TrendData {
  title: string;
  growth: string;
  demand: string;
  category: 'jobs' | 'technologies' | 'skills';
  icon: any;
}

export default function TrendsPage() {
  const [trendingData, setTrendingData] = React.useState<TrendData[]>([]);
  const [activeTab, setActiveTab] = React.useState<'jobs' | 'technologies' | 'skills'>('jobs');

  // This would be replaced with your actual API call
  React.useEffect(() => {
    // Example data - replace with actual API data
    const mockData: TrendData[] = [
      {
        title: 'AI Engineer',
        growth: '+45%',
        demand: 'Very High',
        category: 'jobs',
        icon: IconBriefcase,
      },
      {
        title: 'React.js',
        growth: '+30%',
        demand: 'High',
        category: 'technologies',
        icon: IconDeviceLaptop,
      },
      {
        title: 'Machine Learning',
        growth: '+40%',
        demand: 'Very High',
        category: 'skills',
        icon: IconTrendingUp,
      },
    ];
    setTrendingData(mockData);
  }, []);

  const filteredData = trendingData.filter(item => item.category === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Trending in Tech</h1>
        <p className="text-gray-600">Stay updated with the latest trends in technology</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-4 px-4 text-sm font-medium ${
            activeTab === 'jobs'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('technologies')}
          className={`pb-4 px-4 text-sm font-medium ${
            activeTab === 'technologies'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Technologies
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`pb-4 px-4 text-sm font-medium ${
            activeTab === 'skills'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Skills
        </button>
      </div>

      {/* Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <item.icon size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">Growth: {item.growth}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Demand</span>
                <span className="font-medium text-green-600">{item.demand}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
