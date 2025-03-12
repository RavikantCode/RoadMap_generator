'use client';
import React from 'react';
import { gsap } from 'gsap';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', { 
        opacity: 0, 
        y: 30, 
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from('.trusted-by', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Static gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-30" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen">
          <div className="container mx-auto px-6 py-12">
            {/* Navigation */}
            <nav className="flex justify-between items-center mb-20">
              <Link href="/">
               
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI Mentor
                </h2>
              </Link>
              <div className="flex items-center gap-6">
                <Link 
                  href="/login"
                  className="text-gray-400 hover:text-white transition"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup"
                  className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  Sign up
                </Link>
              </div>
            </nav>

            {/* Hero Content */}
            <div className="max-w-6xl mx-auto text-center hero-text pt-20">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Career Guidance
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Let AI empower your career journey with personalized roadmaps and professional guidance
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => handleNavigation('/signup')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  Get started — it's free
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
