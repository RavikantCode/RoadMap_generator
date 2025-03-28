// 'use client';

// import React from 'react';
// import { IconStar, IconClock, IconUsers, IconBookmark } from '@tabler/icons-react';

// interface Course {
//   id: string;
//   title: string;
//   provider: string;
//   rating: number;
//   students: number;
//   duration: string;
//   image: string;
//   category: string;
// }

// export default function CoursesPage() {
//   const [courses, setCourses] = React.useState<Course[]>([]);
//   const [loading, setLoading] = React.useState(true);

//   // This would be replaced with your actual API call
//   React.useEffect(() => {
//     // Simulating API call
//     setTimeout(() => {
//       setCourses([
//         {
//           id: '1',
//           title: 'Complete Web Development Bootcamp',
//           provider: 'Udemy',
//           rating: 4.8,
//           students: 150000,
//           duration: '63 hours',
//           image: '/course1.jpg',
//           category: 'Web Development'
//         },
//         {
//           id: '2',
//           title: 'Machine Learning A-Z',
//           provider: 'Coursera',
//           rating: 4.9,
//           students: 120000,
//           duration: '44 hours',
//           image: '/course2.jpg',
//           category: 'Machine Learning'
//         },
//       ]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//           Trending Courses
//         </h1>
//         <p className="text-gray-400 mt-2">Discover top-rated courses aligned with your career goals</p>
//       </div>

//       {/* Course Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course) => (
//           <div key={course.id} className="group">
//             <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
//               <div className="h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative overflow-hidden">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="p-4 backdrop-blur-sm bg-black/40 rounded-xl border border-white/10">
//                     <IconBookmark size={32} className="text-blue-400" />
//                   </div>
//                 </div>
//                 <button className="absolute top-4 right-4 p-2 backdrop-blur-sm bg-black/40 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <IconBookmark size={20} className="text-gray-400 hover:text-blue-400 transition-colors" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-blue-400">{course.category}</span>
//                   <div className="flex items-center">
//                     <IconStar size={16} className="text-yellow-400" />
//                     <span className="ml-1 text-sm text-gray-400">{course.rating}</span>
//                   </div>
//                 </div>
//                 <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
//                   {course.title}
//                 </h3>
//                 <p className="text-sm text-gray-400 mb-4">{course.provider}</p>
//                 <div className="flex items-center justify-between text-sm text-gray-500">
//                   <div className="flex items-center">
//                     <IconUsers size={16} className="mr-1" />
//                     {course.students.toLocaleString()} students
//                   </div>
//                   <div className="flex items-center">
//                     <IconClock size={16} className="mr-1" />
//                     {course.duration}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {loading && (
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { IconStar, IconClock, IconUsers, IconBookmark } from '@tabler/icons-react';

// interface Course {
//   id: string;
//   title: string;
//   provider: string;
//   rating: number;
//   students: number;
//   duration: string;
//   image: string;
//   category: string;
// }

// const API_SOURCES = [
//   {
//     name: 'RapidAPI',
//     url: 'https://online-course-search.p.rapidapi.com/courses',
//     apiKey: process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
//     headers: {
//       'X-RapidAPI-Host': 'online-course-search.p.rapidapi.com',
//       'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
//     },
//     transformResponse: (data: any) => data.courses.map((course: any) => ({
//       id: course.id,
//       title: course.title,
//       provider: course.platform,
//       rating: course.rating,
//       students: course.enrolled,
//       duration: course.duration,
//       image: course.image,
//       category: course.category
//     }))
//   },
//   // {
//   //   name: 'Coursera',
//   //   url: 'https://api.coursera.org/api/courses.v1',
//   //   apiKey: process.env.NEXT_PUBLIC_COURSERA_API_KEY,
//   //   transformResponse: (data: any) => data.elements.map((course: any) => ({
//   //     id: course.id,
//   //     title: course.name,
//   //     provider: 'Coursera',
//   //     rating: 4.5, // Default rating
//   //     students: course.enrollments || 0,
//   //     duration: '40 hours', // Placeholder
//   //     image: course.photoUrl,
//   //     category: course.specialization || 'General'
//   //   }))
//   // }
// ];

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchCourses() {
//       for (const source of API_SOURCES) {
//         try {
//           const response = await axios.get(source.url, {
//             headers: source.headers,
//             params: { category: 'technology' }
//           });

//           const transformedCourses = source.transformResponse(response.data);
          
//           if (transformedCourses.length > 0) {
//             setCourses(transformedCourses);
//             setLoading(false);
//             return;
//           }
//         } catch (err) {
//           console.error(`Error fetching from ${source.name}:`, err);
//           setError(`Failed to fetch courses from ${source.name}`);
//         }
//       }

//       // Fallback mock data if all APIs fail
//       setCourses([
//         {
//           id: '1',
//           title: 'Complete Web Development Bootcamp',
//           provider: 'Udemy',
//           rating: 4.8,
//           students: 150000,
//           duration: '63 hours',
//           image: '/course1.jpg',
//           category: 'Web Development'
//         },
//         {
//           id: '2',
//           title: 'Machine Learning A-Z',
//           provider: 'Coursera',
//           rating: 4.9,
//           students: 120000,
//           duration: '44 hours',
//           image: '/course2.jpg',
//           category: 'Machine Learning'
//         }
//       ]);
//       setLoading(false);
//     }

//     fetchCourses();
//   }, []);

//   if (error) {
//     return (
//       <div className="text-red-500 text-center py-10">
//         {error}. Please try again later.
//       </div>
//     );
//   }

//   // Rest of the component remains the same as your original implementation
//   return (
//     <div className="space-y-6">
//       {/* Previous render logic remains unchanged */}
//     </div>
//   );
// }


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
            query: 'python' // You can modify this search query
          },
          headers: {
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '0b48b27795msh5c6ff822e507ba0p1a41edjsn5289a1a5b906',
            'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
          }
        });

        // Log the full response to verify structure
        console.log('Full API Response:', response.data);

        // Filter out empty course objects
        const validCourses = response.data.courses.filter((course: any) => 
          course.name && course.image
        );

        // Transform courses
        const transformedCourses: Course[] = validCourses.map((course: any) => ({
          id: course.url || Math.random().toString(),
          title: course.name,
          provider: 'Udemy',
          rating: 4.5, // Since rating is not in the response, use a default
          students: 0, // No students count in the response
          duration: 'Not specified', // No duration in the response
          image: course.image,
          category: course.category || 'General',
          description: course.description,
          url: course.url
        }));

        setCourses(transformedCourses);
        setLoading(false);
      } catch (err) {
        console.error('Detailed Error:', err);
        
        // More informative error handling
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
