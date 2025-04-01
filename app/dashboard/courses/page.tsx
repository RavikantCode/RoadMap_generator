
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  description?: string;
  url?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search', {
          params: {
            page: 1,
            page_size: 10,
            query: 'python' //change with the hekp of search bar
          },
          // headers: {
          //   'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '0b48b27795msh5c6ff822e507ba0p1a41edjsn5289a1a5b906',
          //   'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
          // }
        });

        console.log('Full API Response:', response.data);

       
        const validCourses = response.data.courses.filter((course: any) => 
          course.name && course.image
        );

      
        const transformedCourses: Course[] = validCourses.map((course: any) => ({
          id: course.url || Math.random().toString(),
          title: course.name,
          provider: 'Udemy',
          rating: 4.5,
          students: 0, 
          duration: 'Not specified',
          image: course.image,
          category: course.category || 'General',
          description: course.description,
          url: course.url
        }));

        setCourses(transformedCourses);
        setLoading(false);
      } catch (err) {
        console.error('Detailed Error:', err);
        
    
        if (axios.isAxiosError(err)) {
          setError(`API Error: ${err.response?.status} - ${err.response?.data?.message || 'Unknown error'}`);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Error: {error}
        <button 
          onClick={() => window.location.reload()} 
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Trending Courses
        </h1>
        <p className="text-gray-400 mt-2">Discover top-rated courses aligned with your career goals</p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center text-gray-500">
          No courses found. Please try a different search or check your connection.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group">
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 backdrop-blur-sm bg-black/40 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <IconBookmark size={20} className="text-gray-400 hover:text-blue-400 transition-colors" />
                  </a>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-400">{course.category}</span>
                    <div className="flex items-center">
                      <IconStar size={16} className="text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-400">{course.rating.toFixed(1)}</span>
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
      )}
    </div>
  );
}
