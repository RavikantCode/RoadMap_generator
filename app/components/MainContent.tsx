'use client';
import React, { Suspense } from 'react';
import LandingPage from '../website/LandingPage';
import FeatureSection from '../website/FeatureSection';
import RoadmapSteps from '../website/RoadmapSteps';
import Footer from '../website/Footer';

const MainContent = () => {
  return (
    <main className="bg-black min-h-screen relative">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
            <FeatureSection />
            <RoadmapSteps />
          </Suspense>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default MainContent; 