'use client';
import React, { useState, useEffect } from 'react';
import Card from './Card';

const TypingRoadmap = () => {
  const [visibleSteps, setVisibleSteps] = useState([0]);
  const [typingContent, setTypingContent] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const roadmapSteps = [
    {
      content: "Let's start with the fundamentals:\n• HTML5 for structure\n• CSS3 for styling\n• JavaScript basics\n• DOM manipulation"
    },
    {
      content: "Now let's learn modern styling:\n• Tailwind CSS framework\n• GSAP animations\n• Responsive design patterns\n• CSS Grid & Flexbox"
    },
    {
      content: "Time for advanced concepts:\n• React.js fundamentals\n• State management\n• Component architecture\n• Modern JavaScript (ES6+)"
    }
  ];

  // Typing animation effect
  useEffect(() => {
    if (currentStep < roadmapSteps.length) {
      const text = roadmapSteps[currentStep].content;
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setTypingContent(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
          
          // Show next step after delay
          setTimeout(() => {
            if (currentStep < roadmapSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setVisibleSteps(prev => [...prev, prev.length]);
              setIsTyping(true);
            }
          }, 1000);
        }
      }, 50); // Adjust typing speed here

      return () => clearInterval(typingInterval);
    }
  }, [currentStep]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="relative space-y-16">
        {visibleSteps.map((stepIndex) => (
          <div key={stepIndex} className="relative">
            {/* Connector Line */}
            {stepIndex < visibleSteps.length - 1 && (
              <div 
                className="absolute left-1/2 bottom-0 w-px h-16 bg-white/20 transform -translate-x-1/2 translate-y-full"
                style={{
                  animation: 'growLine 1s forwards'
                }}
              />
            )}
            
            {/* Step Card */}
            <Card className="relative p-6 bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg max-w-xl mx-auto">
              <div className="absolute -left-3 -top-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {stepIndex + 1}
              </div>
              
              <div className="min-h-[150px] whitespace-pre-line text-white">
                {stepIndex === currentStep ? (
                  <>
                    {typingContent}
                    {isTyping && (
                      <span className="inline-block w-2 h-4 bg-white ml-1 animate-blink" />
                    )}
                  </>
                ) : (
                  roadmapSteps[stepIndex].content
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes growLine {
          from {
            height: 0;
          }
          to {
            height: 64px;
          }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default TypingRoadmap;