'use client';
import React from "react";
import { gsap } from 'gsap';
import { FaRegLightbulb, FaChartBar, FaRegEdit } from 'react-icons/fa';

const RoadmapSteps = () => {
  React.useEffect(() => {
    gsap.from('.steps-title', { 
      opacity: 0, 
      y: 30, 
      duration: 1,
      delay: 0.2 
    });
    
    gsap.from('.step-card', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      delay: 0.4
    });
  }, []);

  const handleStartJourney = (e: React.MouseEvent) => {
    e.preventDefault();
    // Your logic here
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 steps-title">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold text-lg mb-4">
            Innovate Your Career Path
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Discover the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Career Planning
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our roadmap generator utilizes advanced machine learning algorithms 
            to create tailored plans for your career journey. Experience a seamless 
            process that adapts to your unique aspirations.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Step 1 */}
          <div className="step-card group">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-full hover:border-blue-500/50 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg w-fit mb-6">
                <FaRegLightbulb className="text-3xl text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                Input Your Goals
              </h3>
              <p className="text-gray-400">
                Begin by sharing your career aspirations and current skill set. Our AI system uses this information to understand your unique path.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card group">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-full hover:border-purple-500/50 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg w-fit mb-6">
                <FaChartBar className="text-3xl text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                AI Analysis
              </h3>
              <p className="text-gray-400">
                Our advanced algorithms analyze market trends and your input to generate actionable insights and recommendations.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card group">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-full hover:border-pink-500/50 transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-4 rounded-lg w-fit mb-6">
                <FaRegEdit className="text-3xl text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">
                Customize & Execute
              </h3>
              <p className="text-gray-400">
                Review and customize your personalized career roadmap, then start your journey with clear, actionable steps.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button 
            onClick={handleStartJourney}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
          </button>
          <button className="ml-6 text-gray-400 hover:text-white transition-colors">
            Learn More →
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSteps;
