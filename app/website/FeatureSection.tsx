'use client';
import React from "react";
import { gsap } from 'gsap';
import { FaBrain, FaRobot, FaChartLine, FaClock } from 'react-icons/fa';

const FeatureSection = () => {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate elements that are already visible
      gsap.from('.feature-content', { 
        opacity: 0, 
        x: -30, 
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from('.feature-visual', {
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: 'power2.out'
      });

      gsap.from('.feature-card', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="feature-content space-y-8">
            <div>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold text-lg mb-4">
                Revolutionary AI Technology
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Revolutionizing Career Planning with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Machine Learning
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                Our innovative roadmap generator utilizes cutting-edge machine learning algorithms 
                to analyze data and predict optimal career pathways, ensuring your professional 
                journey is both strategic and achievable.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="feature-card group">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-3 rounded-lg w-fit mb-4">
                    <FaBrain className="text-2xl text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    AI-Powered
                  </h3>
                  <p className="text-gray-400">
                    Smart algorithms for precise career path recommendations
                  </p>
                </div>
              </div>

              <div className="feature-card group">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 rounded-lg w-fit mb-4">
                    <FaChartLine className="text-2xl text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    Data-Driven
                  </h3>
                  <p className="text-gray-400">
                    Real-time market insights for informed decisions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="feature-visual relative">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
            
            {/* Main Visual Container */}
            <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-sm border border-white/10 p-8">
              {/* Interactive Visual Placeholder */}
              <div className="aspect-video relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-md">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FaRobot className="text-6xl text-blue-400 mb-4 mx-auto" />
                    <h3 className="text-2xl font-bold text-white mb-2">AI Visualization</h3>
                    <p className="text-gray-400">Interactive career path mapping</p>
                  </div>
                </div>
              </div>

              {/* Stats or Additional Info */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <FaClock className="text-xl text-purple-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Processing Time</h4>
                  <p className="text-2xl font-bold text-purple-400">2.5s</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <FaChartLine className="text-xl text-blue-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Success Rate</h4>
                  <p className="text-2xl font-bold text-blue-400">98%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
