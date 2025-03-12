'use client';

import React from 'react';
import { IconStar, IconClock, IconUsers, IconBookmark } from '@tabler/icons-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  rating: number;
  students: number;
  duration: string;
  image: string;
  category: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);

  // This would be replaced with your actual API call
  React.useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setCourses([
        {
          id: '1',
          title: 'Complete Web Development Bootcamp',
          provider: 'Udemy',
          rating: 4.8,
          students: 150000,
          duration: '63 hours',
          image: '/course1.jpg',
          category: 'Web Development'
        },
        {
          id: '2',
          title: 'Machine Learning A-Z',
          provider: 'Coursera',
          rating: 4.9,
          students: 120000,
          duration: '44 hours',
          image: '/course2.jpg',
          category: 'Machine Learning'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Trending Courses
        </h1>
        <p className="text-gray-400 mt-2">Discover top-rated courses aligned with your career goals</p>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="group">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 backdrop-blur-sm bg-black/40 rounded-xl border border-white/10">
                    <IconBookmark size={32} className="text-blue-400" />
                  </div>
                </div>
                <button className="absolute top-4 right-4 p-2 backdrop-blur-sm bg-black/40 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <IconBookmark size={20} className="text-gray-400 hover:text-blue-400 transition-colors" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-400">{course.category}</span>
                  <div className="flex items-center">
                    <IconStar size={16} className="text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-400">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{course.provider}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <IconUsers size={16} className="mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center">
                    <IconClock size={16} className="mr-1" />
                    {course.duration}
                  </div>
                </div>
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
